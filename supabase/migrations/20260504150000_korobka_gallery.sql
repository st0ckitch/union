-- ============================================================================
-- Door frames (korobka) get a multi-image gallery so admins can attach a
-- whole set of photos per frame variant instead of just a single primary
-- image. Used by the public "Подробнее о коробе" lightbox slideshow.
-- ============================================================================

ALTER TABLE public.door_korobka_options
    ADD COLUMN IF NOT EXISTS gallery_image_urls TEXT[] DEFAULT '{}'::text[];

-- Same affordance is useful on the other variant pools — admins may want
-- multiple shots of a model / glass / lock / panel too.
ALTER TABLE public.door_model_options
    ADD COLUMN IF NOT EXISTS gallery_image_urls TEXT[] DEFAULT '{}'::text[];
ALTER TABLE public.door_glass_options
    ADD COLUMN IF NOT EXISTS gallery_image_urls TEXT[] DEFAULT '{}'::text[];
ALTER TABLE public.door_lock_options
    ADD COLUMN IF NOT EXISTS gallery_image_urls TEXT[] DEFAULT '{}'::text[];
ALTER TABLE public.door_panel_options
    ADD COLUMN IF NOT EXISTS gallery_image_urls TEXT[] DEFAULT '{}'::text[];

-- Sample seed: give the INVISIBLE / PLANAR / DECO frames a small starter
-- gallery so the new lightbox has something to render out of the box.
UPDATE public.door_korobka_options
SET gallery_image_urls = ARRAY[
    'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80'
]::text[]
WHERE code = 'invisible' AND (gallery_image_urls IS NULL OR cardinality(gallery_image_urls) = 0);

UPDATE public.door_korobka_options
SET gallery_image_urls = ARRAY[
    'https://images.unsplash.com/photo-1522705564739-cadbff2a3de3?w=1200&q=80',
    'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=1200&q=80',
    'https://images.unsplash.com/photo-1604079628040-94301bb21b91?w=1200&q=80'
]::text[]
WHERE code = 'planar' AND (gallery_image_urls IS NULL OR cardinality(gallery_image_urls) = 0);

UPDATE public.door_korobka_options
SET gallery_image_urls = ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80'
]::text[]
WHERE code = 'deco' AND (gallery_image_urls IS NULL OR cardinality(gallery_image_urls) = 0);
