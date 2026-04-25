#!/usr/bin/env node
/**
 * Declarative source-of-truth for the catalog mega menu.
 * Mirrors union.ru's Russian mega menu 1:1 — three columns of product groups
 * + a left rail of shortcut links.
 *
 * Run:  PGURL='postgresql://...' node scripts/rebuild-menu.mjs
 *
 * Behaviour: WIPES ALL menu_items rows (mega_menu + sidebar) and re-inserts
 * the full structure below. Edit the MENU constant to change anything.
 *
 * Each leaf links to /union/catalog/<parent-slug>/<sub-slug> so the existing
 * Catalog.tsx routing handles it. Parents link to /union/catalog/<slug>.
 */
import pg from 'pg';

// ─────────────────────────────────────────────────────────────────────────────
// MENU DEFINITION — keep in sync with union.ru's Russian mega menu.
//   icon: a Lucide icon name (resolved at render time in UnionMegaMenu.tsx)
//   is_new: renders a tiny NEW superscript badge
//   sub: array of child links inside this group
//   href: defaults to /union/catalog/<slug> for parents,
//         /union/catalog/<parent-slug>/<sub-slug> for children
// ─────────────────────────────────────────────────────────────────────────────

const COLUMN_1 = [
  { slug: 'interior-doors', name_ka: 'შიდა კარები', name_ru: 'Распашные двери', name_en: 'Interior Doors', icon: 'DoorOpen', sub: [
    { slug: 'hidden-paintable',  name_ka: 'ფარული საღებავი',     name_ru: 'Скрытые под покраску',  name_en: 'Hidden / Paintable' },
    { slug: 'enamel',            name_ka: 'ემალი',              name_ru: 'Эмаль',                 name_en: 'Enamel' },
    { slug: 'gloss',             name_ka: 'გლანცი',             name_ru: 'Глянец',                name_en: 'Gloss' },
    { slug: 'natural-veneer',    name_ka: 'ბუნებრივი ხოჭო',      name_ru: 'Натуральный шпон',      name_en: 'Natural Veneer' },
    { slug: 'stone-marble',      name_ka: 'ქვა და მარმარილო',    name_ru: 'Под камень и мрамор',   name_en: 'Stone & Marble' },
    { slug: 'affordable-quality',name_ka: 'ხელმისაწვდომი ხარისხი', name_ru: 'Доступное качество',  name_en: 'Affordable Quality' },
    { slug: 'aluminum-glass',    name_ka: 'ალუმინი და მინა',     name_ru: 'Алюминий и стекло',     name_en: 'Aluminum & Glass' },
    { slug: '3d-surface',        name_ka: '3D ზედაპირი',         name_ru: '3D поверхность',        name_en: '3D Surface' },
    { slug: 'designer-doors',    name_ka: 'დიზაინერული',         name_ru: 'Дизайнерские',          name_en: 'Designer' },
    { slug: 'classic-enamel',    name_ka: 'კლასიკური ემალი',     name_ru: 'Классические в эмали', name_en: 'Classic Enamel' },
    { slug: 'pivot',             name_ka: 'პივოტი',              name_ru: 'Поворотные',            name_en: 'Pivot' },
    { slug: 'folding-doors',     name_ka: 'სასაკეცი',            name_ru: 'Складные',              name_en: 'Folding',         is_new: true },
    { slug: 'shadow-gap',        name_ka: 'ჩრდილოვანი ნაპრალი',  name_ru: 'Двери с теневым зазором', name_en: 'Shadow Gap',    is_new: true },
    { slug: 'soundproof',        name_ka: 'ხმაჩამხშობი',         name_ru: 'Звукоизоляционные',    name_en: 'Soundproof',      is_new: true },
  ]},

  { slug: 'sliding-doors', name_ka: 'სრიალა კარები', name_ru: 'Раздвижные двери', name_en: 'Sliding Doors', icon: 'PanelTop', sub: [
    { slug: 'pocket-doors',      name_ka: 'ჯიბური (კედელში)',    name_ru: 'В пенал (в стену)',     name_en: 'Pocket (into wall)' },
    { slug: 'hidden-mechanism',  name_ka: 'ფარული მექანიზმი',    name_ru: 'Скрытый механизм',      name_en: 'Hidden Mechanism' },
  ]},

  { slug: 'sliding-partitions', name_ka: 'სრიალა ტიხრები', name_ru: 'Раздвижные перегородки', name_en: 'Sliding Partitions', icon: 'LayoutPanelTop', sub: [
    { slug: 'wooden-partitions', name_ka: 'ხის',                name_ru: 'Деревянные',            name_en: 'Wooden' },
    { slug: 'aluminum-glass-partitions', name_ka: 'ალუმინი და მინა', name_ru: 'Алюминий и стекло', name_en: 'Aluminum & Glass' },
    { slug: 'folding-partitions',name_ka: 'სასაკეცი',            name_ru: 'Складные',              name_en: 'Folding',         is_new: true },
  ]},
];

const COLUMN_2 = [
  { slug: 'stationary-partitions', name_ka: 'სტაციონარული ტიხრები', name_ru: 'Стационарные перегородки', name_en: 'Stationary Partitions', icon: 'Square', sub: [
    { slug: 'aluminum-single-glass', name_ka: 'ალუმინი — ერთი მინა', name_ru: 'Алюминий — одно стекло', name_en: 'Aluminum — single glass', is_new: true },
    { slug: 'aluminum-double-glass', name_ka: 'ალუმინი — ორი მინა',  name_ru: 'Алюминий — два стекла',  name_en: 'Aluminum — double glass', is_new: true },
  ]},

  { slug: 'wall-panels', name_ka: 'კედლის პანელები', name_ru: 'Стеновые панели', name_en: 'Wall Panels', icon: 'Grid3x3', sub: [
    { slug: 'modern-panels',     name_ka: 'თანამედროვე',         name_ru: 'Современные',           name_en: 'Modern' },
    { slug: '3d-panels',         name_ka: '3D ზედაპირი',          name_ru: '3D поверхность',        name_en: '3D Surface' },
    { slug: 'classic-panels',    name_ka: 'კლასიკა',             name_ru: 'Классика',              name_en: 'Classic' },
  ]},

  { slug: 'furniture', name_ka: 'ავეჯი', name_ru: 'Мебель', name_en: 'Furniture', icon: 'Sofa', sub: [
    { slug: 'hallways',          name_ka: 'შესასვლელები',        name_ru: 'Прихожие',              name_en: 'Hallways' },
    { slug: 'living-rooms',      name_ka: 'სასტუმრო ოთახები',     name_ru: 'Гостиные',              name_en: 'Living Rooms' },
    { slug: 'dining-rooms',      name_ka: 'სასადილოები',        name_ru: 'Столовые',              name_en: 'Dining Rooms' },
    { slug: 'bedrooms',          name_ka: 'საძინებლები',        name_ru: 'Спальни',               name_en: 'Bedrooms' },
    { slug: 'cabinets',          name_ka: 'კაბინეტები',         name_ru: 'Кабинеты',              name_en: 'Cabinets' },
  ]},

  { slug: 'wardrobes', name_ka: 'საგარდერობოები, კარადები', name_ru: 'Гардеробные, шкафы', name_en: 'Wardrobes & Cabinets', icon: 'Archive', sub: [
    { slug: 'wardrobes-walkin',  name_ka: 'საგარდერობო',        name_ru: 'Гардеробные',           name_en: 'Walk-in Closets', is_new: true },
    { slug: 'cabinets-storage',  name_ka: 'კარადები',           name_ru: 'Шкафы',                 name_en: 'Cabinets',         is_new: true },
  ]},

  { slug: 'vitrines-commodes', name_ka: 'ვიტრინები, კომოდები', name_ru: 'Витрины, комоды', name_en: 'Vitrines & Commodes', icon: 'SquareStack', sub: [
    { slug: 'commodes',          name_ka: 'კომოდები',          name_ru: 'Комоды',                name_en: 'Commodes',                  is_new: true },
    { slug: 'commodes-alu-glass',name_ka: 'კომოდები — ალუმინი, მინა', name_ru: 'Комоды — алюминий, стекло', name_en: 'Commodes — Aluminum, Glass', is_new: true },
    { slug: 'commode-island',    name_ka: 'კომოდი-კუნძული',     name_ru: 'Комод-остров',          name_en: 'Commode Island',            is_new: true },
    { slug: 'vitrines-wall',     name_ka: 'ვიტრინები საკიდი',   name_ru: 'Витрины подвесные',     name_en: 'Wall-mounted Vitrines',     is_new: true },
    { slug: 'vitrines-floor',    name_ka: 'ვიტრინები იატაკის',   name_ru: 'Витрины напольные',     name_en: 'Floor Vitrines',            is_new: true },
    { slug: 'vitrines-shelving', name_ka: 'სტელაჟი-ვიტრინა',    name_ru: 'Стеллажи-витрины',      name_en: 'Shelving Vitrines',         is_new: true },
  ]},
];

const COLUMN_3 = [
  { slug: 'libraries', name_ka: 'ბიბლიოთეკები, თაროები', name_ru: 'Библиотеки, стеллажи', name_en: 'Libraries & Shelving', icon: 'BookOpen', sub: [] },
  { slug: 'shelves', name_ka: 'თაროები', name_ru: 'Полки', name_en: 'Shelves', icon: 'Layers', is_new: true, sub: [] },

  { slug: 'tables', name_ka: 'მაგიდები', name_ru: 'Столы', name_en: 'Tables', icon: 'Table2', sub: [
    { slug: 'dining-tables',     name_ka: 'სასადილო, სამზარეულო', name_ru: 'Обеденные, кухонные', name_en: 'Dining & Kitchen', is_new: true },
    { slug: 'coffee-tables',     name_ka: 'საუპენი',             name_ru: 'Журнальные',           name_en: 'Coffee Tables' },
  ]},

  { slug: 'sofas', name_ka: 'დივანები', name_ru: 'Диваны', name_en: 'Sofas', icon: 'Armchair', sub: [] },
  { slug: 'mirrors', name_ka: 'სარკეები', name_ru: 'Зеркала', name_en: 'Mirrors', icon: 'SquareStack', sub: [] },
  { slug: 'entrance-doors', name_ka: 'შესასვლელი კარები', name_ru: 'Входные двери', name_en: 'Entrance Doors', icon: 'Home', sub: [] },

  { slug: 'baseboards', name_ka: 'პლინტუსები', name_ru: 'Плинтусы', name_en: 'Baseboards', icon: 'Minus', sub: [
    { slug: 'baseboard-shadow',     name_ka: 'ჩრდილოვანი',     name_ru: 'Теневой',      name_en: 'Shadow',      is_new: true },
    { slug: 'baseboard-hidden',     name_ka: 'ფარული',         name_ru: 'Скрытый',      name_en: 'Hidden' },
    { slug: 'baseboard-traditional',name_ka: 'ტრადიციული',    name_ru: 'Традиционный', name_en: 'Traditional' },
  ]},

  { slug: 'hardware', name_ka: 'ფურნიტურა', name_ru: 'Ручки, Фурнитура', name_en: 'Handles & Hardware', icon: 'KeyRound', sub: [
    { slug: 'door-handles',      name_ka: 'კარის სახელურები',   name_ru: 'Ручки для дверей',      name_en: 'Door Handles' },
    { slug: 'stoppers',          name_ka: 'შემჩერებლები',     name_ru: 'Ограничители',          name_en: 'Stoppers' },
    { slug: 'pocket-cassettes',  name_ka: 'ფენელები',           name_ru: 'Пеналы',                name_en: 'Pencil Cases' },
    { slug: 'hangers',           name_ka: 'სამკაულები',         name_ru: 'Плечики',               name_en: 'Hangers' },
  ]},

  { slug: 'materials-finishes', name_ka: 'მასალები და მორთულობა', name_ru: 'Материалы и отделки', name_en: 'Materials & Finishes', icon: 'Palette', sub: [], href: '/union/finishes' },
];

// Sidebar shortcut links — left rail of the mega menu.
// Placeholders for filters we haven't wired yet (in-stock / from-italy / contract).
const SIDEBAR = [
  { slug: 'in-stock',     name_ka: 'მარაგშია',                 name_ru: 'В наличии',                 name_en: 'In stock',              href: '/union/catalog?stock=true' },
  { slug: 'from-italy',   name_ka: 'იტალიიდან შეკვეთით',      name_ru: 'На заказ из Италии',        name_en: 'Custom from Italy',     href: '/union/catalog?made_in=italy' },
  { slug: 'promotions',   name_ka: 'აქციები',                  name_ru: 'Акции',                     name_en: 'Promotions',            href: '/union/sale' },
  { slug: 'sale',         name_ka: 'SALE',                      name_ru: 'SALE',                      name_en: 'SALE',                  href: '/union/sale', is_sale: true },
  { slug: 'contract',     name_ka: 'დეველოპერებისთვის. კონტრაქტი', name_ru: 'Для застройщиков. Контракт', name_en: 'For developers. Contract', href: '/union/contract' },
];

// ─────────────────────────────────────────────────────────────────────────────

const url = process.env.PGURL;
if (!url) { console.error('Set PGURL'); process.exit(1); }

const c = new pg.Client({ connectionString: url });
await c.connect();

await c.query('BEGIN');
try {
  // 1. Wipe everything — both mega_menu and sidebar.
  const wiped = await c.query('DELETE FROM menu_items RETURNING id');
  console.log(`Wiped ${wiped.rowCount} menu_items rows`);

  const COLS = [COLUMN_1, COLUMN_2, COLUMN_3];

  // 2. Insert mega_menu groups + their children
  for (let colIdx = 0; colIdx < COLS.length; colIdx++) {
    const colNum = colIdx + 1;
    const groups = COLS[colIdx];
    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      const href = g.href || `/union/catalog/${g.slug}`;
      const groupRes = await c.query(
        `INSERT INTO menu_items (section, column_number, name_ka, name_ru, name_en, href, icon, is_new, sort_order, is_active)
         VALUES ('mega_menu', $1, $2, $3, $4, $5, $6, $7, $8, true) RETURNING id`,
        [colNum, g.name_ka, g.name_ru || null, g.name_en || null, href, g.icon || null, !!g.is_new, i]
      );
      const groupId = groupRes.rows[0].id;
      console.log(`  col ${colNum}  ${g.slug.padEnd(28)} ${g.is_new ? '[NEW]' : ''}`);

      for (let j = 0; j < (g.sub || []).length; j++) {
        const s = g.sub[j];
        const subHref = s.href || `/union/catalog/${g.slug}/${s.slug}`;
        await c.query(
          `INSERT INTO menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order, is_active)
           VALUES ($1, 'mega_menu', $2, $3, $4, $5, $6, $7, true)`,
          [groupId, s.name_ka, s.name_ru || null, s.name_en || null, subHref, !!s.is_new, j]
        );
      }
    }
  }

  // 3. Insert sidebar shortcuts
  for (let i = 0; i < SIDEBAR.length; i++) {
    const s = SIDEBAR[i];
    await c.query(
      `INSERT INTO menu_items (section, name_ka, name_ru, name_en, href, is_sale, sort_order, is_active)
       VALUES ('sidebar', $1, $2, $3, $4, $5, $6, true)`,
      [s.name_ka, s.name_ru || null, s.name_en || null, s.href, !!s.is_sale, i]
    );
    console.log(`  sidebar  ${s.slug.padEnd(28)} ${s.is_sale ? '[SALE]' : ''}`);
  }

  await c.query('COMMIT');
  console.log('\n✓ Menu rebuilt successfully');
  console.log(`  ${COLS.flat().length} groups + ${COLS.flat().reduce((n, g) => n + (g.sub?.length || 0), 0)} children + ${SIDEBAR.length} sidebar links`);
} catch (e) {
  await c.query('ROLLBACK');
  console.error('Rollback —', e.message);
  process.exit(1);
} finally {
  await c.end();
}
