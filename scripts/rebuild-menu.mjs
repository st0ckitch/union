#!/usr/bin/env node
/**
 * Rebuild public.menu_items from public.categories so menu links map cleanly to
 * /union/catalog/<parent>/<sub> URLs that our Catalog component understands.
 *
 * - Wipes ALL mega_menu items (preserves sidebar items so customizations there survive)
 * - For each top-level category, creates a column-balanced group
 * - For each subcategory, creates a child link to /union/catalog/<parent-slug>/<child-slug>
 *
 * Run: PGURL='postgresql://...' node scripts/rebuild-menu.mjs
 */
import pg from 'pg';

const url = process.env.PGURL;
if (!url) { console.error('Set PGURL'); process.exit(1); }

// Lucide icons by parent slug — best-effort match
const ICON_BY_SLUG = {
  'interior-doors':       'DoorOpen',
  'sliding-partitions':   'PanelTop',
  'wall-panels':          'LayoutPanelTop',
  'wardrobes':            'Archive',
  'libraries':            'BookOpen',
  'shelves':              'Layers',
  'tables':               'Table2',
  'mirrors':              'SquareStack',
  'entrance-doors':       'Home',
  'hardware':             'KeyRound',
  'furniture':            'Sofa',
};

// Distribute parent categories across 3 columns by sort order
function columnFor(idx, total) {
  if (idx < Math.ceil(total / 3)) return 1;
  if (idx < Math.ceil((total * 2) / 3)) return 2;
  return 3;
}

const c = new pg.Client({ connectionString: url });
await c.connect();

await c.query('BEGIN');
try {
  // 1. Fetch hierarchy
  const cats = (await c.query(`
    SELECT id, slug, name_ka, name_en, parent_id, sort_order
    FROM categories
    ORDER BY parent_id NULLS FIRST, sort_order, slug
  `)).rows;
  const parents = cats.filter(c => !c.parent_id);
  const childrenOf = (pid) => cats.filter(c => c.parent_id === pid);

  // 2. Wipe existing mega_menu (preserve sidebar)
  const wiped = await c.query(`DELETE FROM menu_items WHERE section = 'mega_menu' RETURNING id`);
  console.log(`Wiped ${wiped.rowCount} mega_menu rows`);

  // 3. Insert top-level groups + their children
  for (let i = 0; i < parents.length; i++) {
    const p = parents[i];
    const col = columnFor(i, parents.length);
    const groupRes = await c.query(
      `INSERT INTO menu_items (section, column_number, name_ka, name_ru, name_en, href, icon, sort_order, is_active)
       VALUES ('mega_menu', $1, $2, $3, $4, $5, $6, $7, true) RETURNING id`,
      [
        col,
        p.name_ka,
        p.name_en, // ru ≈ en for now; admin can edit
        p.name_en,
        `/union/catalog/${p.slug}`,
        ICON_BY_SLUG[p.slug] || null,
        i,
      ]
    );
    const groupId = groupRes.rows[0].id;
    console.log(`  ${p.slug.padEnd(25)} -> col ${col}`);

    // Children
    const subs = childrenOf(p.id);
    for (let j = 0; j < subs.length; j++) {
      const s = subs[j];
      await c.query(
        `INSERT INTO menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order, is_active)
         VALUES ($1, 'mega_menu', $2, $3, $4, $5, $6, true)`,
        [
          groupId,
          s.name_ka,
          s.name_en,
          s.name_en,
          `/union/catalog/${p.slug}/${s.slug}`,
          j,
        ]
      );
    }
    if (subs.length) console.log(`    + ${subs.length} children`);
  }

  await c.query('COMMIT');
  console.log('\n✓ Menu rebuilt successfully');
} catch (e) {
  await c.query('ROLLBACK');
  console.error('Rollback —', e.message);
  process.exit(1);
} finally {
  await c.end();
}
