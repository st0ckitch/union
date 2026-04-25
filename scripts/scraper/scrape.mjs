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

// Map URL slug → { en, ka, ru, slug-for-our-site }
const CATEGORY_META = {
  'mezhkomnatnye-dveri':          { en: 'Interior Doors',    ka: 'შიდა კარები',           ru: 'Межкомнатные двери',    slug: 'interior-doors' },
  'razdvizhnye-dveri':            { en: 'Sliding Doors',     ka: 'სრიალა კარები',         ru: 'Раздвижные двери',      slug: 'sliding-doors' },
  'peregorodki':                  { en: 'Sliding Partitions',ka: 'სრიალა ტიხრები',        ru: 'Раздвижные перегородки',slug: 'sliding-partitions' },
  'statsionarnye-peregorodki':    { en: 'Stationary Partitions', ka: 'სტაციონარული ტიხრები', ru: 'Стационарные перегородки', slug: 'stationary-partitions' },
  'stenovye-paneli-dekorativnye': { en: 'Wall Panels',       ka: 'კედლის პანელები',       ru: 'Стеновые панели',       slug: 'wall-panels' },
  'furniture-view/mebel':         { en: 'Furniture',         ka: 'ავეჯი',                ru: 'Мебель',                slug: 'furniture' },
  'garderobnye-shkafy':           { en: 'Wardrobes',         ka: 'საგარდერობოები',         ru: 'Гардеробные',           slug: 'wardrobes' },
  'furniture/vitriny-komody':     { en: 'Vitrines & Commodes', ka: 'ვიტრინები, კომოდები', ru: 'Витрины, комоды',       slug: 'vitrines-commodes' },
  'biblioteki-stellazhi':         { en: 'Libraries & Shelves', ka: 'ბიბლიოთეკები', ru: 'Библиотеки',                  slug: 'libraries' },
  'polki':                        { en: 'Shelves',           ka: 'თაროები',              ru: 'Полки',                 slug: 'shelves' },
  'stoly':                        { en: 'Tables',            ka: 'მაგიდები',             ru: 'Столы',                 slug: 'tables' },
  'portofino-sofa':               { en: 'Sofas',             ka: 'დივანები',             ru: 'Диваны',                slug: 'sofas' },
  'interernye-zerkala':           { en: 'Interior Mirrors',  ka: 'სარკეები',             ru: 'Зеркала',               slug: 'mirrors' },
  'vhodnye-dveri':                { en: 'Entrance Doors',    ka: 'შესასვლელი კარები',     ru: 'Входные двери',         slug: 'entrance-doors' },
  'plintusy':                     { en: 'Baseboards',        ka: 'პლინტუსები',           ru: 'Плинтусы',              slug: 'baseboards' },
  'furnitura-dlya-dverei':        { en: 'Hardware & Fittings', ka: 'ფურნიტურა',          ru: 'Фурнитура',             slug: 'hardware' },
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

  // Specifications: try to extract from on-page bullet lists / dl
  const specs = {};
  const specPatterns = [
    /Толщина[^\d]+([\d.,]+\s*(?:cm|см))/i,
    /thickness[^\d]+([\d.,]+\s*cm)/i,
    /Hinges?[:\s]+([^.\n]{3,80})/i,
    /Lock[:\s]+([^.\n]{3,80})/i,
    /Maximum size[s]?[:\s]+([^.\n]{3,60})/i,
    /Opening[:\s]+(\d+°?)/i,
  ];
  const specLabels = ['thickness', 'thickness', 'hinges', 'lock', 'max_size', 'opening_angle'];
  const bodyText = $('body').text().replace(/\s+/g, ' ');
  specPatterns.forEach((re, i) => {
    const m = bodyText.match(re);
    if (m && !specs[specLabels[i]]) specs[specLabels[i]] = m[1].trim().slice(0, 60);
  });

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
  lines.push(`-- ${products.length} products across ${new Set(products.map(p => p.categoryKey)).size} categories`);
  lines.push(`-- FX rate used: 1 RUB → ${FX_RATE} GEL`);
  lines.push('-- =============================================================================');
  lines.push('');

  // Categories
  const usedCats = [...new Set(products.map(p => p.categoryKey))].filter(k => CATEGORY_META[k]);
  lines.push('-- Categories (idempotent: only inserts if slug not already present)');
  for (const key of usedCats) {
    const m = CATEGORY_META[key];
    lines.push(`INSERT INTO public.categories (name_ka, name_en, slug, sort_order, is_active)`);
    lines.push(`  VALUES (${escSql(m.ka)}, ${escSql(m.en)}, ${escSql(m.slug)}, 0, true)`);
    lines.push(`  ON CONFLICT (slug) DO NOTHING;`);
  }
  lines.push('');

  // Products
  lines.push('-- Products');
  lines.push('DO $$');
  lines.push('DECLARE');
  for (const key of usedCats) {
    lines.push(`  cat_${key.replace(/[^a-z]/gi, '_')} UUID;`);
  }
  lines.push('BEGIN');
  for (const key of usedCats) {
    const m = CATEGORY_META[key];
    lines.push(`  SELECT id INTO cat_${key.replace(/[^a-z]/gi, '_')} FROM public.categories WHERE slug = ${escSql(m.slug)};`);
  }
  lines.push('');

  let inserted = 0;
  for (const p of products) {
    if (!p.name_en || !p.slug || p.price <= 0) continue;
    const catVar = `cat_${p.categoryKey.replace(/[^a-z]/gi, '_')}`;
    lines.push(`  INSERT INTO public.products (`);
    lines.push(`    name_ka, name_en, slug, description_ka, description_en,`);
    lines.push(`    price, category_id, images, specifications,`);
    lines.push(`    is_active, is_new, stock_quantity, source_url`);
    lines.push(`  ) VALUES (`);
    lines.push(`    ${escSql(p.name_ka)}, ${escSql(p.name_en)}, ${escSql(p.slug)},`);
    lines.push(`    ${escSql(p.description_ka)}, ${escSql(p.description_en)},`);
    lines.push(`    ${p.price}, ${catVar}, ${escSqlArray(p.images)},`);
    lines.push(`    ${escSql(JSON.stringify(p.specs || {}))}::jsonb,`);
    lines.push(`    true, false, 1, ${escSql(p.sourceUrl)}`);
    lines.push(`  ) ON CONFLICT (slug) DO NOTHING;`);
    inserted++;
  }
  lines.push('END $$;');
  lines.push('');
  lines.push(`-- ${inserted} product INSERTs emitted (some may be skipped via ON CONFLICT)`);

  return lines.join('\n');
}

// ───────── main ─────────
async function main() {
  const allUrls = new Map(); // url → categoryKey (first-seen wins)

  for (const cat of CATEGORIES) {
    try {
      const urls = await discoverCategory(cat);
      for (const u of urls) {
        if (!allUrls.has(u)) allUrls.set(u, cat);
      }
      console.error(`  ↳ ${urls.length} URLs (${allUrls.size} unique total)`);
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
      const [url, catKey] = queue.shift();
      try {
        const p = await scrapeProduct(url, catKey);
        if (p) products.push(p);
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
