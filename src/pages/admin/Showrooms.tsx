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
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Showroom = Tables<'showrooms'>;

export default function AdminShowrooms() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShowroom, setEditingShowroom] = useState<Showroom | null>(null);
  const [formData, setFormData] = useState({
    name_ka: '',
    name_en: '',
    address_ka: '',
    address_en: '',
    phone: '',
    email: '',
    working_hours_ka: '',
    working_hours_en: '',
    image_url: '',
    map_embed_url: '',
    is_active: true,
    sort_order: '0',
  });
  const queryClient = useQueryClient();

  const { data: showrooms, isLoading } = useQuery({
    queryKey: ['admin-showrooms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('showrooms')
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from('showrooms').insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-showrooms'] });
      toast.success('Showroom created');
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from('showrooms').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-showrooms'] });
      toast.success('Showroom updated');
      resetForm();
    },
    onError: (error: any) => toast.error(error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('showrooms').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-showrooms'] });
      toast.success('Showroom deleted');
    },
    onError: (error: any) => toast.error(error.message)
  });

  const resetForm = () => {
    setFormData({
      name_ka: '',
      name_en: '',
      address_ka: '',
      address_en: '',
      phone: '',
      email: '',
      working_hours_ka: '',
      working_hours_en: '',
      image_url: '',
      map_embed_url: '',
      is_active: true,
      sort_order: '0',
    });
    setEditingShowroom(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (showroom: Showroom) => {
    setEditingShowroom(showroom);
    setFormData({
      name_ka: showroom.name_ka || '',
      name_en: showroom.name_en || '',
      address_ka: showroom.address_ka || '',
      address_en: showroom.address_en || '',
      phone: showroom.phone || '',
      email: showroom.email || '',
      working_hours_ka: showroom.working_hours_ka || '',
      working_hours_en: showroom.working_hours_en || '',
      image_url: showroom.image_url || '',
      map_embed_url: showroom.map_embed_url || '',
      is_active: showroom.is_active ?? true,
      sort_order: showroom.sort_order?.toString() || '0',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name_ka: formData.name_ka,
      name_en: formData.name_en || null,
      address_ka: formData.address_ka,
      address_en: formData.address_en || null,
      phone: formData.phone || null,
      email: formData.email || null,
      working_hours_ka: formData.working_hours_ka || null,
      working_hours_en: formData.working_hours_en || null,
      image_url: formData.image_url || null,
      map_embed_url: formData.map_embed_url || null,
      is_active: formData.is_active,
      sort_order: parseInt(formData.sort_order) || 0,
    };

    if (editingShowroom) {
      updateMutation.mutate({ id: editingShowroom.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Showrooms</h1>
            <p className="text-gray-500 mt-1">Manage store locations</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Showroom
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingShowroom ? 'Edit Showroom' : 'Add Showroom'}</DialogTitle>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Address (Georgian) *</Label>
                    <Input
                      value={formData.address_ka}
                      onChange={(e) => setFormData({ ...formData, address_ka: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address (Russian)</Label>
                    <Input
                      value={formData.address_en}
                      onChange={(e) => setFormData({ ...formData, address_en: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Working Hours (Georgian)</Label>
                    <Input
                      value={formData.working_hours_ka}
                      onChange={(e) => setFormData({ ...formData, working_hours_ka: e.target.value })}
                      placeholder="ორშ-შაბ: 10:00 - 19:00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Working Hours (Russian)</Label>
                    <Input
                      value={formData.working_hours_en}
                      onChange={(e) => setFormData({ ...formData, working_hours_en: e.target.value })}
                      placeholder="Пн-Сб: 10:00 - 19:00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Image URL</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Google Maps Embed URL</Label>
                  <Input
                    value={formData.map_embed_url}
                    onChange={(e) => setFormData({ ...formData, map_embed_url: e.target.value })}
                    placeholder="https://www.google.com/maps/embed?..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Switch checked={formData.is_active} onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Sort Order</Label>
                    <Input
                      type="number"
                      value={formData.sort_order}
                      onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingShowroom ? 'Update' : 'Create'}
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
                    <TableHead>Address</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {showrooms?.map((showroom) => (
                    <TableRow key={showroom.id}>
                      <TableCell className="font-medium">{showroom.name_ka}</TableCell>
                      <TableCell className="text-gray-500 max-w-xs truncate">{showroom.address_ka}</TableCell>
                      <TableCell>{showroom.phone || '-'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${showroom.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {showroom.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(showroom)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteMutation.mutate(showroom.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {showrooms?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No showrooms yet
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
