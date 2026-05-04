-- ============================================================================
-- Door otdelka: add swatch_color (CSS color or gradient) so admins can define
-- finish swatches as actual colors instead of random images. Falls back to
-- swatch_image_url when null. Backfills the existing FONDO / LACCATO /
-- LACCATO_GLOSS / ALUMINIUM groups with realistic hex/gradient values that
-- match union.ru's reference palette.
-- ============================================================================

ALTER TABLE public.door_otdelka_options
    ADD COLUMN IF NOT EXISTS swatch_color TEXT;

-- Group can also carry an optional cover color for header thumbnail / fallback
ALTER TABLE public.door_otdelka_groups
    ADD COLUMN IF NOT EXISTS swatch_color TEXT;

-- ----------------------------------------------------------------------------
-- 1. Clear the dead placeholder.com URLs — they 404 since the service is gone
-- ----------------------------------------------------------------------------
UPDATE public.door_otdelka_options
SET swatch_image_url = NULL
WHERE swatch_image_url ILIKE '%placeholder.com%'
   OR swatch_image_url ILIKE '%via.placeholder%';

-- ----------------------------------------------------------------------------
-- 2. Backfill colours for existing options
-- ----------------------------------------------------------------------------

-- LACCATO (matte enamels) — already had L01–L05
UPDATE public.door_otdelka_options SET swatch_color = '#FFFFFF' WHERE code = 'L01';   -- Bianco RAL 9003
UPDATE public.door_otdelka_options SET swatch_color = '#F5F1E8' WHERE code = 'L02';   -- Bianco Night (warm white)
UPDATE public.door_otdelka_options SET swatch_color = '#F0E6D2' WHERE code = 'L03';   -- Avorio (ivory)
UPDATE public.door_otdelka_options SET swatch_color = '#9C9C96' WHERE code = 'L04';   -- Grigio Cemento (cement grey)
UPDATE public.door_otdelka_options SET swatch_color = '#1A1A1A' WHERE code = 'L05';   -- Nero (black)

-- ALUMINIUM (metallic finishes)
UPDATE public.door_otdelka_options SET swatch_color = 'linear-gradient(135deg, #d8d8d8 0%, #b0b0b0 50%, #c8c8c8 100%)' WHERE code = 'AL09';  -- Chrome Matt
UPDATE public.door_otdelka_options SET swatch_color = '#1c1c1c' WHERE code = 'AL08';  -- Black
UPDATE public.door_otdelka_options SET swatch_color = '#8C7853' WHERE code = 'AL05';  -- Bronze
UPDATE public.door_otdelka_options SET swatch_color = '#E8C78A' WHERE code = 'AL02';  -- Champagne
UPDATE public.door_otdelka_options SET swatch_color = '#4A4A4A' WHERE code = 'AL06';  -- Piombo (lead grey)

-- ----------------------------------------------------------------------------
-- 3. Idempotent re-seed: ensure FONDO / LACCATO / LACCATO_GLOSS / ALUMINIUM
--    groups have a richer set of options matching the union.ru reference.
-- ----------------------------------------------------------------------------

-- Add a sixth LACCATO option to round out the row to 6 (sage green)
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_color, sort_order)
SELECT
    (SELECT id FROM public.door_otdelka_groups WHERE code = 'laccato'),
    'L06', 'Verde Salvia', 'Verde Salvia', 'Sage Green', '#A4B59A', 6
WHERE NOT EXISTS (SELECT 1 FROM public.door_otdelka_options WHERE code = 'L06');

-- FONDO — primer, single off-white swatch
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_color, sort_order)
SELECT
    (SELECT id FROM public.door_otdelka_groups WHERE code = 'fondo'),
    'FONDO', 'Fondo (პრაიმერი)', 'Fondo (под покраску)', 'Fondo (paintable primer)',
    '#F2EEE4', 1
WHERE NOT EXISTS (SELECT 1 FROM public.door_otdelka_options WHERE code = 'FONDO');

-- LACCATO GLOSS — 6 glossy versions (gradient adds the sheen)
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_color, sort_order)
SELECT
    (SELECT id FROM public.door_otdelka_groups WHERE code = 'laccato_gloss'),
    code, label_ka, label_ru, label_en, color, sort_order
FROM (VALUES
    ('LG01', 'Bianco Gloss',     'Bianco Gloss',     'Bianco Gloss',     'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 50%, #FFFFFF 100%)', 1),
    ('LG02', 'Avorio Gloss',     'Avorio Gloss',     'Ivory Gloss',      'linear-gradient(135deg, #F5EFDF 0%, #E5DFCF 50%, #F5EFDF 100%)', 2),
    ('LG03', 'Beige Gloss',      'Бежевый глянец',   'Beige Gloss',      'linear-gradient(135deg, #E5DFC9 0%, #D5CFB9 50%, #E5DFC9 100%)', 3),
    ('LG04', 'Grigio Gloss',     'Grigio Gloss',     'Grey Gloss',       'linear-gradient(135deg, #C0BFB8 0%, #A0A098 50%, #C0BFB8 100%)', 4),
    ('LG05', 'Verde Gloss',      'Verde Gloss',      'Green Gloss',      'linear-gradient(135deg, #B6BEAB 0%, #969E8B 50%, #B6BEAB 100%)', 5),
    ('LG06', 'Senape Gloss',     'Sənape Gloss',     'Mustard Gloss',    'linear-gradient(135deg, #BFBA68 0%, #9F9A48 50%, #BFBA68 100%)', 6)
) AS v(code, label_ka, label_ru, label_en, color, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.door_otdelka_options o WHERE o.code = v.code);

-- HPL — decorative composite, kept as image-based (stone/marble textures look bad as solid colors)
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_image_url, sort_order)
SELECT
    (SELECT id FROM public.door_otdelka_groups WHERE code = 'hpl'),
    code, label_ka, label_ru, label_en, image_url, sort_order
FROM (VALUES
    ('HPL01', 'Marmo Bianco',    'Мрамор белый',     'White marble',     'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=200&q=80', 1),
    ('HPL02', 'Marmo Nero',      'Мрамор чёрный',    'Black marble',     'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&q=80', 2),
    ('HPL03', 'Marmo Calacatta', 'Мрамор калакатта', 'Calacatta marble', 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=200&q=80', 3),
    ('HPL04', 'Pietra Beige',    'Камень бежевый',   'Beige stone',      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=200&q=80', 4),
    ('HPL05', 'Pietra Grigia',   'Камень серый',     'Grey stone',       'https://images.unsplash.com/photo-1605429479486-5d9c5cd4c00d?w=200&q=80', 5)
) AS v(code, label_ka, label_ru, label_en, image_url, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.door_otdelka_options o WHERE o.code = v.code);

-- Extra ALUMINIUM finish (Argento Anodized) to match the 6-swatch row in union.ru
INSERT INTO public.door_otdelka_options (group_id, code, label_ka, label_ru, label_en, swatch_color, sort_order)
SELECT
    (SELECT id FROM public.door_otdelka_groups WHERE code = 'aluminium'),
    'AL10', 'Argento Anodized', 'Серебристый анодированный', 'Anodized Silver',
    'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #DCDCDC 100%)', 0
WHERE NOT EXISTS (SELECT 1 FROM public.door_otdelka_options WHERE code = 'AL10');
