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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Pencil, Loader2, Plus, Trash2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { deleteRow } from '@/lib/adminMutations';

type Section = Tables<'hmspace_sections'>;

const KNOWN_SECTIONS = [
  { key: 'hero', label: 'Hero (full-screen intro)' },
  { key: 'about', label: 'About (brand story + stats)' },
  { key: 'values', label: 'Values (4 pillars grid)' },
  { key: 'spotlight', label: 'Spotlight (UNION brand card)' },
  { key: 'stats', label: 'Stats (numbers row)' },
  { key: 'mission', label: 'Mission (full-bleed quote)' },
];

interface Item {
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

export default function AdminHMSections() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Section | null>(null);
  const [form, setForm] = useState<any>({});
  const [items, setItems] = useState<Item[]>([]);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-hm-sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('hmspace_sections').select('*').order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const upsert = useMutation({
    mutationFn: async (d: any) => {
      if (editing) {
        const { error } = await supabase.from('hmspace_sections').update(d).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('hmspace_sections').insert([d]);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-hm-sections'] }); toast.success('Section saved'); reset(); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => deleteRow('hmspace_sections', id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-hm-sections'] }); toast.success('Section deleted'); },
    onError: (e: any) => toast.error(e.message),
  });

  const reset = () => { setForm({}); setItems([]); setEditing(null); setIsOpen(false); };

  const onEdit = (s: Section) => {
    setEditing(s);
    setForm({ ...s });
    setItems(Array.isArray(s.items) ? (s.items as unknown as Item[]) : []);
    setIsOpen(true);
  };

  const onNew = () => {
    setEditing(null);
    setForm({ section_key: '', sort_order: 0, is_active: true });
    setItems([]);
    setIsOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const d: any = {
      section_key: form.section_key,
      eyebrow_ka: form.eyebrow_ka || null,
      eyebrow_ru: form.eyebrow_ru || null,
      eyebrow_en: form.eyebrow_en || null,
      title_ka: form.title_ka || null,
      title_ru: form.title_ru || null,
      title_en: form.title_en || null,
      subtitle_ka: form.subtitle_ka || null,
      subtitle_ru: form.subtitle_ru || null,
      subtitle_en: form.subtitle_en || null,
      body_ka: form.body_ka || null,
      body_ru: form.body_ru || null,
      body_en: form.body_en || null,
      image_url: form.image_url || null,
      secondary_image_url: form.secondary_image_url || null,
      cta_label_ka: form.cta_label_ka || null,
      cta_label_ru: form.cta_label_ru || null,
      cta_label_en: form.cta_label_en || null,
      cta_url: form.cta_url || null,
      cta_secondary_label_ka: form.cta_secondary_label_ka || null,
      cta_secondary_label_ru: form.cta_secondary_label_ru || null,
      cta_secondary_label_en: form.cta_secondary_label_en || null,
      cta_secondary_url: form.cta_secondary_url || null,
      items: items,
      is_active: form.is_active ?? true,
      sort_order: parseInt(form.sort_order?.toString() || '0') || 0,
    };
    upsert.mutate(d);
  };

  const addItem = () => setItems([...items, { title_ka: '', title_ru: '', title_en: '' }]);
  const updateItem = (i: number, key: keyof Item, value: string) => {
    const copy = [...items];
    copy[i] = { ...copy[i], [key]: value };
    setItems(copy);
  };
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));

  const showItems = ['values', 'stats', 'about'].includes(form.section_key);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">HMspace Landing Sections</h1>
            <p className="text-gray-500 mt-1">Edit text, images, and sub-items for every section on the HMspace homepage.</p>
          </div>
          <Button onClick={onNew}><Plus className="h-4 w-4 mr-2" />New Section</Button>
        </div>

        <Card><CardContent className="p-0">
          {isLoading ? <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div> : (
            <div className="divide-y">
              {data?.map((s) => {
                const known = KNOWN_SECTIONS.find(k => k.key === s.section_key);
                return (
                  <div key={s.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                    {s.image_url && <img src={s.image_url} alt="" className="h-16 w-24 object-cover rounded" />}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">{s.section_key}</span>
                        <span className="text-gray-500 text-xs">{known?.label || 'Custom section'}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${s.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{s.is_active ? 'Active' : 'Inactive'}</span>
                      </div>
                      <p className="font-medium mt-1 truncate">{s.title_ka || s.eyebrow_ka || '(no title)'}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{s.body_ka}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => onEdit(s)}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => { if (confirm(`Delete section "${s.section_key}"?`)) del.mutate(s.id); }} className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                );
              })}
              {data?.length === 0 && <div className="text-center py-8 text-gray-500">No sections yet</div>}
            </div>
          )}
        </CardContent></Card>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? `Edit section: ${editing.section_key}` : 'New section'}</DialogTitle></DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Section Key *</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.section_key || ''} onChange={(e) => setForm({ ...form, section_key: e.target.value })} required>
                    <option value="">-- choose --</option>
                    {KNOWN_SECTIONS.map(k => <option key={k.key} value={k.key}>{k.label}</option>)}
                  </select>
                </div>
                <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Eyebrow (KA)</Label><Input value={form.eyebrow_ka || ''} onChange={(e) => setForm({ ...form, eyebrow_ka: e.target.value })} /></div>
                <div className="space-y-2"><Label>Eyebrow (RU)</Label><Input value={form.eyebrow_ru || ''} onChange={(e) => setForm({ ...form, eyebrow_ru: e.target.value })} /></div>
                <div className="space-y-2"><Label>Eyebrow (EN)</Label><Input value={form.eyebrow_en || ''} onChange={(e) => setForm({ ...form, eyebrow_en: e.target.value })} /></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Title (KA)</Label><Input value={form.title_ka || ''} onChange={(e) => setForm({ ...form, title_ka: e.target.value })} /></div>
                <div className="space-y-2"><Label>Title (RU)</Label><Input value={form.title_ru || ''} onChange={(e) => setForm({ ...form, title_ru: e.target.value })} /></div>
                <div className="space-y-2"><Label>Title (EN)</Label><Input value={form.title_en || ''} onChange={(e) => setForm({ ...form, title_en: e.target.value })} /></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Subtitle (KA)</Label><Input value={form.subtitle_ka || ''} onChange={(e) => setForm({ ...form, subtitle_ka: e.target.value })} /></div>
                <div className="space-y-2"><Label>Subtitle (RU)</Label><Input value={form.subtitle_ru || ''} onChange={(e) => setForm({ ...form, subtitle_ru: e.target.value })} /></div>
                <div className="space-y-2"><Label>Subtitle (EN)</Label><Input value={form.subtitle_en || ''} onChange={(e) => setForm({ ...form, subtitle_en: e.target.value })} /></div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Body (KA)</Label><Textarea rows={3} value={form.body_ka || ''} onChange={(e) => setForm({ ...form, body_ka: e.target.value })} /></div>
                <div className="space-y-2"><Label>Body (RU)</Label><Textarea rows={3} value={form.body_ru || ''} onChange={(e) => setForm({ ...form, body_ru: e.target.value })} /></div>
                <div className="space-y-2"><Label>Body (EN)</Label><Textarea rows={3} value={form.body_en || ''} onChange={(e) => setForm({ ...form, body_en: e.target.value })} /></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Image URL</Label><Input value={form.image_url || ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
                <div className="space-y-2"><Label>Secondary Image URL</Label><Input value={form.secondary_image_url || ''} onChange={(e) => setForm({ ...form, secondary_image_url: e.target.value })} /></div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <p className="font-medium text-sm">Primary CTA</p>
                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-1"><Label className="text-xs">Label KA</Label><Input value={form.cta_label_ka || ''} onChange={(e) => setForm({ ...form, cta_label_ka: e.target.value })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Label RU</Label><Input value={form.cta_label_ru || ''} onChange={(e) => setForm({ ...form, cta_label_ru: e.target.value })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Label EN</Label><Input value={form.cta_label_en || ''} onChange={(e) => setForm({ ...form, cta_label_en: e.target.value })} /></div>
                  <div className="space-y-1"><Label className="text-xs">URL</Label><Input value={form.cta_url || ''} onChange={(e) => setForm({ ...form, cta_url: e.target.value })} /></div>
                </div>
                <p className="font-medium text-sm">Secondary CTA</p>
                <div className="grid grid-cols-4 gap-3">
                  <div className="space-y-1"><Label className="text-xs">Label KA</Label><Input value={form.cta_secondary_label_ka || ''} onChange={(e) => setForm({ ...form, cta_secondary_label_ka: e.target.value })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Label RU</Label><Input value={form.cta_secondary_label_ru || ''} onChange={(e) => setForm({ ...form, cta_secondary_label_ru: e.target.value })} /></div>
                  <div className="space-y-1"><Label className="text-xs">Label EN</Label><Input value={form.cta_secondary_label_en || ''} onChange={(e) => setForm({ ...form, cta_secondary_label_en: e.target.value })} /></div>
                  <div className="space-y-1"><Label className="text-xs">URL</Label><Input value={form.cta_secondary_url || ''} onChange={(e) => setForm({ ...form, cta_secondary_url: e.target.value })} /></div>
                </div>
              </div>

              {showItems && (
                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">Sub-items ({form.section_key === 'stats' ? 'stat rows' : form.section_key === 'values' ? 'value cards' : 'inline stats'})</p>
                    <Button type="button" size="sm" variant="outline" onClick={addItem}><Plus className="h-3 w-3 mr-1" />Add item</Button>
                  </div>
                  {items.map((it, i) => (
                    <div key={i} className="p-3 border rounded-lg space-y-2 relative bg-gray-50">
                      <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 text-red-600 h-7 w-7" onClick={() => removeItem(i)}><Trash2 className="h-3 w-3" /></Button>
                      <div className="grid grid-cols-4 gap-2">
                        {form.section_key === 'values' && <>
                          <div><Label className="text-xs">Icon</Label><Input value={it.icon || ''} onChange={(e) => updateItem(i, 'icon', e.target.value)} placeholder="Sparkles" /></div>
                          <div><Label className="text-xs">Number</Label><Input value={it.num || ''} onChange={(e) => updateItem(i, 'num', e.target.value)} placeholder="01" /></div>
                        </>}
                        {(form.section_key === 'stats' || form.section_key === 'about') && <>
                          <div className="col-span-2"><Label className="text-xs">Value</Label><Input value={it.value || ''} onChange={(e) => updateItem(i, 'value', e.target.value)} placeholder="35+" /></div>
                        </>}
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {form.section_key === 'values' ? <>
                          <div><Label className="text-xs">Title KA</Label><Input value={it.title_ka || ''} onChange={(e) => updateItem(i, 'title_ka', e.target.value)} /></div>
                          <div><Label className="text-xs">Title RU</Label><Input value={it.title_ru || ''} onChange={(e) => updateItem(i, 'title_ru', e.target.value)} /></div>
                          <div><Label className="text-xs">Title EN</Label><Input value={it.title_en || ''} onChange={(e) => updateItem(i, 'title_en', e.target.value)} /></div>
                          <div className="col-span-3"><Label className="text-xs">Description KA</Label><Textarea rows={2} value={it.description_ka || ''} onChange={(e) => updateItem(i, 'description_ka', e.target.value)} /></div>
                          <div className="col-span-3"><Label className="text-xs">Description RU</Label><Textarea rows={2} value={it.description_ru || ''} onChange={(e) => updateItem(i, 'description_ru', e.target.value)} /></div>
                          <div className="col-span-3"><Label className="text-xs">Description EN</Label><Textarea rows={2} value={it.description_en || ''} onChange={(e) => updateItem(i, 'description_en', e.target.value)} /></div>
                        </> : <>
                          <div><Label className="text-xs">Label KA</Label><Input value={it.label_ka || ''} onChange={(e) => updateItem(i, 'label_ka', e.target.value)} /></div>
                          <div><Label className="text-xs">Label RU</Label><Input value={it.label_ru || ''} onChange={(e) => updateItem(i, 'label_ru', e.target.value)} /></div>
                          <div><Label className="text-xs">Label EN</Label><Input value={it.label_en || ''} onChange={(e) => updateItem(i, 'label_en', e.target.value)} /></div>
                        </>}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 pt-2"><Switch checked={form.is_active ?? true} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label>Active</Label></div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button type="button" variant="outline" onClick={reset}>Cancel</Button>
                <Button type="submit" disabled={upsert.isPending}>
                  {upsert.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  {editing ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
