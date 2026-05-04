import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, ChevronLeft } from 'lucide-react';
import { deleteRow } from '@/lib/adminMutations';

export default function AdminFurnitureModules() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialParent = searchParams.get('product') || '';
  const [parentProductId, setParentProductId] = useState<string>(initialParent);
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>({});
  const qc = useQueryClient();

  // List all furniture-typed products so the admin can pick which one to edit modules for
  const { data: parents = [] } = useQuery({
    queryKey: ['admin-furniture-parents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, slug, name_ka, name_ru')
        .eq('category_type', 'furniture')
        .order('name_ka');
      if (error) throw error;
      return data;
    },
  });

  const { data: modules = [], isLoading } = useQuery({
    queryKey: ['admin-furniture-modules', parentProductId],
    enabled: !!parentProductId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('furniture_modules' as any)
        .select('*')
        .eq('parent_product_id', parentProductId)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async (d: any) => {
      if (editing) {
        const { error } = await supabase.from('furniture_modules' as any).update(d).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('furniture_modules' as any).insert([{ ...d, parent_product_id: parentProductId }]);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-furniture-modules', parentProductId] }); toast.success('Module saved'); reset(); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: (id: string) => deleteRow('furniture_modules', id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-furniture-modules', parentProductId] }); toast.success('Module deleted'); },
    onError: (e: any) => toast.error(e.message),
  });

  const reset = () => { setForm({}); setEditing(null); setIsOpen(false); };

  const onNew = () => {
    setEditing(null);
    setForm({ sort_order: 0, is_active: true, base_price: 0 });
    setIsOpen(true);
  };

  const onEdit = (m: any) => { setEditing(m); setForm({ ...m }); setIsOpen(true); };

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
      dimensions_text: form.dimensions_text || null,
      base_price: parseFloat(form.base_price?.toString() || '0') || 0,
      image_url: form.image_url || null,
      sort_order: parseInt(form.sort_order?.toString() || '0') || 0,
      is_active: form.is_active ?? true,
    };
    save.mutate(d);
  };

  const onParentChange = (id: string) => {
    setParentProductId(id);
    if (id) setSearchParams({ product: id }); else setSearchParams({});
  };

  const parent = parents.find((p: any) => p.id === parentProductId);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Furniture Modules</h1>
            <p className="text-gray-500 mt-1">Per-product modules (M01–M15) for furniture configurators (FORMINA-style).</p>
          </div>
          {parentProductId && (
            <Button onClick={onNew}><Plus className="h-4 w-4 mr-2" />Add Module</Button>
          )}
        </div>

        <div className="bg-white border rounded-lg p-4">
          <Label>Parent product</Label>
          <Select value={parentProductId || '__none__'} onValueChange={(v) => onParentChange(v === '__none__' ? '' : v)}>
            <SelectTrigger className="max-w-md mt-2">
              <SelectValue placeholder="Pick a furniture-typed product" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__none__">— Select —</SelectItem>
              {parents.map((p: any) => (
                <SelectItem key={p.id} value={p.id}>{p.name_ru || p.name_ka}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {parents.length === 0 && (
            <p className="text-xs text-amber-600 mt-2">
              No products with category_type='furniture' yet. Create one in <Link to="/admin/products" className="underline">Products</Link> and set its Category type.
            </p>
          )}
          {parent && (
            <p className="text-xs text-gray-500 mt-2">Editing modules for: <span className="font-mono">{parent.slug}</span></p>
          )}
        </div>

        {parentProductId && (
          <Card><CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {modules.map((m: any) => (
                  <div key={m.id} className="border rounded-lg overflow-hidden group relative">
                    {m.image_url
                      ? <img src={m.image_url} alt={m.name_ka} className="w-full aspect-square object-cover" />
                      : <div className="w-full aspect-square bg-gray-100 flex items-center justify-center text-xs text-gray-400">no image</div>
                    }
                    <div className="p-3">
                      <div className="flex items-center gap-2">
                        {m.code && <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600">{m.code}</span>}
                        <p className="font-medium truncate">{m.name_ka}</p>
                      </div>
                      {m.dimensions_text && <p className="text-xs text-gray-500 mt-1">{m.dimensions_text}</p>}
                      <p className="text-sm font-semibold mt-1">{Number(m.base_price).toLocaleString()} ₾</p>
                      <span className={`mt-2 inline-block px-2 py-0.5 rounded-full text-[10px] ${m.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{m.is_active ? 'Active' : 'Inactive'}</span>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => onEdit(m)}><Pencil className="h-3 w-3" /></Button>
                      <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => { if (confirm(`Delete "${m.name_ka}"?`)) del.mutate(m.id); }}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                ))}
                {modules.length === 0 && (
                  <div className="col-span-full text-center py-8 text-gray-500">No modules yet. Click "Add Module".</div>
                )}
              </div>
            )}
          </CardContent></Card>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>{editing ? 'Edit Module' : 'Add Module'}</DialogTitle></DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Code</Label><Input value={form.code || ''} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="M01" /></div>
                <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
                <div className="space-y-2"><Label>Base price</Label><Input type="number" step="0.01" value={form.base_price ?? 0} onChange={(e) => setForm({ ...form, base_price: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Name (KA) *</Label><Input value={form.name_ka || ''} onChange={(e) => setForm({ ...form, name_ka: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Name (RU)</Label><Input value={form.name_ru || ''} onChange={(e) => setForm({ ...form, name_ru: e.target.value })} /></div>
                <div className="space-y-2"><Label>Name (EN)</Label><Input value={form.name_en || ''} onChange={(e) => setForm({ ...form, name_en: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Dimensions text</Label><Input value={form.dimensions_text || ''} onChange={(e) => setForm({ ...form, dimensions_text: e.target.value })} placeholder="750×580×2065mm" /></div>
              <div className="space-y-2"><Label>Image URL</Label><Input value={form.image_url || ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} /></div>
              {form.image_url && <img src={form.image_url} alt="" className="h-32 w-full object-cover rounded border" />}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Description (KA)</Label><Textarea rows={2} value={form.description_ka || ''} onChange={(e) => setForm({ ...form, description_ka: e.target.value })} /></div>
                <div className="space-y-2"><Label>Description (RU)</Label><Textarea rows={2} value={form.description_ru || ''} onChange={(e) => setForm({ ...form, description_ru: e.target.value })} /></div>
                <div className="space-y-2"><Label>Description (EN)</Label><Textarea rows={2} value={form.description_en || ''} onChange={(e) => setForm({ ...form, description_en: e.target.value })} /></div>
              </div>
              <div className="flex items-center gap-2"><Switch checked={form.is_active ?? true} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label>Active</Label></div>
              <div className="flex justify-end gap-2 border-t pt-4">
                <Button type="button" variant="outline" onClick={reset}>Cancel</Button>
                <Button type="submit" disabled={save.isPending}>
                  {save.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
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
