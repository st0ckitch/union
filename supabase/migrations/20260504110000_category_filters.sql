-- ============================================================================
-- Phase B: Category-page filters
-- Adds filterable attributes to products + GIN/btree indexes for fast facet
-- queries. Backfills `finish` and `frame_type` from existing product slugs
-- where the product's name follows the union.ru "<model>-<frame>-<finish>"
-- naming pattern.
-- ============================================================================

ALTER TABLE public.products
    ADD COLUMN IF NOT EXISTS finish          TEXT[]   DEFAULT '{}'::text[],
    ADD COLUMN IF NOT EXISTS frame_type      TEXT,
    ADD COLUMN IF NOT EXISTS collection_slug TEXT,
    ADD COLUMN IF NOT EXISTS style_tags      TEXT[]   DEFAULT '{}'::text[];

CREATE INDEX IF NOT EXISTS idx_products_finish_gin     ON public.products USING GIN (finish);
CREATE INDEX IF NOT EXISTS idx_products_style_tags_gin ON public.products USING GIN (style_tags);
CREATE INDEX IF NOT EXISTS idx_products_frame_type     ON public.products (frame_type);
CREATE INDEX IF NOT EXISTS idx_products_collection     ON public.products (collection_slug);
CREATE INDEX IF NOT EXISTS idx_products_stock_status   ON public.products (stock_status);

-- ----------------------------------------------------------------------------
-- Backfill `frame_type` from slug patterns (invisible / planar / deco / uniwood / unidoor)
-- ----------------------------------------------------------------------------
UPDATE public.products SET frame_type = 'invisible' WHERE slug ILIKE '%invisible%' AND frame_type IS NULL;
UPDATE public.products SET frame_type = 'planar'    WHERE slug ILIKE '%planar%'    AND frame_type IS NULL;
UPDATE public.products SET frame_type = 'deco'      WHERE slug ILIKE '%deco%'      AND frame_type IS NULL;
UPDATE public.products SET frame_type = 'uniwood'   WHERE slug ILIKE '%uniwood%'   AND frame_type IS NULL;
UPDATE public.products SET frame_type = 'unidoor'   WHERE slug ILIKE '%unidoor%'   AND frame_type IS NULL;

-- ----------------------------------------------------------------------------
-- Backfill `finish` from slug patterns (laccato/laccato-gloss/fondo/veneer/hpl/aluminium/eco-veneer)
-- Multiple matches — finish is a TEXT[] so a product with "fondo-laccato" gets both.
-- ----------------------------------------------------------------------------
UPDATE public.products SET finish = array_append(finish, 'laccato_gloss')
    WHERE slug ILIKE '%laccato-gloss%' AND NOT ('laccato_gloss' = ANY(finish));
UPDATE public.products SET finish = array_append(finish, 'laccato')
    WHERE slug ILIKE '%laccato%' AND slug NOT ILIKE '%laccato-gloss%' AND NOT ('laccato' = ANY(finish));
UPDATE public.products SET finish = array_append(finish, 'fondo')
    WHERE slug ILIKE '%fondo%' AND NOT ('fondo' = ANY(finish));
UPDATE public.products SET finish = array_append(finish, 'eco_veneer')
    WHERE slug ILIKE '%eco-veneer%' AND NOT ('eco_veneer' = ANY(finish));
UPDATE public.products SET finish = array_append(finish, 'veneer')
    WHERE slug ILIKE '%veneer%' AND slug NOT ILIKE '%eco-veneer%' AND NOT ('veneer' = ANY(finish));
UPDATE public.products SET finish = array_append(finish, 'hpl')
    WHERE slug ILIKE '%hpl%' AND NOT ('hpl' = ANY(finish));
UPDATE public.products SET finish = array_append(finish, 'aluminium')
    WHERE slug ILIKE '%aluminium%' AND NOT ('aluminium' = ANY(finish));
UPDATE public.products SET finish = array_append(finish, 'mirror')
    WHERE slug ILIKE '%mirror%' AND NOT ('mirror' = ANY(finish));

-- ----------------------------------------------------------------------------
-- Backfill `collection_slug` from common model prefixes
-- ----------------------------------------------------------------------------
UPDATE public.products SET collection_slug = 'filo-60'   WHERE slug ILIKE 'filo-60%'   AND collection_slug IS NULL;
UPDATE public.products SET collection_slug = 'corda-60'  WHERE slug ILIKE 'corda-60%'  AND collection_slug IS NULL;
UPDATE public.products SET collection_slug = 'corda-lux' WHERE slug ILIKE 'corda-lux%' AND collection_slug IS NULL;
UPDATE public.products SET collection_slug = 'trend-60'  WHERE slug ILIKE 'trend-60%'  AND collection_slug IS NULL;
UPDATE public.products SET collection_slug = 'tonda'     WHERE slug ILIKE 'tonda%'     AND collection_slug IS NULL;
UPDATE public.products SET collection_slug = 'vella'     WHERE slug ILIKE 'vella%'     AND collection_slug IS NULL;
UPDATE public.products SET collection_slug = 'stratus'   WHERE slug ILIKE 'stratus%'   AND collection_slug IS NULL;
UPDATE public.products SET collection_slug = 'delta-pro' WHERE slug ILIKE 'delta-pro%' AND collection_slug IS NULL;
