"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabase, createServiceSupabase } from "@/lib/supabase/server";
import { OPTION_KINDS, isKindSlug, type KindSlug } from "../config";

async function requireAdmin() {
  const sb = await createServerSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) throw new Error("Not signed in");
  const service = createServiceSupabase();
  const { data: role } = await service
    .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
  if (!role) throw new Error("Not an admin");
}

export type OptionValues = {
  id?: string;
  code: string;
  name_ka: string; name_ru: string; name_en: string;
  description_ka: string; description_ru: string; description_en: string;
  image_url: string | null;
  preview_image_url: string | null;
  gallery_image_urls: string[];
  price_modifier: number;
  sort_order: number;
  is_active: boolean;
};

function n(v: string | null | undefined): string | null {
  const t = (v ?? "").trim();
  return t === "" ? null : t;
}

export async function saveOption(kind: string, v: OptionValues): Promise<{ id?: string; error?: string }> {
  if (!isKindSlug(kind)) return { error: "Unknown option kind" };
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const cfg = OPTION_KINDS[kind as KindSlug];
  const service = createServiceSupabase();

  const row = {
    code: v.code.trim() || null,
    name_ka: n(v.name_ka), name_ru: n(v.name_ru), name_en: n(v.name_en),
    description_ka: n(v.description_ka), description_ru: n(v.description_ru), description_en: n(v.description_en),
    image_url: n(v.image_url),
    preview_image_url: n(v.preview_image_url),
    gallery_image_urls: v.gallery_image_urls ?? [],
    price_modifier: Number.isFinite(v.price_modifier) ? v.price_modifier : 0,
    sort_order: v.sort_order ?? 0,
    is_active: !!v.is_active,
  };

  if (v.id) {
    const { error } = await service.from(cfg.table).update(row).eq("id", v.id);
    if (error) return { error: error.message };
    revalidatePath(`/admin/options/${kind}`);
    revalidatePath(`/admin/options/${kind}/${v.id}`);
    return { id: v.id };
  }
  const { data, error } = await service.from(cfg.table).insert(row).select("id").single();
  if (error) return { error: error.message };
  revalidatePath(`/admin/options/${kind}`);
  return { id: data.id };
}

export async function deleteOption(kind: string, id: string): Promise<{ error?: string }> {
  if (!isKindSlug(kind)) return { error: "Unknown option kind" };
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const cfg = OPTION_KINDS[kind as KindSlug];
  const service = createServiceSupabase();
  const { error } = await service.from(cfg.table).delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath(`/admin/options/${kind}`);
  redirect(`/admin/options/${kind}`);
}
