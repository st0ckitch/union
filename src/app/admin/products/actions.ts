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
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (!role) throw new Error("Not an admin");
  return user;
}

export type ProductValues = {
  id?: string;
  // identity
  slug: string;
  name_ka: string;
  name_ru: string;
  name_en: string;
  // taxonomy
  category_id: string | null;
  category_type: string | null;       // hinged_door / sliding_door / entrance_door / furniture / hardware / generic
  collection_slug: string | null;
  // descriptions
  description_ka: string;
  description_ru: string;
  description_en: string;
  // pricing
  price: number | null;
  sale_price: number | null;
  price_from: boolean;
  // stock & delivery
  stock_quantity: number | null;
  stock_status: string | null;
  delivery_days: number | null;
  delivery_text_ka: string;
  delivery_text_ru: string;
  delivery_text_en: string;
  // flags
  is_active: boolean;
  is_new: boolean;
  is_featured: boolean;
  has_model_variants: boolean;
  has_glass_variants: boolean;
  has_otdelka_variants: boolean;
  has_korobka_variants: boolean;
  has_lock_variants: boolean;
  has_panel_variants: boolean;
  has_modules: boolean;
  // media
  images: string[];
  lifestyle_gallery_image_urls: string[];
  video_url: string | null;
  video_provider: string | null;
  // style
  style_tags: string[];
  finish: string[];
  frame_type: string | null;
  configuration_styles: string[];
  // origin
  country_of_origin: string | null;
  designer_credit: string | null;
  // specifications (jsonb)
  specifications: unknown;
  specifications_en: unknown;
  spec_sections: unknown;
  download_links: unknown;
  // seo
  source_url: string | null;
};

function nul<T>(v: T | null | undefined | ""): T | null {
  if (v === "" || v === undefined) return null;
  return (v ?? null) as T | null;
}

export async function saveProduct(v: ProductValues): Promise<{ id?: string; error?: string }> {
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }

  const service = createServiceSupabase();

  const row = {
    slug: v.slug.trim(),
    name_ka: v.name_ka.trim() || null,
    name_ru: v.name_ru.trim() || null,
    name_en: v.name_en.trim() || null,

    category_id: nul(v.category_id),
    category_type: nul(v.category_type),
    collection_slug: nul(v.collection_slug),

    description_ka: v.description_ka || null,
    description_ru: v.description_ru || null,
    description_en: v.description_en || null,

    price: v.price ?? 0,  // products.price is NOT NULL — default to 0
    sale_price: v.sale_price ?? null,
    price_from: !!v.price_from,

    stock_quantity: v.stock_quantity ?? null,
    stock_status: nul(v.stock_status),
    delivery_days: v.delivery_days ?? null,
    delivery_text_ka: v.delivery_text_ka || null,
    delivery_text_ru: v.delivery_text_ru || null,
    delivery_text_en: v.delivery_text_en || null,

    is_active: !!v.is_active,
    is_new: !!v.is_new,
    is_featured: !!v.is_featured,
    has_model_variants:   !!v.has_model_variants,
    has_glass_variants:   !!v.has_glass_variants,
    has_otdelka_variants: !!v.has_otdelka_variants,
    has_korobka_variants: !!v.has_korobka_variants,
    has_lock_variants:    !!v.has_lock_variants,
    has_panel_variants:   !!v.has_panel_variants,
    has_modules:          !!v.has_modules,

    images: v.images ?? [],
    lifestyle_gallery_image_urls: v.lifestyle_gallery_image_urls ?? [],
    video_url: nul(v.video_url),
    video_provider: nul(v.video_provider),

    style_tags: v.style_tags ?? [],
    finish: v.finish ?? [],
    frame_type: nul(v.frame_type),
    configuration_styles: v.configuration_styles ?? [],

    country_of_origin: nul(v.country_of_origin),
    designer_credit: nul(v.designer_credit),

    specifications: v.specifications ?? null,
    specifications_en: v.specifications_en ?? null,
    spec_sections: v.spec_sections ?? null,
    download_links: v.download_links ?? null,

    source_url: nul(v.source_url),
  };

  if (v.id) {
    const { error } = await service.from("products").update(row).eq("id", v.id);
    if (error) return { error: error.message };
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${v.id}`);
    return { id: v.id };
  } else {
    const { data, error } = await service.from("products").insert(row).select("id").single();
    if (error) return { error: error.message };
    revalidatePath("/admin/products");
    return { id: data.id };
  }
}

export async function deleteProduct(id: string): Promise<{ error?: string }> {
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const service = createServiceSupabase();
  const { error } = await service.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// Linked-option helpers (per-product configurator linkage).
// Lighting is intentionally NOT here: in this schema lighting only attaches
// to furniture_modules via module_lighting_options, not directly to products.
export type OptionKind = "model" | "glass" | "otdelka" | "korobka" | "lock" | "panel";

const OPTION_TABLES: Record<OptionKind, { join: string; option: string; fk: string }> = {
  model:    { join: "product_model_options",    option: "door_model_options",    fk: "model_option_id" },
  glass:    { join: "product_glass_options",    option: "door_glass_options",    fk: "glass_option_id" },
  otdelka:  { join: "product_otdelka_options",  option: "door_otdelka_options",  fk: "otdelka_option_id" },
  korobka:  { join: "product_korobka_options",  option: "door_korobka_options",  fk: "korobka_option_id" },
  lock:     { join: "product_lock_options",     option: "door_lock_options",     fk: "lock_option_id" },
  panel:    { join: "product_panel_options",    option: "door_panel_options",    fk: "panel_option_id" },
};

export async function linkOption(productId: string, kind: OptionKind, optionId: string, isDefault: boolean): Promise<{ error?: string }> {
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const t = OPTION_TABLES[kind];
  const service = createServiceSupabase();
  const { error } = await service.from(t.join).insert({
    product_id: productId,
    [t.fk]: optionId,
    is_default: isDefault,
  });
  if (error) return { error: error.message };
  revalidatePath(`/admin/products/${productId}`);
  return {};
}

export async function unlinkOption(productId: string, kind: OptionKind, optionId: string): Promise<{ error?: string }> {
  try { await requireAdmin(); }
  catch (e) { return { error: e instanceof Error ? e.message : String(e) }; }
  const t = OPTION_TABLES[kind];
  const service = createServiceSupabase();
  const { error } = await service.from(t.join).delete()
    .eq("product_id", productId)
    .eq(t.fk, optionId);
  if (error) return { error: error.message };
  revalidatePath(`/admin/products/${productId}`);
  return {};
}
