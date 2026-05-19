import Link from "next/link";
import { createServiceSupabase } from "@/lib/supabase/server";
import { ProductForm } from "../form";
import type { ProductValues } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const sb = createServiceSupabase();
  const { data: categories } = await sb
    .from("categories")
    .select("id, name_en, name_ka, name_ru, parent_id")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const initial: ProductValues = {
    slug: "", name_ka: "", name_ru: "", name_en: "",
    category_id: null, category_type: null, collection_slug: null,
    description_ka: "", description_ru: "", description_en: "",
    price: 0, sale_price: null, price_from: false,
    stock_quantity: 1, stock_status: null, delivery_days: null,
    delivery_text_ka: "", delivery_text_ru: "", delivery_text_en: "",
    is_active: true, is_new: true, is_featured: false,
    has_model_variants: false, has_glass_variants: false, has_otdelka_variants: false,
    has_korobka_variants: false, has_lock_variants: false, has_panel_variants: false, has_modules: false,
    images: [], lifestyle_gallery_image_urls: [],
    video_url: null, video_provider: null,
    style_tags: [], finish: [], frame_type: null, configuration_styles: [],
    country_of_origin: null, designer_credit: null,
    specifications: null, specifications_en: null, spec_sections: null, download_links: null,
    source_url: null,
  };

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6">
        <Link href="/admin/products" className="text-sm text-neutral-500 hover:underline">← Products</Link>
        <h1 className="text-2xl font-semibold mt-1">New product</h1>
      </div>
      <ProductForm initial={initial} categories={categories ?? []} />
    </div>
  );
}
