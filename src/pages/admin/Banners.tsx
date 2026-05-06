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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { deleteRow } from '@/lib/adminMutations';
import { useAdminT } from '@/lib/adminI18n';

type Banner = Tables<'banners'>;

export default function AdminBanners() {
  const t = useAdminT();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title_ka: '',
    title_en: '',
    subtitle_ka: '',
    subtitle_en: '',
    button_text_ka: '',
    button_text_en: '',
    image_url: '',
    link_url: '',
    section: 'union_hero',
    is_active: true,
    sort_order: '0',
  });
  const queryClient = useQueryClient();

  const { data: banners, isLoading } = useQuery({
    queryKey: ['admin-banners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('banners').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
      toast.success(t('Banner created'));
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from('banners').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
      toast.success(t('Banner updated'));
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRow('banners', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-banners'] });
      toast.success(t('Banner deleted'));
    },
    onError: (error: any) => toast.error(error.message)
  });

  const resetForm = () => {
    setFormData({
      title_ka: '',
      title_en: '',
      subtitle_ka: '',
      subtitle_en: '',
      button_text_ka: '',
      button_text_en: '',
      image_url: '',
      link_url: '',
      section: 'union_hero',
      is_active: true,
      sort_order: '0',
    });
    setEditingBanner(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title_ka: banner.title_ka || '',
      title_en: banner.title_en || '',
      subtitle_ka: banner.subtitle_ka || '',
      subtitle_en: banner.subtitle_en || '',
      button_text_ka: banner.button_text_ka || '',
      button_text_en: banner.button_text_en || '',
      image_url: banner.image_url || '',
      link_url: banner.link_url || '',
      section: (banner as any).section || 'union_hero',
      is_active: banner.is_active ?? true,
      sort_order: banner.sort_order?.toString() || '0',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: any = {
      title_ka: formData.title_ka,
      title_en: formData.title_en || null,
      subtitle_ka: formData.subtitle_ka || null,
      subtitle_en: formData.subtitle_en || null,
      button_text_ka: formData.button_text_ka || null,
      button_text_en: formData.button_text_en || null,
      image_url: formData.image_url,
      link_url: formData.link_url || null,
      section: formData.section,
      is_active: formData.is_active,
      sort_order: parseInt(formData.sort_order) || 0,
    };

    if (editingBanner) {
      updateMutation.mutate({ id: editingBanner.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Banners')}</h1>
            <p className="text-gray-500 mt-1">{t('Manage hero slider banners')}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                {t('Add Banner')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingBanner ? t('Edit Banner') : t('Add Banner')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Title (Georgian) *')}</Label>
                    <Input
                      value={formData.title_ka}
                      onChange={(e) => setFormData({ ...formData, title_ka: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Title (Russian)')}</Label>
                    <Input
                      value={formData.title_en}
                      onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Subtitle')} (KA)</Label>
                    <Input
                      value={formData.subtitle_ka}
                      onChange={(e) => setFormData({ ...formData, subtitle_ka: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Subtitle')} (RU)</Label>
                    <Input
                      value={formData.subtitle_en}
                      onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Button Text (Georgian)')}</Label>
                    <Input
                      value={formData.button_text_ka}
                      onChange={(e) => setFormData({ ...formData, button_text_ka: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Button Text (Russian)')}</Label>
                    <Input
                      value={formData.button_text_en}
                      onChange={(e) => setFormData({ ...formData, button_text_en: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('Image URL *')}</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Link URL')}</Label>
                    <Input
                      value={formData.link_url}
                      onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                      placeholder="/union/catalog"
                    />
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
                <div className="space-y-2">
                  <Label>{t('Section')}</Label>
                  <Select value={formData.section} onValueChange={(v) => setFormData({ ...formData, section: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="union_hero">{t('Union — hero carousel')}</SelectItem>
                      <SelectItem value="hm_hero">{t('HMspace — hero')}</SelectItem>
                      <SelectItem value="main_accents">{t('Main accents')}</SelectItem>
                      <SelectItem value="projects">{t('Projects')}</SelectItem>
                      <SelectItem value="trending">{t('Trending')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                  <Label>{t('Active')}</Label>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>{t('Cancel')}</Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingBanner ? t('Update') : t('Create')}
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
                    <TableHead>{t('Preview')}</TableHead>
                    <TableHead>{t('Title')}</TableHead>
                    <TableHead>{t('Order')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
                    <TableHead className="w-[100px]">{t('Actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {banners?.map((banner) => (
                    <TableRow key={banner.id}>
                      <TableCell>
                        <img 
                          src={banner.image_url} 
                          alt={banner.title_ka} 
                          className="h-16 w-28 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{banner.title_ka}</TableCell>
                      <TableCell>{banner.sort_order}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${banner.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {banner.is_active ? t('Active') : t('Inactive')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(banner)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              if (window.confirm(t('Delete banner "{name}"?', { name: banner.title_ka }))) {
                                deleteMutation.mutate(banner.id);
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
                  {banners?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        {t('No banners yet')}
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
