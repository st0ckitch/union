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
import { Plus, Pencil, Trash2, Loader2, Star } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { deleteRow } from '@/lib/adminMutations';
import { useAdminT } from '@/lib/adminI18n';

type Testimonial = Tables<'testimonials'>;

export default function AdminTestimonials() {
  const t = useAdminT();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    author_name: '',
    author_title: '',
    content_ka: '',
    content_en: '',
    avatar_url: '',
    rating: '5',
    is_active: true,
    is_featured: false,
  });
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('testimonials').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      toast.success(t('Testimonial created'));
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from('testimonials').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      toast.success(t('Testimonial updated'));
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRow('testimonials', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      toast.success(t('Testimonial deleted'));
    },
    onError: (error: any) => toast.error(error.message)
  });

  const resetForm = () => {
    setFormData({
      author_name: '',
      author_title: '',
      content_ka: '',
      content_en: '',
      avatar_url: '',
      rating: '5',
      is_active: true,
      is_featured: false,
    });
    setEditingTestimonial(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      author_name: testimonial.author_name || '',
      author_title: testimonial.author_title || '',
      content_ka: testimonial.content_ka || '',
      content_en: testimonial.content_en || '',
      avatar_url: testimonial.avatar_url || '',
      rating: testimonial.rating?.toString() || '5',
      is_active: testimonial.is_active ?? true,
      is_featured: testimonial.is_featured ?? false,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      author_name: formData.author_name,
      author_title: formData.author_title || null,
      content_ka: formData.content_ka,
      content_en: formData.content_en || null,
      avatar_url: formData.avatar_url || null,
      rating: parseInt(formData.rating) || 5,
      is_active: formData.is_active,
      is_featured: formData.is_featured,
    };

    if (editingTestimonial) {
      updateMutation.mutate({ id: editingTestimonial.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('Testimonials')}</h1>
            <p className="text-gray-500 mt-1">{t('Manage customer testimonials')}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                {t('Add Testimonial')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? t('Edit Testimonial') : t('Add Testimonial')}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Author Name *')}</Label>
                    <Input
                      value={formData.author_name}
                      onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Author Title')}</Label>
                    <Input
                      value={formData.author_title}
                      onChange={(e) => setFormData({ ...formData, author_title: e.target.value })}
                      placeholder={t('e.g. CEO, Designer')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('Content (Georgian) *')}</Label>
                  <Textarea
                    value={formData.content_ka}
                    onChange={(e) => setFormData({ ...formData, content_ka: e.target.value })}
                    rows={3}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('Content (Russian)')}</Label>
                  <Textarea
                    value={formData.content_en}
                    onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('Avatar URL')}</Label>
                    <Input
                      value={formData.avatar_url}
                      onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('Rating (1-5)')}</Label>
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                    <Label>{t('Active')}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_featured} onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })} />
                    <Label>{t('Featured')}</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>{t('Cancel')}</Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingTestimonial ? t('Update') : t('Create')}
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
                    <TableHead>{t('Author')}</TableHead>
                    <TableHead>{t('Content')}</TableHead>
                    <TableHead>{t('Rating')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
                    <TableHead className="w-[100px]">{t('Actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testimonials?.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {testimonial.avatar_url && (
                            <img src={testimonial.avatar_url} alt="" className="h-8 w-8 rounded-full object-cover" />
                          )}
                          <div>
                            <p className="font-medium">{testimonial.author_name}</p>
                            {testimonial.author_title && (
                              <p className="text-sm text-gray-500">{testimonial.author_title}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-gray-500">{testimonial.content_ka}</TableCell>
                      <TableCell>
                        <div className="flex">
                          {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${testimonial.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {testimonial.is_active ? t('Active') : t('Inactive')}
                          </span>
                          {testimonial.is_featured && (
                            <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">{t('Featured')}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(testimonial)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteMutation.mutate(testimonial.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {testimonials?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        {t('No testimonials yet')}
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
