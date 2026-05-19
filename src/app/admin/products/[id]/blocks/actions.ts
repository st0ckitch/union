"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase, createServiceSupabase } from "@/lib/supabase/server";
import type { BlockValues } from "./types";

async function requireAdmin() {
  const sb = await createServerSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) throw new Error("Not signed in");
  const service = createServiceSupabase();
  const { data: role } = await service
    .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
  if (!role) throw new Error("Not an admin");
}

function n(v: string | null | undefined): string | null {
  const t = (v ?? "").trim();
  return t === "" ? null : t;
}

export async function saveBlock(v: BlockValues): Promise<{ id?: string; error?: string }> {
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const service = createServiceSupabase();

  const row = {
    scope: "product" as const,
    product_id: v.product_id,
    category_id: null,
    block_type: v.block_type,
    sort_order: v.sort_order ?? 0,
    is_active: !!v.is_active,
    title_ka: n(v.title_ka), title_ru: n(v.title_ru), title_en: n(v.title_en),
    subtitle_ka: n(v.subtitle_ka), subtitle_ru: n(v.subtitle_ru), subtitle_en: n(v.subtitle_en),
    body_ka: n(v.body_ka), body_ru: n(v.body_ru), body_en: n(v.body_en),
    image_url: n(v.image_url),
    secondary_image_url: n(v.secondary_image_url),
    data: v.data ?? null,
  };

  if (v.id) {
    const { error } = await service.from("product_content_blocks").update(row).eq("id", v.id);
    if (error) return { error: error.message };
    revalidatePath(`/admin/products/${v.product_id}`);
    revalidatePath(`/admin/products/${v.product_id}/blocks/${v.id}`);
    return { id: v.id };
  }
  const { data, error } = await service.from("product_content_blocks").insert(row).select("id").single();
  if (error) return { error: error.message };
  revalidatePath(`/admin/products/${v.product_id}`);
  return { id: data.id };
}

export async function deleteBlock(blockId: string, productId: string): Promise<{ error?: string }> {
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const service = createServiceSupabase();
  const { error } = await service.from("product_content_blocks").delete().eq("id", blockId);
  if (error) return { error: error.message };
  revalidatePath(`/admin/products/${productId}`);
  redirect(`/admin/products/${productId}`);
}

export async function toggleBlockActive(blockId: string, productId: string, next: boolean): Promise<{ error?: string }> {
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const service = createServiceSupabase();
  const { error } = await service.from("product_content_blocks").update({ is_active: next }).eq("id", blockId);
  if (error) return { error: error.message };
  revalidatePath(`/admin/products/${productId}`);
  return {};
}

export async function reorderBlock(blockId: string, productId: string, sortOrder: number): Promise<{ error?: string }> {
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const service = createServiceSupabase();
  const { error } = await service.from("product_content_blocks").update({ sort_order: sortOrder }).eq("id", blockId);
  if (error) return { error: error.message };
  revalidatePath(`/admin/products/${productId}`);
  return {};
}
