import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';

type Table = 'door_korobka_options' | 'door_model_options';

interface Props {
  table: Table;
  queryKey: string;
  singularNoun: string;   // "Frame" / "Model"
  pluralNoun: string;     // "Frames" / "Models"
  codePlaceholder: string; // "invisible" / "vento"
}

/**
 * Admin CRUD list for a flat option pool with (code, name, description, image, price_modifier).
 * Used by both door_korobka_options and door_model_options since they share the same shape.
 */
export function FlatOptionList({ table, queryKey, singularNoun, pluralNoun, codePlaceholder }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select('*').order('sort_order');
      if (error) throw error;
      return data;
    }
  });

  const save = useMutation({
    mutationFn: async (d: any) => {
      if (editing) {
        const { error } = await supabase.from(table).update(d).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from(table).insert([d]);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [queryKey] }); toast.success(`${singularNoun} saved`); reset(); },
    onError: (e: any) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from(table).delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [queryKey] }); toast.success(`${singularNoun} deleted`); },
    onError: (e: any) => toast.error(e.message),
  });

  const reset = () => { setForm({}); setEditing(null); setIsOpen(false); };
  const onNew = () => { setEditing(null); setForm({ sort_order: 0, is_active: true, price_modifier: 0 }); setIsOpen(true); };
  const onEdit = (o: any) => { setEditing(o); setForm({ ...o }); setIsOpen(true); };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = {
      code: form.code || null,
      name_ka: form.name_ka,
      name_ru: form.name_ru || null,
      name_en: form.name_en || null,
      description_ka: form.description_ka || null,
      description_ru: form.description_ru || null,
      description_en: form.description_en || null,
      image_url: form.image_url || null,
      preview_image_url: form.preview_image_url || null,
      price_modifier: parseFloat(form.price_modifier?.toString() || '0') || 0,
      sort_order: parseInt(form.sort_order?.toString() || '0') || 0,
      is_active: form.is_active ?? true,
    };
    save.mutate(d);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Door {pluralNoun}</h1>
          <p className="text-gray-500 mt-1">Global pool of {pluralNoun.toLowerCase()} — attach per product in the product editor.</p>
        </div>
        <Button onClick={onNew}><Plus className="h-4 w-4 mr-2" />Add {singularNoun}</Button>
      </div>

      <Card><CardContent className="p-0">
        {isLoading ? <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div> : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {data?.map((o: any) => (
              <div key={o.id} className="border rounded-lg overflow-hidden group relative">
                {o.image_url ? (
                  <img src={o.image_url} alt={o.name_ka} className="w-full aspect-video object-cover" />
                ) : (
                  <div className="w-full aspect-video bg-gray-100 flex items-center justify-center text-xs text-gray-400">no image</div>
                )}
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{o.name_ka}</p>
                    {o.code && <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{o.code}</span>}
                  </div>
                  {o.description_ka && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{o.description_ka}</p>}
                  <div className="flex gap-1 mt-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${o.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{o.is_active ? 'Active' : 'Inactive'}</span>
                    {o.price_modifier ? <span className="text-[10px] text-gray-500">{o.price_modifier > 0 ? '+' : ''}{o.price_modifier}</span> : null}
                  </div>
                </div>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => onEdit(o)}><Pencil className="h-3 w-3" /></Button>
                  <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => { if (confirm(`Delete "${o.name_ka}"?`)) del.mutate(o.id); }}><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
            {data?.length === 0 && <div className="col-span-full text-center py-8 text-gray-500">No {pluralNoun.toLowerCase()} yet</div>}
          </div>
        )}
      </CardContent></Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{editing ? `Edit ${singularNoun}` : `Add ${singularNoun}`}</DialogTitle></DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Code</Label><Input value={form.code || ''} onChange={(e) => setForm({ ...form, code: e.target.value.toLowerCase() })} placeholder={codePlaceholder} /></div>
              <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2"><Label>Name (KA) *</Label><Input value={form.name_ka || ''} onChange={(e) => setForm({ ...form, name_ka: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Name (RU)</Label><Input value={form.name_ru || ''} onChange={(e) => setForm({ ...form, name_ru: e.target.value })} /></div>
              <div className="space-y-2"><Label>Name (EN)</Label><Input value={form.name_en || ''} onChange={(e) => setForm({ ...form, name_en: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2"><Label>Description (KA)</Label><Textarea rows={2} value={form.description_ka || ''} onChange={(e) => setForm({ ...form, description_ka: e.target.value })} /></div>
              <div className="space-y-2"><Label>Description (RU)</Label><Textarea rows={2} value={form.description_ru || ''} onChange={(e) => setForm({ ...form, description_ru: e.target.value })} /></div>
              <div className="space-y-2"><Label>Description (EN)</Label><Textarea rows={2} value={form.description_en || ''} onChange={(e) => setForm({ ...form, description_en: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Image URL</Label><Input value={form.image_url || ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
            {form.image_url && <img src={form.image_url} alt="" className="h-32 w-full object-cover rounded border" />}
            <div className="space-y-2"><Label>Preview image URL (full door with this option)</Label><Input value={form.preview_image_url || ''} onChange={(e) => setForm({ ...form, preview_image_url: e.target.value })} /></div>
            <div className="space-y-2"><Label>Price modifier</Label><Input type="number" step="0.01" value={form.price_modifier ?? 0} onChange={(e) => setForm({ ...form, price_modifier: e.target.value })} placeholder="0 = no change" /></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_active ?? true} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label>Active</Label></div>
            <div className="flex justify-end gap-2 border-t pt-4">
              <Button type="button" variant="outline" onClick={reset}>Cancel</Button>
              <Button type="submit" disabled={save.isPending}>{save.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}{editing ? 'Update' : 'Create'}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
