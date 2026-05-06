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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { deleteRow } from '@/lib/adminMutations';
import { useAdminT } from '@/lib/adminI18n';

type Category = Tables<'categories'>;

export default function AdminCategories() {
  const t = useAdminT();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name_ka: '',
    name_en: '',
    slug: '',
    description_ka: '',
    image_url: '',
    parent_id: '',
    is_active: true,
    sort_order: '0',
    banner_image_url: '',
    banner_link_url: '',
    banner_title_ka: '',
    banner_title_ru: '',
    banner_title_en: '',
    banner_subtitle_ka: '',
    banner_subtitle_ru: '',
    banner_subtitle_en: '',
  });
  const queryClient = useQueryClient();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['admin-categories-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as Category[];
    }
  });

  const parentCategories = categories?.filter(c => !c.parent_id) || [];

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('categories').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories-list'] });
      toast.success(t('Category created'));
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from('categories').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories-list'] });
      toast.success(t('Category updated'));
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRow('categories', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories-list'] });
      toast.success(t('Category deleted'));
    },
    onError: (error: any) => toast.error(error.message)
  });

  const resetForm = () => {
    setFormData({
      name_ka: '',
      name_en: '',
      slug: '',
      description_ka: '',
      image_url: '',
      parent_id: '',
      is_active: true,
      sort_order: '0',
      banner_image_url: '',
      banner_link_url: '',
      banner_title_ka: '',
      banner_title_ru: '',
      banner_title_en: '',
      banner_subtitle_ka: '',
      banner_subtitle_ru: '',
      banner_subtitle_en: '',
    });
    setEditingCategory(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name_ka: category.name_ka || '',
      name_en: category.name_en || '',
      slug: category.slug || '',
      description_ka: category.description_ka || '',
      image_url: category.image_url || '',
      parent_id: category.parent_id || '',
      is_active: category.is_active ?? true,
      sort_order: category.sort_order?.toString() || '0',
      banner_image_url: (category as any).banner_image_url || '',
      banner_link_url: (category as any).banner_link_url || '',
      banner_title_ka: (category as any).banner_title_ka || '',
      banner_title_ru: (category as any).banner_title_ru || '',
      banner_title_en: (category as any).banner_title_en || '',
      banner_subtitle_ka: (category as any).banner_subtitle_ka || '',
      banner_subtitle_ru: (category as any).banner_subtitle_ru || '',
      banner_subtitle_en: (category as any).banner_subtitle_en || '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name_ka: formData.name_ka,
      name_en: formData.name_en || null,
      slug: formData.slug || formData.name_ka.toLowerCase().replace(/\s+/g, '-'),
      description_ka: formData.description_ka || null,
      image_url: formData.image_url || null,
      parent_id: formData.parent_id || null,
      is_active: formData.is_active,
      sort_order: parseInt(formData.sort_order) || 0,
      banner_image_url: formData.banner_image_url || null,
      banner_link_url: formData.banner_link_url || null,
      banner_title_ka: formData.banner_title_ka || null,
      banner_title_ru: formData.banner_title_ru || null,
      banner_title_en: formData.banner_title_en || null,
      banner_subtitle_ka: formData.banner_subtitle_ka || null,
      banner_subtitle_ru: formData.banner_subtitle_ru || null,
      banner_subtitle_en: formData.banner_subtitle_en || null,
    };

    if (editingCategory) {
      updateMutation.mutate({ id: editingCategory.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const getParentName = (parentId: string | null) => {
    if (!parentId) return '-';
    const parent = categories?.find(c => c.id === parentId);
    return parent?.name_ka || '-';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Categories')}</h1>
            <p className="text-gray-500 mt-1">{t('Manage product categories')}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                {t('Add Category')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingCategory ? t('Edit') : t('Add Category')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Name (Georgian) *')}</Label>
                    <Input
                      value={formData.name_ka}
                      onChange={(e) => setFormData({ ...formData, name_ka: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Name (Russian)')}</Label>
                    <Input
                      value={formData.name_en}
                      onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('Slug')}</Label>
                  <Input
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder={t('auto-generated-from-name')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('Description (Georgian)')}</Label>
                  <Textarea
                    value={formData.description_ka}
                    onChange={(e) => setFormData({ ...formData, description_ka: e.target.value })}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('Image URL')}</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Parent Category')}</Label>
                    <Select
                      value={formData.parent_id || '__none__'}
                      onValueChange={(value) => setFormData({ ...formData, parent_id: value === '__none__' ? '' : value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('None (Top level)')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">{t('None (Top level)')}</SelectItem>
                        {parentCategories?.filter(c => c.id !== editingCategory?.id).map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name_ka}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Sort Order')}</Label>
                    <Input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                  <Label>{t('Active')}</Label>
                </div>

                {/* === Phase A: per-category banner === */}
                <div className="border rounded-lg p-4 bg-gray-50/50 space-y-3">
                  <div>
                    <Label className="font-medium">{t('Category page banner')}</Label>
                    <p className="text-xs text-gray-500 mt-0.5">{t('Optional hero shown above the product grid on /catalog/<slug>.')}</p>
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Banner image URL')}</Label>
                    <Input
                      value={formData.banner_image_url}
                      onChange={(e) => setFormData({ ...formData, banner_image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  {formData.banner_image_url && (
                    <img src={formData.banner_image_url} alt="" className="h-32 w-full object-cover rounded border" />
                  )}
                  <div className="space-y-2">
                    <Label>{t('Banner click-through URL')}</Label>
                    <Input
                      value={formData.banner_link_url}
                      onChange={(e) => setFormData({ ...formData, banner_link_url: e.target.value })}
                      placeholder="/union/sale (optional)"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label>{t('Title (KA)')}</Label>
                      <Input value={formData.banner_title_ka} onChange={(e) => setFormData({ ...formData, banner_title_ka: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('Title (RU)')}</Label>
                      <Input value={formData.banner_title_ru} onChange={(e) => setFormData({ ...formData, banner_title_ru: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('Title (EN)')}</Label>
                      <Input value={formData.banner_title_en} onChange={(e) => setFormData({ ...formData, banner_title_en: e.target.value })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label>{t('Subtitle (KA)')}</Label>
                      <Input value={formData.banner_subtitle_ka} onChange={(e) => setFormData({ ...formData, banner_subtitle_ka: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('Subtitle (RU)')}</Label>
                      <Input value={formData.banner_subtitle_ru} onChange={(e) => setFormData({ ...formData, banner_subtitle_ru: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label>{t('Subtitle (EN)')}</Label>
                      <Input value={formData.banner_subtitle_en} onChange={(e) => setFormData({ ...formData, banner_subtitle_en: e.target.value })} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>{t('Cancel')}</Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingCategory ? t('Update') : t('Create')}
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
                    <TableHead>{t('Name')}</TableHead>
                    <TableHead>{t('Slug')}</TableHead>
                    <TableHead>{t('Parent')}</TableHead>
                    <TableHead>{t('Order')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
                    <TableHead className="w-[100px]">{t('Actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories?.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.name_ka}</TableCell>
                      <TableCell className="text-gray-500">{category.slug}</TableCell>
                      <TableCell>{getParentName(category.parent_id)}</TableCell>
                      <TableCell>{category.sort_order}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${category.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {category.is_active ? t('Active') : t('Inactive')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(category)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (window.confirm(`${t('Delete')} "${category.name_ka}"? ${t('Products in this category will be unassigned.')}`)) {
                                deleteMutation.mutate(category.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {categories?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        {t('No categories yet')}
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
