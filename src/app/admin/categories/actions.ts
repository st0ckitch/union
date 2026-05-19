"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase, createServiceSupabase } from "@/lib/supabase/server";

async function requireAdmin() {
  const sb = await createServerSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) throw new Error("Not signed in");
  const service = createServiceSupabase();
  const { data: role } = await service
    .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
  if (!role) throw new Error("Not an admin");
}

export type CategoryValues = {
  id?: string;
  parent_id: string | null;
  slug: string;
  name_ka: string;
  name_ru: string;
  name_en: string;
  description_ka: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  home_visible: boolean;
  home_sort_order: number;
  home_image_url: string | null;
  banner_image_url: string | null;
  banner_link_url: string | null;
  banner_title_ka: string;
  banner_title_ru: string;
  banner_title_en: string;
  banner_subtitle_ka: string;
  banner_subtitle_ru: string;
  banner_subtitle_en: string;
};

function n(v: string | null | undefined): string | null {
  const t = (v ?? "").trim();
  return t === "" ? null : t;
}

export async function saveCategory(v: CategoryValues): Promise<{ id?: string; error?: string }> {
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const service = createServiceSupabase();

  const row = {
    parent_id: v.parent_id || null,
    slug: v.slug.trim(),
    name_ka: n(v.name_ka),
    name_ru: n(v.name_ru),
    name_en: n(v.name_en),
    description_ka: n(v.description_ka),
    image_url: n(v.image_url),
    sort_order: v.sort_order ?? 0,
    is_active: !!v.is_active,
    home_visible: !!v.home_visible,
    home_sort_order: v.home_sort_order ?? 0,
    home_image_url: n(v.home_image_url),
    banner_image_url: n(v.banner_image_url),
    banner_link_url: n(v.banner_link_url),
    banner_title_ka: n(v.banner_title_ka),
    banner_title_ru: n(v.banner_title_ru),
    banner_title_en: n(v.banner_title_en),
    banner_subtitle_ka: n(v.banner_subtitle_ka),
    banner_subtitle_ru: n(v.banner_subtitle_ru),
    banner_subtitle_en: n(v.banner_subtitle_en),
  };

  if (v.id) {
    const { error } = await service.from("categories").update(row).eq("id", v.id);
    if (error) return { error: error.message };
    revalidatePath("/admin/categories");
    return { id: v.id };
  }
  const { data, error } = await service.from("categories").insert(row).select("id").single();
  if (error) return { error: error.message };
  revalidatePath("/admin/categories");
  return { id: data.id };
}

export async function deleteCategory(id: string): Promise<{ error?: string }> {
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const service = createServiceSupabase();
  const { error } = await service.from("categories").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}
