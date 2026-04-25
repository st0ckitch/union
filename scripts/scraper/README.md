# union.ru product importer

Scrapes en.union.ru's English catalog and emits a Supabase SQL migration that
seeds the `categories` and `products` tables.

## Usage

```bash
# Default: all 16 categories
node scripts/scraper/scrape.mjs

# Test with first 20 products only
LIMIT=20 node scripts/scraper/scrape.mjs

# Specific categories
CATEGORIES=mezhkomnatnye-dveri,vhodnye-dveri node scripts/scraper/scrape.mjs

# Override RUB → GEL conversion (default 0.030)
FX_RATE=0.032 node scripts/scraper/scrape.mjs
```

Output goes to `supabase/migrations/<timestamp>_import_union_products.sql`.

## What it does

1. **Discover phase** — fetches each of the 16 category pages, collects product URLs
2. **Scrape phase** — fetches each unique product page, parses JSON-LD + meta + HTML
   - Name (from `og:title`)
   - Price (from JSON-LD `offers.price`, converted RUB → GEL)
   - Description (from longest in-page `<p>` block, falling back to `og:description`)
   - Images (canonical CDN URLs at `/upload/iblock/...`)
   - Category (from the discover phase)
3. **Emit phase** — writes a SQL file with `INSERT … ON CONFLICT DO NOTHING`

## After running

Apply the migration to your Supabase project:

```bash
supabase db push
# or paste the SQL into Supabase SQL Editor
```

## Caveats

- **Image hot-linking**: products reference `union.ru` CDN URLs. If union ever blocks
  cross-origin requests, those images will break. Re-host them in Supabase Storage
  or your own CDN before going to real customers.
- **Description language**: most product pages have English descriptions, but a
  handful fall back to Russian text. Edit those individually in `/admin/products`.
- **Per-product translations**: the seed copies the English text into both
  `name_ka` and `description_ka`. Translate them in the admin before launch.
- **Copyright**: the imported text and images are union.ru's content. Treat this
  as placeholder data and replace with your own before going to real customers.

## Idempotency

Re-running the scraper produces a fresh migration. The migration uses
`ON CONFLICT (slug) DO NOTHING`, so applying it multiple times is safe — products
with existing slugs are skipped, no duplicates.

To force-update existing products instead, change `DO NOTHING` to a `DO UPDATE`
clause in the generated migration.
