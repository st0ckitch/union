"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TriField, ArrayField } from "@/lib/ui";
import { ImagePicker, ImageArrayPicker } from "@/lib/image-picker";
import { KeyValueEditor, SpecSectionsEditor, DownloadLinksEditor } from "@/lib/structured-editors";
import { saveProduct, deleteProduct, type ProductValues } from "./actions";

const CATEGORY_TYPES = [
  { value: "", label: "—" },
  { value: "hinged_door",   label: "Hinged door" },
  { value: "sliding_door",  label: "Sliding door" },
  { value: "entrance_door", label: "Entrance door" },
  { value: "furniture",     label: "Furniture" },
  { value: "hardware",      label: "Hardware" },
  { value: "generic",       label: "Generic" },
];

const STOCK_STATUSES = [
  { value: "", label: "—" },
  { value: "in_stock",     label: "In stock" },
  { value: "out_of_stock", label: "Out of stock" },
  { value: "made_to_order",label: "Made to order" },
];

const VIDEO_PROVIDERS = [
  { value: "", label: "—" },
  { value: "youtube", label: "YouTube" },
  { value: "vimeo",   label: "Vimeo" },
  { value: "self",    label: "Self-hosted" },
];

export type Category = { id: string; name_en: string | null; name_ka: string | null; name_ru: string | null; parent_id: string | null };

export function ProductForm({
  initial,
  categories,
}: {
  initial: ProductValues;
  categories: Category[];
}) {
  const router = useRouter();
  const [v, setV] = useState<ProductValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof ProductValues>(k: K, val: ProductValues[K]) =>
    setV((prev) => ({ ...prev, [k]: val }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const result = await saveProduct(v);
    setSaving(false);
    if (result.error) { setError(result.error); return; }
    if (!v.id && result.id) {
      router.push(`/admin/products/${result.id}`);
    } else {
      router.refresh();
    }
  }

  async function onDelete() {
    if (!v.id) return;
    if (!confirm(`Delete product "${v.name_en || v.slug}"? This can't be undone.`)) return;
    setSaving(true);
    const r = await deleteProduct(v.id);
    setSaving(false);
    if (r?.error) setError(r.error);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 max-w-5xl">
      {/* ────────── Identity ────────── */}
      <Section title="Identity" subtitle="Slug, names per locale, parent category & collection.">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Slug" required>
            <input
              required
              value={v.slug}
              onChange={(e) => set("slug", e.target.value)}
              className="input font-mono"
            />
          </Field>
          <Field label="Category" hint="From the categories table.">
            <select
              value={v.category_id ?? ""}
              onChange={(e) => set("category_id", e.target.value || null)}
              className="input"
            >
              <option value="">— none —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name_en || c.name_ka || c.name_ru || c.id}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Type">
            <select
              value={v.category_type ?? ""}
              onChange={(e) => set("category_type", e.target.value || null)}
              className="input"
            >
              {CATEGORY_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </Field>
          <Field label="Collection slug" hint="Used to group sibling products into a collection.">
            <input
              value={v.collection_slug ?? ""}
              onChange={(e) => set("collection_slug", e.target.value || null)}
              className="input font-mono"
            />
          </Field>
        </div>
        <TriField
          label="Name"
          required
          requiredLocales={["ka", "en"]}
          values={{ ka: v.name_ka, ru: v.name_ru, en: v.name_en }}
          onChange={(x) => setV((p) => ({ ...p, name_ka: x.ka, name_ru: x.ru, name_en: x.en }))}
        />
      </Section>

      {/* ────────── Descriptions ────────── */}
      <Section title="Descriptions">
        <TriField
          label="Description"
          multiline
          rows={6}
          values={{ ka: v.description_ka, ru: v.description_ru, en: v.description_en }}
          onChange={(x) => setV((p) => ({ ...p, description_ka: x.ka, description_ru: x.ru, description_en: x.en }))}
        />
      </Section>

      {/* ────────── Pricing ────────── */}
      <Section title="Pricing">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Price *" hint="Required. Use 0 if not for sale.">
            <input
              type="number" step="0.01" min="0" required
              value={v.price ?? ""}
              onChange={(e) => set("price", e.target.value === "" ? null : Number(e.target.value))}
              className="input"
            />
          </Field>
          <Field label="Sale price">
            <input
              type="number" step="0.01"
              value={v.sale_price ?? ""}
              onChange={(e) => set("sale_price", e.target.value === "" ? null : Number(e.target.value))}
              className="input"
            />
          </Field>
          <Field label='Show "from" prefix on price'>
            <Toggle value={v.price_from} onChange={(b) => set("price_from", b)} />
          </Field>
        </div>
      </Section>

      {/* ────────── Stock & delivery ────────── */}
      <Section title="Stock & delivery">
        <div className="grid grid-cols-3 gap-3">
          <Field label="Stock quantity">
            <input
              type="number"
              value={v.stock_quantity ?? ""}
              onChange={(e) => set("stock_quantity", e.target.value === "" ? null : Number(e.target.value))}
              className="input"
            />
          </Field>
          <Field label="Stock status">
            <select
              value={v.stock_status ?? ""}
              onChange={(e) => set("stock_status", e.target.value || null)}
              className="input"
            >
              {STOCK_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>
          <Field label="Delivery (days)">
            <input
              type="number"
              value={v.delivery_days ?? ""}
              onChange={(e) => set("delivery_days", e.target.value === "" ? null : Number(e.target.value))}
              className="input"
            />
          </Field>
        </div>
        <TriField
          label="Delivery text"
          multiline
          rows={2}
          values={{ ka: v.delivery_text_ka, ru: v.delivery_text_ru, en: v.delivery_text_en }}
          onChange={(x) => setV((p) => ({ ...p, delivery_text_ka: x.ka, delivery_text_ru: x.ru, delivery_text_en: x.en }))}
        />
      </Section>

      {/* ────────── Flags ────────── */}
      <Section title="Status & flags">
        <div className="grid grid-cols-3 gap-y-2 gap-x-4">
          <ToggleField label="Active" value={v.is_active} onChange={(b) => set("is_active", b)} />
          <ToggleField label="New" value={v.is_new} onChange={(b) => set("is_new", b)} />
          <ToggleField label="Featured" value={v.is_featured} onChange={(b) => set("is_featured", b)} />
        </div>
        <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Has variants of:</div>
          <div className="grid grid-cols-4 gap-y-2 gap-x-4">
            <ToggleField label="Models"  value={v.has_model_variants}   onChange={(b) => set("has_model_variants", b)} />
            <ToggleField label="Glass"   value={v.has_glass_variants}   onChange={(b) => set("has_glass_variants", b)} />
            <ToggleField label="Finish (otdelka)" value={v.has_otdelka_variants} onChange={(b) => set("has_otdelka_variants", b)} />
            <ToggleField label="Frame (korobka)"  value={v.has_korobka_variants} onChange={(b) => set("has_korobka_variants", b)} />
            <ToggleField label="Locks"   value={v.has_lock_variants}    onChange={(b) => set("has_lock_variants", b)} />
            <ToggleField label="Panels"  value={v.has_panel_variants}   onChange={(b) => set("has_panel_variants", b)} />
            <ToggleField label="Modules" value={v.has_modules}          onChange={(b) => set("has_modules", b)} />
          </div>
        </div>
      </Section>

      {/* ────────── Media ────────── */}
      <Section title="Media">
        <ImageArrayPicker
          label="Product images"
          hint="Drop files or paste URLs. The first image is the primary thumbnail."
          values={v.images}
          onChange={(a) => set("images", a)}
          scope={v.id ? `products/${v.id}` : "products/new"}
        />
        <ImageArrayPicker
          label="Lifestyle gallery"
          hint="Interior/scene shots shown on the product page."
          values={v.lifestyle_gallery_image_urls}
          onChange={(a) => set("lifestyle_gallery_image_urls", a)}
          scope={v.id ? `products/${v.id}/lifestyle` : "products/new/lifestyle"}
        />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Video URL">
            <input type="url" value={v.video_url ?? ""} onChange={(e) => set("video_url", e.target.value || null)} className="input" />
          </Field>
          <Field label="Video provider">
            <select value={v.video_provider ?? ""} onChange={(e) => set("video_provider", e.target.value || null)} className="input">
              {VIDEO_PROVIDERS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </Field>
        </div>
      </Section>

      {/* ────────── Style ────────── */}
      <Section title="Style & classification">
        <div className="grid grid-cols-2 gap-3">
          <ArrayField label="Style tags" value={v.style_tags} onChange={(a) => set("style_tags", a)} rows={3} />
          <ArrayField label="Finish keywords" value={v.finish} onChange={(a) => set("finish", a)} rows={3} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Frame type">
            <input value={v.frame_type ?? ""} onChange={(e) => set("frame_type", e.target.value || null)} className="input" />
          </Field>
          <ArrayField label="Configuration styles" value={v.configuration_styles} onChange={(a) => set("configuration_styles", a)} rows={3} />
        </div>
      </Section>

      {/* ────────── Origin ────────── */}
      <Section title="Origin">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Country of origin">
            <input value={v.country_of_origin ?? ""} onChange={(e) => set("country_of_origin", e.target.value || null)} className="input" placeholder="Italy" />
          </Field>
          <Field label="Designer credit">
            <input value={v.designer_credit ?? ""} onChange={(e) => set("designer_credit", e.target.value || null)} className="input" />
          </Field>
        </div>
      </Section>

      {/* ────────── Specifications ────────── */}
      <Section title="Specifications" subtitle="Structured spec data — no JSON knowledge needed.">
        <KeyValueEditor
          label="Specifications (default locale)"
          hint='Free-form key/value pairs (e.g. lock = "magnetic AGB", made_in = "Italy").'
          value={v.specifications}
          onChange={(o) => set("specifications", o)}
        />
        <KeyValueEditor
          label="Specifications (English override)"
          hint="Only fill what differs from the default locale above."
          value={v.specifications_en}
          onChange={(o) => set("specifications_en", o)}
        />
        <SpecSectionsEditor
          label="Spec sections"
          hint='Grouped bullet points (e.g. "Door leaf", "Frame"). Each bullet is trilingual.'
          value={v.spec_sections}
          onChange={(o) => set("spec_sections", o)}
        />
        <DownloadLinksEditor
          label="Download links"
          hint="PDFs, DWGs, catalogs — anything the customer can download from the product page."
          value={v.download_links}
          onChange={(o) => set("download_links", o)}
        />
      </Section>

      {/* ────────── SEO ────────── */}
      <Section title="Source">
        <Field label="Source URL" hint="Original page (e.g. for imported products).">
          <input type="url" value={v.source_url ?? ""} onChange={(e) => set("source_url", e.target.value || null)} className="input" />
        </Field>
      </Section>

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-900 px-4 py-2 text-sm text-red-800 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="sticky bottom-0 bg-neutral-50/95 dark:bg-neutral-950/95 backdrop-blur px-4 py-3 -mx-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {saving ? "Saving…" : v.id ? "Save changes" : "Create product"}
        </button>
        {v.id && (
          <button
            type="button"
            onClick={onDelete}
            disabled={saving}
            className="rounded-md border border-red-300 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5 space-y-4">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        {subtitle && <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (b: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-10 items-center rounded-full transition ${value ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${value ? "translate-x-4" : "translate-x-0.5"}`} />
    </button>
  );
}

function ToggleField({ label, value, onChange }: { label: string; value: boolean; onChange: (b: boolean) => void }) {
  return (
    <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-md border border-neutral-200 dark:border-neutral-800">
      <span className="text-sm">{label}</span>
      <Toggle value={value} onChange={onChange} />
    </div>
  );
}
