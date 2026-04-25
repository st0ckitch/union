#!/usr/bin/env node
/**
 * Scrape en.union.ru → emit SQL migration that seeds categories + products.
 *
 *   node scripts/scraper/scrape.mjs                    # full run, all categories
 *   LIMIT=20 node scripts/scraper/scrape.mjs           # only first 20 products (for testing)
 *   CATEGORIES=mezhkomnatnye-dveri,vhodnye-dveri node scripts/scraper/scrape.mjs
 *
 * Output: supabase/migrations/<timestamp>_import_union_products.sql
 *
 * Notes:
 *  - Prices are converted from RUB → GEL using FX_RATE below. Override with FX_RATE=0.032 env.
 *  - Images use union.ru's CDN URLs directly (hot-linking). They may break if union blocks
 *    cross-origin requests — replace with your own CDN later.
 *  - Idempotent: re-running won't duplicate (uses ON CONFLICT (slug) DO NOTHING).
 *  - Polite: 500 ms between requests, max 4 parallel.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import * as cheerio from 'cheerio';

// ───────── config ─────────
const ROOT = 'https://en.union.ru';
const FX_RATE = parseFloat(process.env.FX_RATE || '0.030'); // 1 RUB → GEL
const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT) : null;
const PARALLEL = 4;
const POLITE_DELAY_MS = 250;

const CATEGORIES = (process.env.CATEGORIES?.split(',') || [
  'mezhkomnatnye-dveri',          // Swing doors
  'razdvizhnye-dveri',            // Sliding doors
  'peregorodki',                  // Sliding partitions
  'statsionarnye-peregorodki',    // Stationary partitions
  'stenovye-paneli-dekorativnye', // Wall panels
  'furniture-view/mebel',         // Furniture
  'garderobnye-shkafy',           // Wardrobes
  'furniture/vitriny-komody',     // Showcases / dressers
  'biblioteki-stellazhi',         // Libraries / shelves
  'polki',                        // Shelves
  'stoly',                        // Tables
  'portofino-sofa',               // Sofas
  'interernye-zerkala',           // Mirrors
  'vhodnye-dveri',                // Entrance doors
  'plintusy',                     // Baseboards
  'furnitura-dlya-dverei',        // Hardware
]);

// Map URL slug → { en, ka, ru, slug-for-our-site, subcategories: [...] }
//
// Each subcategory has an "url" (the union.ru path we crawl) and a "slug"
// (what we use in our DB). Set parent_slug equal to the parent's slug above.
const CATEGORY_META = {
  'mezhkomnatnye-dveri': {
    en: 'Interior Doors', ka: 'შიდა კარები', ru: 'Межкомнатные двери', slug: 'interior-doors',
    subcategories: [
      { url: 'skrytaya-dever-pod-pokrasky', en: 'Hidden / Paintable',     ka: 'ფარული საღებავი',         ru: 'Скрытые под покраску',   slug: 'hidden-paintable' },
      { url: 'dveri-frezerovka-emal',       en: 'Enamel',                  ka: 'ემალი',                   ru: 'Эмаль',                  slug: 'enamel' },
      { url: 'glanets',                      en: 'Gloss',                   ka: 'გლანცი',                  ru: 'Глянец',                 slug: 'gloss' },
      { url: 'naturalnyi-shpon',             en: 'Natural Veneer',          ka: 'ბუნებრივი ხოჭო',           ru: 'Натуральный шпон',       slug: 'natural-veneer' },
      { url: 'dveri-pod-kamen-i-mramor',     en: 'Stone & Marble',          ka: 'ქვა და მარმარილო',        ru: 'Под камень и мрамор',    slug: 'stone-marble' },
      { url: 'dostupnoe-kachestvo',          en: 'Affordable Quality',      ka: 'ხელმისაწვდომი ხარისხი',    ru: 'Доступное качество',     slug: 'affordable-quality' },
      { url: 'alyuminiy-i-steklo',           en: 'Aluminum & Glass',        ka: 'ალუმინი და მინა',         ru: 'Алюминий и стекло',      slug: 'aluminum-glass' },
      { url: 'uniflex-3d-656',               en: '3D Surface',              ka: '3D ზედაპირი',             ru: '3D поверхность',         slug: '3d-surface' },
      { url: 'pivot',                         en: 'Pivot',                   ka: 'პივოტი',                 ru: 'Поворотные',             slug: 'pivot' },
      { url: 'dveri-s-tenevym-zazorom',      en: 'Shadow Gap',              ka: 'ჩრდილოვანი ნაპრალი',       ru: 'С теневым зазором',      slug: 'shadow-gap' },
      { url: 'zvukoizolyatsionnye-dveri',    en: 'Soundproof',              ka: 'ხმაჩამხშობი',             ru: 'Звукоизоляционные',      slug: 'soundproof' },
    ],
  },
  'razdvizhnye-dveri': {
    en: 'Sliding Doors', ka: 'სრიალა კარები', ru: 'Раздвижные двери', slug: 'sliding-doors',
    subcategories: [
      { url: 'razdvizhnye-dveri-v-penal',    en: 'Pocket Doors',            ka: 'ჯიბური კარები',           ru: 'В пенал',                slug: 'pocket-doors' },
      { url: 'naruzhnye-razdvizhnye',        en: 'Surface Sliding',         ka: 'გარე სრიალა',             ru: 'Наружные',               slug: 'surface-sliding' },
    ],
  },
  'peregorodki': {
    en: 'Sliding Partitions', ka: 'სრიალა ტიხრები', ru: 'Раздвижные перегородки', slug: 'sliding-partitions',
    subcategories: [
      { url: 'derevyannye-peregorodki-984',  en: 'Wooden',                  ka: 'ხის',                     ru: 'Деревянные',             slug: 'wooden-partitions' },
      { url: 'alyuminiy-i-steklo-rz',        en: 'Aluminum & Glass',        ka: 'ალუმინი და მინა',         ru: 'Алюминий и стекло',      slug: 'aluminum-glass-partitions' },
      { url: 'skladnye-peregorodki-985',     en: 'Folding',                 ka: 'სასაკეცი',                ru: 'Складные',               slug: 'folding-partitions' },
    ],
  },
  'stenovye-paneli-dekorativnye': {
    en: 'Wall Panels', ka: 'კედლის პანელები', ru: 'Стеновые панели', slug: 'wall-panels',
    subcategories: [
      { url: 'sovremennye-998',              en: 'Modern',                  ka: 'თანამედროვე',             ru: 'Современные',            slug: 'modern-panels' },
      { url: 'uniflex-3d-1089',              en: '3D Surface',              ka: '3D',                       ru: '3D',                      slug: '3d-panels' },
      { url: 'klassika-999',                 en: 'Classic',                 ka: 'კლასიკა',                 ru: 'Классика',               slug: 'classic-panels' },
    ],
  },
  'vhodnye-dveri': {
    en: 'Entrance Doors', ka: 'შესასვლელი კარები', ru: 'Входные двери', slug: 'entrance-doors',
    subcategories: [
      { url: 'skrytyy-1426',                 en: 'Hidden',                  ka: 'ფარული',                  ru: 'Скрытый',                slug: 'hidden-entrance' },
      { url: 'traditsionnyy-1427',           en: 'Traditional',             ka: 'ტრადიციული',              ru: 'Традиционный',           slug: 'traditional-entrance' },
    ],
  },
  'stoly': {
    en: 'Tables', ka: 'მაგიდები', ru: 'Столы', slug: 'tables',
    subcategories: [
      { url: 'obedennye-kukhonnye',          en: 'Dining & Kitchen',        ka: 'სასადილო და სამზარეულო',  ru: 'Обеденные, кухонные',    slug: 'dining-tables' },
      { url: 'zhurnalnye',                   en: 'Coffee',                  ka: 'საუპენი',                 ru: 'Журнальные',             slug: 'coffee-tables' },
    ],
  },
  'furnitura-dlya-dverei': {
    en: 'Hardware & Fittings', ka: 'ფურნიტურა', ru: 'Фурнитура', slug: 'hardware',
    subcategories: [
      { url: 'ruchki',                       en: 'Door Handles',            ka: 'კარის სახელურები',        ru: 'Дверные ручки',          slug: 'door-handles' },
      { url: 'ogranichiteli',                en: 'Stoppers',                ka: 'შეჩერებლები',             ru: 'Ограничители',           slug: 'stoppers' },
      { url: 'penaly-dlya-razdvizhnykh-dverey', en: 'Pocket Cassettes',     ka: 'პენალები',                ru: 'Пеналы',                 slug: 'pocket-cassettes' },
      { url: 'plechiki-877',                 en: 'Hangers',                 ka: 'სამკაულები',              ru: 'Плечики',                slug: 'hangers' },
    ],
  },

  // Categories without subcategories — products attach to top-level
  'statsionarnye-peregorodki':    { en: 'Stationary Partitions', ka: 'სტაციონარული ტიხრები', ru: 'Стационарные перегородки', slug: 'stationary-partitions', subcategories: [] },
  'furniture-view/mebel':         { en: 'Furniture',         ka: 'ავეჯი',                ru: 'Мебель',                slug: 'furniture',           subcategories: [] },
  'garderobnye-shkafy':           { en: 'Wardrobes',         ka: 'საგარდერობოები',         ru: 'Гардеробные',           slug: 'wardrobes',           subcategories: [] },
  'furniture/vitriny-komody':     { en: 'Vitrines & Commodes', ka: 'ვიტრინები, კომოდები', ru: 'Витрины, комоды',       slug: 'vitrines-commodes',  subcategories: [] },
  'biblioteki-stellazhi':         { en: 'Libraries & Shelves', ka: 'ბიბლიოთეკები',       ru: 'Библиотеки',            slug: 'libraries',           subcategories: [] },
  'polki':                        { en: 'Shelves',           ka: 'თაროები',              ru: 'Полки',                 slug: 'shelves',             subcategories: [] },
  'portofino-sofa':               { en: 'Sofas',             ka: 'დივანები',             ru: 'Диваны',                slug: 'sofas',               subcategories: [] },
  'interernye-zerkala':           { en: 'Interior Mirrors',  ka: 'სარკეები',             ru: 'Зеркала',               slug: 'mirrors',             subcategories: [] },
  'plintusy':                     { en: 'Baseboards',        ka: 'პლინტუსები',           ru: 'Плинტусы',              slug: 'baseboards',          subcategories: [] },
};

// ───────── helpers ─────────
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
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; HMSpace-Importer/1.0)' },
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (err) {
    if (attempt < 3) {
      await sleep(1000 * attempt);
      return fetchHtml(url, attempt + 1);
    }
    throw err;
  }
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

// ───────── phase 1: discover product URLs per category ─────────
async function discoverCategory(slug) {
  const url = `${ROOT}/${slug}`;
  console.error(`[discover] ${url}`);
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const links = new Set();
  $('a[href*="/product/"]').each((_, el) => {
    let href = $(el).attr('href');
    if (!href) return;
    if (href.startsWith('/')) href = ROOT + href;
    href = href.split('?')[0].split('#')[0];
    if (href.match(/\/product\/[a-zA-Z0-9-]+$/)) links.add(href);
  });
  return [...links];
}

// ───────── phase 2: parse a product page ─────────
function parseProduct(html, sourceUrl, categoryKey) {
  const $ = cheerio.load(html);

  // JSON-LD is the cleanest source
  let ld = null;
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const obj = JSON.parse($(el).html());
      if (obj['@type'] === 'Product' || obj['@type'] === 'http://schema.org/Product') {
        ld = obj;
      }
    } catch {}
  });

  if (!ld) return null;

  const ogTitle = $('meta[property="og:title"]').attr('content') || ld.name;
  const ogDesc = $('meta[property="og:description"]').attr('content') || '';
  const h1 = $('h1').first().text().trim();

  // Try for a richer description: union.ru product pages have a "Описание"/"Description"
  // block with the long product copy. Strip nav/footer noise.
  let longDesc = '';
  $('[class*="description"], [class*="content"], .product-info, .product__description').each((_, el) => {
    const text = $(el).text().replace(/\s+/g, ' ').trim();
    if (text.length > longDesc.length && text.length < 4000) longDesc = text;
  });
  // Fallback: take the first <p> of meaningful length under main content
  if (!longDesc || longDesc.length < 80) {
    $('p').each((_, el) => {
      const t = $(el).text().replace(/\s+/g, ' ').trim();
      if (t.length >= 80 && t.length < 1000 && !t.includes('cookie') && !t.includes('+7')) {
        if (t.length > longDesc.length) longDesc = t;
      }
    });
  }
  // Cap at 800 chars and prefer over og:description if longer
  if (longDesc) longDesc = longDesc.slice(0, 800);
  const description = (longDesc && longDesc.length > ogDesc.length) ? longDesc : ogDesc;
  const sku = ld.mpn || ld.sku || '';
  const priceRub = parseFloat(ld.offers?.price || '0') || 0;

  // Build slug from URL (most reliable, matches site)
  const urlSlug = sourceUrl.split('/').pop();

  // Gather images: JSON-LD primary + extras from HTML <img> with /upload/ paths
  // Union serves resized webp variants; we strip the resize_cache path to get
  // the originals (works because the original is at /upload/iblock/<hash>/<slug>/<file>).
  const imageSet = new Set();
  function normalize(src) {
    if (!src) return null;
    let abs = src.startsWith('http') ? src : ROOT + src;
    // /upload/delight.webpconverter/upload/ → /upload/
    abs = abs.replace('/upload/delight.webpconverter/upload/', '/upload/');
    // /upload/resize_cache/iblock/<a>/<b>/<size>/<file>.webp → /upload/iblock/<a>/<b>/<file>
    abs = abs.replace(/\/upload\/resize_cache\/iblock\/([a-f0-9]+)\/([a-z0-9]+)\/\d+_\d+_\d+\/(.+?)\.webp/, '/upload/iblock/$1/$2/$3');
    abs = abs.split('?')[0];
    // canonical host: serve from www.union.ru (where uploads actually live)
    abs = abs.replace('https://en.union.ru/upload/', 'https://www.union.ru/upload/');
    return abs;
  }
  if (ld.image) imageSet.add(normalize(ld.image));
  $('img').each((_, el) => {
    const src = $(el).attr('src') || $(el).attr('data-src') || $(el).attr('data-lazy-src');
    if (!src) return;
    if (!src.includes('/iblock/')) return;
    if (src.includes('75_75')) return;
    if (src.includes('icon')) return;
    if (src.includes('finishes_min')) return; // small finish swatches not the door
    if (src.includes('1420%20x%2064')) return; // banner strip
    if (src.includes('1150%20x%20250')) return; // banner strip
    const n = normalize(src);
    if (n && /\.(jpg|jpeg|png|webp)$/i.test(n)) imageSet.add(n);
  });
  const images = [...imageSet].filter(Boolean).slice(0, 8); // cap at 8 per product

  // Specifications: extract from page text using common patterns.
  // Each pattern: [key, regex] — first capture group is the value.
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
  // Always include the JSON-LD model if present (style variant)
  if (ld.model) specs.model = ld.model;

  // Convert RUB → GEL
  const priceGel = priceRub > 0 ? Math.round(priceRub * FX_RATE / 10) * 10 : 0;

  return {
    sourceUrl,
    sku,
    slug: urlSlug,
    name_en: ogTitle.trim(),
    name_ka: ogTitle.trim(),
    description_en: (description || h1).trim(),
    description_ka: (description || h1).trim(),
    price: priceGel,
    images,
    specs,
    categoryKey,
    model: ld.model || null,
  };
}

async function scrapeProduct(url, categoryKey) {
  console.error(`[scrape] ${url}`);
  const html = await fetchHtml(url);
  return parseProduct(html, url, categoryKey);
}

// ───────── phase 3: emit SQL ─────────
function buildSql(products) {
  const lines = [];

  lines.push('-- =============================================================================');
  lines.push('-- Imported from en.union.ru via scripts/scraper/scrape.mjs');
  lines.push(`-- Generated at ${new Date().toISOString()}`);
  lines.push(`-- ${products.length} products across ${new Set(products.map(p => p.categoryKey)).size} parent categories`);
  lines.push(`-- FX rate used: 1 RUB → ${FX_RATE} GEL`);
  lines.push('-- =============================================================================');
  lines.push('');

  // ── Parent categories (top-level)
  const usedParents = [...new Set(products.map(p => p.categoryKey))].filter(k => CATEGORY_META[k]);
  lines.push('-- Parent categories');
  for (const key of usedParents) {
    const m = CATEGORY_META[key];
    lines.push(`INSERT INTO public.categories (name_ka, name_en, slug, sort_order, is_active, parent_id)`);
    lines.push(`  VALUES (${escSql(m.ka)}, ${escSql(m.en)}, ${escSql(m.slug)}, 0, true, NULL)`);
    lines.push(`  ON CONFLICT (slug) DO NOTHING;`);
  }
  lines.push('');

  // ── Subcategories — only emit ones that have at least one product
  const usedSubSlugs = new Set(products.map(p => p.subcategorySlug).filter(Boolean));
  lines.push('-- Subcategories (children of parent categories, only those with products)');
  lines.push('DO $$');
  lines.push('DECLARE');
  for (const key of usedParents) {
    lines.push(`  parent_${key.replace(/[^a-z]/gi, '_')} UUID;`);
  }
  lines.push('BEGIN');
  for (const key of usedParents) {
    const m = CATEGORY_META[key];
    lines.push(`  SELECT id INTO parent_${key.replace(/[^a-z]/gi, '_')} FROM public.categories WHERE slug = ${escSql(m.slug)};`);
  }
  for (const key of usedParents) {
    const m = CATEGORY_META[key];
    const parentVar = `parent_${key.replace(/[^a-z]/gi, '_')}`;
    let order = 1;
    for (const sub of (m.subcategories || [])) {
      if (!usedSubSlugs.has(sub.slug)) continue;
      lines.push(`  INSERT INTO public.categories (name_ka, name_en, slug, sort_order, is_active, parent_id)`);
      lines.push(`    VALUES (${escSql(sub.ka)}, ${escSql(sub.en)}, ${escSql(sub.slug)}, ${order}, true, ${parentVar})`);
      lines.push(`    ON CONFLICT (slug) DO NOTHING;`);
      order++;
    }
  }
  lines.push('END $$;');
  lines.push('');

  // ── Products
  lines.push('-- Products (linked to subcategory if available, else parent)');
  lines.push('DO $$');
  lines.push('DECLARE');
  lines.push('  target_cat UUID;');
  lines.push('BEGIN');

  let inserted = 0;
  for (const p of products) {
    if (!p.name_en || !p.slug || p.price <= 0) continue;

    const m = CATEGORY_META[p.categoryKey];
    if (!m) continue;

    // Pick the most specific category: subcategory if known, else parent
    const catSlug = p.subcategorySlug || m.slug;
    lines.push(`  SELECT id INTO target_cat FROM public.categories WHERE slug = ${escSql(catSlug)};`);
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
    lines.push(`  ) ON CONFLICT (slug) DO NOTHING;`);
    inserted++;
  }
  lines.push('END $$;');
  lines.push('');
  lines.push(`-- ${inserted} product INSERTs emitted (skipped on slug conflict)`);
  lines.push(`-- ${usedSubSlugs.size} subcategories used`);

  return lines.join('\n');
}

// ───────── main ─────────
async function main() {
  // url → { categoryKey, subcategorySlug? }
  // First-seen wins (so a product on a subcategory page beats the same product on the parent page)
  const allUrls = new Map();

  for (const cat of CATEGORIES) {
    const meta = CATEGORY_META[cat];
    const subs = meta?.subcategories || [];

    // Subcategories are checked FIRST (so they win over parent category)
    for (const sub of subs) {
      try {
        const urls = await discoverCategory(sub.url);
        for (const u of urls) {
          if (!allUrls.has(u)) allUrls.set(u, { categoryKey: cat, subcategorySlug: sub.slug });
        }
        console.error(`  ↳ subcat ${sub.url}: ${urls.length} URLs`);
        await sleep(POLITE_DELAY_MS);
      } catch (e) {
        console.error(`  ✗ subcat ${sub.url}: ${e.message}`);
      }
    }

    // Parent category — picks up products not in any subcategory
    try {
      const urls = await discoverCategory(cat);
      let attached = 0;
      for (const u of urls) {
        if (!allUrls.has(u)) {
          allUrls.set(u, { categoryKey: cat, subcategorySlug: null });
          attached++;
        }
      }
      console.error(`  ↳ parent ${cat}: ${urls.length} URLs (${attached} new, ${allUrls.size} unique total)`);
      await sleep(POLITE_DELAY_MS);
    } catch (e) {
      console.error(`  ✗ ${cat}: ${e.message}`);
    }
  }

  console.error(`\n📦 ${allUrls.size} unique products discovered\n`);

  const queue = [...allUrls.entries()];
  if (LIMIT) queue.splice(LIMIT);

  const products = [];
  let done = 0;

  async function worker() {
    while (queue.length > 0) {
      const [url, info] = queue.shift();
      try {
        const p = await scrapeProduct(url, info.categoryKey);
        if (p) {
          p.subcategorySlug = info.subcategorySlug || null;
          products.push(p);
        }
      } catch (e) {
        console.error(`  ✗ ${url}: ${e.message}`);
      }
      done++;
      if (done % 10 === 0) console.error(`  · ${done}/${allUrls.size} done, ${products.length} parsed`);
      await sleep(POLITE_DELAY_MS);
    }
  }

  await Promise.all(Array.from({ length: PARALLEL }, worker));

  console.error(`\n✅ ${products.length} products scraped successfully\n`);

  const sql = buildSql(products);
  const ts = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  const outPath = join('supabase', 'migrations', `${ts}_import_union_products.sql`);
  mkdirSync('supabase/migrations', { recursive: true });
  writeFileSync(outPath, sql, 'utf8');
  console.error(`💾 Wrote ${outPath} (${(sql.length / 1024).toFixed(1)} KB)`);
}

main().catch((e) => {
  console.error('Fatal:', e);
  process.exit(1);
});
