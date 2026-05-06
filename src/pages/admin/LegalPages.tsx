import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { deleteRow } from '@/lib/adminMutations';
import { useAdminT } from '@/lib/adminI18n';

type LegalPage = Tables<'legal_pages'>;

const COMMON_SLUGS = ['privacy', 'terms', 'delivery', 'warranty', 'returns'];

export default function AdminLegalPages() {
  const t = useAdminT();
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<LegalPage | null>(null);
  const [form, setForm] = useState<any>({
    slug: '', title_ka: '', title_ru: '', title_en: '',
    body_ka: '', body_ru: '', body_en: '',
    sort_order: '0', is_active: true,
  });
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-legal-pages'],
    queryFn: async () => {
      const { data, error } = await supabase.from('legal_pages').select('*').order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const create = useMutation({
    mutationFn: async (d: any) => { const { error } = await supabase.from('legal_pages').insert([d]); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-legal-pages'] }); toast.success(t('Page created')); reset(); },
    onError: (e: any) => toast.error(e.message),
  });
  const update = useMutation({
    mutationFn: async ({ id, d }: { id: string; d: any }) => { const { error } = await supabase.from('legal_pages').update(d).eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-legal-pages'] }); toast.success(t('Page updated')); reset(); },
    onError: (e: any) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: (id: string) => deleteRow('legal_pages', id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-legal-pages'] }); toast.success(t('Page deleted')); },
    onError: (e: any) => toast.error(e.message),
  });

  const reset = () => {
    setForm({ slug: '', title_ka: '', title_ru: '', title_en: '', body_ka: '', body_ru: '', body_en: '', sort_order: '0', is_active: true });
    setEditing(null); setIsOpen(false);
  };

  const onEdit = (p: LegalPage) => {
    setEditing(p);
    setForm({
      slug: p.slug || '',
      title_ka: p.title_ka || '',
      title_ru: p.title_ru || '',
      title_en: p.title_en || '',
      body_ka: p.body_ka || '',
      body_ru: p.body_ru || '',
      body_en: p.body_en || '',
      sort_order: p.sort_order?.toString() || '0',
      is_active: p.is_active ?? true,
    });
    setIsOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = {
      slug: form.slug,
      title_ka: form.title_ka,
      title_ru: form.title_ru || null,
      title_en: form.title_en || null,
      body_ka: form.body_ka || null,
      body_ru: form.body_ru || null,
      body_en: form.body_en || null,
      sort_order: parseInt(form.sort_order) || 0,
      is_active: form.is_active,
    };
    if (editing) update.mutate({ id: editing.id, d });
    else create.mutate(d);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Legal & Info Pages')}</h1>
            <p className="text-gray-500 mt-1">{t('Privacy, Terms, Delivery, Warranty, Returns — HTML body supported.')}</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild><Button onClick={reset}><Plus className="h-4 w-4 mr-2" />{t('Add Page')}</Button></DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle>{editing ? `${t('Edit')}: ${editing.slug}` : t('Add Page')}</DialogTitle></DialogHeader>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Slug *')}</Label>
                    <Input list="legal-slug-list" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })} required placeholder="privacy" />
                    <datalist id="legal-slug-list">
                      {COMMON_SLUGS.map(s => <option key={s} value={s} />)}
                    </datalist>
                  </div>
                  <div className="space-y-2"><Label>{t('Sort Order')}</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2"><Label>{t('Title (KA) *')}</Label><Input value={form.title_ka} onChange={(e) => setForm({ ...form, title_ka: e.target.value })} required /></div>
                  <div className="space-y-2"><Label>{t('Title (RU)')}</Label><Input value={form.title_ru} onChange={(e) => setForm({ ...form, title_ru: e.target.value })} /></div>
                  <div className="space-y-2"><Label>{t('Title (EN)')}</Label><Input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} /></div>
                </div>
                <div className="space-y-2">
                  <Label>{t('Body KA')} (HTML: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;a&gt;...)</Label>
                  <Textarea rows={8} className="font-mono text-xs" value={form.body_ka} onChange={(e) => setForm({ ...form, body_ka: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('Body RU')}</Label>
                  <Textarea rows={8} className="font-mono text-xs" value={form.body_ru} onChange={(e) => setForm({ ...form, body_ru: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('Body EN')}</Label>
                  <Textarea rows={8} className="font-mono text-xs" value={form.body_en} onChange={(e) => setForm({ ...form, body_en: e.target.value })} />
                </div>
                <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label>{t('Active')}</Label></div>
                <div className="flex justify-end gap-2 border-t pt-4">
                  <Button type="button" variant="outline" onClick={reset}>{t('Cancel')}</Button>
                  <Button type="submit" disabled={create.isPending || update.isPending}>
                    {(create.isPending || update.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editing ? t('Update') : t('Create')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card><CardContent className="p-0">
          {isLoading ? <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div> : (
            <div className="divide-y">
              {data?.map((p) => (
                <div key={p.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                  <span className="font-mono text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">/{p.slug}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{p.title_ka}</p>
                    <p className="text-xs text-gray-500 truncate">{p.body_ka?.replace(/<[^>]+>/g, ' ').slice(0, 150)}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${p.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{p.is_active ? t('Active') : t('Inactive')}</span>
                  <Button variant="ghost" size="icon" onClick={() => onEdit(p)}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => { if (confirm(`${t('Delete')} "${p.slug}"?`)) del.mutate(p.id); }} className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              {data?.length === 0 && <div className="text-center py-8 text-gray-500">{t('No pages yet')}</div>}
            </div>
          )}
        </CardContent></Card>
      </div>
    </AdminLayout>
  );
}
