import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type OtdelkaGroup = Tables<'door_otdelka_groups'>;
export type OtdelkaOption = Tables<'door_otdelka_options'>;
export type KorobkaOption = Tables<'door_korobka_options'>;
export type ModelOption = Tables<'door_model_options'>;

/**
 * Fetches all door configurator options that apply to a given product.
 *
 * Rules:
 *   - If the product has has_X_variants=false, that dimension is inactive (returns []).
 *   - If the product has has_X_variants=true AND there are pivot rows, use those.
 *   - If the product has has_X_variants=true but no pivot rows, fall back to the entire global active pool.
 */
export function useDoorConfigurator(
  productId: string | undefined,
  flags: { hasOtdelka: boolean; hasKorobka: boolean; hasModel: boolean },
) {
  return useQuery({
    queryKey: ['door-configurator', productId, flags.hasOtdelka, flags.hasKorobka, flags.hasModel],
    enabled: !!productId && (flags.hasOtdelka || flags.hasKorobka || flags.hasModel),
    queryFn: async () => {
      const result: {
        otdelkaGroups: OtdelkaGroup[];
        otdelkaOptions: OtdelkaOption[];
        korobkaOptions: KorobkaOption[];
        modelOptions: ModelOption[];
      } = { otdelkaGroups: [], otdelkaOptions: [], korobkaOptions: [], modelOptions: [] };

      if (flags.hasOtdelka) {
        const [groupsRes, pivotRes] = await Promise.all([
          supabase.from('door_otdelka_groups').select('*').eq('is_active', true).order('sort_order'),
          supabase.from('product_otdelka_options').select('otdelka_option_id, sort_order').eq('product_id', productId!),
        ]);
        result.otdelkaGroups = groupsRes.data || [];

        const pivotIds = (pivotRes.data || []).map(p => p.otdelka_option_id);
        if (pivotIds.length > 0) {
          const { data } = await supabase
            .from('door_otdelka_options')
            .select('*')
            .in('id', pivotIds)
            .eq('is_active', true)
            .order('sort_order');
          result.otdelkaOptions = data || [];
        } else {
          const { data } = await supabase
            .from('door_otdelka_options')
            .select('*')
            .eq('is_active', true)
            .order('sort_order');
          result.otdelkaOptions = data || [];
        }
      }

      if (flags.hasKorobka) {
        const { data: pivot } = await supabase
          .from('product_korobka_options')
          .select('korobka_option_id')
          .eq('product_id', productId!);
        const ids = (pivot || []).map(p => p.korobka_option_id);
        if (ids.length > 0) {
          const { data } = await supabase.from('door_korobka_options').select('*').in('id', ids).eq('is_active', true).order('sort_order');
          result.korobkaOptions = data || [];
        } else {
          const { data } = await supabase.from('door_korobka_options').select('*').eq('is_active', true).order('sort_order');
          result.korobkaOptions = data || [];
        }
      }

      if (flags.hasModel) {
        const { data: pivot } = await supabase
          .from('product_model_options')
          .select('model_option_id')
          .eq('product_id', productId!);
        const ids = (pivot || []).map(p => p.model_option_id);
        if (ids.length > 0) {
          const { data } = await supabase.from('door_model_options').select('*').in('id', ids).eq('is_active', true).order('sort_order');
          result.modelOptions = data || [];
        } else {
          const { data } = await supabase.from('door_model_options').select('*').eq('is_active', true).order('sort_order');
          result.modelOptions = data || [];
        }
      }

      return result;
    },
  });
}

/** Pick localized string from any row with _ka/_ru/_en suffixes. */
export function pickLocalized(row: any, field: string, language: string): string {
  if (!row) return '';
  const ka = row[`${field}_ka`];
  const ru = row[`${field}_ru`];
  const en = row[`${field}_en`];
  if (language === 'ru') return ru || ka || en || '';
  if (language === 'en') return en || ka || ru || '';
  return ka || ru || en || '';
}
