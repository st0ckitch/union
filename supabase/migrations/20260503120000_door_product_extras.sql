-- ============================================================================
-- Door product extras: structured spec sections + downloadable resource links
-- Mirrors union.ru product page (see screenshots): three columns of bullet specs
-- (Полотно / Короб / Hardware) and download buttons (Tech / DWG / Catalog).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- spec_sections: array of titled bullet groups, each bullet is multilingual.
--   [
--     { code, title_ka, title_ru, title_en, bullets: [{ ka, ru, en }, ...] },
--     ...
--   ]
-- ----------------------------------------------------------------------------
ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS spec_sections JSONB DEFAULT '[]'::jsonb;

-- ----------------------------------------------------------------------------
-- download_links: array of labelled URLs (tech sheet, DWG, catalog, etc.)
--   [{ label_ka, label_ru, label_en, url, icon }]
-- ----------------------------------------------------------------------------
ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS download_links JSONB DEFAULT '[]'::jsonb;

-- ----------------------------------------------------------------------------
-- Russian copy for products (the storefront is multilingual; until now product
-- name/description had only ka + en — we want a real ru column too).
-- ----------------------------------------------------------------------------
ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS name_ru TEXT;
ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS description_ru TEXT;

-- ----------------------------------------------------------------------------
-- Enable variant flags on every product that lives under a "doors-ish" category
-- (top-level "doors" + the catch-all "interior-doors" + every direct child of
-- "doors"). Existing products get the configurator turned on so the new UI is
-- visible immediately; admins can flip individual products off later.
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    door_category_ids UUID[];
BEGIN
    SELECT array_agg(id) INTO door_category_ids
    FROM public.categories
    WHERE slug IN ('doors', 'interior-doors')
       OR parent_id IN (SELECT id FROM public.categories WHERE slug = 'doors');

    IF door_category_ids IS NOT NULL THEN
        UPDATE public.products
        SET has_otdelka_variants = true,
            has_korobka_variants = true
        WHERE category_id = ANY(door_category_ids);
    END IF;
END $$;

-- ----------------------------------------------------------------------------
-- Sample spec_sections + download_links for the FILO-60 reference product so
-- the new UI has content to render out of the box. Targets any product whose
-- slug matches /filo-?60/ OR — failing that — the first 5 products in any
-- door category, so a fresh seed always shows something.
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    sample_specs JSONB := '[
        {
            "code": "polotno",
            "title_ka": "Polotno FILO-60",
            "title_ru": "Полотно FILO-60",
            "title_en": "FILO-60 leaf",
            "bullets": [
                { "ka": "სისქე 6 სმ. კარკასი – ორმაგი ძელი.", "ru": "Толщина 6 см. Каркас – двойной брус.", "en": "Thickness 6 cm. Frame — double beam." },
                { "ka": "დასრულება – გრუნტი / ემალი / გლანცი / შპონი / HPL / სარკე.", "ru": "Отделка – грунт / эмаль / глянец / шпон / HPL / зеркало.", "en": "Finish — primer / enamel / gloss / veneer / HPL / mirror." },
                { "ka": "ანჯამები – ფარული INVISTA ან OTLAV (Italy).", "ru": "Петли - скрытые INVISTA или OTLAV made in Italy.", "en": "Hinges — concealed INVISTA or OTLAV, made in Italy." },
                { "ka": "საკეტი - მაგნიტური AGB (Italy).", "ru": "Замок - магнитный AGB, made in Italy.", "en": "Lock — magnetic AGB, made in Italy." },
                { "ka": "მაქს. ზომა – 100 x 350 სმ.", "ru": "Максимальные размеры – 100 х 350 см.", "en": "Max dimensions — 100 x 350 cm." },
                { "ka": "ოპციები – ალუმინის კიდე.", "ru": "Опции – алюминиевая кромка.", "en": "Options — aluminum edge." }
            ]
        },
        {
            "code": "korobka",
            "title_ka": "ფარული ჩარჩო INVISIBLE",
            "title_ru": "Скрытый короб INVISIBLE",
            "title_en": "Hidden frame INVISIBLE",
            "bullets": [
                { "ka": "გამაგრებული, გაცხელებული ალუმინი.", "ru": "Усиленный, закаленный алюминий.", "en": "Reinforced, tempered aluminum." },
                { "ka": "ცრუ-ჩარჩო — დამატებითი სიხისტე.", "ru": "Фальшкороб – дополнительная жесткость.", "en": "False frame — additional rigidity." },
                { "ka": "სუპორტები 10 ც. (Italy), მონტაჟის სიმარტივე.", "ru": "Суппорты 10 шт. (made in Italy), удобство монтажа.", "en": "10 supports (made in Italy), easy installation." },
                { "ka": "შპაკლზე ბადე ბზარების საწინააღმდეგოდ.", "ru": "Армирующая сетка от растрескивания штукатурки.", "en": "Reinforcing mesh against plaster cracking." },
                { "ka": "კედელთან კომპლანარულობა გახსნისას „ღიობიდან'' და „ღიობში''.", "ru": "Компланарность со стеной при открывании «из проёма» и «в проём».", "en": "Coplanar with wall when opening either way." }
            ]
        },
        {
            "code": "hardware",
            "title_ka": "მახასიათებლები",
            "title_ru": "Характеристики",
            "title_en": "Hardware",
            "bullets": [
                { "ka": "„მაიაკები'' თაბაშირ-მუყაოს მონტაჟისთვის.", "ru": "«Маяки» для монтажа гипсокартона.", "en": "Beacons for drywall installation." },
                { "ka": "გახსნა 180°.", "ru": "Открывание 180°.", "en": "180° opening." },
                { "ka": "შემამჭიდროვებელი DEVENTER (Germany).", "ru": "Уплотнитель DEVENTER (made in Germany).", "en": "DEVENTER seal (made in Germany)." },
                { "ka": "დასრულება – ალუმინი დაუფარავი.", "ru": "Отделка – алюминий без покрытия.", "en": "Finish — bare aluminum." },
                { "ka": "ოპციები: ანოდირება ვერცხლისფერი/შავი მატი, ფხვნილოვანი საღებავი.", "ru": "Опции: анодировка Серебристый алюминий / Черный матовый, покраска порошковой краской.", "en": "Options: silver/black matte anodizing, powder coating." }
            ]
        }
    ]'::jsonb;
    sample_links JSONB := '[
        { "label_ka": "სრული ტექნიკური აღწერა", "label_ru": "Полное техническое описание", "label_en": "Full technical description", "url": "#", "icon": "info" },
        { "label_ka": "DWG ტექნიკური ინფორმაცია", "label_ru": "Скачать техническую информацию в DWG", "label_en": "Download DWG technical info", "url": "#", "icon": "download" },
        { "label_ka": "კატალოგი", "label_ru": "Скачать каталог", "label_en": "Download catalog", "url": "#", "icon": "download" }
    ]'::jsonb;
    door_category_ids UUID[];
    target_ids UUID[];
BEGIN
    -- 1. Try slug match first (FILO-60 reference)
    SELECT array_agg(id) INTO target_ids
    FROM public.products
    WHERE slug ILIKE '%filo-60%' OR slug ILIKE '%filo60%';

    -- 2. Fallback: first 5 active products in any door category
    IF target_ids IS NULL OR array_length(target_ids, 1) IS NULL THEN
        SELECT array_agg(id) INTO door_category_ids
        FROM public.categories
        WHERE slug IN ('doors', 'interior-doors')
           OR parent_id IN (SELECT id FROM public.categories WHERE slug = 'doors');

        IF door_category_ids IS NOT NULL THEN
            SELECT array_agg(id) INTO target_ids
            FROM (
                SELECT id FROM public.products
                WHERE category_id = ANY(door_category_ids) AND is_active = true
                ORDER BY created_at
                LIMIT 5
            ) sub;
        END IF;
    END IF;

    IF target_ids IS NOT NULL THEN
        UPDATE public.products
        SET spec_sections  = sample_specs,
            download_links = sample_links
        WHERE id = ANY(target_ids)
          AND (spec_sections = '[]'::jsonb OR spec_sections IS NULL);
    END IF;
END $$;
