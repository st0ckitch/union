import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Eye, Trash2, Loader2 } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { format } from 'date-fns';
import { deleteRow } from '@/lib/adminMutations';
import { useAdminT } from '@/lib/adminI18n';

type Consultation = Tables<'consultations'>;

const statusOptions = ['new', 'contacted', 'completed', 'cancelled'] as const;

export default function AdminConsultations() {
  const t = useAdminT();
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [notes, setNotes] = useState('');
  const queryClient = useQueryClient();

  const { data: consultations, isLoading } = useQuery({
    queryKey: ['admin-consultations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('consultations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase.from('consultations').update(data).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-consultations'] });
      toast.success(t('Consultation updated'));
    },
    onError: (error: any) => toast.error(error.message)
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteRow('consultations', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-consultations'] });
      toast.success(t('Consultation deleted'));
    },
    onError: (error: any) => toast.error(error.message)
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setNotes(consultation.notes || '');
    setIsDetailsOpen(true);
  };

  const handleSaveNotes = () => {
    if (selectedConsultation) {
      updateMutation.mutate({
        id: selectedConsultation.id,
        data: { notes }
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('Consultations')}</h1>
          <p className="text-gray-500 mt-1">{t('Manage consultation requests')}</p>
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
                    <TableHead>{t('Phone')}</TableHead>
                    <TableHead>{t('Email')}</TableHead>
                    <TableHead>{t('Status')}</TableHead>
                    <TableHead>{t('Date')}</TableHead>
                    <TableHead className="w-[100px]">{t('Actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultations?.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell className="font-medium">{consultation.name}</TableCell>
                      <TableCell>{consultation.phone}</TableCell>
                      <TableCell>{consultation.email || '-'}</TableCell>
                      <TableCell>
                        <Select
                          value={consultation.status || 'new'}
                          onValueChange={(value) => updateMutation.mutate({ 
                            id: consultation.id, 
                            data: { status: value } 
                          })}
                        >
                          <SelectTrigger className={`w-28 ${getStatusColor(consultation.status || 'new')}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {format(new Date(consultation.created_at), 'dd/MM/yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewDetails(consultation)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteMutation.mutate(consultation.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {consultations?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        {t('No consultations yet')}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{t('Consultation Details')}</DialogTitle>
            </DialogHeader>
            {selectedConsultation && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-500">{t('Name')}</Label>
                    <p className="font-medium">{selectedConsultation.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">{t('Phone')}</Label>
                    <p className="font-medium">{selectedConsultation.phone}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">{t('Email')}</Label>
                    <p className="font-medium">{selectedConsultation.email || '-'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">{t('Date')}</Label>
                    <p className="font-medium">{format(new Date(selectedConsultation.created_at), 'dd/MM/yyyy HH:mm')}</p>
                  </div>
                </div>
                {selectedConsultation.message && (
                  <div>
                    <Label className="text-gray-500">{t('Message')}</Label>
                    <p className="mt-1">{selectedConsultation.message}</p>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>{t('Notes')}</Label>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder={t('Add internal notes...')}
                  />
                  <Button onClick={handleSaveNotes} size="sm" disabled={updateMutation.isPending}>
                    {updateMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {t('Save Notes')}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
