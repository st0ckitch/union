-- ============================================================================
-- Phase D: Furniture modules — sub-products selectable from a parent product.
-- Used for wardrobes / shelving / kitchen configurations where the customer
-- picks a subset of modules (M01, M03, M07...) each with its own configured
-- finish/glass/lighting and dimensions+price.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- furniture_modules — child entries belonging to a parent product
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.furniture_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    code TEXT,                                  -- 'M01', 'M02', ..., 'M15'
    name_ka TEXT NOT NULL,
    name_ru TEXT,
    name_en TEXT,
    description_ka TEXT,
    description_ru TEXT,
    description_en TEXT,
    dimensions_text TEXT,                       -- '750×580×2065mm'
    base_price NUMERIC NOT NULL DEFAULT 0,
    image_url TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_furniture_modules_parent ON public.furniture_modules(parent_product_id);

ALTER TABLE public.furniture_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active modules" ON public.furniture_modules FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all modules"   ON public.furniture_modules FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage modules"     ON public.furniture_modules FOR ALL    USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_furniture_modules_updated_at BEFORE UPDATE ON public.furniture_modules
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- door_lighting_options — small flat pool used by furniture (and partitions
-- with light strips). Same shape as the other dimension pools.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_lighting_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE,
    name_ka TEXT NOT NULL,
    name_ru TEXT,
    name_en TEXT,
    description_ka TEXT,
    description_ru TEXT,
    description_en TEXT,
    image_url TEXT,
    preview_image_url TEXT,
    price_modifier NUMERIC DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
ALTER TABLE public.door_lighting_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active lighting" ON public.door_lighting_options FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage lighting"      ON public.door_lighting_options FOR ALL    USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_lighting_options_updated_at BEFORE UPDATE ON public.door_lighting_options
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Per-module pivots — which finish/glass/lighting can be applied per module.
-- (Optional: when none configured, the module exposes everything from the parent.)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.module_otdelka_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES public.furniture_modules(id) ON DELETE CASCADE NOT NULL,
    otdelka_option_id UUID REFERENCES public.door_otdelka_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    UNIQUE (module_id, otdelka_option_id)
);
ALTER TABLE public.module_otdelka_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view module otdelka pivots"   ON public.module_otdelka_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage module otdelka pivots" ON public.module_otdelka_options FOR ALL    USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.module_glass_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES public.furniture_modules(id) ON DELETE CASCADE NOT NULL,
    glass_option_id UUID REFERENCES public.door_glass_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    UNIQUE (module_id, glass_option_id)
);
ALTER TABLE public.module_glass_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view module glass pivots"   ON public.module_glass_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage module glass pivots" ON public.module_glass_options FOR ALL    USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.module_lighting_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID REFERENCES public.furniture_modules(id) ON DELETE CASCADE NOT NULL,
    lighting_option_id UUID REFERENCES public.door_lighting_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    UNIQUE (module_id, lighting_option_id)
);
ALTER TABLE public.module_lighting_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view module lighting pivots"   ON public.module_lighting_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage module lighting pivots" ON public.module_lighting_options FOR ALL    USING (public.has_role(auth.uid(), 'admin'));

-- ----------------------------------------------------------------------------
-- Flags on products
-- ----------------------------------------------------------------------------
ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS has_modules BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS configuration_styles TEXT[] DEFAULT '{}'::text[];

-- ----------------------------------------------------------------------------
-- Seed: lighting options
-- ----------------------------------------------------------------------------
INSERT INTO public.door_lighting_options (code, name_ka, name_ru, name_en, description_ka, description_ru, description_en, sort_order, price_modifier) VALUES
    ('none',         'უკან',          'Без подсветки',      'No lighting',           'არ არის',                 'Без подсветки',                'No lighting',          1, 0),
    ('warm_strip',   'თბილი ლენტი',    'Тёплая лента LED',   'Warm LED strip',         '3000K',                   '3000K',                       '3000K',                2, 280),
    ('cool_strip',   'ცივი ლენტი',     'Холодная лента LED', 'Cool LED strip',         '6000K',                   '6000K',                       '6000K',                3, 280),
    ('motion_warm',  'სენსორი თბილი',  'Сенсорная тёплая',   'Motion-sensor warm',     'მოძრაობის სენსორით',      'С датчиком движения',         'With motion sensor',   4, 420),
    ('rgb_strip',    'RGB ლენტი',      'RGB лента',          'RGB strip',              'ფერის შეცვლა',            'Изменение цвета',             'Color change',         5, 540)
ON CONFLICT (code) DO NOTHING;
