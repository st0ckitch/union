import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceSupabase } from "@/lib/supabase/server";
import { ProductForm } from "../form";
import { LinkedOptionsPanel, type Option } from "../linked-options";
import type { OptionKind, ProductValues } from "../actions";
import { BlocksList, type BlockRow } from "./blocks/list";
import { storefrontProductUrl, storefrontHost } from "@/lib/storefront";

export const dynamic = "force-dynamic";

const OPTION_CONFIG: { kind: OptionKind; table: string; join: string; fk: string }[] = [
  { kind: "model",    table: "door_model_options",    join: "product_model_options",    fk: "model_option_id" },
  { kind: "glass",    table: "door_glass_options",    join: "product_glass_options",    fk: "glass_option_id" },
  { kind: "otdelka",  table: "door_otdelka_options",  join: "product_otdelka_options",  fk: "otdelka_option_id" },
  { kind: "korobka",  table: "door_korobka_options",  join: "product_korobka_options",  fk: "korobka_option_id" },
  { kind: "lock",     table: "door_lock_options",     join: "product_lock_options",     fk: "lock_option_id" },
  { kind: "panel",    table: "door_panel_options",    join: "product_panel_options",    fk: "panel_option_id" },
];

const HAS_FLAG: Record<OptionKind, keyof typeof FLAGS> = {
  model: "has_model_variants", glass: "has_glass_variants", otdelka: "has_otdelka_variants",
  korobka: "has_korobka_variants", lock: "has_lock_variants", panel: "has_panel_variants",
};
const FLAGS = { has_model_variants: 1, has_glass_variants: 1, has_otdelka_variants: 1,
  has_korobka_variants: 1, has_lock_variants: 1, has_panel_variants: 1 };

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = createServiceSupabase();

  const { data: p } = await sb.from("products").select("*").eq("id", id).maybeSingle();
  if (!p) notFound();

  const { data: categories } = await sb
    .from("categories")
    .select("id, name_en, name_ka, name_ru, parent_id")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  // Linked configurator options.
  const optionData = await Promise.all(
    OPTION_CONFIG.map(async (cfg) => {
      const [all, linked] = await Promise.all([
        sb.from(cfg.table).select("id, code, name_en, name_ka, name_ru").eq("is_active", true).order("sort_order"),
        sb.from(cfg.join).select(`${cfg.fk}, is_default`).eq("product_id", id),
      ]);
      const linkedRows = ((linked.data ?? []) as unknown as Array<Record<string, unknown>>).map((r) => ({
        option_id: r[cfg.fk] as string,
        is_default: !!r.is_default,
      }));
      return {
        cfg,
        allOptions: (all.data ?? []) as Option[],
        linked: linkedRows,
        flagOn: !!(p as Record<string, unknown>)[HAS_FLAG[cfg.kind]],
      };
    }),
  );

  // Content blocks.
  const { data: blocksData } = await sb
    .from("product_content_blocks")
    .select("id, block_type, sort_order, is_active, title_en, title_ka, title_ru, image_url, data")
    .eq("product_id", id)
    .eq("scope", "product")
    .order("sort_order", { ascending: true });
  const blocks = (blocksData ?? []) as BlockRow[];

  // Furniture modules (only relevant when has_modules is true).
  const { data: modules } = await sb
    .from("furniture_modules")
    .select("id, code, name_en, name_ka, name_ru, dimensions_text, base_price, image_url, is_active, sort_order")
    .eq("parent_product_id", id)
    .order("sort_order", { ascending: true });

  const initial: ProductValues = {
    id: p.id,
    slug: p.slug ?? "",
    name_ka: p.name_ka ?? "",
    name_ru: p.name_ru ?? "",
    name_en: p.name_en ?? "",
    category_id: p.category_id ?? null,
    category_type: p.category_type ?? null,
    collection_slug: p.collection_slug ?? null,
    description_ka: p.description_ka ?? "",
    description_ru: p.description_ru ?? "",
    description_en: p.description_en ?? "",
    price: p.price != null ? Number(p.price) : null,
    sale_price: p.sale_price != null ? Number(p.sale_price) : null,
    price_from: !!p.price_from,
    stock_quantity: p.stock_quantity ?? null,
    stock_status: p.stock_status ?? null,
    delivery_days: p.delivery_days ?? null,
    delivery_text_ka: p.delivery_text_ka ?? "",
    delivery_text_ru: p.delivery_text_ru ?? "",
    delivery_text_en: p.delivery_text_en ?? "",
    is_active: !!p.is_active,
    is_new: !!p.is_new,
    is_featured: !!p.is_featured,
    has_model_variants:   !!p.has_model_variants,
    has_glass_variants:   !!p.has_glass_variants,
    has_otdelka_variants: !!p.has_otdelka_variants,
    has_korobka_variants: !!p.has_korobka_variants,
    has_lock_variants:    !!p.has_lock_variants,
    has_panel_variants:   !!p.has_panel_variants,
    has_modules:          !!p.has_modules,
    images: Array.isArray(p.images) ? p.images : [],
    lifestyle_gallery_image_urls: Array.isArray(p.lifestyle_gallery_image_urls) ? p.lifestyle_gallery_image_urls : [],
    video_url: p.video_url ?? null,
    video_provider: p.video_provider ?? null,
    style_tags: Array.isArray(p.style_tags) ? p.style_tags : [],
    finish: Array.isArray(p.finish) ? p.finish : [],
    frame_type: p.frame_type ?? null,
    configuration_styles: Array.isArray(p.configuration_styles) ? p.configuration_styles : [],
    country_of_origin: p.country_of_origin ?? null,
    designer_credit: p.designer_credit ?? null,
    specifications: p.specifications ?? null,
    specifications_en: p.specifications_en ?? null,
    spec_sections: p.spec_sections ?? null,
    download_links: p.download_links ?? null,
    source_url: p.source_url ?? null,
  };

  const displayName = p.name_en || p.name_ka || p.name_ru || p.slug;
  const previewUrl = storefrontProductUrl(p.slug);
  const previewHost = storefrontHost();

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <Link href="/admin/products" className="text-sm text-neutral-500 hover:underline">← Products</Link>
          <h1 className="text-2xl font-semibold mt-1">{displayName}</h1>
          <div className="text-xs text-neutral-500 mt-0.5 font-mono">{p.slug}</div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-800 hover:border-neutral-400 hover:bg-neutral-50"
              title={`Open this product on ${previewHost ?? "the storefront"}`}
            >
              <span>👁</span>
              <span>Preview</span>
              <span className="text-neutral-400">↗</span>
            </a>
          )}
          {p.source_url && p.source_url !== previewUrl && (
            <a
              href={p.source_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline"
              title="Original imported source URL"
            >
              source ↗
            </a>
          )}
        </div>
      </div>

      {/* Summary chips: snapshot of what's linked. */}
      <div className="mb-6 flex flex-wrap gap-2 text-xs">
        <Chip label="images" count={initial.images.length} />
        <Chip label="lifestyle gallery" count={initial.lifestyle_gallery_image_urls.length} />
        <Chip label="content blocks" count={blocks.length} active={blocks.length > 0} />
        <Chip label="furniture modules" count={(modules ?? []).length} active={(modules?.length ?? 0) > 0} />
        {optionData.map((od) => (
          <Chip
            key={od.cfg.kind}
            label={od.cfg.kind}
            count={od.linked.length}
            flagged={od.flagOn}
            active={od.linked.length > 0}
          />
        ))}
      </div>

      <ProductForm initial={initial} categories={categories ?? []} />

      {/* ────────── Content blocks ────────── */}
      <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 mt-8">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-base font-semibold">Content blocks ({blocks.length})</h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Long-form presentation sections shown on the product page: galleries, diagrams, CTAs, text+image blocks, variant carousels.
            </p>
          </div>
          <Link href={`/admin/products/${id}/blocks/new`} className="rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 py-1.5 text-sm">
            + Add block
          </Link>
        </div>
        <BlocksList productId={id} blocks={blocks} />
      </section>

      {/* ────────── Configurator linkage ────────── */}
      <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 mt-8 space-y-4">
        <div>
          <h2 className="text-base font-semibold">Configurator linkage</h2>
          <p className="text-xs text-neutral-500 mt-0.5">
            Link this product to the configurator options visitors can pick. The &ldquo;has variants&rdquo; flag must be ON for the option to actually appear on the storefront.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {optionData.map((od) => (
            <div key={od.cfg.kind} className={od.flagOn ? "" : "opacity-60"}>
              {!od.flagOn && (
                <div className="text-[10px] uppercase tracking-wider text-amber-600 mb-1">
                  &ldquo;has {od.cfg.kind} variants&rdquo; flag is OFF — links here will be ignored on storefront
                </div>
              )}
              <LinkedOptionsPanel
                productId={p.id}
                kind={od.cfg.kind}
                allOptions={od.allOptions}
                linked={od.linked}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ────────── Furniture modules ────────── */}
      <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 mt-8">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-base font-semibold">Furniture modules ({(modules ?? []).length})</h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Composable modules for furniture products. Each module has its own otdelka/glass/lighting options.
              {!initial.has_modules && <span className="block text-amber-600">&ldquo;has modules&rdquo; flag is OFF.</span>}
            </p>
          </div>
          <Link href={`/admin/modules?parent=${id}`} className="text-sm text-neutral-500 hover:underline">
            Manage modules →
          </Link>
        </div>
        {(modules ?? []).length === 0 ? (
          <div className="text-sm text-neutral-500 italic">No modules linked to this product.</div>
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
            {(modules ?? []).map((m) => (
              <li key={m.id} className="py-2 flex items-center gap-3">
                {m.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.image_url} alt="" className="w-10 h-10 object-cover rounded border border-neutral-200 dark:border-neutral-800" />
                ) : (
                  <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">
                    <span className="font-mono text-xs text-neutral-500 mr-2">{m.code}</span>
                    {m.name_en || m.name_ka || m.name_ru}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {m.dimensions_text ?? "—"}
                    {m.base_price ? ` · base ${Number(m.base_price).toLocaleString()}` : ""}
                    {!m.is_active && " · inactive"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Chip({ label, count, flagged, active }: { label: string; count: number; flagged?: boolean; active?: boolean }) {
  const cls = active
    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
    : count === 0 && flagged
    ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
    : "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 ${cls}`}>
      <span className="font-medium tabular-nums">{count}</span>
      <span>{label}</span>
      {flagged && count === 0 && <span title="flag is on but no links exist">⚠</span>}
    </span>
  );
}
