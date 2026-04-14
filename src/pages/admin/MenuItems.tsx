import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useAllMenuItems, useMenuItemMutations, type MenuItem } from '@/hooks/useMenuItems';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Plus, Pencil, Trash2, ChevronDown, ChevronRight, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ICON_OPTIONS = [
  'DoorOpen', 'DoorClosed', 'PanelTop', 'LayoutPanelTop', 'Sofa', 'Shirt',
  'Archive', 'BookOpen', 'Layers', 'Table2', 'Armchair', 'SquareStack',
  'Home', 'Minus', 'KeyRound', 'Package', 'Plane', 'Percent', 'Building2',
];

interface FormData {
  name_ka: string;
  name_ru: string;
  name_en: string;
  href: string;
  icon: string;
  section: string;
  column_number: string;
  is_new: boolean;
  is_sale: boolean;
  is_active: boolean;
  sort_order: string;
  parent_id: string | null;
}

const emptyForm: FormData = {
  name_ka: '',
  name_ru: '',
  name_en: '',
  href: '#',
  icon: '',
  section: 'mega_menu',
  column_number: '1',
  is_new: false,
  is_sale: false,
  is_active: true,
  sort_order: '0',
  parent_id: null,
};

export default function MenuItemsPage() {
  const { data: items = [], isLoading } = useAllMenuItems();
  const { create, update, remove } = useMenuItemMutations();
  const { toast } = useToast();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Separate top-level groups from children
  const groups = items.filter((i) => !i.parent_id && i.section === 'mega_menu');
  const sidebarItems = items.filter((i) => !i.parent_id && i.section === 'sidebar');
  const childrenOf = (parentId: string) =>
    items.filter((i) => i.parent_id === parentId).sort((a, b) => a.sort_order - b.sort_order);

  const toggleExpand = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const openCreate = (parentId?: string | null, section?: string, column?: number) => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      parent_id: parentId || null,
      section: section || 'mega_menu',
      column_number: column?.toString() || '1',
      sort_order: '0',
    });
    setDialogOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setForm({
      name_ka: item.name_ka,
      name_ru: item.name_ru,
      name_en: item.name_en,
      href: item.href,
      icon: item.icon || '',
      section: item.section,
      column_number: (item.column_number || 1).toString(),
      is_new: item.is_new,
      is_sale: item.is_sale,
      is_active: item.is_active,
      sort_order: item.sort_order.toString(),
      parent_id: item.parent_id,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      name_ka: form.name_ka,
      name_ru: form.name_ru,
      name_en: form.name_en,
      href: form.href,
      icon: form.icon || null,
      section: form.section,
      column_number: form.parent_id ? null : parseInt(form.column_number) || null,
      is_new: form.is_new,
      is_sale: form.is_sale,
      is_active: form.is_active,
      sort_order: parseInt(form.sort_order) || 0,
      parent_id: form.parent_id,
    };

    try {
      if (editingId) {
        await update.mutateAsync({ id: editingId, ...payload });
        toast({ title: 'Menu item updated' });
      } else {
        await create.mutateAsync(payload);
        toast({ title: 'Menu item created' });
      }
      setDialogOpen(false);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await remove.mutateAsync(id);
      toast({ title: 'Menu item deleted' });
      setDeleteConfirm(null);
    } catch (err: any) {
      toast({ title: 'Error', description: err.message, variant: 'destructive' });
    }
  };

  const setField = (key: keyof FormData, value: any) => setForm((f) => ({ ...f, [key]: value }));

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </AdminLayout>
    );
  }

  const columnGroups = [1, 2, 3].map((col) =>
    groups.filter((g) => g.column_number === col).sort((a, b) => a.sort_order - b.sort_order)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Menu Items</h1>
            <p className="text-muted-foreground">Manage the catalog mega menu categories and sub-items</p>
          </div>
        </div>

        {/* MEGA MENU — 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {columnGroups.map((colItems, colIdx) => (
            <Card key={colIdx}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Column {colIdx + 1}</CardTitle>
                  <Button size="sm" variant="outline" onClick={() => openCreate(null, 'mega_menu', colIdx + 1)}>
                    <Plus className="h-4 w-4 mr-1" /> Add Group
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {colItems.map((group) => {
                  const children = childrenOf(group.id);
                  const isExpanded = expandedGroups.has(group.id);
                  return (
                    <div key={group.id} className="border rounded-lg">
                      {/* Group header */}
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-t-lg">
                        <button onClick={() => toggleExpand(group.id)} className="shrink-0">
                          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">
                            {group.name_en || group.name_ka}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{group.name_ka}</div>
                        </div>
                        {group.is_new && <Badge variant="secondary" className="text-[10px]">NEW</Badge>}
                        {!group.is_active && <Badge variant="outline" className="text-[10px] text-red-500">Hidden</Badge>}
                        <div className="flex gap-1 shrink-0">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(group)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-red-500 hover:text-red-700"
                            onClick={() => setDeleteConfirm(group.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Children */}
                      {isExpanded && (
                        <div className="p-2 space-y-1">
                          {children.map((child) => (
                            <div key={child.id} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 group">
                              <GripVertical className="h-3.5 w-3.5 text-gray-300" />
                              <span className="flex-1 text-sm truncate">
                                {child.name_en || child.name_ka}
                              </span>
                              {child.is_new && <Badge variant="secondary" className="text-[10px]">NEW</Badge>}
                              {!child.is_active && <Badge variant="outline" className="text-[10px] text-red-500">Off</Badge>}
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => openEdit(child)}>
                                  <Pencil className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6 text-red-500"
                                  onClick={() => setDeleteConfirm(child.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full text-xs text-muted-foreground"
                            onClick={() => openCreate(group.id, 'mega_menu')}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add Sub-item
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
                {colItems.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No groups yet</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* SIDEBAR LINKS */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Sidebar Links</CardTitle>
              <Button size="sm" variant="outline" onClick={() => openCreate(null, 'sidebar')}>
                <Plus className="h-4 w-4 mr-1" /> Add Link
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {sidebarItems.sort((a, b) => a.sort_order - b.sort_order).map((item) => (
                <div key={item.id} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 group">
                  <span className="flex-1 text-sm font-medium">
                    {item.name_en || item.name_ka}
                  </span>
                  {item.is_sale && <Badge className="bg-red-500 text-white text-[10px]">SALE</Badge>}
                  {!item.is_active && <Badge variant="outline" className="text-[10px] text-red-500">Hidden</Badge>}
                  <span className="text-xs text-muted-foreground">{item.href}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEdit(item)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-red-500"
                      onClick={() => setDeleteConfirm(item.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
              {sidebarItems.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No sidebar links yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DELETE CONFIRMATION */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete menu item?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This will also delete all sub-items under this group. This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => deleteConfirm && handleDelete(deleteConfirm)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CREATE / EDIT DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Names */}
            <div className="grid grid-cols-1 gap-3">
              <div>
                <Label>Name (Georgian) *</Label>
                <Input value={form.name_ka} onChange={(e) => setField('name_ka', e.target.value)} />
              </div>
              <div>
                <Label>Name (English)</Label>
                <Input value={form.name_en} onChange={(e) => setField('name_en', e.target.value)} />
              </div>
              <div>
                <Label>Name (Russian)</Label>
                <Input value={form.name_ru} onChange={(e) => setField('name_ru', e.target.value)} />
              </div>
            </div>

            {/* Link */}
            <div>
              <Label>Link (href)</Label>
              <Input value={form.href} onChange={(e) => setField('href', e.target.value)} placeholder="/union/catalog/..." />
            </div>

            {/* Section & Column (only for top-level) */}
            {!form.parent_id && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Section</Label>
                  <Select value={form.section} onValueChange={(v) => setField('section', v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mega_menu">Mega Menu</SelectItem>
                      <SelectItem value="sidebar">Sidebar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {form.section === 'mega_menu' && (
                  <div>
                    <Label>Column</Label>
                    <Select value={form.column_number} onValueChange={(v) => setField('column_number', v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Column 1</SelectItem>
                        <SelectItem value="2">Column 2</SelectItem>
                        <SelectItem value="3">Column 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {/* Icon (top-level groups & sidebar) */}
            {!form.parent_id && (
              <div>
                <Label>Icon</Label>
                <Select value={form.icon} onValueChange={(v) => setField('icon', v)}>
                  <SelectTrigger><SelectValue placeholder="Select icon..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    {ICON_OPTIONS.map((ic) => (
                      <SelectItem key={ic} value={ic}>{ic}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Sort order */}
            <div>
              <Label>Sort Order</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) => setField('sort_order', e.target.value)}
              />
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={form.is_new} onCheckedChange={(v) => setField('is_new', v)} />
                <Label>NEW badge</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.is_active} onCheckedChange={(v) => setField('is_active', v)} />
                <Label>Active</Label>
              </div>
              {form.section === 'sidebar' && !form.parent_id && (
                <div className="flex items-center gap-2">
                  <Switch checked={form.is_sale} onCheckedChange={(v) => setField('is_sale', v)} />
                  <Label>SALE style</Label>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={!form.name_ka || create.isPending || update.isPending}>
              {(create.isPending || update.isPending) && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingId ? 'Save Changes' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
