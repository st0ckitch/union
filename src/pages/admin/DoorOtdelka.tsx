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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2, Loader2, ChevronDown, ChevronRight } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';

type Group = Tables<'door_otdelka_groups'>;
type Option = Tables<'door_otdelka_options'>;

export default function AdminDoorOtdelka() {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [groupDialog, setGroupDialog] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [groupForm, setGroupForm] = useState<any>({});
  const [optionDialog, setOptionDialog] = useState(false);
  const [editingOption, setEditingOption] = useState<Option | null>(null);
  const [optionGroupId, setOptionGroupId] = useState<string>('');
  const [optionForm, setOptionForm] = useState<any>({});
  const qc = useQueryClient();

  const { data: groups, isLoading } = useQuery({
    queryKey: ['admin-otdelka-groups'],
    queryFn: async () => {
      const { data, error } = await supabase.from('door_otdelka_groups').select('*').order('sort_order');
      if (error) throw error;
      return data;
    }
  });

  const { data: options } = useQuery({
    queryKey: ['admin-otdelka-options'],
    queryFn: async () => {
      const { data, error } = await supabase.from('door_otdelka_options').select('*').order('sort_order');
      if (error) throw error;
      return data;
    }
  });

  const saveGroup = useMutation({
    mutationFn: async (d: any) => {
      if (editingGroup) {
        const { error } = await supabase.from('door_otdelka_groups').update(d).eq('id', editingGroup.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('door_otdelka_groups').insert([d]);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-otdelka-groups'] }); toast.success('Group saved'); resetGroup(); },
    onError: (e: any) => toast.error(e.message),
  });
  const delGroup = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from('door_otdelka_groups').delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-otdelka-groups'] }); qc.invalidateQueries({ queryKey: ['admin-otdelka-options'] }); toast.success('Group deleted'); },
    onError: (e: any) => toast.error(e.message),
  });

  const saveOption = useMutation({
    mutationFn: async (d: any) => {
      if (editingOption) {
        const { error } = await supabase.from('door_otdelka_options').update(d).eq('id', editingOption.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('door_otdelka_options').insert([d]);
        if (error) throw error;
      }
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-otdelka-options'] }); toast.success('Option saved'); resetOption(); },
    onError: (e: any) => toast.error(e.message),
  });
  const delOption = useMutation({
    mutationFn: async (id: string) => { const { error } = await supabase.from('door_otdelka_options').delete().eq('id', id); if (error) throw error; },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['admin-otdelka-options'] }); toast.success('Option deleted'); },
    onError: (e: any) => toast.error(e.message),
  });

  const resetGroup = () => { setGroupForm({}); setEditingGroup(null); setGroupDialog(false); };
  const resetOption = () => { setOptionForm({}); setEditingOption(null); setOptionDialog(false); };

  const onNewGroup = () => { setEditingGroup(null); setGroupForm({ sort_order: 0, is_active: true }); setGroupDialog(true); };
  const onEditGroup = (g: Group) => { setEditingGroup(g); setGroupForm({ ...g }); setGroupDialog(true); };

  const onNewOption = (groupId: string) => {
    setEditingOption(null);
    setOptionGroupId(groupId);
    setOptionForm({ group_id: groupId, sort_order: 0, is_active: true, price_modifier: 0 });
    setOptionDialog(true);
  };
  const onEditOption = (o: Option) => { setEditingOption(o); setOptionGroupId(o.group_id); setOptionForm({ ...o }); setOptionDialog(true); };

  const toggleGroup = (id: string) => {
    const next = new Set(expandedGroups);
    if (next.has(id)) next.delete(id); else next.add(id);
    setExpandedGroups(next);
  };

  const onGroupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = {
      code: groupForm.code || null,
      name_ka: groupForm.name_ka,
      name_ru: groupForm.name_ru || null,
      name_en: groupForm.name_en || null,
      description_ka: groupForm.description_ka || null,
      description_ru: groupForm.description_ru || null,
      description_en: groupForm.description_en || null,
      sort_order: parseInt(groupForm.sort_order?.toString() || '0') || 0,
      is_active: groupForm.is_active ?? true,
    };
    saveGroup.mutate(d);
  };

  const onOptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const d = {
      group_id: optionGroupId,
      code: optionForm.code || null,
      label_ka: optionForm.label_ka,
      label_ru: optionForm.label_ru || null,
      label_en: optionForm.label_en || null,
      swatch_image_url: optionForm.swatch_image_url || null,
      preview_image_url: optionForm.preview_image_url || null,
      price_modifier: parseFloat(optionForm.price_modifier?.toString() || '0') || 0,
      sort_order: parseInt(optionForm.sort_order?.toString() || '0') || 0,
      is_active: optionForm.is_active ?? true,
    };
    saveOption.mutate(d);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Door Finishes (Otdelka)</h1>
            <p className="text-gray-500 mt-1">Manage finish groups (VENEER, LACCATO, HPL, etc.) and individual color swatches.</p>
          </div>
          <Button onClick={onNewGroup}><Plus className="h-4 w-4 mr-2" />Add Group</Button>
        </div>

        <Card><CardContent className="p-0">
          {isLoading ? <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div> : (
            <div className="divide-y">
              {groups?.map((g) => {
                const groupOptions = options?.filter(o => o.group_id === g.id) || [];
                const isExpanded = expandedGroups.has(g.id);
                return (
                  <div key={g.id}>
                    <div className="p-4 flex items-center gap-3 hover:bg-gray-50">
                      <button onClick={() => toggleGroup(g.id)} className="p-1 hover:bg-gray-200 rounded">
                        {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{g.name_ka}</p>
                          {g.code && <span className="font-mono text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">{g.code}</span>}
                          <span className="text-xs text-gray-500">({groupOptions.length} options)</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${g.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{g.is_active ? 'Active' : 'Inactive'}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{g.description_ka}</p>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => onNewOption(g.id)}><Plus className="h-3 w-3 mr-1" />Swatch</Button>
                      <Button variant="ghost" size="icon" onClick={() => onEditGroup(g)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => { if (confirm(`Delete group "${g.name_ka}" and all its swatches?`)) delGroup.mutate(g.id); }} className="text-red-600"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                    {isExpanded && (
                      <div className="pl-14 pr-4 pb-4 bg-gray-50">
                        {groupOptions.length === 0 ? (
                          <p className="text-sm text-gray-400 py-3">No swatches yet. Click "Swatch" to add one.</p>
                        ) : (
                          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 py-3">
                            {groupOptions.map((o) => (
                              <div key={o.id} className="bg-white border rounded-lg overflow-hidden group relative">
                                {o.swatch_image_url ? (
                                  <img src={o.swatch_image_url} alt={o.label_ka} className="w-full aspect-square object-cover" />
                                ) : (
                                  <div className="w-full aspect-square bg-gray-100 flex items-center justify-center text-xs text-gray-400">no image</div>
                                )}
                                <div className="p-2">
                                  <p className="text-xs font-medium truncate">{o.label_ka}</p>
                                  {o.code && <p className="text-[10px] text-gray-500 font-mono">{o.code}</p>}
                                </div>
                                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button variant="secondary" size="icon" className="h-6 w-6" onClick={() => onEditOption(o)}><Pencil className="h-3 w-3" /></Button>
                                  <Button variant="destructive" size="icon" className="h-6 w-6" onClick={() => { if (confirm(`Delete swatch "${o.label_ka}"?`)) delOption.mutate(o.id); }}><Trash2 className="h-3 w-3" /></Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
              {groups?.length === 0 && <div className="text-center py-8 text-gray-500">No finish groups yet</div>}
            </div>
          )}
        </CardContent></Card>

        {/* Group dialog */}
        <Dialog open={groupDialog} onOpenChange={setGroupDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>{editingGroup ? 'Edit Group' : 'Add Group'}</DialogTitle></DialogHeader>
            <form onSubmit={onGroupSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Code</Label><Input value={groupForm.code || ''} onChange={(e) => setGroupForm({ ...groupForm, code: e.target.value.toLowerCase() })} placeholder="veneer" /></div>
                <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={groupForm.sort_order ?? 0} onChange={(e) => setGroupForm({ ...groupForm, sort_order: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Name (KA) *</Label><Input value={groupForm.name_ka || ''} onChange={(e) => setGroupForm({ ...groupForm, name_ka: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Name (RU)</Label><Input value={groupForm.name_ru || ''} onChange={(e) => setGroupForm({ ...groupForm, name_ru: e.target.value })} /></div>
                <div className="space-y-2"><Label>Name (EN)</Label><Input value={groupForm.name_en || ''} onChange={(e) => setGroupForm({ ...groupForm, name_en: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Description (KA)</Label><Textarea rows={2} value={groupForm.description_ka || ''} onChange={(e) => setGroupForm({ ...groupForm, description_ka: e.target.value })} /></div>
                <div className="space-y-2"><Label>Description (RU)</Label><Textarea rows={2} value={groupForm.description_ru || ''} onChange={(e) => setGroupForm({ ...groupForm, description_ru: e.target.value })} /></div>
                <div className="space-y-2"><Label>Description (EN)</Label><Textarea rows={2} value={groupForm.description_en || ''} onChange={(e) => setGroupForm({ ...groupForm, description_en: e.target.value })} /></div>
              </div>
              <div className="flex items-center gap-2"><Switch checked={groupForm.is_active ?? true} onCheckedChange={(v) => setGroupForm({ ...groupForm, is_active: v })} /><Label>Active</Label></div>
              <div className="flex justify-end gap-2 border-t pt-4">
                <Button type="button" variant="outline" onClick={resetGroup}>Cancel</Button>
                <Button type="submit" disabled={saveGroup.isPending}>{saveGroup.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}{editingGroup ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Option dialog */}
        <Dialog open={optionDialog} onOpenChange={setOptionDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>{editingOption ? 'Edit Swatch' : 'Add Swatch'}</DialogTitle></DialogHeader>
            <form onSubmit={onOptionSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Code</Label><Input value={optionForm.code || ''} onChange={(e) => setOptionForm({ ...optionForm, code: e.target.value })} placeholder="V36" /></div>
                <div className="space-y-2"><Label>Sort order</Label><Input type="number" value={optionForm.sort_order ?? 0} onChange={(e) => setOptionForm({ ...optionForm, sort_order: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2"><Label>Label (KA) *</Label><Input value={optionForm.label_ka || ''} onChange={(e) => setOptionForm({ ...optionForm, label_ka: e.target.value })} required /></div>
                <div className="space-y-2"><Label>Label (RU)</Label><Input value={optionForm.label_ru || ''} onChange={(e) => setOptionForm({ ...optionForm, label_ru: e.target.value })} /></div>
                <div className="space-y-2"><Label>Label (EN)</Label><Input value={optionForm.label_en || ''} onChange={(e) => setOptionForm({ ...optionForm, label_en: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label>Swatch image URL</Label><Input value={optionForm.swatch_image_url || ''} onChange={(e) => setOptionForm({ ...optionForm, swatch_image_url: e.target.value })} placeholder="https://..." /></div>
              {optionForm.swatch_image_url && <img src={optionForm.swatch_image_url} alt="" className="h-24 w-24 object-cover rounded border" />}
              <div className="space-y-2"><Label>Preview image URL (full door with this finish)</Label><Input value={optionForm.preview_image_url || ''} onChange={(e) => setOptionForm({ ...optionForm, preview_image_url: e.target.value })} /></div>
              <div className="space-y-2"><Label>Price modifier</Label><Input type="number" step="0.01" value={optionForm.price_modifier ?? 0} onChange={(e) => setOptionForm({ ...optionForm, price_modifier: e.target.value })} placeholder="0 = no change" /></div>
              <div className="flex items-center gap-2"><Switch checked={optionForm.is_active ?? true} onCheckedChange={(v) => setOptionForm({ ...optionForm, is_active: v })} /><Label>Active</Label></div>
              <div className="flex justify-end gap-2 border-t pt-4">
                <Button type="button" variant="outline" onClick={resetOption}>Cancel</Button>
                <Button type="submit" disabled={saveOption.isPending}>{saveOption.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}{editingOption ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
