import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceSupabase } from "@/lib/supabase/server";
import { BlockForm } from "../form";
import type { BlockValues, BlockType } from "../types";

export const dynamic = "force-dynamic";

export default async function EditBlockPage({ params }: { params: Promise<{ id: string; blockId: string }> }) {
  const { id, blockId } = await params;
  const sb = createServiceSupabase();
  const { data: b } = await sb.from("product_content_blocks").select("*").eq("id", blockId).maybeSingle();
  if (!b) notFound();

  const initial: BlockValues = {
    id: b.id,
    product_id: id,
    block_type: (b.block_type ?? "image_gallery") as BlockType,
    sort_order: b.sort_order ?? 0,
    is_active: !!b.is_active,
    title_ka: b.title_ka ?? "", title_ru: b.title_ru ?? "", title_en: b.title_en ?? "",
    subtitle_ka: b.subtitle_ka ?? "", subtitle_ru: b.subtitle_ru ?? "", subtitle_en: b.subtitle_en ?? "",
    body_ka: b.body_ka ?? "", body_ru: b.body_ru ?? "", body_en: b.body_en ?? "",
    image_url: b.image_url ?? null,
    secondary_image_url: b.secondary_image_url ?? null,
    data: b.data ?? null,
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href={`/admin/products/${id}`} className="text-sm text-neutral-500 hover:underline">← Product</Link>
        <h1 className="text-2xl font-semibold mt-1">
          {b.title_en || b.title_ka || b.title_ru || `${b.block_type} block`}
        </h1>
        <div className="text-xs text-neutral-500 mt-0.5 font-mono">{b.block_type}</div>
      </div>
      <BlockForm initial={initial} />
    </div>
  );
}
