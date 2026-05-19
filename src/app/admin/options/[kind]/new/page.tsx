import Link from "next/link";
import { notFound } from "next/navigation";
import { OptionForm } from "../form";
import type { OptionValues } from "../actions";
import { isKindSlug, OPTION_KINDS } from "../../config";

export const dynamic = "force-dynamic";

export default async function NewOptionPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!isKindSlug(kind)) notFound();
  const cfg = OPTION_KINDS[kind];

  const initial: OptionValues = {
    code: "",
    name_ka: "", name_ru: "", name_en: "",
    description_ka: "", description_ru: "", description_en: "",
    image_url: null, preview_image_url: null, gallery_image_urls: [],
    price_modifier: 0, sort_order: 0, is_active: true,
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <Link href={`/admin/options/${kind}`} className="text-sm text-neutral-500 hover:underline">← {cfg.label}</Link>
        <h1 className="text-2xl font-semibold mt-1">New {cfg.singular}</h1>
      </div>
      <OptionForm kind={kind} initial={initial} />
    </div>
  );
}
