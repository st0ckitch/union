#!/usr/bin/env node
/**
 * Scrape en.union.ru → emit a Supabase migration that fully populates products.
 *
 * Discovery strategy (one fetch per parent — much cheaper than walking 2,300
 * sitemap entries):
 *   1. Fetch en.union.ru/<parent-slug>
 *   2. Parse <p class="title_sec">SubcategoryLabel</p> headings + the
 *      sibling <a class="link_sec" href="/product/...">cards
 *   3. Map (parent_slug, sub_label) → our subcategory slug via SUB_SLUG below
 *
 * Detail strategy (one fetch per unique product):
 *   - JSON-LD Product → name, price (RUB), image, mpn, description
 *   - <meta property="og:description"> / <h1> for English copy
 *   - All <img src> with /upload/iblock/ for gallery (capped at 8)
 *   - Regex on body text for thickness/hinges/lock/max_size/opening/gasket
 *   - Microdata <ol id="breadcrumbs-list"> as a sanity check on subcategory
 *
 * Output: supabase/migrations/<ts>_import_union_full.sql
 *   - Idempotent: starts with DELETE FROM products WHERE source_url LIKE '%union.ru%'
 *   - Then INSERTs each product, looking up category_id by slug subselect
 *
 * Usage:
 *   node scripts/scraper/scrape.mjs                          # full crawl
 *   LIMIT=20 node scripts/scraper/scrape.mjs                 # quick test
 *   PARENTS=mezhkomnatnye-dveri node scripts/scraper/scrape.mjs   # specific parents
 *   FX_RATE=0.032 node scripts/scraper/scrape.mjs            # custom RUB→GEL
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as cheerio from 'cheerio';

// ─────────── config ───────────
const ROOT = 'https://en.union.ru';
const FX_RATE = parseFloat(process.env.FX_RATE || '0.030');
const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT) : null;
const PARALLEL = 4;
const POLITE_DELAY_MS = 200;

// Parent-category URL slugs on en.union.ru. Used in two places:
//   1. Discovery loop fetches en.union.ru/<slug>
//   2. SUB_SLUG keys link parent_slug → label-to-our-slug map
const PARENT_SLUGS = (process.env.PARENTS?.split(',') || [
  'mezhkomnatnye-dveri',          // Swing doors → interior-doors
  'razdvizhnye-dveri',            // Sliding doors → sliding-doors
  'peregorodki',                  // Sliding partitions → sliding-partitions
  'statsionarnye-peregorodki',    // Stationary partitions → stationary-partitions
  'stenovye-paneli-dekorativnye', // Wall panels → wall-panels
  'furniture-view/mebel',         // Furniture → furniture
  'garderobnye-shkafy',           // Wardrobes → wardrobes
  'furniture/vitriny-komody',     // Vitrines & Commodes → vitrines-commodes
  'biblioteki-stellazhi',         // Libraries & Shelves → libraries
  'polki',                        // Shelves → shelves
  'stoly',                        // Tables → tables
  'portofino-sofa',               // Sofas → sofas
  'interernye-zerkala',           // Mirrors → mirrors
  'vhodnye-dveri',                // Entrance doors → entrance-doors
  'plintusy',                     // Baseboards → baseboards
  'furnitura-dlya-dverei',        // Hardware → hardware
]);

// Map our parent slug from union URL slug
const PARENT_TO_OURS = {
  'mezhkomnatnye-dveri':          'interior-doors',
  'razdvizhnye-dveri':            'sliding-doors',
  'peregorodki':                  'sliding-partitions',
  'statsionarnye-peregorodki':    'stationary-partitions',
  'stenovye-paneli-dekorativnye': 'wall-panels',
  'furniture-view/mebel':         'furniture',
  'garderobnye-shkafy':           'wardrobes',
  'furniture/vitriny-komody':     'vitrines-commodes',
  'biblioteki-stellazhi':         'libraries',
  'polki':                        'shelves',
  'stoly':                        'tables',
  'portofino-sofa':               'sofas',
  'interernye-zerkala':           'mirrors',
  'vhodnye-dveri':                'entrance-doors',
  'plintusy':                     'baseboards',
  'furnitura-dlya-dverei':        'hardware',
};

// (parent_slug, sub_label_text) → our subcategory slug.
// Same label can repeat under different parents (e.g. "Folding", "Aluminum and glass"),
// so the parent context disambiguates. Sub_label text comes verbatim from
// the <p class="title_sec">…</p> on union.ru.
const SUB_SLUG = {
  'mezhkomnatnye-dveri': {
    'Hidden under the painting':         'hidden-paintable',
    'Enamel':                            'enamel',
    'Gloss':                             'gloss',
    'Natural veneer':                    'natural-veneer',
    'Under the stone and marble':        'stone-marble',
    'Affordable quality':                'affordable-quality',
    'Aluminum and glass':                'aluminum-glass',
    '3D surface':                        '3d-surface',
    'Interior doors with 3D surface':    '3d-surface',
    'Design':                            'designer-doors',
    'Designer':                          'designer-doors',
    'Classic in enamel':                 'classic-enamel',
    'Classic doors in enamel':           'classic-enamel',
    'Rotary':                            'pivot',
    'Pivot':                             'pivot',
    'PIVOT swing doors':                 'pivot',
    'Folding':                           'folding-doors',
    'Folding doors':                     'folding-doors',
    'Doors with a shadow gap':           'shadow-gap',
    'Soundproof':                        'soundproof',
    'Soundproof doors':                  'soundproof',
  },
  'razdvizhnye-dveri': {
    'Into the pencil case (into the wall)': 'pocket-doors',
    'Pocket (into wall)':        'pocket-doors',
    'Pocket doors':              'pocket-doors',
    'Hidden mechanism':          'hidden-mechanism',
  },
  'peregorodki': {
    'Wooden':                    'wooden-partitions',
    'Aluminum and glass':        'aluminum-glass-partitions',
    'Folding':                   'folding-partitions',
  },
  'statsionarnye-peregorodki': {
    'Aluminum - one glass':      'aluminum-single-glass',
    'Aluminum — one glass':      'aluminum-single-glass',
    'Aluminum - two glasses':    'aluminum-double-glass',
    'Aluminum — two glasses':    'aluminum-double-glass',
  },
  'stenovye-paneli-dekorativnye': {
    'Modern':                    'modern-panels',
    '3D surface':                '3d-panels',
    'Classic':                   'classic-panels',
  },
  'furniture-view/mebel': {
    'Entrance halls':            'hallways',
    'Hallways':                  'hallways',
    'Living rooms':              'living-rooms',
    'Canteens':                  'dining-rooms',
    'Dining rooms':              'dining-rooms',
    'Bedrooms':                  'bedrooms',
    'Offices':                   'cabinets',
    'Cabinets':                  'cabinets',
  },
  'garderobnye-shkafy': {
    'Walk-in closets':           'wardrobes-walkin',
    'WALK-IN CLOSETS':           'wardrobes-walkin',
    'Walk-in':                   'wardrobes-walkin',
    'Wardrobes':                 'cabinets-storage',
    'WARDROBES':                 'cabinets-storage',
    'Cabinets':                  'cabinets-storage',
  },
  'furniture/vitriny-komody': {
    'Dressers':                          'commodes',
    'Commodes':                          'commodes',
    'Dressers - aluminum, glass':        'commodes-alu-glass',
    'Dressers — aluminum, glass':        'commodes-alu-glass',
    'Dressers - aluminum and glass':     'commodes-alu-glass',
    'Dresser-island':                    'commode-island',
    'Commode-island':                    'commode-island',
    'Commode island':                    'commode-island',
    'Wall-mounted showcases':            'vitrines-wall',
    'Showcases — wall-mounted':          'vitrines-wall',
    'Wall showcases':                    'vitrines-wall',
    'Floor showcases':                   'vitrines-floor',
    'Showcases — floor':                 'vitrines-floor',
    'Shelving showcases':                'vitrines-shelving',
    'Showcases — shelving':              'vitrines-shelving',
    'Showcases-shelving':                'vitrines-shelving',
  },
  'stoly': {
    'Dining, kitchen':           'dining-tables',
    'Dining, kitchen tables':    'dining-tables',
    'Dining and kitchen':        'dining-tables',
    'Magazine':                  'coffee-tables',
    'Coffee tables':             'coffee-tables',
    'Coffee':                    'coffee-tables',
  },
  'plintusy': {
    'Shadow':                    'baseboard-shadow',
    'Shadow skirting board':     'baseboard-shadow',
    'Hidden':                    'baseboard-hidden',
    'Hidden skirting board':     'baseboard-hidden',
    'Traditional':               'baseboard-traditional',
    'Traditional floor skirting board': 'baseboard-traditional',
  },
  'furnitura-dlya-dverei': {
    'Door handles':                  'door-handles',
    'Handles':                       'door-handles',
    'Handles for interior doors':    'door-handles',
    'Limiters':                      'stoppers',
    'Door limiters':                 'stoppers',
    'Stoppers':                      'stoppers',
    'Pencil cases':                  'pocket-cassettes',
    'Cassettes':                     'pocket-cassettes',
    'Hangers':                       'hangers',
  },
};

// ─────────── helpers ───────────
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function escSql(s) {
  if (s === null || s === undefined) return 'NULL';
  if (typeof s === 'number') return String(s);
  if (typeof s === 'boolean') return s ? 'true' : 'false';
  return `'${String(s).replace(/'/g, "''")}'`;
}

function escSqlArray(arr) {
  if (!arr || arr.length === 0) return "'{}'";
  const inner = arr.map(s => '"' + String(s).replace(/"/g, '\\"') + '"').join(',');
  return `'{${inner}}'`;
}

async function fetchHtml(url, attempt = 1) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HMSpace-Importer/2.0)' },
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    if (attempt < 3) {
      await sleep(800 * attempt);
      return fetchHtml(url, attempt + 1);
    }
    throw err;
  }
}

function normalizeImage(src) {
  if (!src) return null;
  let abs = src.startsWith('http') ? src : ROOT + src;
  abs = abs.replace('/upload/delight.webpconverter/upload/', '/upload/');
  abs = abs.replace(/\/upload\/resize_cache\/iblock\/([a-f0-9]+)\/([a-z0-9]+)\/\d+_\d+_\d+\/(.+?)\.webp/, '/upload/iblock/$1/$2/$3');
  abs = abs.split('?')[0];
  abs = abs.replace('https://en.union.ru/upload/', 'https://www.union.ru/upload/');
  return abs;
}

// ─────────── phase 1: discover product URLs grouped by (parent, sub_slug) ───────────

/**
 * Walk a parent category page. Returns array of:
 *   { url, parent_slug, sub_label, sub_slug }
 * `sub_slug` may be null if SUB_SLUG has no entry for that label — those products
 * still get attached to the parent.
 */
async function discoverParent(parentSlug) {
  const url = `${ROOT}/${parentSlug}`;
  console.error(`[discover] ${url}`);
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);

  const out = [];
  const subMap = SUB_SLUG[parentSlug] || {};

  // The page is a 3-4 column layout. Each column contains:
  //   <p class="title_sec">SubcategoryLabel</p>
  //   <a class="link_sec" href="/product/...">…
  // We walk title_sec elements and gather all <a.link_sec> until the next title_sec.
  $('.title_sec').each((_, titleEl) => {
    const subLabel = $(titleEl).text().replace(/\s+/g, ' ').trim();
    const subSlug = subMap[subLabel] || null;

    // Find product cards that share the same parent column as this title_sec
    // Strategy: grab the closest column container, then all .link_sec inside it
    const column = $(titleEl).parent(); // typically the col-lg-4 wrapper
    column.find('a.link_sec[href*="/product/"]').each((_, a) => {
      let href = $(a).attr('href');
      if (!href) return;
      if (href.startsWith('/')) href = ROOT + href;
      href = href.split('?')[0].split('#')[0];
      out.push({ url: href, parent_slug: parentSlug, sub_label: subLabel, sub_slug: subSlug });
    });
  });

  // Also catch any product cards that appear OUTSIDE a title_sec section
  // (some pages have an "all" grid below the sections). Attach to parent only.
  const seen = new Set(out.map(x => x.url));
  $('a.link_sec[href*="/product/"]').each((_, a) => {
    let href = $(a).attr('href');
    if (!href) return;
    if (href.startsWith('/')) href = ROOT + href;
    href = href.split('?')[0].split('#')[0];
    if (!seen.has(href)) {
      out.push({ url: href, parent_slug: parentSlug, sub_label: null, sub_slug: null });
      seen.add(href);
    }
  });

  return out;
}

// ─────────── phase 2: scrape one product ───────────

function parseProduct(html, sourceUrl, parentSlug, subSlug) {
  const $ = cheerio.load(html);

  let ld = null;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const obj = JSON.parse($(el).html());
      if (obj['@type'] === 'Product' || obj['@type'] === 'http://schema.org/Product') ld = obj;
    } catch {}
  });
  if (!ld) return null;

  const ogTitle = $('meta[property="og:title"]').attr('content') || ld.name;
  const ogDesc = $('meta[property="og:description"]').attr('content') || '';
  const h1 = $('h1').first().text().trim();

  // Try to grab a richer English description from the page body
  let longDesc = '';
  $('[class*="description"], [class*="content"], .product-info, .product__description').each((_, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text.length > longDesc.length && text.length < 4000) longDesc = text;
  });
  if (!longDesc || longDesc.length < 80) {
    $('p').each((_, el) => {
      const t = $(el).text().replace(/\s+/g, ' ').trim();
      if (t.length >= 80 && t.length < 1000 && !t.includes('cookie') && !t.includes('+7')) {
        if (t.length > longDesc.length) longDesc = t;
      }
    });
  }
  if (longDesc) longDesc = longDesc.slice(0, 800);
  const description = (longDesc && longDesc.length > ogDesc.length) ? longDesc : ogDesc;

  // Microdata breadcrumb sanity check — second <li> is parent, third is sub
  let breadcrumbSubLabel = null;
  let breadcrumbSubHref = null;
  $('ol#breadcrumbs-list li').each((i, li) => {
    if (i === 2) {
      breadcrumbSubLabel = $(li).find('[itemprop="name"]').text().trim();
      breadcrumbSubHref = $(li).find('a').attr('href') || null;
    }
  });

  // Images
  const imageSet = new Set();
  if (ld.image) imageSet.add(normalizeImage(ld.image));
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy-src');
    if (!src) return;
    if (!src.includes('/iblock/')) return;
    if (src.includes('75_75')) return;
    if (src.includes('icon')) return;
    if (src.includes('finishes_min')) return;
    if (src.includes('1420%20x%2064')) return;
    if (src.includes('1150%20x%20250')) return;
    const n = normalizeImage(src);
    if (n && /\.(jpg|jpeg|png|webp)$/i.test(n)) imageSet.add(n);
  });
  const images = [...imageSet].filter(Boolean).slice(0, 8);

  // Specifications via regex on whole body
  const specs = {};
  const specPatterns = [
    ['thickness',     /(?:Толщина|thickness)[^\d]*([\d.,]+\s*(?:cm|см))/i],
    ['hinges',        /(?:Петли|Hinges?)[:\s]+([^.\n]{3,80})/i],
    ['lock',          /(?:Замок|Lock)[:\s]+([^.\n]{3,80})/i],
    ['max_size',      /(?:Максимальные размеры|Maximum size[s]?|Max\.?\s*size)[:\s]+([^.\n]{3,60})/i],
    ['opening_angle', /(?:Открывание|Opening)[^\d]*(\d+\s*°?)/i],
    ['gasket',        /(?:Уплотнитель|Gasket|Seal)[:\s]+([^.\n]{3,80})/i],
    ['frame',         /(?:Каркас|Frame)[:\s]+([^.\n]{3,80})/i],
    ['material',      /(?:Материал|Material)[:\s]+([^.\n]{3,80})/i],
    ['made_in',       /(?:made in|производство)[:\s]+([A-Z][a-zA-Z]{3,30})/i],
  ];
  const bodyText = $('main, .product, body').first().text().replace(/\s+/g, ' ');
  for (const [key, re] of specPatterns) {
    const m = bodyText.match(re);
    if (m) {
      const v = m[1].trim().replace(/\s+/g, ' ').slice(0, 80);
      if (v) specs[key] = v;
    }
  }
  if (ld.model) specs.model = ld.model;

  const priceRub = parseFloat(ld.offers?.price || '0') || 0;
  const priceGel = priceRub > 0 ? Math.round(priceRub * FX_RATE / 10) * 10 : 0;
  const urlSlug = sourceUrl.split('/').pop();

  return {
    sourceUrl,
    sku: ld.mpn || ld.sku || '',
    slug: urlSlug,
    name_en: (ogTitle || ld.name || '').trim(),
    name_ka: (ogTitle || ld.name || '').trim(), // copy English; admin re-translates later
    description_en: (description || h1).trim(),
    description_ka: (description || h1).trim(),
    price: priceGel,
    images,
    specs,
    parent_slug: parentSlug,
    sub_slug: subSlug,
    breadcrumb_sub_label: breadcrumbSubLabel,
    breadcrumb_sub_href: breadcrumbSubHref,
  };
}

async function scrapeProduct(url, parentSlug, subSlug) {
  console.error(`[scrape] ${url}`);
  const html = await fetchHtml(url);
  return parseProduct(html, url, parentSlug, subSlug);
}

// ─────────── phase 3: emit SQL ───────────

function buildSql(products) {
  const lines = [];
  lines.push('-- =============================================================================');
  lines.push('-- Imported from en.union.ru via scripts/scraper/scrape.mjs');
  lines.push(`-- Generated at ${new Date().toISOString()}`);
  lines.push(`-- ${products.length} products`);
  lines.push(`-- FX rate used: 1 RUB → ${FX_RATE} GEL`);
  lines.push('-- =============================================================================');
  lines.push('');

  // Wipe existing union.ru products first — clean slate
  lines.push("-- Wipe previous union.ru imports (so re-running this is idempotent)");
  lines.push("DELETE FROM public.products WHERE source_url LIKE '%union.ru%';");
  lines.push('');

  lines.push('DO $$');
  lines.push('DECLARE');
  lines.push('  target_cat UUID;');
  lines.push('  parent_cat UUID;');
  lines.push('BEGIN');

  let inserted = 0;
  for (const p of products) {
    if (!p.name_en || !p.slug || p.price <= 0) continue;

    // Resolve target category by slug:
    //   - sub_slug if known and exists in our DB
    //   - otherwise fall back to the parent (from PARENT_TO_OURS)
    const ourParent = PARENT_TO_OURS[p.parent_slug];
    if (!ourParent) continue;

    if (p.sub_slug) {
      lines.push(`  SELECT id INTO target_cat FROM public.categories WHERE slug = ${escSql(p.sub_slug)};`);
      lines.push(`  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = ${escSql(ourParent)}; END IF;`);
    } else {
      lines.push(`  SELECT id INTO target_cat FROM public.categories WHERE slug = ${escSql(ourParent)};`);
    }

    lines.push(`  INSERT INTO public.products (`);
    lines.push(`    name_ka, name_en, slug, description_ka, description_en,`);
    lines.push(`    price, category_id, images, specifications,`);
    lines.push(`    is_active, is_new, stock_quantity, source_url`);
    lines.push(`  ) VALUES (`);
    lines.push(`    ${escSql(p.name_ka)}, ${escSql(p.name_en)}, ${escSql(p.slug)},`);
    lines.push(`    ${escSql(p.description_ka)}, ${escSql(p.description_en)},`);
    lines.push(`    ${p.price}, target_cat, ${escSqlArray(p.images)},`);
    lines.push(`    ${escSql(JSON.stringify(p.specs || {}))}::jsonb,`);
    lines.push(`    true, false, 1, ${escSql(p.sourceUrl)}`);
    lines.push(`  ) ON CONFLICT (slug) DO UPDATE SET`);
    lines.push(`    name_en = EXCLUDED.name_en,`);
    lines.push(`    description_en = EXCLUDED.description_en,`);
    lines.push(`    price = EXCLUDED.price,`);
    lines.push(`    category_id = EXCLUDED.category_id,`);
    lines.push(`    images = EXCLUDED.images,`);
    lines.push(`    specifications = EXCLUDED.specifications,`);
    lines.push(`    source_url = EXCLUDED.source_url;`);
    inserted++;
  }
  lines.push('END $$;');
  lines.push('');
  lines.push(`-- ${inserted} products inserted/upserted`);

  return lines.join('\n');
}

// ─────────── main ───────────

async function main() {
  // Discovery: dedupe by URL — first parent-page that mentions a product wins
  const allUrls = new Map();
  for (const ps of PARENT_SLUGS) {
    try {
      const items = await discoverParent(ps);
      let attached = 0;
      for (const item of items) {
        if (!allUrls.has(item.url)) {
          allUrls.set(item.url, item);
          attached++;
        }
      }
      console.error(`  ↳ ${items.length} entries, ${attached} new (${allUrls.size} unique total)`);
      await sleep(POLITE_DELAY_MS);
    } catch (e) {
      console.error(`  ✗ ${ps}: ${e.message}`);
    }
  }

  console.error(`\n📦 ${allUrls.size} unique product URLs across ${PARENT_SLUGS.length} parent pages`);

  // Distribution stats
  const byParent = {};
  for (const item of allUrls.values()) {
    const key = `${item.parent_slug} / ${item.sub_label || '(parent only)'}`;
    byParent[key] = (byParent[key] || 0) + 1;
  }
  console.error('\nDistribution:');
  for (const [k, v] of Object.entries(byParent).sort((a, b) => b[1] - a[1])) {
    console.error(`  ${String(v).padStart(4)}  ${k}`);
  }

  const queue = [...allUrls.values()];
  if (LIMIT) queue.splice(LIMIT);

  const products = [];
  let done = 0;

  async function worker() {
    while (queue.length > 0) {
      const item = queue.shift();
      try {
        const p = await scrapeProduct(item.url, item.parent_slug, item.sub_slug);
        if (p) products.push(p);
      } catch (e) {
        console.error(`  ✗ ${item.url}: ${e.message}`);
      }
      done++;
      if (done % 20 === 0) console.error(`  · ${done}/${allUrls.size} done, ${products.length} parsed`);
      await sleep(POLITE_DELAY_MS);
    }
  }

  await Promise.all(Array.from({ length: PARALLEL }, worker));

  console.error(`\n✅ ${products.length} products scraped successfully`);

  const sql = buildSql(products);
  const ts = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const outPath = join('supabase', 'migrations', `${ts}_import_union_full.sql`);
  mkdirSync('supabase/migrations', { recursive: true });
  writeFileSync(outPath, sql, 'utf8');
  console.error(`💾 Wrote ${outPath} (${(sql.length / 1024).toFixed(1)} KB)`);
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
