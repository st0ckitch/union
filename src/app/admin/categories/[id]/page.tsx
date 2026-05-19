import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceSupabase } from "@/lib/supabase/server";
import { CategoryForm } from "../form";
import type { CategoryValues } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = createServiceSupabase();
  const { data: c } = await sb.from("categories").select("*").eq("id", id).maybeSingle();
  if (!c) notFound();
  const { data: options } = await sb
    .from("categories").select("id, name_en, name_ka, name_ru, parent_id")
    .order("sort_order", { ascending: true });

  const initial: CategoryValues = {
    id: c.id,
    parent_id: c.parent_id ?? null,
    slug: c.slug ?? "",
    name_ka: c.name_ka ?? "", name_ru: c.name_ru ?? "", name_en: c.name_en ?? "",
    description_ka: c.description_ka ?? "",
    image_url: c.image_url ?? null,
    sort_order: c.sort_order ?? 0,
    is_active: !!c.is_active,
    home_visible: !!c.home_visible,
    home_sort_order: c.home_sort_order ?? 0,
    home_image_url: c.home_image_url ?? null,
    banner_image_url: c.banner_image_url ?? null,
    banner_link_url: c.banner_link_url ?? null,
    banner_title_ka: c.banner_title_ka ?? "",
    banner_title_ru: c.banner_title_ru ?? "",
    banner_title_en: c.banner_title_en ?? "",
    banner_subtitle_ka: c.banner_subtitle_ka ?? "",
    banner_subtitle_ru: c.banner_subtitle_ru ?? "",
    banner_subtitle_en: c.banner_subtitle_en ?? "",
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/admin/categories" className="text-sm text-neutral-500 hover:underline">← Categories</Link>
        <h1 className="text-2xl font-semibold mt-1">{c.name_en || c.name_ka || c.name_ru || c.slug}</h1>
      </div>
      <CategoryForm initial={initial} options={options ?? []} />
    </div>
  );
}
