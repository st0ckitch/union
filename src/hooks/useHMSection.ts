import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tables } from '@/integrations/supabase/types';

export type HMSection = Tables<'hmspace_sections'>;

export interface HMSectionItem {
  icon?: string;
  num?: string;
  value?: string;
  title_ka?: string;
  title_ru?: string;
  title_en?: string;
  description_ka?: string;
  description_ru?: string;
  description_en?: string;
  label_ka?: string;
  label_ru?: string;
  label_en?: string;
}

export function useHMSection(sectionKey: string) {
  const query = useQuery({
    queryKey: ['hmspace-section', sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hmspace_sections')
        .select('*')
        .eq('section_key', sectionKey)
        .eq('is_active', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 60_000,
  });
  return query;
}

/** Pick a localized string from a row, with graceful fallback. */
export function useLocalized() {
  const { language } = useLanguage();
  return (row: any, field: string): string => {
    if (!row) return '';
    const ka = row[`${field}_ka`];
    const ru = row[`${field}_ru`];
    const en = row[`${field}_en`];
    if (language === 'ru') return ru || ka || en || '';
    if (language === 'en') return en || ka || ru || '';
    return ka || ru || en || '';
  };
}

/** Pick a localized string from an arbitrary item (used for items[] arrays inside hmspace_sections). */
export function pickLocalized(item: any, field: string, language: string): string {
  if (!item) return '';
  const ka = item[`${field}_ka`];
  const ru = item[`${field}_ru`];
  const en = item[`${field}_en`];
  if (language === 'ru') return ru || ka || en || '';
  if (language === 'en') return en || ka || ru || '';
  return ka || ru || en || '';
}
