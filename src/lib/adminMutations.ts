import { supabase } from '@/integrations/supabase/client';

/**
 * Delete a row by id and throw if the delete was silently filtered by RLS.
 *
 * Why: if the current user isn't authenticated as admin, Supabase will
 * return `{ data: null, error: null, count: 0 }` — NO error is raised,
 * and a naive mutation will toast "Deleted" while nothing changed in
 * the database. This helper surfaces that as a real error.
 */
export async function deleteRow(table: string, id: string): Promise<void> {
  const { data, error } = await (supabase as any)
    .from(table)
    .delete()
    .eq('id', id)
    .select('id');
  if (error) throw error;
  if (!data || data.length === 0) {
    throw new Error('Delete failed — row not found or you lack permission. Try signing out and back in.');
  }
}
