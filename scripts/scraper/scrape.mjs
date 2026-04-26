#!/usr/bin/env node
/**
 * Scrape en.union.ru → emit a Supabase migration that fully populates products.
 *
 * Strategy:
 *   1. Phase 1 — Discovery: fetch sitemap.xml, take every /product/* URL
 *   2. Phase 2 — Classification + scrape: for each URL, fetch the detail page,
 *      read breadcrumb MICRODATA (<ol id="breadcrumbs-list">) to get
 *      parent + (optional) subcategory, then use JSON-LD for name/price/etc.
 *   3. Phase 3 — Emit SQL: idempotent DELETE+INSERT migration
 *
 * Why breadcrumb-based classification?
 *   The earlier title_sec approach only worked on parent pages with the
 *   3-column section layout. Many parents (Sliding doors, Stationary
 *   partitions, Furniture, Vitrines, Sofas, Mirrors, Libraries) use other
 *   layouts and were leaving 0 products. Breadcrumb microdata is present on
 *   EVERY product page and is the authoritative classification per union.ru's
 *   own taxonomy.
 *
 * Usage:
 *   node scripts/scraper/scrape.mjs                          # full crawl
 *   LIMIT=20 node scripts/scraper/scrape.mjs                 # quick test
 *   FX_RATE=0.032 node scripts/scraper/scrape.mjs            # custom RUB→GEL
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as cheerio from 'cheerio';

// ─────────── config ───────────
const ROOT = 'https://en.union.ru';
const FX_RATE = parseFloat(process.env.FX_RATE || '0.030');
const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT) : null;
const PARALLEL = 6;
const POLITE_DELAY_MS = 150;

// Breadcrumb's parent-position href → our parent_slug. union.ru sometimes uses
// alternate URLs like /vhodnye-dveri-1296 alongside /vhodnye-dveri.
const PARENT_HREF_TO_OURS = {
  '/mezhkomnatnye-dveri':          'interior-doors',
  '/mezhkomnatnye-dveri-356':      'interior-doors',
  '/razdvizhnye-dveri':            'sliding-doors',
  '/razdvizhnye-dveri-i-peregorodki-844': 'sliding-doors',
  '/peregorodki':                  'sliding-partitions',
  '/statsionarnye-peregorodki':    'stationary-partitions',
  '/stenovye-paneli-dekorativnye': 'wall-panels',
  '/furniture-view/mebel':         'furniture',
  '/mebel-846':                    'furniture',
  '/garderobnye-shkafy':           'wardrobes',
  '/furniture/vitriny-komody':     'vitrines-commodes',
  '/biblioteki-stellazhi':         'libraries',
  '/polki':                        'shelves',
  '/stoly':                        'tables',
  '/portofino-sofa':               'sofas',
  '/interernye-zerkala':           'mirrors',
  '/vhodnye-dveri':                'entrance-doors',
  '/vkhodnye-dveri-1296':          'entrance-doors',
  '/plintusy':                     'baseboards',
  '/furnitura-dlya-dverei':        'hardware',
  '/furnitura-1401':               'hardware',
};

// Parent label (text in breadcrumb position 2) → our parent slug. Used as
// fallback if href doesn't match one of the known prefixes.
const PARENT_LABEL_TO_OURS = {
  'Swing doors':                  'interior-doors',
  'Interior doors':               'interior-doors',
  'Sliding doors':                'sliding-doors',
  'Sliding partitions':           'sliding-partitions',
  'Stationary partitions':        'stationary-partitions',
  'Wall panels':                  'wall-panels',
  'Furniture':                    'furniture',
  'Walk-in closets, closets':     'wardrobes',
  'Walk-in closets':              'wardrobes',
  'Showcases, dressers':          'vitrines-commodes',
  'Vitrines, commodes':           'vitrines-commodes',
  'Libraries, shelving':          'libraries',
  'Shelves':                      'shelves',
  'Tables':                       'tables',
  'Sofas':                        'sofas',
  'Mirrors':                      'mirrors',
  'Entrance doors':               'entrance-doors',
  'Entrance steel doors':         'entrance-doors',
  'Baseboards':                   'baseboards',
  'Handles, accessories':         'hardware',
  'Handles, Accessories':         'hardware',
};

// Per-parent (subcategory label) → our sub slug. Sub label comes from breadcrumb
// position 3 if there are 4+ items. If position 3 doesn't map, the product
// attaches to the parent only.
const SUB_SLUG = {
  'interior-doors': {
    'Hidden under the painting':      'hidden-paintable',
    'Hidden door for painting':       'hidden-paintable',
    'Skrytaya dever pod pokrasky':    'hidden-paintable',
    'Enamel':                         'enamel',
    'Matt enamel':                    'enamel',
    'Matte enamel':                   'enamel',
    'Gloss':                          'gloss',
    'Glossy enamel':                  'gloss',
    'Natural veneer':                 'natural-veneer',
    'Veneer':                         'natural-veneer',
    'Under the stone and marble':     'stone-marble',
    'Stone and marble':               'stone-marble',
    'HPL':                            'stone-marble',
    'Affordable quality':             'affordable-quality',
    'Aluminum and glass':             'aluminum-glass',
    '3D surface':                     '3d-surface',
    'Interior doors with 3D surface': '3d-surface',
    'Design':                         'designer-doors',
    'Designer doors':                 'designer-doors',
    'Classic in enamel':              'classic-enamel',
    'Classic doors in enamel':        'classic-enamel',
    'Rotary':                         'pivot',
    'Pivot':                          'pivot',
    'PIVOT swing doors':              'pivot',
    'Folding':                        'folding-doors',
    'Folding doors':                  'folding-doors',
    'Doors with a shadow gap':        'shadow-gap',
    'Shadow gap':                     'shadow-gap',
    'Soundproof':                     'soundproof',
    'Soundproof doors':               'soundproof',
  },
  'sliding-doors': {
    'Into the pencil case (into the wall)': 'pocket-doors',
    'Pocket (into wall)':                   'pocket-doors',
    'Pocket doors':                         'pocket-doors',
    'In the pencil case':                   'pocket-doors',
    'Hidden mechanism':                     'hidden-mechanism',
  },
  'sliding-partitions': {
    'Wooden':                         'wooden-partitions',
    'Aluminum and glass':             'aluminum-glass-partitions',
    'Folding':                        'folding-partitions',
  },
  'stationary-partitions': {
    'Aluminum - one glass':           'aluminum-single-glass',
    'Aluminum — one glass':           'aluminum-single-glass',
    'Aluminum - two glasses':         'aluminum-double-glass',
    'Aluminum — two glasses':         'aluminum-double-glass',
  },
  'wall-panels': {
    'Modern':                         'modern-panels',
    '3D surface':                     '3d-panels',
    'Classic':                        'classic-panels',
  },
  'furniture': {
    'Entrance halls':                 'hallways',
    'Hallways':                       'hallways',
    'Living rooms':                   'living-rooms',
    'Canteens':                       'dining-rooms',
    'Dining rooms':                   'dining-rooms',
    'Bedrooms':                       'bedrooms',
    'Offices':                        'cabinets',
    'Cabinets':                       'cabinets',
  },
  'wardrobes': {
    'Walk-in closets':                'wardrobes-walkin',
    'WALK-IN CLOSETS':                'wardrobes-walkin',
    'Wardrobes':                      'cabinets-storage',
    'WARDROBES':                      'cabinets-storage',
  },
  'vitrines-commodes': {
    'Dressers':                       'commodes',
    'Commodes':                       'commodes',
    'Dressers - aluminum, glass':     'commodes-alu-glass',
    'Dresser-island':                 'commode-island',
    'Wall-mounted showcases':         'vitrines-wall',
    'Floor showcases':                'vitrines-floor',
    'Shelving showcases':             'vitrines-shelving',
  },
  'tables': {
    'Dining, kitchen':                'dining-tables',
    'Dining, kitchen tables':         'dining-tables',
    'Magazine':                       'coffee-tables',
    'Coffee tables':                  'coffee-tables',
  },
  'baseboards': {
    'Shadow':                         'baseboard-shadow',
    'Shadow skirting board':          'baseboard-shadow',
    'Shadow baseboard':               'baseboard-shadow',
    'Hidden':                         'baseboard-hidden',
    'Invisible baseboard':            'baseboard-hidden',
    'Hidden skirting board':          'baseboard-hidden',
    'Traditional':                    'baseboard-traditional',
    'Traditional floor skirting board': 'baseboard-traditional',
  },
  'hardware': {
    'Door handles':                   'door-handles',
    'Handles for interior doors':     'door-handles',
    'Limiters':                       'stoppers',
    'Door limiters':                  'stoppers',
    'Stoppers':                       'stoppers',
    'Pencil cases':                   'pocket-cassettes',
    'Cassettes':                      'pocket-cassettes',
    'Hangers':                        'hangers',
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
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HMSpace-Importer/3.0)' },
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

// ─────────── phase 1: discover product URLs from sitemap.xml ───────────

async function discoverFromSitemap() {
  console.error('[discover] fetching sitemap.xml');
  const xml = await fetchHtml(`${ROOT}/sitemap.xml`);
  const urls = new Set();
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = match[1];
    if (!url.includes('/product/')) continue;
    // Skip orphan/empty slug variants
    const slug = url.split('/').pop();
    if (!slug || slug.startsWith('-') || slug.length < 3) continue;
    // Normalise to en.union.ru host (sitemap uses www)
    urls.add(url.replace('https://www.union.ru/', `${ROOT}/`));
  }
  console.error(`  ↳ ${urls.size} product URLs in sitemap`);
  return [...urls];
}

// ─────────── phase 2: scrape one product ───────────

function classifyByBreadcrumb($) {
  // Breadcrumb microdata: <ol id="breadcrumbs-list"><li> Catalog | Parent | Sub | Product
  const items = [];
  $('ol#breadcrumbs-list li').each((_, li) => {
    const name = $(li).find('[itemprop="name"]').text().replace(/\s+/g, ' ').trim();
    const href = $(li).find('a').attr('href') || '';
    if (name) items.push({ name, href });
  });
  if (items.length < 2) return { ourParent: null, ourSub: null, parentLabel: null, subLabel: null };

  // Position 1 (index 1) is the parent — index 0 is "Catalog"
  const parent = items[1];
  const sub = items.length >= 4 ? items[2] : null; // 4+ items = has subcategory

  let ourParent = PARENT_HREF_TO_OURS[parent.href.split('?')[0]] || null;
  if (!ourParent) ourParent = PARENT_LABEL_TO_OURS[parent.name] || null;

  let ourSub = null;
  if (sub && ourParent && SUB_SLUG[ourParent]) {
    ourSub = SUB_SLUG[ourParent][sub.name] || null;
  }

  return { ourParent, ourSub, parentLabel: parent.name, subLabel: sub?.name || null };
}

function parseProduct(html, sourceUrl) {
  const $ = cheerio.load(html);

  let ld = null;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const obj = JSON.parse($(el).html());
      if (obj['@type'] === 'Product' || obj['@type'] === 'http://schema.org/Product') ld = obj;
    } catch {}
  });
  if (!ld) return null;

  const cls = classifyByBreadcrumb($);
  if (!cls.ourParent) return null; // skip products we can't classify

  const ogTitle = $('meta[property="og:title"]').attr('content') || ld.name;
  const ogDesc = $('meta[property="og:description"]').attr('content') || '';
  const h1 = $('h1').first().text().trim();

  // Skip text blocks that contain Cyrillic — even on en.union.ru, some product
  // descriptions haven't been translated. We want English only.
  const isCyrillic = (s) => /[\u0400-\u04FF]/.test(s || '');

  // Long English description
  let longDesc = '';
  $('[class*="description"], [class*="content"], .product-info, .product__description').each((_, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (isCyrillic(text)) return; // English-only
    if (text.length > longDesc.length && text.length < 4000) longDesc = text;
  });
  if (!longDesc || longDesc.length < 80) {
    $('p').each((_, el) => {
      const t = $(el).text().replace(/\s+/g, ' ').trim();
      if (isCyrillic(t)) return;
      if (t.length >= 80 && t.length < 1000 && !t.includes('cookie') && !t.includes('+7')) {
        if (t.length > longDesc.length) longDesc = t;
      }
    });
  }
  if (longDesc) longDesc = longDesc.slice(0, 800);

  // Prefer the longest non-Cyrillic option. If everything is Cyrillic, fall
  // back to a generic English template built from the product name.
  const ogClean = isCyrillic(ogDesc) ? '' : ogDesc;
  const h1Clean = isCyrillic(h1) ? '' : h1;
  let description = '';
  for (const candidate of [longDesc, ogClean, h1Clean]) {
    if (candidate && candidate.length > description.length) description = candidate;
  }
  if (!description) {
    description = `Premium ${ogTitle.trim()} from UNION. Italian craftsmanship, made-to-order finishes, custom sizing. Contact us for details.`;
  }

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

  // Specifications via regex
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
  if (cls.subLabel) specs.union_subcategory = cls.subLabel;

  const priceRub = parseFloat(ld.offers?.price || '0') || 0;
  const priceGel = priceRub > 0 ? Math.round(priceRub * FX_RATE / 10) * 10 : 0;
  const urlSlug = sourceUrl.split('/').pop();

  return {
    sourceUrl,
    sku: ld.mpn || ld.sku || '',
    slug: urlSlug,
    name_en: (ogTitle || ld.name || '').trim(),
    name_ka: (ogTitle || ld.name || '').trim(),
    description_en: (description || h1).trim(),
    description_ka: (description || h1).trim(),
    price: priceGel,
    images,
    specs,
    parent_slug: cls.ourParent,
    sub_slug: cls.ourSub,
    parentLabel: cls.parentLabel,
    subLabel: cls.subLabel,
  };
}

async function scrapeProduct(url) {
  const html = await fetchHtml(url);
  return parseProduct(html, url);
}

// ─────────── phase 3: emit SQL ───────────

function buildSql(products) {
  const lines = [];
  lines.push('-- =============================================================================');
  lines.push('-- Imported from en.union.ru via scripts/scraper/scrape.mjs');
  lines.push(`-- Generated at ${new Date().toISOString()}`);
  lines.push(`-- ${products.length} products`);
  lines.push(`-- FX rate used: 1 RUB → ${FX_RATE} GEL`);
  lines.push('-- Classification: breadcrumb microdata from each product page');
  lines.push('-- =============================================================================');
  lines.push('');

  lines.push("-- Wipe previous union.ru imports (idempotent on re-run)");
  lines.push("DELETE FROM public.products WHERE source_url LIKE '%union.ru%';");
  lines.push('');

  lines.push('DO $$');
  lines.push('DECLARE');
  lines.push('  target_cat UUID;');
  lines.push('BEGIN');

  let inserted = 0;
  for (const p of products) {
    if (!p.name_en || !p.slug || p.price <= 0) continue;
    if (!p.parent_slug) continue;

    if (p.sub_slug) {
      lines.push(`  SELECT id INTO target_cat FROM public.categories WHERE slug = ${escSql(p.sub_slug)};`);
      lines.push(`  IF target_cat IS NULL THEN SELECT id INTO target_cat FROM public.categories WHERE slug = ${escSql(p.parent_slug)}; END IF;`);
    } else {
      lines.push(`  SELECT id INTO target_cat FROM public.categories WHERE slug = ${escSql(p.parent_slug)};`);
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
  const urls = await discoverFromSitemap();
  const queue = [...urls];
  if (LIMIT) queue.splice(LIMIT);

  const products = [];
  let done = 0;
  let skipped = 0;
  let errored = 0;

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift();
      try {
        const p = await scrapeProduct(url);
        if (p) products.push(p);
        else skipped++;
      } catch (e) {
        errored++;
      }
      done++;
      if (done % 50 === 0) {
        console.error(`  · ${done}/${urls.length} done, ${products.length} parsed, ${skipped} skipped, ${errored} errored`);
      }
      await sleep(POLITE_DELAY_MS);
    }
  }

  console.error(`\nScraping ${queue.length} products with ${PARALLEL} parallel workers…\n`);
  await Promise.all(Array.from({ length: PARALLEL }, worker));

  console.error(`\n✅ ${products.length} products scraped, ${skipped} skipped, ${errored} errored\n`);

  // Distribution stats
  const dist = {};
  for (const p of products) {
    const key = p.parent_slug + (p.sub_slug ? '/' + p.sub_slug : '/(parent)');
    dist[key] = (dist[key] || 0) + 1;
  }
  console.error('Distribution by category:');
  for (const [k, v] of Object.entries(dist).sort((a, b) => b[1] - a[1])) {
    console.error(`  ${String(v).padStart(4)}  ${k}`);
  }

  // Unmapped breadcrumb labels (for diagnostics)
  const unmappedSubs = {};
  for (const p of products) {
    if (p.subLabel && !p.sub_slug) {
      const key = `${p.parent_slug}: "${p.subLabel}"`;
      unmappedSubs[key] = (unmappedSubs[key] || 0) + 1;
    }
  }
  if (Object.keys(unmappedSubs).length > 0) {
    console.error('\nUnmapped sub labels (consider adding to SUB_SLUG):');
    for (const [k, v] of Object.entries(unmappedSubs).sort((a, b) => b[1] - a[1]).slice(0, 30)) {
      console.error(`  ${String(v).padStart(4)}  ${k}`);
    }
  }

  const sql = buildSql(products);
  const ts = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const outPath = join('supabase', 'migrations', `${ts}_import_union_full.sql`);
  mkdirSync('supabase/migrations', { recursive: true });
  writeFileSync(outPath, sql, 'utf8');
  console.error(`\n💾 Wrote ${outPath} (${(sql.length / 1024).toFixed(1)} KB)`);
}

main().catch((e) => { console.error('Fatal:', e); process.exit(1); });
