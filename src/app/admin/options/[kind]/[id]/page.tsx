import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceSupabase } from "@/lib/supabase/server";
import { OptionForm } from "../form";
import type { OptionValues } from "../actions";
import { isKindSlug, OPTION_KINDS } from "../../config";

export const dynamic = "force-dynamic";

export default async function EditOptionPage({ params }: { params: Promise<{ kind: string; id: string }> }) {
  const { kind, id } = await params;
  if (!isKindSlug(kind)) notFound();
  const cfg = OPTION_KINDS[kind];

  const sb = createServiceSupabase();
  const { data: row } = await sb.from(cfg.table).select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  const initial: OptionValues = {
    id: row.id,
    code: row.code ?? "",
    name_ka: row.name_ka ?? "", name_ru: row.name_ru ?? "", name_en: row.name_en ?? "",
    description_ka: row.description_ka ?? "", description_ru: row.description_ru ?? "", description_en: row.description_en ?? "",
    image_url: row.image_url ?? null,
    preview_image_url: row.preview_image_url ?? null,
    gallery_image_urls: Array.isArray(row.gallery_image_urls) ? row.gallery_image_urls : [],
    price_modifier: row.price_modifier != null ? Number(row.price_modifier) : 0,
    sort_order: row.sort_order ?? 0,
    is_active: !!row.is_active,
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href={`/admin/options/${kind}`} className="text-sm text-neutral-500 hover:underline">← {cfg.label}</Link>
        <h1 className="text-2xl font-semibold mt-1">
          {row.name_en || row.name_ka || row.name_ru || row.code || row.id.slice(0, 8)}
        </h1>
      </div>
      <OptionForm kind={kind} initial={initial} />
    </div>
  );
}
