import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, Globe, FolderTree, Box } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { BlockEditor, BLOCK_TYPE_LABELS } from '@/components/admin/blocks/BlockEditor';

type Block = Tables<'product_content_blocks'>;
type Category = Tables<'categories'>;

export default function AdminProductBlocks() {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Block | null>(null);
  const qc = useQueryClient();

  const { data: blocks, isLoading } = useQuery({
    queryKey: ['admin-product-blocks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_content_blocks')
        .select('*')
        .in('scope', ['global', 'category'])
        .order('sort_order');
      if (error) throw error;
      return data as Block[];
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['admin-categories-all'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('name_ka');
      if (error) throw error;
      return data as Category[];
    }
  });

  const catName = (id: string | null | undefined) => categories?.find(c => c.id === id)?.name_ka || id || '—';

  const save = useMutation({
    mutationFn: async (d: any) => {
      if (editing) {
        const { error } = await supabase.from('product_content_blocks').update(d).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('product_content_blocks').insert([d]);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-product-blocks'] }); toast.success('Block saved'); setIsOpen(false); setEditing(null); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from('product_content_blocks').delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-product-blocks'] }); toast.success('Block deleted'); },
    onError: (e: any) => toast.error(e.message),
  });

  const onNew = () => { setEditing(null); setIsOpen(true); };
  const onEdit = (b: Block) => { setEditing(b); setIsOpen(true); };

  const globals = (blocks || []).filter(b => b.scope === 'global');
  const byCategory = (blocks || []).filter(b => b.scope === 'category');

  const renderRow = (b: Block) => (
    <div key={b.id} className="p-4 flex items-center gap-3 hover:bg-gray-50 border-b last:border-0">
      <div className="flex-shrink-0">
        {b.scope === 'global' ? <Globe className="h-4 w-4 text-blue-600" />
          : b.scope === 'category' ? <FolderTree className="h-4 w-4 text-amber-600" />
          : <Box className="h-4 w-4 text-gray-600" />}
      </div>
      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">{b.block_type}</span>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{b.title_ka || <em className="text-gray-400">(no title)</em>}</p>
        <p className="text-xs text-gray-500">{BLOCK_TYPE_LABELS[b.block_type]} {b.scope === 'category' && `· ${catName(b.category_id)}`} · sort {b.sort_order}</p>
      </div>
      <span className={`px-2 py-0.5 rounded-full text-xs ${b.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{b.is_active ? 'Active' : 'Inactive'}</span>
      <Button variant="ghost" size="icon" onClick={() => onEdit(b)}><Pencil className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon" onClick={() => { if (confirm('Delete this block?')) del.mutate(b.id); }} className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
    </div>
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Product Content Blocks</h1>
            <p className="text-gray-500 mt-1">Sections shown on every product page (global) or every product in a category. For per-product blocks, edit inside the product itself.</p>
          </div>
          <Button onClick={onNew}><Plus className="h-4 w-4 mr-2" />New Block</Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>
        ) : (
          <>
            <Card>
              <div className="p-4 border-b bg-blue-50">
                <h2 className="font-semibold flex items-center gap-2 text-blue-900"><Globe className="h-4 w-4" />Global blocks ({globals.length})</h2>
                <p className="text-xs text-blue-800 mt-0.5">Shown on every product page.</p>
              </div>
              <CardContent className="p-0">
                {globals.length === 0 ? <div className="text-center py-6 text-gray-500 text-sm">No global blocks.</div> : globals.map(renderRow)}
              </CardContent>
            </Card>

            <Card>
              <div className="p-4 border-b bg-amber-50">
                <h2 className="font-semibold flex items-center gap-2 text-amber-900"><FolderTree className="h-4 w-4" />Category blocks ({byCategory.length})</h2>
                <p className="text-xs text-amber-800 mt-0.5">Shown on every product in a selected category.</p>
              </div>
              <CardContent className="p-0">
                {byCategory.length === 0 ? <div className="text-center py-6 text-gray-500 text-sm">No category blocks.</div> : byCategory.map(renderRow)}
              </CardContent>
            </Card>
          </>
        )}

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? 'Edit block' : 'New block'}</DialogTitle></DialogHeader>
            <BlockEditor
              initial={editing || { scope: 'global' }}
              onSave={async (d) => { await save.mutateAsync(d); }}
              onCancel={() => { setIsOpen(false); setEditing(null); }}
              isSaving={save.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
