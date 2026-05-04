-- ============================================================================
-- Phase A: Universal product-page polish
-- Adds the cross-category product attributes (country, designer, stock state,
-- delivery timeline, video embed, lifestyle gallery, "от" pricing flag,
-- category_type discriminator) plus per-category banner support.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- products: universal new fields
-- ----------------------------------------------------------------------------
ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS country_of_origin TEXT,
    ADD COLUMN IF NOT EXISTS designer_credit TEXT,
    ADD COLUMN IF NOT EXISTS stock_status TEXT,
    ADD COLUMN IF NOT EXISTS delivery_days INTEGER,
    ADD COLUMN IF NOT EXISTS delivery_text_ka TEXT,
    ADD COLUMN IF NOT EXISTS delivery_text_ru TEXT,
    ADD COLUMN IF NOT EXISTS delivery_text_en TEXT,
    ADD COLUMN IF NOT EXISTS video_url TEXT,
    ADD COLUMN IF NOT EXISTS video_provider TEXT,
    ADD COLUMN IF NOT EXISTS lifestyle_gallery_image_urls TEXT[] DEFAULT '{}'::text[],
    ADD COLUMN IF NOT EXISTS price_from BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS category_type TEXT DEFAULT 'generic';

-- Constrain category_type to known values (extensible — future categories add to enum)
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_type_check;
ALTER TABLE public.products
    ADD CONSTRAINT products_category_type_check CHECK (
        category_type IN (
            'hinged_door', 'sliding_door', 'entrance_door',
            'furniture',  'hardware',     'wall_panel',
            'baseboard',  'partition',    'mirror',
            'generic'
        )
    );

-- Constrain stock_status (nullable — when null, fall back to stock_quantity)
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_stock_status_check;
ALTER TABLE public.products
    ADD CONSTRAINT products_stock_status_check CHECK (
        stock_status IS NULL OR stock_status IN ('in_stock', 'to_order')
    );

-- Constrain video_provider
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_video_provider_check;
ALTER TABLE public.products
    ADD CONSTRAINT products_video_provider_check CHECK (
        video_provider IS NULL OR video_provider IN ('youtube', 'yandex', 'mp4', 'vimeo')
    );

-- ----------------------------------------------------------------------------
-- categories: per-category banner
-- ----------------------------------------------------------------------------
ALTER TABLE public.categories
    ADD COLUMN IF NOT EXISTS banner_image_url TEXT,
    ADD COLUMN IF NOT EXISTS banner_link_url TEXT,
    ADD COLUMN IF NOT EXISTS banner_title_ka TEXT,
    ADD COLUMN IF NOT EXISTS banner_title_ru TEXT,
    ADD COLUMN IF NOT EXISTS banner_title_en TEXT,
    ADD COLUMN IF NOT EXISTS banner_subtitle_ka TEXT,
    ADD COLUMN IF NOT EXISTS banner_subtitle_ru TEXT,
    ADD COLUMN IF NOT EXISTS banner_subtitle_en TEXT;

-- ----------------------------------------------------------------------------
-- Backfill: every door product we previously enabled variants on gets:
--   - country_of_origin = 'Italy' (union.ru products are all Italian-made)
--   - stock_status      = 'to_order' (default for door products)
--   - delivery_days     = 30 (matches the union.ru "30 дней" badge)
--   - price_from        = true (configurator implies dynamic price)
--   - category_type     = 'hinged_door' for door categories (best-effort guess)
-- ----------------------------------------------------------------------------
DO $$
DECLARE
    interior_doors_id UUID;
    sliding_doors_id  UUID;
    entrance_doors_id UUID;
    interior_descendants UUID[];
    sliding_descendants  UUID[];
    entrance_descendants UUID[];
BEGIN
    SELECT id INTO interior_doors_id FROM public.categories WHERE slug = 'interior-doors' LIMIT 1;
    SELECT id INTO sliding_doors_id  FROM public.categories WHERE slug = 'sliding-doors'  LIMIT 1;
    SELECT id INTO entrance_doors_id FROM public.categories WHERE slug = 'entrance-doors' LIMIT 1;

    -- Walk descendant trees
    IF interior_doors_id IS NOT NULL THEN
        WITH RECURSIVE tree AS (
            SELECT id FROM public.categories WHERE id = interior_doors_id
            UNION ALL
            SELECT c.id FROM public.categories c JOIN tree t ON c.parent_id = t.id
        )
        SELECT array_agg(id) INTO interior_descendants FROM tree;
    END IF;
    IF sliding_doors_id IS NOT NULL THEN
        WITH RECURSIVE tree AS (
            SELECT id FROM public.categories WHERE id = sliding_doors_id
            UNION ALL
            SELECT c.id FROM public.categories c JOIN tree t ON c.parent_id = t.id
        )
        SELECT array_agg(id) INTO sliding_descendants FROM tree;
    END IF;
    IF entrance_doors_id IS NOT NULL THEN
        WITH RECURSIVE tree AS (
            SELECT id FROM public.categories WHERE id = entrance_doors_id
            UNION ALL
            SELECT c.id FROM public.categories c JOIN tree t ON c.parent_id = t.id
        )
        SELECT array_agg(id) INTO entrance_descendants FROM tree;
    END IF;

    -- Apply category_type
    IF interior_descendants IS NOT NULL THEN
        UPDATE public.products SET category_type = 'hinged_door'
        WHERE category_id = ANY(interior_descendants) AND category_type = 'generic';
    END IF;
    IF sliding_descendants IS NOT NULL THEN
        UPDATE public.products SET category_type = 'sliding_door'
        WHERE category_id = ANY(sliding_descendants) AND category_type = 'generic';
    END IF;
    IF entrance_descendants IS NOT NULL THEN
        UPDATE public.products SET category_type = 'entrance_door'
        WHERE category_id = ANY(entrance_descendants) AND category_type = 'generic';
    END IF;

    -- Universal door-product backfill (all 3 trees)
    UPDATE public.products
    SET country_of_origin = COALESCE(country_of_origin, 'Italy'),
        stock_status      = COALESCE(stock_status, 'to_order'),
        delivery_days     = COALESCE(delivery_days, 30),
        delivery_text_ru  = COALESCE(delivery_text_ru, 'За 30 дней'),
        delivery_text_ka  = COALESCE(delivery_text_ka, '30 დღეში'),
        delivery_text_en  = COALESCE(delivery_text_en, 'In 30 days'),
        price_from        = true
    WHERE has_otdelka_variants = true OR has_korobka_variants = true;

    -- Entrance doors: longer delivery (45 working days per union.ru)
    IF entrance_descendants IS NOT NULL THEN
        UPDATE public.products
        SET delivery_days    = 45,
            delivery_text_ru = 'За 45 рабочих дней',
            delivery_text_ka = '45 სამუშაო დღეში',
            delivery_text_en = 'In 45 working days'
        WHERE category_id = ANY(entrance_descendants);
    END IF;
END $$;

-- ----------------------------------------------------------------------------
-- Sample category banner: drape one over the "interior-doors" parent so the
-- new banner slot is immediately visible on /catalog/interior-doors.
-- ----------------------------------------------------------------------------
UPDATE public.categories
SET banner_image_url   = COALESCE(banner_image_url, 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1600&q=80'),
    banner_title_ru    = COALESCE(banner_title_ru, 'Распашные двери UNION'),
    banner_title_ka    = COALESCE(banner_title_ka, 'გაშლადი კარები UNION'),
    banner_title_en    = COALESCE(banner_title_en, 'UNION Hinged Doors'),
    banner_subtitle_ru = COALESCE(banner_subtitle_ru, 'Италия. От 30 дней. Скрытый монтаж.'),
    banner_subtitle_ka = COALESCE(banner_subtitle_ka, 'იტალია. 30 დღიდან. ფარული მონტაჟი.'),
    banner_subtitle_en = COALESCE(banner_subtitle_en, 'Italy. From 30 days. Hidden installation.')
WHERE slug = 'interior-doors';
