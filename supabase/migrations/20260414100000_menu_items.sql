-- Menu items table for dynamic mega menu management
CREATE TABLE public.menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
    section TEXT NOT NULL DEFAULT 'mega_menu',  -- 'mega_menu' or 'sidebar'
    column_number INT,                          -- 1, 2, 3 for mega menu top-level groups
    name_ka TEXT NOT NULL,
    name_ru TEXT NOT NULL DEFAULT '',
    name_en TEXT NOT NULL DEFAULT '',
    href TEXT NOT NULL DEFAULT '#',
    icon TEXT,                                  -- lucide icon name e.g. 'DoorOpen'
    is_new BOOLEAN DEFAULT false,
    is_sale BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active menu items" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage menu items" ON public.menu_items FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Allow public inserts/updates/deletes while PUBLIC_ADMIN mode is on
CREATE POLICY "Public menu write" ON public.menu_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public menu update" ON public.menu_items FOR UPDATE USING (true);
CREATE POLICY "Public menu delete" ON public.menu_items FOR DELETE USING (true);

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================
-- Seed the current hardcoded mega-menu into the table
-- ============================================================

-- === COLUMN 1 ===

-- Swing Doors (group)
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000001', 'mega_menu', 1, 'გაშლადი კარები', 'Распашные двери', 'Swing Doors', '/union/catalog/swing-doors', 'DoorOpen', 10);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'შეფერვის ფარული', 'Скрытые под покраску', 'Hidden under painting', '/union/catalog/swing-doors?type=hidden-paint', 1),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ემალი', 'Эмаль', 'Enamel', '/union/catalog/swing-doors?type=enamel', 2),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'გლანცი', 'Глянец', 'Gloss', '/union/catalog/swing-doors?type=gloss', 3),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ნატურალური შპონი', 'Натуральный шпон', 'Natural veneer', '/union/catalog/swing-doors?type=veneer', 4),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ქვა და მარმარილო', 'Под камень и мрамор', 'Stone & marble', '/union/catalog/swing-doors?type=stone', 5),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ხელმისაწვდომი ხარისხი', 'Доступное качество', 'Affordable quality', '/union/catalog/swing-doors?type=affordable', 6),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ალუმინი და მინა', 'Алюминий и стекло', 'Aluminum & glass', '/union/catalog/swing-doors?type=aluminum', 7),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', '3D ზედაპირი', '3D поверхность', '3D surface', '/union/catalog/swing-doors?type=3d', 8),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'დიზაინერული', 'Дизайнерские', 'Designer', '/union/catalog/swing-doors?type=designer', 9),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'კლასიკური ემალი', 'Классические в эмали', 'Classic enamel', '/union/catalog/swing-doors?type=classic-enamel', 10),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'საპოვარელი', 'Поворотные', 'Pivot', '/union/catalog/swing-doors?type=pivot', 11);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'დასაკეცი', 'Складные', 'Folding', '/union/catalog/swing-doors?type=folding', true, 12),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ჩრდილოვანი ნაპრალით', 'С теневым зазором', 'Shadow-gap', '/union/catalog/swing-doors?type=shadow-gap', true, 13),
('a0000001-0000-0000-0000-000000000001', 'mega_menu', 'ხმაიზოლაციური', 'Звукоизоляционные', 'Soundproof', '/union/catalog/swing-doors?type=soundproof', true, 14);

-- Sliding Doors (group)
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000002', 'mega_menu', 1, 'სრიალა კარები', 'Раздвижные двери', 'Sliding Doors', '/union/catalog/sliding-doors', 'DoorClosed', 20);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000002', 'mega_menu', 'კედელში (პენალი)', 'В пенал (в стену)', 'Pocket (into wall)', '/union/catalog/sliding-doors?type=pocket', 1),
('a0000001-0000-0000-0000-000000000002', 'mega_menu', 'ფარული მექანიზმი', 'Скрытый механизм', 'Hidden mechanism', '/union/catalog/sliding-doors?type=hidden', 2);

-- Sliding Partitions (group)
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000003', 'mega_menu', 1, 'სრიალა ტიხრები', 'Раздвижные перегородки', 'Sliding Partitions', '/union/catalog/sliding-partitions', 'PanelTop', 30);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000003', 'mega_menu', 'ხის', 'Деревянные', 'Wooden', '/union/catalog/sliding-partitions?type=wood', 1);

-- === COLUMN 2 ===

-- Stationary Partitions
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000004', 'mega_menu', 2, 'სტაციონარული ტიხრები', 'Стационарные перегородки', 'Stationary Partitions', '/union/catalog/stationary-partitions', 'LayoutPanelTop', 10);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-000000000004', 'mega_menu', 'ალუმინი — ერთი მინა', 'Алюминий — одно стекло', 'Aluminum — single glass', '/union/catalog/stationary-partitions?type=alu-1', true, 1),
('a0000001-0000-0000-0000-000000000004', 'mega_menu', 'ალუმინი — ორი მინა', 'Алюминий — два стекла', 'Aluminum — double glass', '/union/catalog/stationary-partitions?type=alu-2', true, 2);

-- Wall Panels
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000005', 'mega_menu', 2, 'კედლის პანელები', 'Стеновые панели', 'Wall Panels', '/union/catalog/wall-panels', 'SquareStack', 20);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000005', 'mega_menu', 'თანამედროვე', 'Современные', 'Modern', '/union/catalog/wall-panels?type=modern', 1),
('a0000001-0000-0000-0000-000000000005', 'mega_menu', '3D ზედაპირი', '3D поверхность', '3D surface', '/union/catalog/wall-panels?type=3d', 2),
('a0000001-0000-0000-0000-000000000005', 'mega_menu', 'კლასიკა', 'Классика', 'Classic', '/union/catalog/wall-panels?type=classic', 3);

-- Furniture
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000006', 'mega_menu', 2, 'ავეჯი', 'Мебель', 'Furniture', '/union/catalog/furniture', 'Sofa', 30);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000006', 'mega_menu', 'შესასვლელი', 'Прихожие', 'Hallways', '/union/catalog/furniture?type=hallway', 1),
('a0000001-0000-0000-0000-000000000006', 'mega_menu', 'სასტუმრო', 'Гостиные', 'Living rooms', '/union/catalog/furniture?type=living', 2),
('a0000001-0000-0000-0000-000000000006', 'mega_menu', 'სასადილო', 'Столовые', 'Dining rooms', '/union/catalog/furniture?type=dining', 3),
('a0000001-0000-0000-0000-000000000006', 'mega_menu', 'საძინებელი', 'Спальни', 'Bedrooms', '/union/catalog/furniture?type=bedroom', 4),
('a0000001-0000-0000-0000-000000000006', 'mega_menu', 'კაბინეტი', 'Кабинеты', 'Studies', '/union/catalog/furniture?type=study', 5);

-- Wardrobes, Cabinets
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000007', 'mega_menu', 2, 'გარდერობი, შკაფი', 'Гардеробные, шкафы', 'Wardrobes, Cabinets', '/union/catalog/wardrobes', 'Shirt', 40);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-000000000007', 'mega_menu', 'გარდერობი', 'Гардеробные', 'Wardrobes', '/union/catalog/wardrobes?type=wardrobe', true, 1),
('a0000001-0000-0000-0000-000000000007', 'mega_menu', 'შკაფი', 'Шкафы', 'Cabinets', '/union/catalog/wardrobes?type=cabinet', true, 2);

-- Vitrines, Commodes
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000008', 'mega_menu', 2, 'ვიტრინები, კომოდები', 'Витрины, комоды', 'Vitrines, Commodes', '/union/catalog/vitrines', 'Archive', 50);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-000000000008', 'mega_menu', 'კომოდები', 'Комоды', 'Commodes', '/union/catalog/vitrines?type=commode', true, 1),
('a0000001-0000-0000-0000-000000000008', 'mega_menu', 'კომოდები — ალუმინი + მინა', 'Комоды — алюминий + стекло', 'Commodes — alu + glass', '/union/catalog/vitrines?type=commode-alu', true, 2);

-- === COLUMN 3 ===

-- Libraries, Shelving
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000009', 'mega_menu', 3, 'ბიბლიოთეკა, სტელაჟები', 'Библиотеки, стеллажи', 'Libraries, Shelving', '/union/catalog/libraries', 'BookOpen', 10);

-- Shelves
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, is_new, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000a', 'mega_menu', 3, 'თაროები', 'Полки', 'Shelves', '/union/catalog/shelves', 'Layers', true, 20);

-- Tables
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000b', 'mega_menu', 3, 'მაგიდები', 'Столы', 'Tables', '/union/catalog/tables', 'Table2', 30);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-00000000000b', 'mega_menu', 'სადილი, სამზარეულოს', 'Обеденные, кухонные', 'Dining, kitchen', '/union/catalog/tables?type=dining', true, 1),
('a0000001-0000-0000-0000-00000000000b', 'mega_menu', 'ჟურნალის', 'Журнальные', 'Coffee', '/union/catalog/tables?type=coffee', false, 2);

-- Sofas
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000c', 'mega_menu', 3, 'დივნები', 'Диваны', 'Sofas', '/union/catalog/sofas', 'Armchair', 40);

-- Mirrors
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000d', 'mega_menu', 3, 'სარკეები', 'Зеркала', 'Mirrors', '/union/catalog/mirrors', 'SquareStack', 50);

-- Entrance Doors
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000e', 'mega_menu', 3, 'შესასვლელი კარები', 'Входные двери', 'Entrance Doors', '/union/catalog/entrance-doors', 'Home', 60);

-- Baseboards
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-00000000000f', 'mega_menu', 3, 'პლინტუსი', 'Плинтусы', 'Baseboards', '/union/catalog/skirting', 'Minus', 70);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, is_new, sort_order) VALUES
('a0000001-0000-0000-0000-00000000000f', 'mega_menu', 'ჩრდილოვანი', 'Теневой', 'Shadow', '/union/catalog/skirting?type=shadow', true, 1),
('a0000001-0000-0000-0000-00000000000f', 'mega_menu', 'ფარული', 'Скрытый', 'Hidden', '/union/catalog/skirting?type=hidden', false, 2),
('a0000001-0000-0000-0000-00000000000f', 'mega_menu', 'ტრადიციული', 'Традиционный', 'Traditional', '/union/catalog/skirting?type=traditional', false, 3);

-- Handles, Hardware
INSERT INTO public.menu_items (id, section, column_number, name_ka, name_ru, name_en, href, icon, sort_order)
VALUES ('a0000001-0000-0000-0000-000000000010', 'mega_menu', 3, 'სახელურები, ფურნიტურა', 'Ручки, Фурнитура', 'Handles, Hardware', '/union/catalog/handles', 'KeyRound', 80);

INSERT INTO public.menu_items (parent_id, section, name_ka, name_ru, name_en, href, sort_order) VALUES
('a0000001-0000-0000-0000-000000000010', 'mega_menu', 'სახელურები კარებისთვის', 'Ручки для дверей', 'Door handles', '/union/catalog/handles?type=door', 1),
('a0000001-0000-0000-0000-000000000010', 'mega_menu', 'შემზღუდველები', 'Ограничители', 'Stoppers', '/union/catalog/handles?type=stopper', 2),
('a0000001-0000-0000-0000-000000000010', 'mega_menu', 'პენალები', 'Пеналы', 'Cassettes', '/union/catalog/handles?type=cassette', 3);

-- === SIDEBAR ===

INSERT INTO public.menu_items (section, name_ka, name_ru, name_en, href, icon, sort_order) VALUES
('sidebar', 'მარაგშია', 'В наличии', 'In Stock', '/union/catalog?filter=in-stock', 'Package', 10),
('sidebar', 'იტალიიდან შეკვეთით', 'На заказ из Италии', 'From Italy', '/union/catalog?filter=order', 'Plane', 20),
('sidebar', 'აქციები', 'Акции', 'Promotions', '/union/sale', 'Percent', 30);

INSERT INTO public.menu_items (section, name_ka, name_ru, name_en, href, is_sale, sort_order) VALUES
('sidebar', 'SALE', 'SALE', 'SALE', '/union/sale', true, 40);

INSERT INTO public.menu_items (section, name_ka, name_ru, name_en, href, icon, sort_order) VALUES
('sidebar', 'დეველოპერებს. კონტრაქტი', 'Для застройщиков. Контракт', 'For developers. Contract', '/union/partnership', 'Building2', 50);
