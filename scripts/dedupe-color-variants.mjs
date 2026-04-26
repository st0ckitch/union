#!/usr/bin/env node
/**
 * Dedupe per-color SKU variants down to one canonical model per group.
 *
 * Heuristic: a "color variant" is identified by its name pattern. We strip
 * known finish/color words from the end of name_en to compute a canonical
 * "model_key", then keep only the first product per (category_id, model_key)
 * group and delete the rest.
 *
 * Color/finish vocabulary is derived from the actual data + union.ru's
 * known finish names. Add to the list if you spot models being kept that
 * should have collapsed.
 *
 * Usage: PGURL='postgresql://...' node scripts/dedupe-color-variants.mjs [--dry-run]
 */
import pg from 'pg';

const url = process.env.PGURL;
if (!url) { console.error('Set PGURL'); process.exit(1); }

const dryRun = process.argv.includes('--dry-run');

// Color/finish words that appear at the END of product names. We strip these
// (and anything after them) to get a canonical model key.
// Order matters — longer phrases first so they match before single-word ones.
const COLOR_PATTERNS = [
  /\s+(Bianco Night|Grigio Seta|Grigio Fume|Grigio Cemento|Sky Blue|Soft Bronze|Soft Gold|Dark Brown|Chrome Matt|Rovere Miele|Rovere Chiaro|Rovere Americano|Rovere Cenere|Noce Canaletto|Cappuccino|Champagne|Piombo)( Gloss| Matt)?(\s.*)?$/i,
  /\s+(Bianco|Avorio|Tortora|Sabbia|Rocca|Ombra|Grafite|Bruno|Nero|Olive|Grass|Indigo|Terracotta|Bronze|Black|Ebano|Honey|Cream|Crema|Beige)( Gloss| Matt)?(\s.*)?$/i,
  /\s+(Gloss|Glossy|Matte|Matt|Light|Dark|RAL\s*\d+|NCS\s*S\s*[\d-]+)(\s.*)?$/i,
  /\s+(L\d{2}|LG\d{2,4}|HP\d{2}|AL\d{2}|V\d{2,3})(\s.*)?$/, // L01, LG206, HP02, AL09, V36
  /\s+\d+P\s.*$/, // "126P Ombra" → strip everything from "126P"
  /\s+U\d+i\s.*$/i, // "U02i Avorio"
];

function modelKey(name) {
  let key = (name || '').replace(/\s+/g, ' ').trim();
  // Strip the most specific patterns first
  for (const re of COLOR_PATTERNS) {
    key = key.replace(re, '');
  }
  return key.trim();
}

const c = new pg.Client({ connectionString: url });
await c.connect();

// Find groups where multiple products share the same model_key within the same category
const products = (await c.query(`
  SELECT id, category_id, slug, name_en, price, images[1] as primary_img, source_url
  FROM products
  ORDER BY id
`)).rows;

const groups = new Map(); // (category_id|model_key) → [{id, ...}]
for (const p of products) {
  const key = `${p.category_id}|${modelKey(p.name_en)}`;
  if (!groups.has(key)) groups.set(key, []);
  groups.get(key).push(p);
}

let toDelete = [];
let kept = 0;
for (const [key, items] of groups) {
  if (items.length <= 1) { kept++; continue; }
  // Keep the canonical one — prefer:
  //   1. Shortest name (most generic, model-only)
  //   2. Lowest id as tiebreaker
  items.sort((a, b) =>
    (a.name_en.length - b.name_en.length) ||
    (a.id < b.id ? -1 : 1)
  );
  kept++;
  toDelete.push(...items.slice(1).map(x => x.id));
}

console.log(`Total products: ${products.length}`);
console.log(`Unique model groups: ${groups.size}`);
console.log(`Will keep:   ${kept}`);
console.log(`Will delete: ${toDelete.length} color/finish variants`);

if (dryRun) {
  // Show some examples of what we'd collapse
  const samples = [...groups.values()].filter(g => g.length > 1).slice(0, 10);
  console.log('\nSample collapse groups (first 10):');
  for (const grp of samples) {
    const k = modelKey(grp[0].name_en);
    console.log(`\n  Model: "${k}" — keep "${grp[0].name_en}", drop ${grp.length - 1} variants:`);
    for (const x of grp.slice(1, 4)) console.log(`    - ${x.name_en}`);
    if (grp.length > 4) console.log(`    ... +${grp.length - 4} more`);
  }
  await c.end();
  process.exit(0);
}

if (toDelete.length === 0) {
  console.log('Nothing to delete.');
  await c.end();
  process.exit(0);
}

// Batch delete
const BATCH = 500;
for (let i = 0; i < toDelete.length; i += BATCH) {
  const batch = toDelete.slice(i, i + BATCH);
  await c.query(`DELETE FROM products WHERE id = ANY($1::uuid[])`, [batch]);
  console.log(`  deleted ${Math.min(i + BATCH, toDelete.length)}/${toDelete.length}`);
}

const after = await c.query('SELECT count(*) FROM products');
console.log(`\n✓ Done. Products remaining: ${after.rows[0].count}`);

await c.end();
