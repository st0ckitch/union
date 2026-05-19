import Link from "next/link";
import { BlockForm } from "../form";
import type { BlockValues } from "../types";

export const dynamic = "force-dynamic";

export default async function NewBlockPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const initial: BlockValues = {
    product_id: id,
    block_type: "image_gallery",
    sort_order: 10,
    is_active: true,
    title_ka: "", title_ru: "", title_en: "",
    subtitle_ka: "", subtitle_ru: "", subtitle_en: "",
    body_ka: "", body_ru: "", body_en: "",
    image_url: null,
    secondary_image_url: null,
    data: null,
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href={`/admin/products/${id}`} className="text-sm text-neutral-500 hover:underline">← Product</Link>
        <h1 className="text-2xl font-semibold mt-1">New content block</h1>
      </div>
      <BlockForm initial={initial} />
    </div>
  );
}
