import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface SiteSettings {
  id: number;
  logo_url: string | null;
  phone: string | null;
  email: string | null;
  address_ka: string | null;
  address_en: string | null;
  hours_ka: string | null;
  hours_en: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  pinterest_url: string | null;
  tiktok_url: string | null;
  whatsapp_number: string | null;
  google_map_embed: string | null;
  updated_at: string;
}

const FALLBACK: SiteSettings = {
  id: 1,
  logo_url: null,
  phone: '+995 32 2 00 00 00',
  email: 'info@hmspace.ge',
  address_ka: 'თბილისი, საქართველო',
  address_en: 'Tbilisi, Georgia',
  hours_ka: 'ორშ-შაბ: 10:00 - 19:00',
  hours_en: 'Mon-Sat: 10:00 - 19:00',
  facebook_url: null,
  instagram_url: null,
  youtube_url: null,
  pinterest_url: null,
  tiktok_url: null,
  whatsapp_number: null,
  google_map_embed: null,
  updated_at: new Date().toISOString(),
};

export function useSiteSettings() {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async (): Promise<SiteSettings> => {
      const { data, error } = await (supabase as any)
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();
      if (error || !data) return FALLBACK;
      return data as SiteSettings;
    },
    staleTime: 5 * 60 * 1000,
  });
}
