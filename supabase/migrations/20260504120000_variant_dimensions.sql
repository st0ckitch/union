-- ============================================================================
-- Phase C: Three new variant dimensions — glass, lock, panel
-- Mirrors the existing door_korobka_options / door_model_options pattern:
--   one global pool table per dimension + per-product pivot.
-- Activated by has_*_variants boolean flags on products.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- door_glass_options — glass-pane variants for sliding doors / partitions
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_glass_options (
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
ALTER TABLE public.door_glass_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active glass options" ON public.door_glass_options FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all glass options"   ON public.door_glass_options FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage glass options"     ON public.door_glass_options FOR ALL    USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_glass_options_updated_at BEFORE UPDATE ON public.door_glass_options
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- door_lock_options — lock/security brand variants for entrance doors
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_lock_options (
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
ALTER TABLE public.door_lock_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active lock options" ON public.door_lock_options FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all lock options"   ON public.door_lock_options FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage lock options"     ON public.door_lock_options FOR ALL    USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_lock_options_updated_at BEFORE UPDATE ON public.door_lock_options
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- door_panel_options — decorative panel variants for entrance doors
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_panel_options (
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
ALTER TABLE public.door_panel_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active panel options" ON public.door_panel_options FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all panel options"   ON public.door_panel_options FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage panel options"     ON public.door_panel_options FOR ALL    USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_panel_options_updated_at BEFORE UPDATE ON public.door_panel_options
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Per-product pivots
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_glass_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    glass_option_id UUID REFERENCES public.door_glass_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (product_id, glass_option_id)
);
CREATE INDEX IF NOT EXISTS idx_product_glass_options_product ON public.product_glass_options(product_id);
ALTER TABLE public.product_glass_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product glass pivots"   ON public.product_glass_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage product glass pivots" ON public.product_glass_options FOR ALL    USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.product_lock_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    lock_option_id UUID REFERENCES public.door_lock_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (product_id, lock_option_id)
);
CREATE INDEX IF NOT EXISTS idx_product_lock_options_product ON public.product_lock_options(product_id);
ALTER TABLE public.product_lock_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product lock pivots"   ON public.product_lock_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage product lock pivots" ON public.product_lock_options FOR ALL    USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.product_panel_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    panel_option_id UUID REFERENCES public.door_panel_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (product_id, panel_option_id)
);
CREATE INDEX IF NOT EXISTS idx_product_panel_options_product ON public.product_panel_options(product_id);
ALTER TABLE public.product_panel_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product panel pivots"   ON public.product_panel_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage product panel pivots" ON public.product_panel_options FOR ALL    USING (public.has_role(auth.uid(), 'admin'));

-- ----------------------------------------------------------------------------
-- Flags on products
-- ----------------------------------------------------------------------------
ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS has_glass_variants BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS has_lock_variants  BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS has_panel_variants BOOLEAN DEFAULT false;

-- ----------------------------------------------------------------------------
-- Seed: glass options (transparent / frosted / textured / mirrored / tinted)
-- ----------------------------------------------------------------------------
INSERT INTO public.door_glass_options (code, name_ka, name_ru, name_en, description_ka, description_ru, description_en, image_url, sort_order) VALUES
    ('transparent', 'გამჭვირვალე',      'Прозрачное',         'Transparent',
     'სუფთა გამჭვირვალე მინა', 'Чистое прозрачное стекло', 'Clear transparent glass',
     'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', 1),
    ('frosted',     'მქრქალი',            'Матовое',            'Frosted',
     'პრივატული, შუქი გადის',  'Приватное, пропускает свет', 'Privacy, light passes through',
     'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&q=80', 2),
    ('textured',    'ტექსტურირებული',     'Текстурное',          'Textured',
     'რიფლენი ან გრავირებული', 'Рифлёное или гравированное', 'Ribbed or engraved',
     'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400&q=80', 3),
    ('mirrored',    'სარკისებური',         'Зеркальное',          'Mirrored',
     'ანარეკლი ზედაპირი',      'Отражающая поверхность',     'Reflective surface',
     'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=400&q=80', 4),
    ('tinted',      'ტონირებული',          'Тонированное',        'Tinted',
     'მუქი, ბრინჯაოს ან ნაცრისფერი', 'Тёмное, бронза или серый', 'Dark, bronze or grey',
     'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=400&q=80', 5)
ON CONFLICT (code) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Seed: lock options (Italian premium brands)
-- ----------------------------------------------------------------------------
INSERT INTO public.door_lock_options (code, name_ka, name_ru, name_en, description_ka, description_ru, description_en, image_url, sort_order, price_modifier) VALUES
    ('securemme',          'SECUREMME',          'SECUREMME',          'SECUREMME',
     'იტალიური დამცავი ცილინდრი',     'Итальянский защитный цилиндр',     'Italian security cylinder',
     'https://images.unsplash.com/photo-1558959356-2c75e8e0d23a?w=400&q=80', 1, 0),
    ('mottura_champion',   'MOTTURA CHAMPION PRO', 'MOTTURA CHAMPION PRO', 'MOTTURA CHAMPION PRO',
     'უმაღლესი კლასი',                'Высший класс защиты',              'Premium security class',
     'https://images.unsplash.com/photo-1558959356-2c75e8e0d23a?w=400&q=80', 2, 350),
    ('securemme_k2',       'SECUREMME K2',       'SECUREMME K2',       'SECUREMME K2',
     'გამძლე გასაღების სისტემა',      'Усиленная система ключа',          'Enhanced key system',
     'https://images.unsplash.com/photo-1558959356-2c75e8e0d23a?w=400&q=80', 3, 220)
ON CONFLICT (code) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Seed: decorative panel options (entrance doors)
-- ----------------------------------------------------------------------------
INSERT INTO public.door_panel_options (code, name_ka, name_ru, name_en, description_ka, description_ru, description_en, image_url, sort_order) VALUES
    ('pk_p',      'PK / P',     'PK / P',     'PK / P',
     'მარტივი ბრტყელი პანელი',          'Простая плоская панель',           'Simple flat panel',
     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', 1),
    ('boss',      'BOSS',       'BOSS',       'BOSS',
     'მასიური ვერტიკალური ხაზი',        'Массивная вертикальная линия',     'Massive vertical line',
     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', 2),
    ('c_007',     'C-007',      'C-007',      'C-007',
     'გეომეტრიული პანელი',              'Геометрическая панель',            'Geometric panel',
     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', 3),
    ('coloniale', 'COLONIALE',  'COLONIALE',  'COLONIALE',
     'კლასიკური კოლონიური სტილი',       'Классический колониальный стиль',  'Classic colonial style',
     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', 4)
ON CONFLICT (code) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Auto-enable: every entrance-door product should expose lock + panel pickers
-- ----------------------------------------------------------------------------
UPDATE public.products
SET has_lock_variants = true,
    has_panel_variants = true
WHERE category_type = 'entrance_door';

-- Auto-enable: every sliding-door product gets the glass picker
UPDATE public.products
SET has_glass_variants = true
WHERE category_type = 'sliding_door';
