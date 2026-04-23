-- ============================================================================
-- Door configurator: otdelka (finishes), korobka (frames), modeli (style variants)
-- Modelled after union.ru FILO-60 / skrytye dveri pages
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Global pool: otdelka groups (VENEER, LACCATO, HPL, ALUMINIUM, etc.)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_otdelka_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE,                              -- e.g. 'veneer', 'laccato', 'hpl'
    name_ka TEXT NOT NULL,
    name_ru TEXT,
    name_en TEXT,
    description_ka TEXT,
    description_ru TEXT,
    description_en TEXT,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.door_otdelka_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active otdelka groups" ON public.door_otdelka_groups FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all otdelka groups" ON public.door_otdelka_groups FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage otdelka groups" ON public.door_otdelka_groups FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_otdelka_groups_updated_at BEFORE UPDATE ON public.door_otdelka_groups
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Global pool: otdelka options (individual color/texture swatches in a group)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_otdelka_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES public.door_otdelka_groups(id) ON DELETE CASCADE NOT NULL,
    code TEXT,                                      -- e.g. 'V36', 'L01'
    label_ka TEXT NOT NULL,
    label_ru TEXT,
    label_en TEXT,
    swatch_image_url TEXT,                          -- small square swatch
    preview_image_url TEXT,                         -- full door preview with this finish
    price_modifier NUMERIC DEFAULT 0,               -- adds/subtracts from base price
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_door_otdelka_options_group ON public.door_otdelka_options(group_id);

ALTER TABLE public.door_otdelka_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active otdelka options" ON public.door_otdelka_options FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all otdelka options" ON public.door_otdelka_options FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage otdelka options" ON public.door_otdelka_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_otdelka_options_updated_at BEFORE UPDATE ON public.door_otdelka_options
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Global pool: korobka (frame) options
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_korobka_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE,                               -- 'invisible', 'planar', 'deco', etc.
    name_ka TEXT NOT NULL,
    name_ru TEXT,
    name_en TEXT,
    description_ka TEXT,
    description_ru TEXT,
    description_en TEXT,
    image_url TEXT,                                 -- profile / cross-section drawing
    preview_image_url TEXT,
    price_modifier NUMERIC DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.door_korobka_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active korobka options" ON public.door_korobka_options FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all korobka options" ON public.door_korobka_options FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage korobka options" ON public.door_korobka_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_korobka_options_updated_at BEFORE UPDATE ON public.door_korobka_options
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Global pool: modeli (style variant) options
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.door_model_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE,                               -- 'vento', 'entry', 'velino', etc.
    name_ka TEXT NOT NULL,
    name_ru TEXT,
    name_en TEXT,
    description_ka TEXT,
    description_ru TEXT,
    description_en TEXT,
    image_url TEXT,                                 -- small silhouette/profile
    preview_image_url TEXT,
    price_modifier NUMERIC DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.door_model_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active model options" ON public.door_model_options FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can view all model options" ON public.door_model_options FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage model options" ON public.door_model_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_door_model_options_updated_at BEFORE UPDATE ON public.door_model_options
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Flags on products: whether the product uses each dimension
-- ----------------------------------------------------------------------------
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS has_otdelka_variants BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS has_korobka_variants BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS has_model_variants BOOLEAN DEFAULT false;

-- ----------------------------------------------------------------------------
-- Per-product pivots (which options apply to a given product)
-- If a product has has_X_variants=true AND pivot rows, use those.
-- If has_X_variants=true but no pivot rows, fall back to ALL active pool options.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_otdelka_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    otdelka_option_id UUID REFERENCES public.door_otdelka_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (product_id, otdelka_option_id)
);
CREATE INDEX IF NOT EXISTS idx_product_otdelka_options_product ON public.product_otdelka_options(product_id);

ALTER TABLE public.product_otdelka_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product otdelka pivots" ON public.product_otdelka_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage product otdelka pivots" ON public.product_otdelka_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.product_korobka_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    korobka_option_id UUID REFERENCES public.door_korobka_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (product_id, korobka_option_id)
);
CREATE INDEX IF NOT EXISTS idx_product_korobka_options_product ON public.product_korobka_options(product_id);

ALTER TABLE public.product_korobka_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product korobka pivots" ON public.product_korobka_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage product korobka pivots" ON public.product_korobka_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.product_model_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    model_option_id UUID REFERENCES public.door_model_options(id) ON DELETE CASCADE NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    UNIQUE (product_id, model_option_id)
);
CREATE INDEX IF NOT EXISTS idx_product_model_options_product ON public.product_model_options(product_id);

ALTER TABLE public.product_model_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view product model pivots" ON public.product_model_options FOR SELECT USING (true);
CREATE POLICY "Admins can manage product model pivots" ON public.product_model_options FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- ----------------------------------------------------------------------------
-- Seed data (based on union.ru FILO-60 structure)
-- ----------------------------------------------------------------------------

-- Otdelka groups
INSERT INTO public.door_otdelka_groups (code, name_ka, name_ru, name_en, description_ka, description_ru, description_en, sort_order) VALUES
    ('fondo',    'ფონდო (საღებავისთვის)',      'FONDO (под покраску)',           'FONDO (paintable primer)',
     'საფუძველი საღებავისთვის',    'Грунт для покраски',           'Primer for painting', 1),
    ('laccato',  'ლაკატო (მატი ემალი)',         'LACCATO (матовая эмаль)',        'LACCATO (matte enamel)',
     'მატი ფერადი ემალი',            'Матовая цветная эмаль',       'Matte colored enamel', 2),
    ('laccato_gloss', 'ლაკატო გლოსი (გლუვი ემალი)', 'LACCATO GLOSS (глянцевая эмаль)', 'LACCATO GLOSS (glossy enamel)',
     'გლოსი ფერადი ემალი',           'Глянцевая цветная эмаль',     'Glossy colored enamel', 3),
    ('veneer',   'ვენირი (ბუნებრივი ხე)',       'VENEER (натуральный шпон)',      'VENEER (natural wood)',
     'ბუნებრივი ხის ხოჭო',           'Натуральный шпон, матовый лак', 'Natural veneer, matte lacquer', 4),
    ('hpl',      'HPL (დეკორატიული კომპოზიტი)', 'HPL (декоративный композит)',   'HPL (decorative composite)',
     'ქვის და მარმარილოს ტექსტურა',  'Текстура камня и мрамора',    'Stone and marble texture', 5),
    ('aluminium','ალუმინი (მეტალი)',            'ALUMINIUM (металл)',             'ALUMINIUM (metal)',
     'მეტალის ფერები',                'Металлические отделки',       'Metallic finishes', 6);

-- Otdelka options — VENEER
WITH g AS (SELECT id FROM public.door_otdelka_groups WHERE code = 'veneer')
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_image_url, sort_order) VALUES
    ((SELECT id FROM g), 'V36', 'Rovere Miele',        'Rovere Miele',        'Rovere Miele',        'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=200&q=80', 1),
    ((SELECT id FROM g), 'V17', 'Rovere Chiaro',       'Rovere Chiaro',       'Rovere Chiaro',       'https://images.unsplash.com/photo-1530700400540-1d17fb4b7a65?w=200&q=80', 2),
    ((SELECT id FROM g), 'V27', 'Rovere Americano',    'Rovere Americano',    'Rovere Americano',    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=80', 3),
    ((SELECT id FROM g), 'V16', 'Noce Canaletto',      'Noce Canaletto',      'Noce Canaletto',      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80', 4),
    ((SELECT id FROM g), 'V03', 'Ebano',               'Ebano',               'Ebano',               'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&q=80', 5),
    ((SELECT id FROM g), 'V13', 'Rovere Cenere',       'Rovere Cenere',       'Rovere Cenere',       'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&q=80', 6);

-- Otdelka options — LACCATO
WITH g AS (SELECT id FROM public.door_otdelka_groups WHERE code = 'laccato')
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_image_url, sort_order) VALUES
    ((SELECT id FROM g), 'L01', 'Bianco RAL 9003', 'Bianco RAL 9003', 'Bianco RAL 9003', 'https://via.placeholder.com/200/FFFFFF/FFFFFF.png', 1),
    ((SELECT id FROM g), 'L02', 'Bianco Night',    'Bianco Night',    'Bianco Night',    'https://via.placeholder.com/200/F5F5F0/F5F5F0.png', 2),
    ((SELECT id FROM g), 'L03', 'Avorio',          'Avorio',          'Avorio',          'https://via.placeholder.com/200/FFFFF0/FFFFF0.png', 3),
    ((SELECT id FROM g), 'L04', 'Grigio Cemento',  'Grigio Cemento',  'Grigio Cemento',  'https://via.placeholder.com/200/A9A9A9/A9A9A9.png', 4),
    ((SELECT id FROM g), 'L05', 'Nero',            'Nero',            'Black',           'https://via.placeholder.com/200/111111/111111.png', 5);

-- Otdelka options — ALUMINIUM
WITH g AS (SELECT id FROM public.door_otdelka_groups WHERE code = 'aluminium')
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_image_url, sort_order) VALUES
    ((SELECT id FROM g), 'AL09', 'Chrome Matt',  'Chrome Matt',  'Chrome Matt',  'https://via.placeholder.com/200/C0C0C0/C0C0C0.png', 1),
    ((SELECT id FROM g), 'AL08', 'Black',        'Black',        'Black',        'https://via.placeholder.com/200/222222/222222.png', 2),
    ((SELECT id FROM g), 'AL05', 'Bronze',       'Bronze',       'Bronze',       'https://via.placeholder.com/200/8C7853/8C7853.png', 3),
    ((SELECT id FROM g), 'AL02', 'Champagne',    'Champagne',    'Champagne',    'https://via.placeholder.com/200/E8C78A/E8C78A.png', 4),
    ((SELECT id FROM g), 'AL06', 'Piombo',       'Piombo',       'Piombo',       'https://via.placeholder.com/200/4A4A4A/4A4A4A.png', 5);

-- Korobka options
INSERT INTO public.door_korobka_options (code, name_ka, name_ru, name_en, description_ka, description_ru, description_en, image_url, sort_order) VALUES
    ('invisible', 'INVISIBLE (დამალული)',  'INVISIBLE (скрытый)',    'INVISIBLE (hidden)',
     'ფარული ალუმინის ჩარჩო, კედლის ფერში', 'Скрытый алюминиевый короб, в цвет стены', 'Hidden aluminum frame, matches wall color',
     'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=400&q=80', 1),
    ('planar',    'PLANAR (ფლანგი)',         'PLANAR (планар)',         'PLANAR',
     'ბრტყელი ალუმინის ჩარჩო კედლის დონეზე', 'Плоский алюминиевый короб вровень со стеной', 'Flat aluminum frame flush with wall',
     'https://images.unsplash.com/photo-1522705564739-cadbff2a3de3?w=400&q=80', 2),
    ('deco',      'DECO (დეკორატიული)',      'DECO (декоративный)',     'DECO (decorative)',
     'დეკორატიული ნაისნიკით',        'С декоративным наличником',  'With decorative trim',
     'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80', 3),
    ('uniwood',   'UNIWOOD (ხის)',            'UNIWOOD (деревянный)',    'UNIWOOD (wooden)',
     'ხის ჩარჩო',                   'Деревянный короб',          'Wooden frame',
     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', 4),
    ('unidoor',   'UNIDOOR (კლასიკური)',     'UNIDOOR (классический)',  'UNIDOOR (classic)',
     'კლასიკური ხის ჩარჩო',          'Классический деревянный короб', 'Classic wooden frame',
     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', 5);

-- Model options (door style silhouettes)
INSERT INTO public.door_model_options (code, name_ka, name_ru, name_en, description_ka, description_ru, description_en, image_url, sort_order) VALUES
    ('vento',   'Vento',   'Vento',   'Vento',   'სუფთა ბრტყელი ზედაპირი',        'Чистая плоская поверхность',    'Clean flat surface',
     'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', 1),
    ('entry',   'Entry',   'Entry',   'Entry',   'ელეგანტური ვერტიკალური ხაზი',   'Элегантная вертикальная линия', 'Elegant vertical line',
     'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', 2),
    ('velino',  'Velino',  'Velino',  'Velino',  'კლასიკური ოთხკუთხა',             'Классическая квадратная',      'Classic squared',
     'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80', 3),
    ('vetta',   'Vetta',   'Vetta',   'Vetta',   'გეომეტრიული პანელი',             'Геометрическая панель',        'Geometric panel',
     'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80', 4),
    ('vox',     'Vox',     'Vox',     'Vox',     'სამი ჰორიზონტალური ხაზი',        'Три горизонтальные линии',    'Three horizontal lines',
     'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400&q=80', 5);
