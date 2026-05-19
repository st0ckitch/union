import Link from "next/link";
import { createServiceSupabase } from "@/lib/supabase/server";
import { CategoryForm } from "../form";
import type { CategoryValues } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewCategoryPage() {
  const sb = createServiceSupabase();
  const { data: options } = await sb
    .from("categories").select("id, name_en, name_ka, name_ru, parent_id")
    .order("sort_order", { ascending: true });

  const initial: CategoryValues = {
    parent_id: null, slug: "",
    name_ka: "", name_ru: "", name_en: "",
    description_ka: "",
    image_url: null, sort_order: 0, is_active: true,
    home_visible: false, home_sort_order: 0, home_image_url: null,
    banner_image_url: null, banner_link_url: null,
    banner_title_ka: "", banner_title_ru: "", banner_title_en: "",
    banner_subtitle_ka: "", banner_subtitle_ru: "", banner_subtitle_en: "",
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href="/admin/categories" className="text-sm text-neutral-500 hover:underline">← Categories</Link>
        <h1 className="text-2xl font-semibold mt-1">New category</h1>
      </div>
      <CategoryForm initial={initial} options={options ?? []} />
    </div>
  );
}
