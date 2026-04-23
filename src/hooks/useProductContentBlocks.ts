import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type ContentBlock = Tables<'product_content_blocks'>;
export type BlockType = ContentBlock['block_type'];

/**
 * Resolve all active content blocks for a given product:
 *   - scope='product' AND product_id=X
 *   UNION scope='category' AND category_id=X.category
 *   UNION scope='global'
 * Sorted by sort_order.
 */
export function useProductContentBlocks(productId: string | undefined, categoryId: string | null | undefined) {
  return useQuery({
    queryKey: ['product-content-blocks', productId, categoryId],
    enabled: !!productId,
    queryFn: async () => {
      const [pRes, cRes, gRes] = await Promise.all([
        supabase.from('product_content_blocks').select('*').eq('scope', 'product').eq('product_id', productId!).eq('is_active', true),
        categoryId
          ? supabase.from('product_content_blocks').select('*').eq('scope', 'category').eq('category_id', categoryId).eq('is_active', true)
          : Promise.resolve({ data: [] as ContentBlock[], error: null }),
        supabase.from('product_content_blocks').select('*').eq('scope', 'global').eq('is_active', true),
      ]);
      if (pRes.error) throw pRes.error;
      if ('error' in cRes && cRes.error) throw cRes.error;
      if (gRes.error) throw gRes.error;
      const all = [...(pRes.data || []), ...(cRes.data || []), ...(gRes.data || [])];
      all.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
      return all;
    },
    staleTime: 60_000,
  });
}

/** Localized picker over _ka/_ru/_en fields. */
export function pickLocalizedFromRow(row: any, field: string, language: string): string {
  if (!row) return '';
  const ka = row[`${field}_ka`];
  const ru = row[`${field}_ru`];
  const en = row[`${field}_en`];
  if (language === 'ru') return ru || ka || en || '';
  if (language === 'en') return en || ka || ru || '';
  return ka || ru || en || '';
}

/** Localized picker over a plain object with {ka, ru, en} fields. */
export function pickI18n(obj: any, language: string): string {
  if (!obj) return '';
  if (typeof obj === 'string') return obj;
  if (language === 'ru') return obj.ru || obj.ka || obj.en || '';
  if (language === 'en') return obj.en || obj.ka || obj.ru || '';
  return obj.ka || obj.ru || obj.en || '';
}
