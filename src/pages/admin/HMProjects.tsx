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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { deleteRow } from '@/lib/adminMutations';

type Project = Tables<'hmspace_projects'>;

export default function AdminHMProjects() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<any>({
    title_ka: '', title_ru: '', title_en: '',
    description_ka: '', description_ru: '', description_en: '',
    image_url: '', link_url: '', location: '', year: '',
    sort_order: '0', is_active: true, is_featured: false,
  });
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-hm-projects'],
    queryFn: async () => {
      const { data, error } = await supabase.from('hmspace_projects').select('*').order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const create = useMutation({
    mutationFn: async (d: any) => { const { error } = await supabase.from('hmspace_projects').insert([d]); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-hm-projects'] }); toast.success('Project created'); reset(); },
    onError: (e: any) => toast.error(e.message),
  });
  const update = useMutation({
    mutationFn: async ({ id, d }: { id: string; d: any }) => { const { error } = await supabase.from('hmspace_projects').update(d).eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-hm-projects'] }); toast.success('Project updated'); reset(); },
    onError: (e: any) => toast.error(e.message),
  });
  const del = useMutation({
    mutationFn: (id: string) => deleteRow('hmspace_projects', id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-hm-projects'] }); toast.success('Project deleted'); },
    onError: (e: any) => toast.error(e.message),
  });

  const reset = () => {
    setForm({ title_ka: '', title_ru: '', title_en: '', description_ka: '', description_ru: '', description_en: '', image_url: '', link_url: '', location: '', year: '', sort_order: '0', is_active: true, is_featured: false });
    setEditing(null); setIsOpen(false);
  };

  const onEdit = (p: Project) => {
    setEditing(p);
    setForm({
      title_ka: p.title_ka || '', title_ru: p.title_ru || '', title_en: p.title_en || '',
      description_ka: p.description_ka || '', description_ru: p.description_ru || '', description_en: p.description_en || '',
      image_url: p.image_url || '', link_url: p.link_url || '',
      location: p.location || '', year: p.year || '',
      sort_order: p.sort_order?.toString() || '0',
      is_active: p.is_active ?? true, is_featured: p.is_featured ?? false,
    });
    setIsOpen(true);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = {
      title_ka: form.title_ka,
      title_ru: form.title_ru || null,
      title_en: form.title_en || null,
      description_ka: form.description_ka || null,
      description_ru: form.description_ru || null,
      description_en: form.description_en || null,
      image_url: form.image_url,
      link_url: form.link_url || null,
      location: form.location || null,
      year: form.year || null,
      sort_order: parseInt(form.sort_order) || 0,
      is_active: form.is_active,
      is_featured: form.is_featured,
    };
    if (editing) update.mutate({ id: editing.id, d });
    else create.mutate(d);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">HMspace Projects</h1>
            <p className="text-gray-500 mt-1">Portfolio / projects gallery shown on the HMspace landing.</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild><Button onClick={reset}><Plus className="h-4 w-4 mr-2" />Add Project</Button></DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader><DialogTitle>{editing ? 'Edit Project' : 'Add Project'}</DialogTitle></DialogHeader>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2"><Label>Title (KA) *</Label><Input value={form.title_ka} onChange={(e) => setForm({ ...form, title_ka: e.target.value })} required /></div>
                  <div className="space-y-2"><Label>Title (RU)</Label><Input value={form.title_ru} onChange={(e) => setForm({ ...form, title_ru: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Title (EN)</Label><Input value={form.title_en} onChange={(e) => setForm({ ...form, title_en: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2"><Label>Description (KA)</Label><Textarea rows={2} value={form.description_ka} onChange={(e) => setForm({ ...form, description_ka: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Description (RU)</Label><Textarea rows={2} value={form.description_ru} onChange={(e) => setForm({ ...form, description_ru: e.target.value })} /></div>
                  <div className="space-y-2"><Label>Description (EN)</Label><Textarea rows={2} value={form.description_en} onChange={(e) => setForm({ ...form, description_en: e.target.value })} /></div>
                </div>
                <div className="space-y-2"><Label>Image URL *</Label><Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} required /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Link URL</Label><Input value={form.link_url} onChange={(e) => setForm({ ...form, link_url: e.target.value })} placeholder="/project-slug" /></div>
                  <div className="space-y-2"><Label>Sort Order</Label><Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Tbilisi" /></div>
                  <div className="space-y-2"><Label>Year</Label><Input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" /></div>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2"><Switch checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} /><Label>Active</Label></div>
                  <div className="flex items-center gap-2"><Switch checked={form.is_featured} onCheckedChange={(v) => setForm({ ...form, is_featured: v })} /><Label>Featured</Label></div>
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
                <TableHead>Image</TableHead><TableHead>Title</TableHead><TableHead>Location / Year</TableHead>
                <TableHead>Order</TableHead><TableHead>Status</TableHead><TableHead className="w-[100px]">Actions</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {data?.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell><img src={p.image_url} alt="" className="h-14 w-20 object-cover rounded" /></TableCell>
                    <TableCell className="font-medium">{p.title_ka}</TableCell>
                    <TableCell className="text-gray-500">{[p.location, p.year].filter(Boolean).join(' • ')}</TableCell>
                    <TableCell>{p.sort_order}</TableCell>
                    <TableCell><div className="flex gap-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${p.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{p.is_active ? 'Active' : 'Inactive'}</span>
                      {p.is_featured && <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-800">Featured</span>}
                    </div></TableCell>
                    <TableCell><div className="flex gap-2">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(p)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { if (confirm(`Delete "${p.title_ka}"?`)) del.mutate(p.id); }} className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                    </div></TableCell>
                  </TableRow>
                ))}
                {data?.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-500">No projects yet</TableCell></TableRow>}
              </TableBody>
            </Table>
          )}
        </CardContent></Card>
      </div>
    </AdminLayout>
  );
}
