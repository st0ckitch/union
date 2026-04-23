import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, Copy, ExternalLink, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tables } from '@/integrations/supabase/types';
import { BlockEditor, BLOCK_TYPE_LABELS } from './blocks/BlockEditor';

type Block = Tables<'product_content_blocks'>;

interface Props {
  productId: string;
  categoryId: string | null;
}

/**
 * Inline editor shown inside the product edit dialog. Lists this product's
 * scoped blocks, lets admin add/edit/delete/duplicate them, and shows a note
 * about globally-inherited blocks.
 */
export function ProductBlocksEditor({ productId, categoryId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<Block | null>(null);
  const qc = useQueryClient();

  const { data: blocks, isLoading } = useQuery({
    queryKey: ['pb-product', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_content_blocks')
        .select('*')
        .eq('scope', 'product')
        .eq('product_id', productId)
        .order('sort_order');
      if (error) throw error;
      return data as Block[];
    },
    enabled: !!productId,
  });

  const { data: inheritedCount } = useQuery({
    queryKey: ['pb-inherited', categoryId],
    queryFn: async () => {
      const { count: globalCount } = await supabase
        .from('product_content_blocks').select('*', { count: 'exact', head: true })
        .eq('scope', 'global').eq('is_active', true);
      let catCount = 0;
      if (categoryId) {
        const res = await supabase
          .from('product_content_blocks').select('*', { count: 'exact', head: true })
          .eq('scope', 'category').eq('category_id', categoryId).eq('is_active', true);
        catCount = res.count || 0;
      }
      return { global: globalCount || 0, category: catCount };
    },
  });

  const { data: templates } = useQuery({
    queryKey: ['pb-templates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_content_blocks').select('*')
        .eq('scope', 'global')
        .order('sort_order');
      if (error) throw error;
      return data as Block[];
    }
  });

  const save = useMutation({
    mutationFn: async (d: any) => {
      if (editing) {
        const { error } = await supabase.from('product_content_blocks').update(d).eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('product_content_blocks').insert([{ ...d, scope: 'product', product_id: productId }]);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['pb-product', productId] }); toast.success('Block saved'); setIsOpen(false); setEditing(null); },
    onError: (e: any) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from('product_content_blocks').delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['pb-product', productId] }); toast.success('Block deleted'); },
    onError: (e: any) => toast.error(e.message),
  });

  const importFromTemplate = useMutation({
    mutationFn: async (templateId: string) => {
      const tpl = templates?.find(t => t.id === templateId);
      if (!tpl) throw new Error('Template not found');
      const copy: any = { ...tpl };
      delete copy.id; delete copy.created_at; delete copy.updated_at;
      copy.scope = 'product';
      copy.product_id = productId;
      copy.category_id = null;
      copy.sort_order = (blocks?.length || 0) * 10;
      const { error } = await supabase.from('product_content_blocks').insert([copy]);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['pb-product', productId] }); toast.success('Block imported from template'); },
    onError: (e: any) => toast.error(e.message),
  });

  const onNew = () => { setEditing(null); setIsOpen(true); };
  const onEdit = (b: Block) => { setEditing(b); setIsOpen(true); };

  const inheritsMsg = inheritedCount
    ? `This product also inherits ${inheritedCount.global} global and ${inheritedCount.category} category block(s).`
    : '';

  return (
    <div className="space-y-3 border-t pt-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Content blocks for this product</h3>
          <p className="text-xs text-gray-500 mt-0.5">Sections shown below the main product area. {inheritsMsg}{inheritsMsg && <> <Link to="/admin/product-blocks" target="_blank" className="inline-flex items-center gap-1 text-primary underline">Manage inherited blocks <ExternalLink className="h-3 w-3" /></Link></>}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          {templates && templates.length > 0 && (
            <div className="relative group">
              <Button type="button" variant="outline" size="sm"><Copy className="h-3 w-3 mr-1" />Import template</Button>
              <div className="absolute right-0 top-full mt-1 bg-white border rounded shadow-lg min-w-[240px] max-h-[300px] overflow-y-auto z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {templates.map(t => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => importFromTemplate.mutate(t.id)}
                    className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm border-b last:border-0 block"
                  >
                    <p className="font-medium truncate">{t.title_ka || BLOCK_TYPE_LABELS[t.block_type]}</p>
                    <p className="text-xs text-gray-500">{BLOCK_TYPE_LABELS[t.block_type]}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
          <Button type="button" size="sm" onClick={onNew}><Plus className="h-3 w-3 mr-1" />Add block</Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin text-gray-400" /></div>
        ) : blocks && blocks.length > 0 ? (
          <div className="divide-y">
            {blocks.map(b => (
              <div key={b.id} className="p-3 flex items-center gap-3 hover:bg-gray-50">
                <Box className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">{b.block_type}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{b.title_ka || <em className="text-gray-400">(no title)</em>}</p>
                  <p className="text-xs text-gray-500">{BLOCK_TYPE_LABELS[b.block_type]} · sort {b.sort_order}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs ${b.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{b.is_active ? 'Active' : 'Inactive'}</span>
                <Button type="button" variant="ghost" size="icon" onClick={() => onEdit(b)}><Pencil className="h-4 w-4" /></Button>
                <Button type="button" variant="ghost" size="icon" onClick={() => { if (confirm('Delete this block?')) del.mutate(b.id); }} className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500 text-sm">
            No product-specific blocks yet. Add one or import from a template.
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Edit block' : 'New block for this product'}</DialogTitle></DialogHeader>
          <BlockEditor
            initial={editing || { scope: 'product', product_id: productId }}
            onSave={async (d) => { await save.mutateAsync(d); }}
            onCancel={() => { setIsOpen(false); setEditing(null); }}
            isSaving={save.isPending}
            lockScope="product"
            lockProductId={productId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
