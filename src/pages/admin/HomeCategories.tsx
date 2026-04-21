import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Pencil, Loader2, Eye, EyeOff } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Category = Tables<'categories'>;

export default function AdminHomeCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ home_visible: true, home_sort_order: '0', home_image_url: '' });
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-home-categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').is('parent_id', null).order('home_sort_order', { ascending: true });
      if (error) throw error;
      return data as Category[];
    }
  });

  const update = useMutation({
    mutationFn: async ({ id, d }: { id: string; d: any }) => { const { error } = await supabase.from('categories').update(d).eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-home-categories'] }); toast.success('Category updated'); reset(); },
    onError: (e: any) => toast.error(e.message),
  });

  const reset = () => { setEditing(null); setIsOpen(false); };

  const onEdit = (c: Category) => {
    setEditing(c);
    setForm({
      home_visible: c.home_visible ?? false,
      home_sort_order: c.home_sort_order?.toString() || '0',
      home_image_url: c.home_image_url || '',
    });
    setIsOpen(true);
  };

  const toggleVisible = (c: Category) => {
    update.mutate({ id: c.id, d: { home_visible: !c.home_visible } });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    update.mutate({
      id: editing.id,
      d: {
        home_visible: form.home_visible,
        home_sort_order: parseInt(form.home_sort_order) || 0,
        home_image_url: form.home_image_url || null,
      }
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Home Category Grid</h1>
          <p className="text-gray-500 mt-1">Which top-level categories appear on the home page, in what order, and with what image.</p>
        </div>

        <Card><CardContent className="p-0">
          {isLoading ? <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div> : (
            <Table>
              <TableHeader><TableRow>
                <TableHead>Image</TableHead><TableHead>Category</TableHead><TableHead>Slug</TableHead>
                <TableHead>Home sort</TableHead><TableHead>Home visibility</TableHead><TableHead className="w-[100px]">Actions</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {data?.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.home_image_url ? <img src={c.home_image_url} alt="" className="h-12 w-20 object-cover rounded" /> : <div className="h-12 w-20 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">none</div>}</TableCell>
                    <TableCell className="font-medium">{c.name_ka}</TableCell>
                    <TableCell className="text-gray-500 font-mono text-xs">{c.slug}</TableCell>
                    <TableCell>{c.home_sort_order ?? 0}</TableCell>
                    <TableCell>
                      <button onClick={() => toggleVisible(c)} className={`px-3 py-1 rounded-full text-xs inline-flex items-center gap-1 ${c.home_visible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {c.home_visible ? <><Eye className="h-3 w-3" />Visible</> : <><EyeOff className="h-3 w-3" />Hidden</>}
                      </button>
                    </TableCell>
                    <TableCell><Button variant="ghost" size="icon" onClick={() => onEdit(c)}><Pencil className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                ))}
                {data?.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-8 text-gray-500">No top-level categories yet. Create them in the Categories section first.</TableCell></TableRow>}
              </TableBody>
            </Table>
          )}
        </CardContent></Card>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Home grid settings — {editing?.name_ka}</DialogTitle></DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="flex items-center gap-2"><Switch checked={form.home_visible} onCheckedChange={(v) => setForm({ ...form, home_visible: v })} /><Label>Show on home page</Label></div>
              <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={form.home_sort_order} onChange={(e) => setForm({ ...form, home_sort_order: e.target.value })} /></div>
              <div className="space-y-2"><Label>Home image URL</Label><Input value={form.home_image_url} onChange={(e) => setForm({ ...form, home_image_url: e.target.value })} placeholder="https://..." /></div>
              {form.home_image_url && <img src={form.home_image_url} alt="" className="w-full aspect-video object-cover rounded" />}
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={reset}>Cancel</Button>
                <Button type="submit" disabled={update.isPending}>
                  {update.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                  Save
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
