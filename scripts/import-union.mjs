#!/usr/bin/env node
/**
 * Import scraped Union products into Supabase.
 *
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... node scripts/import-union.mjs
 *
 * Requires .env.local or environment with SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 * Upserts categories by slug, then products by slug. Skips rows missing required fields.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');

async function loadDotEnv() {
  try {
    const envPath = path.resolve(__dirname, '..', '.env.local');
    const raw = await fs.readFile(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
      }
    }
  } catch {
    /* no .env.local */
  }
}

async function main() {
  await loadDotEnv();
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('[import] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.');
    console.error('         Put them in .env.local or export them before running.');
    process.exit(1);
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });

  const categories = JSON.parse(
    await fs.readFile(path.join(DATA_DIR, 'union-categories.json'), 'utf8')
  );
  const products = JSON.parse(
    await fs.readFile(path.join(DATA_DIR, 'union-products.json'), 'utf8')
  );

  console.log(`[import] upserting ${categories.length} categories...`);
  for (const c of categories) {
    const { error } = await supabase.from('categories').upsert(
      {
        slug: c.slug,
        name_ka: c.name_ka ?? c.name_en,
        name_en: c.name_en,
        is_active: true,
      },
      { onConflict: 'slug' }
    );
    if (error) console.error(`  ✗ ${c.slug}: ${error.message}`);
  }

  const { data: catRows } = await supabase.from('categories').select('id, slug');
  const catMap = Object.fromEntries((catRows ?? []).map((r) => [r.slug, r.id]));

  console.log(`[import] upserting ${products.length} products...`);
  let ok = 0;
  let failed = 0;
  for (const p of products) {
    if (!p.name_en || !p.slug || !p.category_slug) {
      failed++;
      continue;
    }
    const category_id = catMap[p.category_slug];
    if (!category_id) {
      console.error(`  ✗ ${p.slug}: category ${p.category_slug} missing`);
      failed++;
      continue;
    }
    const { error } = await supabase.from('products').upsert(
      {
        name_ka: p.name_ka ?? p.name_en,
        name_en: p.name_en,
        slug: p.slug,
        description_ka: p.description_ka ?? null,
        description_en: p.description_en ?? null,
        price: p.price ?? 0,
        sale_price: p.sale_price ?? null,
        category_id,
        images: p.images ?? [],
        is_new: p.is_new ?? false,
        is_featured: p.is_featured ?? false,
        is_active: true,
        stock_quantity: p.stock_quantity ?? 0,
        specifications: p.specifications ?? {},
        source_url: p.source_url ?? null,
      },
      { onConflict: 'slug' }
    );
    if (error) {
      console.error(`  ✗ ${p.slug}: ${error.message}`);
      failed++;
    } else {
      ok++;
    }
  }

  console.log(`[import] done. inserted/updated=${ok} failed=${failed}`);
}

main().catch((e) => {
  console.error('[import] fatal:', e);
  process.exit(1);
});
