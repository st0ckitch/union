import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, Truck, Shield, CreditCard, Headphones, Star, Award, Package, Users, Sparkles, Heart, Clock, MapPin } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { deleteRow } from '@/lib/adminMutations';

type Feature = Tables<'site_features'>;

const ICON_OPTIONS = ['Truck', 'Shield', 'CreditCard', 'Headphones', 'Star', 'Award', 'Package', 'Users', 'Sparkles', 'Heart', 'Clock', 'MapPin'];
const iconMap: Record<string, any> = { Truck, Shield, CreditCard, Headphones, Star, Award, Package, Users, Sparkles, Heart, Clock, MapPin };

export default function AdminSiteFeatures() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Feature | null>(null);
  const [form, setForm] = useState({
    icon: 'Truck',
    title_ka: '',
    title_ru: '',
    title_en: '',
    description_ka: '',
    description_ru: '',
    description_en: '',
    sort_order: '0',
    is_active: true,
  });
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-site-features'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_features').select('*').order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const create = useMutation({
    mutationFn: async (d: any) => { const { error } = await supabase.from('site_features').insert([d]); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-site-features'] }); toast.success('Feature created'); reset(); },
    onError: (e: any) => toast.error(e.message),
  });
  const update = useMutation({
    mutationFn: async ({ id, d }: { id: string; d: any }) => { const { error } = await supabase.from('site_features').update(d).eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-site-features'] }); toast.success('Feature updated'); reset(); },
    onError: (e: any) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: (id: string) => deleteRow('site_features', id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-site-features'] }); toast.success('Feature deleted'); },
    onError: (e: any) => toast.error(e.message),
  });

  const reset = () => {
    setForm({ icon: 'Truck', title_ka: '', title_ru: '', title_en: '', description_ka: '', description_ru: '', description_en: '', sort_order: '0', is_active: true });
    setEditing(null);
    setIsOpen(false);
  };

  const onEdit = (f: Feature) => {
    setEditing(f);
    setForm({
      icon: f.icon || 'Truck',
      title_ka: f.title_ka || '',
      title_ru: f.title_ru || '',
      title_en: f.title_en || '',
      description_ka: f.description_ka || '',
      description_ru: f.description_ru || '',
      description_en: f.description_en || '',
      sort_order: f.sort_order?.toString() || '0',
      is_active: f.is_active ?? true,
    });
    setIsOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = {
      icon: form.icon,
      title_ka: form.title_ka,
      title_ru: form.title_ru || null,
      title_en: form.title_en || null,
      description_ka: form.description_ka || null,
      description_ru: form.description_ru || null,
      description_en: form.description_en || null,
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
            <h1 className="text-3xl font-bold text-gray-900">Home Features Bar</h1>
            <p className="text-gray-500 mt-1">Items shown in the home page feature bar (delivery, warranty, etc.)</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={reset}><Plus className="h-4 w-4 mr-2" />Add Feature</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>{editing ? 'Edit Feature' : 'Add Feature'}</DialogTitle></DialogHeader>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Icon</Label>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={form.icon}
                          onChange={(e) => setForm({ ...form, icon: e.target.value })}>
                    {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2"><Label>Title (KA) *</Label><Input value={form.title_ka} onChange={(e) => setForm({ ...form, title_ka: e.target.value })} required /></div>
                  <div className="space-y-2"><Label>Title (RU)</Label><Input value={form.title_ru} onChange={(e) => setForm({ ...form, title_ru: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Title (EN)</Label><Input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2"><Label>Description (KA)</Label><Input value={form.description_ka} onChange={(e) => setForm({ ...form, description_ka: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Description (RU)</Label><Input value={form.description_ru} onChange={(e) => setForm({ ...form, description_ru: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Description (EN)</Label><Input value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} /></div>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="space-y-2 flex-1"><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
                  <div className="flex items-center gap-2 mt-6"><Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label>Active</Label></div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={reset}>Cancel</Button>
                  <Button type="submit" disabled={create.isPending || update.isPending}>
                    {(create.isPending || update.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editing ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card><CardContent className="p-0">
          {isLoading ? <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div> : (
            <Table>
              <TableHeader><TableRow>
                <TableHead>Icon</TableHead><TableHead>Title</TableHead><TableHead>Description</TableHead>
                <TableHead>Order</TableHead><TableHead>Status</TableHead><TableHead className="w-[100px]">Actions</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {data?.map((f) => {
                  const Icon = iconMap[f.icon] || Truck;
                  return (
                    <TableRow key={f.id}>
                      <TableCell><div className="p-2 rounded-full bg-primary/10 w-fit"><Icon className="h-5 w-5 text-primary" /></div></TableCell>
                      <TableCell className="font-medium">{f.title_ka}</TableCell>
                      <TableCell className="text-gray-500">{f.description_ka}</TableCell>
                      <TableCell>{f.sort_order}</TableCell>
                      <TableCell><span className={`px-2 py-1 rounded-full text-xs ${f.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{f.is_active ? 'Active' : 'Inactive'}</span></TableCell>
                      <TableCell><div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => onEdit(f)}><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" onClick={() => { if (confirm(`Delete "${f.title_ka}"?`)) del.mutate(f.id); }} className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                      </div></TableCell>
                    </TableRow>
                  );
                })}
                {data?.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-500">No features yet</TableCell></TableRow>}
              </TableBody>
            </Table>
          )}
        </CardContent></Card>
      </div>
    </AdminLayout>
  );
}
