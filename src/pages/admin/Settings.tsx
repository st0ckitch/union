import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';
import { useAdminT } from '@/lib/adminI18n';
import type { SiteSettings } from '@/hooks/useSiteSettings';

type FormState = Omit<SiteSettings, 'id' | 'updated_at'>;

const empty: FormState = {
  logo_url: '',
  phone: '',
  email: '',
  address_ka: '',
  address_en: '',
  hours_ka: '',
  hours_en: '',
  facebook_url: '',
  instagram_url: '',
  youtube_url: '',
  pinterest_url: '',
  tiktok_url: '',
  whatsapp_number: '',
  google_map_embed: '',
};

export default function AdminSettings() {
  const t = useAdminT();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(empty);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-site-settings'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('site_settings')
        .select('*')
        .eq('id', 1)
        .maybeSingle();
      if (error) throw error;
      return data as SiteSettings | null;
    },
  });

  useEffect(() => {
    if (data) {
      setForm({
        logo_url: data.logo_url ?? '',
        phone: data.phone ?? '',
        email: data.email ?? '',
        address_ka: data.address_ka ?? '',
        address_en: data.address_en ?? '',
        hours_ka: data.hours_ka ?? '',
        hours_en: data.hours_en ?? '',
        facebook_url: data.facebook_url ?? '',
        instagram_url: data.instagram_url ?? '',
        youtube_url: data.youtube_url ?? '',
        pinterest_url: data.pinterest_url ?? '',
        tiktok_url: data.tiktok_url ?? '',
        whatsapp_number: data.whatsapp_number ?? '',
        google_map_embed: data.google_map_embed ?? '',
      });
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: async (payload: FormState) => {
      const { error } = await (supabase as any)
        .from('site_settings')
        .upsert({ id: 1, ...payload }, { onConflict: 'id' });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(t('Settings saved'));
      queryClient.invalidateQueries({ queryKey: ['admin-site-settings'] });
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
    },
    onError: (err: any) => {
      toast.error(err?.message ?? t('Failed to save settings'));
    },
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{t('Site Settings')}</h1>
          <p className="text-sm text-muted-foreground">{t('Global contact info, socials, and branding.')}</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate(form);
          }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>{t('Branding')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="logo_url">{t('Logo URL')}</Label>
                <Input id="logo_url" value={form.logo_url ?? ''} onChange={(e) => set('logo_url', e.target.value)} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Contact')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">{t('Phone')}</Label>
                  <Input id="phone" value={form.phone ?? ''} onChange={(e) => set('phone', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="email">{t('Email')}</Label>
                  <Input id="email" type="email" value={form.email ?? ''} onChange={(e) => set('email', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="whatsapp_number">{t('WhatsApp')}</Label>
                  <Input id="whatsapp_number" value={form.whatsapp_number ?? ''} onChange={(e) => set('whatsapp_number', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address_ka">{t('Address (Georgian)')}</Label>
                  <Input id="address_ka" value={form.address_ka ?? ''} onChange={(e) => set('address_ka', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="address_en">{t('Address (English)')}</Label>
                  <Input id="address_en" value={form.address_en ?? ''} onChange={(e) => set('address_en', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="hours_ka">{t('Hours (Georgian)')}</Label>
                  <Input id="hours_ka" value={form.hours_ka ?? ''} onChange={(e) => set('hours_ka', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="hours_en">{t('Hours (English)')}</Label>
                  <Input id="hours_en" value={form.hours_en ?? ''} onChange={(e) => set('hours_en', e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="google_map_embed">{t('Google Map embed URL')}</Label>
                <Textarea id="google_map_embed" value={form.google_map_embed ?? ''} onChange={(e) => set('google_map_embed', e.target.value)} rows={3} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('Social Links')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="facebook_url">Facebook</Label>
                  <Input id="facebook_url" value={form.facebook_url ?? ''} onChange={(e) => set('facebook_url', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="instagram_url">Instagram</Label>
                  <Input id="instagram_url" value={form.instagram_url ?? ''} onChange={(e) => set('instagram_url', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="youtube_url">YouTube</Label>
                  <Input id="youtube_url" value={form.youtube_url ?? ''} onChange={(e) => set('youtube_url', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="pinterest_url">Pinterest</Label>
                  <Input id="pinterest_url" value={form.pinterest_url ?? ''} onChange={(e) => set('pinterest_url', e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="tiktok_url">TikTok</Label>
                  <Input id="tiktok_url" value={form.tiktok_url ?? ''} onChange={(e) => set('tiktok_url', e.target.value)} />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t('Saving...')}</>
              ) : (
                <><Save className="h-4 w-4 mr-2" /> {t('Save settings')}</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
