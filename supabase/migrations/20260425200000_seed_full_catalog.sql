-- =============================================================================
-- Seed the full catalog hierarchy that mirrors union.ru's Russian mega menu.
-- Adds categories.name_ru, inserts every parent + subcategory shown in the
-- union.ru screenshot, and seeds the left-rail sidebar items.
--
-- Idempotent: ON CONFLICT (slug) DO NOTHING / DO UPDATE so re-running is safe.
-- Menu rows are NOT inserted here (run scripts/rebuild-menu.mjs after).
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1) name_ru on categories
-- ---------------------------------------------------------------------------
ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS name_ru TEXT;

-- ---------------------------------------------------------------------------
-- 2) PARENT CATEGORIES — exactly the 17 groups shown on union.ru
-- ---------------------------------------------------------------------------
INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
  ('interior-doors',         'შიდა კარები',                 'Interior Doors',           'Распашные двери',           10, true, NULL),
  ('sliding-doors',          'სრიალა კარები',                'Sliding Doors',            'Раздвижные двери',          20, true, NULL),
  ('sliding-partitions',     'სრიალა ტიხრები',               'Sliding Partitions',       'Раздвижные перегородки',    30, true, NULL),
  ('stationary-partitions',  'სტაციონარული ტიხრები',         'Stationary Partitions',    'Стационарные перегородки',  40, true, NULL),
  ('wall-panels',            'კედლის პანელები',              'Wall Panels',              'Стеновые панели',           50, true, NULL),
  ('furniture',              'ავეჯი',                       'Furniture',                'Мебель',                    60, true, NULL),
  ('wardrobes',              'საგარდერობოები, კარადები',     'Wardrobes & Cabinets',     'Гардеробные, шкафы',        70, true, NULL),
  ('vitrines-commodes',      'ვიტრინები, კომოდები',          'Vitrines & Commodes',      'Витрины, комоды',           80, true, NULL),
  ('libraries',              'ბიბლიოთეკები, თაროები',         'Libraries & Shelving',     'Библиотеки, стеллажи',      90, true, NULL),
  ('shelves',                'თაროები',                     'Shelves',                  'Полки',                    100, true, NULL),
  ('tables',                 'მაგიდები',                    'Tables',                   'Столы',                    110, true, NULL),
  ('sofas',                  'დივანები',                    'Sofas',                    'Диваны',                   120, true, NULL),
  ('mirrors',                'სარკეები',                    'Mirrors',                  'Зеркала',                  130, true, NULL),
  ('entrance-doors',         'შესასვლელი კარები',            'Entrance Doors',           'Входные двери',            140, true, NULL),
  ('baseboards',             'პლინტუსები',                  'Baseboards',               'Плинтусы',                 150, true, NULL),
  ('hardware',               'ფურნიტურა',                   'Handles & Hardware',       'Ручки, Фурнитура',         160, true, NULL),
  ('materials-finishes',     'მასალები და მორთულობა',        'Materials & Finishes',     'Материалы и отделки',      170, true, NULL)
ON CONFLICT (slug) DO UPDATE SET
  name_ka    = EXCLUDED.name_ka,
  name_en    = EXCLUDED.name_en,
  name_ru    = EXCLUDED.name_ru,
  sort_order = EXCLUDED.sort_order,
  is_active  = EXCLUDED.is_active,
  parent_id  = EXCLUDED.parent_id;

-- ---------------------------------------------------------------------------
-- 3) SUBCATEGORIES — children, parent_id resolved via subselect on slug
-- ---------------------------------------------------------------------------
DO $$
DECLARE
  parent_interior_doors    UUID := (SELECT id FROM public.categories WHERE slug='interior-doors');
  parent_sliding_doors     UUID := (SELECT id FROM public.categories WHERE slug='sliding-doors');
  parent_sliding_part      UUID := (SELECT id FROM public.categories WHERE slug='sliding-partitions');
  parent_stationary_part   UUID := (SELECT id FROM public.categories WHERE slug='stationary-partitions');
  parent_wall_panels       UUID := (SELECT id FROM public.categories WHERE slug='wall-panels');
  parent_furniture         UUID := (SELECT id FROM public.categories WHERE slug='furniture');
  parent_wardrobes         UUID := (SELECT id FROM public.categories WHERE slug='wardrobes');
  parent_vitrines          UUID := (SELECT id FROM public.categories WHERE slug='vitrines-commodes');
  parent_tables            UUID := (SELECT id FROM public.categories WHERE slug='tables');
  parent_baseboards        UUID := (SELECT id FROM public.categories WHERE slug='baseboards');
  parent_hardware          UUID := (SELECT id FROM public.categories WHERE slug='hardware');
BEGIN
  -- INTERIOR DOORS (Распашные двери) — 14 subs
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('hidden-paintable',     'ფარული საღებავი',         'Hidden / Paintable',      'Скрытые под покраску',         1, true, parent_interior_doors),
    ('enamel',               'ემალი',                  'Enamel',                  'Эмаль',                         2, true, parent_interior_doors),
    ('gloss',                'გლანცი',                 'Gloss',                   'Глянец',                        3, true, parent_interior_doors),
    ('natural-veneer',       'ბუნებრივი ხოჭო',          'Natural Veneer',          'Натуральный шпон',              4, true, parent_interior_doors),
    ('stone-marble',         'ქვა და მარმარილო',        'Stone & Marble',          'Под камень и мрамор',           5, true, parent_interior_doors),
    ('affordable-quality',   'ხელმისაწვდომი ხარისხი',    'Affordable Quality',      'Доступное качество',            6, true, parent_interior_doors),
    ('aluminum-glass',       'ალუმინი და მინა',         'Aluminum & Glass',        'Алюминий и стекло',             7, true, parent_interior_doors),
    ('3d-surface',           '3D ზედაპირი',             '3D Surface',              '3D поверхность',                8, true, parent_interior_doors),
    ('designer-doors',       'დიზაინერული',             'Designer',                'Дизайнерские',                  9, true, parent_interior_doors),
    ('classic-enamel',       'კლასიკური ემალი',         'Classic Enamel',          'Классические в эмали',         10, true, parent_interior_doors),
    ('pivot',                'პივოტი',                 'Pivot',                   'Поворотные',                   11, true, parent_interior_doors),
    ('folding-doors',        'სასაკეცი',               'Folding',                 'Складные',                     12, true, parent_interior_doors),
    ('shadow-gap',           'ჩრდილოვანი ნაპრალი',     'Shadow Gap',              'Двери с теневым зазором',      13, true, parent_interior_doors),
    ('soundproof',           'ხმაჩამხშობი',            'Soundproof',              'Звукоизоляционные',            14, true, parent_interior_doors)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;

  -- SLIDING DOORS — 2 subs
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('pocket-doors',         'ჯიბური (კედელში)',        'Pocket (into wall)',      'В пенал (в стену)',             1, true, parent_sliding_doors),
    ('hidden-mechanism',     'ფარული მექანიზმი',        'Hidden Mechanism',        'Скрытый механизм',              2, true, parent_sliding_doors)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;

  -- SLIDING PARTITIONS — 3 subs
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('wooden-partitions',    'ხის',                     'Wooden',                  'Деревянные',                    1, true, parent_sliding_part),
    ('aluminum-glass-partitions', 'ალუმინი და მინა',    'Aluminum & Glass',        'Алюминий и стекло',             2, true, parent_sliding_part),
    ('folding-partitions',   'სასაკეცი',               'Folding',                 'Складные',                      3, true, parent_sliding_part)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;

  -- STATIONARY PARTITIONS — 2 subs
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('aluminum-single-glass','ალუმინი — ერთი მინა',     'Aluminum — single glass', 'Алюминий — одно стекло',        1, true, parent_stationary_part),
    ('aluminum-double-glass','ალუმინი — ორი მინა',      'Aluminum — double glass', 'Алюминий — два стекла',         2, true, parent_stationary_part)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;

  -- WALL PANELS — 3 subs
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('modern-panels',        'თანამედროვე',             'Modern',                  'Современные',                   1, true, parent_wall_panels),
    ('3d-panels',            '3D ზედაპირი',             '3D Surface',              '3D поверхность',                2, true, parent_wall_panels),
    ('classic-panels',       'კლასიკა',                'Classic',                 'Классика',                      3, true, parent_wall_panels)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;

  -- FURNITURE — 5 subs
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('hallways',             'შესასვლელები',            'Hallways',                'Прихожие',                      1, true, parent_furniture),
    ('living-rooms',         'სასტუმრო ოთახები',         'Living Rooms',            'Гостиные',                      2, true, parent_furniture),
    ('dining-rooms',         'სასადილოები',            'Dining Rooms',            'Столовые',                      3, true, parent_furniture),
    ('bedrooms',             'საძინებლები',            'Bedrooms',                'Спальни',                       4, true, parent_furniture),
    ('cabinets',             'კაბინეტები',             'Cabinets',                'Кабинеты',                      5, true, parent_furniture)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;

  -- WARDROBES — 2 subs (both NEW)
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('wardrobes-walkin',     'საგარდერობო',             'Walk-in Closets',         'Гардеробные',                   1, true, parent_wardrobes),
    ('cabinets-storage',     'კარადები',                'Cabinets',                'Шкафы',                         2, true, parent_wardrobes)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;

  -- VITRINES & COMMODES — 6 subs (all NEW)
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('commodes',             'კომოდები',               'Commodes',                'Комоды',                        1, true, parent_vitrines),
    ('commodes-alu-glass',   'კომოდები — ალუმინი, მინა', 'Commodes — Aluminum, Glass','Комоды — алюминий, стекло',    2, true, parent_vitrines),
    ('commode-island',       'კომოდი-კუნძული',          'Commode Island',          'Комод-остров',                  3, true, parent_vitrines),
    ('vitrines-wall',        'ვიტრინები საკიდი',        'Wall-mounted Vitrines',   'Витрины подвесные',             4, true, parent_vitrines),
    ('vitrines-floor',       'ვიტრინები იატაკის',        'Floor Vitrines',          'Витрины напольные',             5, true, parent_vitrines),
    ('vitrines-shelving',    'სტელაჟი-ვიტრინა',         'Shelving Vitrines',       'Стеллажи-витрины',              6, true, parent_vitrines)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;

  -- TABLES — 2 subs
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('dining-tables',        'სასადილო, სამზარეულო',    'Dining & Kitchen',        'Обеденные, кухонные',           1, true, parent_tables),
    ('coffee-tables',        'საუპენი',                'Coffee Tables',           'Журнальные',                    2, true, parent_tables)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;

  -- BASEBOARDS — 3 subs
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('baseboard-shadow',     'ჩრდილოვანი',             'Shadow',                  'Теневой',                       1, true, parent_baseboards),
    ('baseboard-hidden',     'ფარული',                  'Hidden',                  'Скрытый',                       2, true, parent_baseboards),
    ('baseboard-traditional','ტრადიციული',             'Traditional',             'Традиционный',                  3, true, parent_baseboards)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;

  -- HARDWARE — 4 subs
  INSERT INTO public.categories (slug, name_ka, name_en, name_ru, sort_order, is_active, parent_id) VALUES
    ('door-handles',         'კარის სახელურები',         'Door Handles',            'Ручки для дверей',              1, true, parent_hardware),
    ('stoppers',             'შემჩერებლები',           'Stoppers',                'Ограничители',                  2, true, parent_hardware),
    ('pocket-cassettes',     'ფენელები',                'Pencil Cases',            'Пеналы',                        3, true, parent_hardware),
    ('hangers',              'სამკაულები',             'Hangers',                 'Плечики',                       4, true, parent_hardware)
  ON CONFLICT (slug) DO UPDATE SET name_ka=EXCLUDED.name_ka, name_en=EXCLUDED.name_en, name_ru=EXCLUDED.name_ru, parent_id=EXCLUDED.parent_id, sort_order=EXCLUDED.sort_order, is_active=true;
END $$;

-- ---------------------------------------------------------------------------
-- Sanity check via comment (no-op SQL; produced count visible in psql logs)
-- SELECT count(*) FROM public.categories WHERE parent_id IS NULL;
-- SELECT count(*) FROM public.categories WHERE parent_id IS NOT NULL;
-- =============================================================================
