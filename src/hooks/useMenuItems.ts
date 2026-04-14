import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface MenuItem {
  id: string;
  parent_id: string | null;
  section: string;
  column_number: number | null;
  name_ka: string;
  name_ru: string;
  name_en: string;
  href: string;
  icon: string | null;
  is_new: boolean;
  is_sale: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type MenuItemInsert = Omit<MenuItem, 'id' | 'created_at' | 'updated_at'> & { id?: string };
export type MenuItemUpdate = Partial<MenuItemInsert> & { id: string };

const TABLE = 'menu_items';

export function useMenuItems() {
  return useQuery({
    queryKey: ['menu-items'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from(TABLE)
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as MenuItem[];
    },
  });
}

export function useAllMenuItems() {
  return useQuery({
    queryKey: ['menu-items-all'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from(TABLE)
        .select('*')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return data as MenuItem[];
    },
  });
}

export function useMenuItemMutations() {
  const qc = useQueryClient();
  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['menu-items'] });
    qc.invalidateQueries({ queryKey: ['menu-items-all'] });
  };

  const create = useMutation({
    mutationFn: async (item: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await (supabase as any).from(TABLE).insert(item).select().single();
      if (error) throw error;
      return data as MenuItem;
    },
    onSuccess: invalidate,
  });

  const update = useMutation({
    mutationFn: async ({ id, ...fields }: MenuItemUpdate) => {
      const { data, error } = await (supabase as any).from(TABLE).update(fields).eq('id', id).select().single();
      if (error) throw error;
      return data as MenuItem;
    },
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await (supabase as any).from(TABLE).delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: invalidate,
  });

  return { create, update, remove };
}
