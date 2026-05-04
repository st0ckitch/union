import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

export type OtdelkaGroup  = Tables<'door_otdelka_groups'>;
export type OtdelkaOption = Tables<'door_otdelka_options'>;
export type KorobkaOption = Tables<'door_korobka_options'>;
export type ModelOption   = Tables<'door_model_options'>;

// Phase C — three new dimensions, all share the same shape as KorobkaOption
export type GlassOption  = Tables<'door_glass_options'>;
export type LockOption   = Tables<'door_lock_options'>;
export type PanelOption  = Tables<'door_panel_options'>;

export interface ConfiguratorFlags {
  hasOtdelka: boolean;
  hasKorobka: boolean;
  hasModel:   boolean;
  hasGlass:   boolean;
  hasLock:    boolean;
  hasPanel:   boolean;
}

export interface ConfiguratorData {
  otdelkaGroups:  OtdelkaGroup[];
  otdelkaOptions: OtdelkaOption[];
  korobkaOptions: KorobkaOption[];
  modelOptions:   ModelOption[];
  glassOptions:   GlassOption[];
  lockOptions:    LockOption[];
  panelOptions:   PanelOption[];
}

/**
 * Fetches all door configurator options for a given product.
 *
 * Resolution rules per dimension (consistent across all 6):
 *   - flag=false  → return [].
 *   - flag=true   → if pivot rows exist for this product, use them; otherwise
 *                   fall back to the entire global active pool.
 */
export function useDoorConfigurator(productId: string | undefined, flags: ConfiguratorFlags) {
  const anyEnabled = Object.values(flags).some(Boolean);
  return useQuery({
    queryKey: ['door-configurator', productId, flags],
    enabled: !!productId && anyEnabled,
    queryFn: async (): Promise<ConfiguratorData> => {
      const result: ConfiguratorData = {
        otdelkaGroups: [], otdelkaOptions: [], korobkaOptions: [], modelOptions: [],
        glassOptions: [], lockOptions: [], panelOptions: [],
      };

      // Otdelka has its own group hierarchy — keep dedicated handling
      if (flags.hasOtdelka) {
        const [groupsRes, pivotRes] = await Promise.all([
          supabase.from('door_otdelka_groups').select('*').eq('is_active', true).order('sort_order'),
          supabase.from('product_otdelka_options').select('otdelka_option_id').eq('product_id', productId!),
        ]);
        result.otdelkaGroups = groupsRes.data || [];
        const pivotIds = (pivotRes.data || []).map((p: any) => p.otdelka_option_id);
        if (pivotIds.length > 0) {
          const { data } = await supabase.from('door_otdelka_options').select('*').in('id', pivotIds).eq('is_active', true).order('sort_order');
          result.otdelkaOptions = data || [];
        } else {
          const { data } = await supabase.from('door_otdelka_options').select('*').eq('is_active', true).order('sort_order');
          result.otdelkaOptions = data || [];
        }
      }

      // Generic flat-pool dimension loader (shared by korobka/model/glass/lock/panel)
      const loadFlat = async <T,>(
        flag: boolean,
        pivotTable: string,
        pivotColumn: string,
        poolTable: string,
      ): Promise<T[]> => {
        if (!flag) return [];
        const { data: pivot } = await supabase.from(pivotTable as any).select(pivotColumn).eq('product_id', productId!);
        const ids = (pivot || []).map((p: any) => p[pivotColumn]);
        if (ids.length > 0) {
          const { data } = await supabase.from(poolTable as any).select('*').in('id', ids).eq('is_active', true).order('sort_order');
          return (data || []) as T[];
        }
        const { data } = await supabase.from(poolTable as any).select('*').eq('is_active', true).order('sort_order');
        return (data || []) as T[];
      };

      result.korobkaOptions = await loadFlat<KorobkaOption>(flags.hasKorobka, 'product_korobka_options', 'korobka_option_id', 'door_korobka_options');
      result.modelOptions   = await loadFlat<ModelOption>  (flags.hasModel,   'product_model_options',   'model_option_id',   'door_model_options');
      result.glassOptions   = await loadFlat<GlassOption>  (flags.hasGlass,   'product_glass_options',   'glass_option_id',   'door_glass_options');
      result.lockOptions    = await loadFlat<LockOption>   (flags.hasLock,    'product_lock_options',    'lock_option_id',    'door_lock_options');
      result.panelOptions   = await loadFlat<PanelOption>  (flags.hasPanel,   'product_panel_options',   'panel_option_id',   'door_panel_options');

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

/**
 * Map of dimensions (in render order) per product category type. The
 * configurator UI walks this list to decide which tabs/sections appear.
 * Add new category types here and the configurator extends without code changes.
 */
export type DimensionKey = 'otdelka' | 'korobka' | 'model' | 'glass' | 'lock' | 'panel';

export const DIMENSIONS_BY_TYPE: Record<string, DimensionKey[]> = {
  hinged_door:   ['otdelka', 'korobka', 'model'],
  sliding_door:  ['model', 'glass', 'otdelka'],
  entrance_door: ['otdelka', 'lock', 'panel'],
  furniture:     ['otdelka'],
  hardware:      ['otdelka'],
  wall_panel:    ['otdelka'],
  baseboard:     ['otdelka'],
  partition:     ['glass', 'otdelka'],
  mirror:        ['otdelka'],
  generic:       ['otdelka', 'korobka', 'model'],
};
