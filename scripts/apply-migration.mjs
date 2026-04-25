#!/usr/bin/env node
/**
 * Apply a SQL migration file to a Postgres database.
 *
 * Usage:
 *   PGURL='postgresql://...' node scripts/apply-migration.mjs <path/to/migration.sql>
 *
 * The DB URL is read from PGURL env (avoids leaking it via argv / shell history).
 */
import { readFileSync } from 'fs';
import pg from 'pg';

const url = process.env.PGURL;
const file = process.argv[2];

if (!url || !file) {
  console.error('Usage: PGURL=postgres://... node scripts/apply-migration.mjs <file.sql>');
  process.exit(1);
}

const sql = readFileSync(file, 'utf8');
console.error(`Loaded ${file} (${(sql.length / 1024).toFixed(1)} KB)`);

const client = new pg.Client({ connectionString: url });

try {
  console.error('Connecting…');
  await client.connect();
  console.error('Connected. Running migration…');
  const t0 = Date.now();
  await client.query(sql);
  console.error(`✓ Done in ${Date.now() - t0}ms`);
} catch (err) {
  console.error(`✗ Error: ${err.message}`);
  if (err.position) console.error(`  near position ${err.position}`);
  if (err.detail) console.error(`  detail: ${err.detail}`);
  if (err.hint) console.error(`  hint: ${err.hint}`);
  process.exit(1);
} finally {
  await client.end();
}
