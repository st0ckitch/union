import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { ProductConfiguratorTab } from '@/components/admin/ProductConfiguratorTab';

type Product = Tables<'products'>;
type Category = Tables<'categories'>;

export default function AdminProducts() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name_ka: '',
    name_en: '',
    slug: '',
    description_ka: '',
    description_en: '',
    price: '',
    sale_price: '',
    category_id: '',
    is_active: true,
    is_featured: false,
    is_new: false,
    stock_quantity: '0',
    images: [] as string[],
    has_otdelka_variants: false,
    has_korobka_variants: false,
    has_model_variants: false,
  });
  const [selectedOtdelka, setSelectedOtdelka] = useState<string[]>([]);
  const [selectedKorobka, setSelectedKorobka] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name_ka)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('*').order('name_ka');
      if (error) throw error;
      return data as Category[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('products').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product created');
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from('products').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product updated');
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success('Product deleted');
    },
    onError: (error: any) => toast.error(error.message)
  });

  const resetForm = () => {
    setFormData({
      name_ka: '',
      name_en: '',
      slug: '',
      description_ka: '',
      description_en: '',
      price: '',
      sale_price: '',
      category_id: '',
      is_active: true,
      is_featured: false,
      is_new: false,
      stock_quantity: '0',
      images: [],
      has_otdelka_variants: false,
      has_korobka_variants: false,
      has_model_variants: false,
    });
    setSelectedOtdelka([]);
    setSelectedKorobka([]);
    setSelectedModels([]);
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleEdit = async (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name_ka: product.name_ka || '',
      name_en: product.name_en || '',
      slug: product.slug || '',
      description_ka: product.description_ka || '',
      description_en: product.description_en || '',
      price: product.price?.toString() || '',
      sale_price: product.sale_price?.toString() || '',
      category_id: product.category_id || '',
      is_active: product.is_active ?? true,
      is_featured: product.is_featured ?? false,
      is_new: product.is_new ?? false,
      stock_quantity: product.stock_quantity?.toString() || '0',
      images: product.images || [],
      has_otdelka_variants: product.has_otdelka_variants ?? false,
      has_korobka_variants: product.has_korobka_variants ?? false,
      has_model_variants: product.has_model_variants ?? false,
    });

    // Load existing configurator selections
    const [o, k, m] = await Promise.all([
      supabase.from('product_otdelka_options').select('otdelka_option_id').eq('product_id', product.id),
      supabase.from('product_korobka_options').select('korobka_option_id').eq('product_id', product.id),
      supabase.from('product_model_options').select('model_option_id').eq('product_id', product.id),
    ]);
    setSelectedOtdelka((o.data || []).map(r => r.otdelka_option_id));
    setSelectedKorobka((k.data || []).map(r => r.korobka_option_id));
    setSelectedModels((m.data || []).map(r => r.model_option_id));

    setIsDialogOpen(true);
  };

  /** Replaces pivot rows for a product with exactly the given option IDs. */
  const syncPivot = async (
    table: 'product_otdelka_options' | 'product_korobka_options' | 'product_model_options',
    fk: 'otdelka_option_id' | 'korobka_option_id' | 'model_option_id',
    productId: string,
    optionIds: string[],
  ) => {
    await supabase.from(table).delete().eq('product_id', productId);
    if (optionIds.length > 0) {
      const rows = optionIds.map((id, idx) => ({ product_id: productId, [fk]: id, sort_order: idx } as any));
      const { error } = await supabase.from(table).insert(rows);
      if (error) throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name_ka: formData.name_ka,
      name_en: formData.name_en || null,
      slug: formData.slug || formData.name_ka.toLowerCase().replace(/\s+/g, '-'),
      description_ka: formData.description_ka || null,
      description_en: formData.description_en || null,
      price: parseFloat(formData.price) || 0,
      sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
      category_id: formData.category_id || null,
      is_active: formData.is_active,
      is_featured: formData.is_featured,
      is_new: formData.is_new,
      stock_quantity: parseInt(formData.stock_quantity) || 0,
      images: formData.images,
      has_otdelka_variants: formData.has_otdelka_variants,
      has_korobka_variants: formData.has_korobka_variants,
      has_model_variants: formData.has_model_variants,
    };

    try {
      let productId: string | null = null;
      if (editingProduct) {
        const { error } = await supabase.from('products').update(data).eq('id', editingProduct.id);
        if (error) throw error;
        productId = editingProduct.id;
      } else {
        const { data: inserted, error } = await supabase.from('products').insert([data]).select('id').single();
        if (error) throw error;
        productId = inserted.id;
      }

      if (productId) {
        await syncPivot('product_otdelka_options', 'otdelka_option_id', productId, formData.has_otdelka_variants ? selectedOtdelka : []);
        await syncPivot('product_korobka_options', 'korobka_option_id', productId, formData.has_korobka_variants ? selectedKorobka : []);
        await syncPivot('product_model_options',   'model_option_id',   productId, formData.has_model_variants   ? selectedModels  : []);
      }

      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast.success(editingProduct ? 'Product updated' : 'Product created');
      resetForm();
    } catch (err: any) {
      toast.error(err.message || 'Save failed');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-500 mt-1">Manage your product catalog</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name (Georgian) *</Label>
                    <Input
                      value={formData.name_ka}
                      onChange={(e) => setFormData({ ...formData, name_ka: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Name (Russian)</Label>
                    <Input
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-from-name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Description (Georgian)</Label>
                    <Textarea
                      value={formData.description_ka}
                      onChange={(e) => setFormData({ ...formData, description_ka: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description (Russian)</Label>
                    <Textarea
                      value={formData.description_en}
                      onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Price *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Sale Price</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.sale_price}
                      onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Stock</Label>
                    <Input
                      type="number"
                      value={formData.stock_quantity}
                      onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name_ka}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_featured} onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })} />
                    <Label>Featured</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_new} onCheckedChange={(checked) => setFormData({ ...formData, is_new: checked })} />
                    <Label>New</Label>
                  </div>
                </div>

                <ProductConfiguratorTab
                  hasOtdelka={formData.has_otdelka_variants}
                  setHasOtdelka={(v) => setFormData({ ...formData, has_otdelka_variants: v })}
                  hasKorobka={formData.has_korobka_variants}
                  setHasKorobka={(v) => setFormData({ ...formData, has_korobka_variants: v })}
                  hasModel={formData.has_model_variants}
                  setHasModel={(v) => setFormData({ ...formData, has_model_variants: v })}
                  selectedOtdelka={selectedOtdelka}
                  setSelectedOtdelka={setSelectedOtdelka}
                  selectedKorobka={selectedKorobka}
                  setSelectedKorobka={setSelectedKorobka}
                  selectedModels={selectedModels}
                  setSelectedModels={setSelectedModels}
                />

                <div className="flex justify-end gap-2 border-t pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingProduct ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products?.map((product: any) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name_ka}</TableCell>
                      <TableCell>{product.categories?.name_ka || '-'}</TableCell>
                      <TableCell>
                        {product.sale_price ? (
                          <span>
                            <span className="line-through text-gray-400 mr-2">₾{product.price}</span>
                            <span className="text-red-600">₾{product.sale_price}</span>
                          </span>
                        ) : (
                          <span>₾{product.price}</span>
                        )}
                      </TableCell>
                      <TableCell>{product.stock_quantity}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${product.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {product.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteMutation.mutate(product.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {products?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No products yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
