"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TriField, JsonField } from "@/lib/ui";
import { saveBlock, deleteBlock } from "./actions";
import { BLOCK_TYPES, type BlockValues } from "./types";

export function BlockForm({ initial }: { initial: BlockValues }) {
  const router = useRouter();
  const [v, setV] = useState<BlockValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof BlockValues>(k: K, val: BlockValues[K]) =>
    setV((p) => ({ ...p, [k]: val }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const r = await saveBlock(v);
    setSaving(false);
    if (r.error) { setError(r.error); return; }
    router.push(`/admin/products/${v.product_id}`);
    router.refresh();
  }
  async function onDelete() {
    if (!v.id || !confirm("Delete this block?")) return;
    setSaving(true);
    const r = await deleteBlock(v.id, v.product_id);
    setSaving(false);
    if (r?.error) setError(r.error);
  }

  const typeMeta = BLOCK_TYPES.find((t) => t.value === v.block_type);

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Block type" required>
          <select
            value={v.block_type}
            onChange={(e) => set("block_type", e.target.value as BlockValues["block_type"])}
            className="input"
          >
            {BLOCK_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
          {typeMeta && <p className="text-xs text-neutral-500 mt-1">{typeMeta.hint}</p>}
        </Field>
        <Field label="Sort order" hint="Lower = earlier on the page.">
          <input type="number" value={v.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} className="input" />
        </Field>
        <Field label="Active">
          <select value={v.is_active ? "1" : "0"} onChange={(e) => set("is_active", e.target.value === "1")} className="input">
            <option value="1">Yes</option><option value="0">No</option>
          </select>
        </Field>
      </div>

      <TriField
        label="Title"
        values={{ ka: v.title_ka, ru: v.title_ru, en: v.title_en }}
        onChange={(x) => setV((p) => ({ ...p, title_ka: x.ka, title_ru: x.ru, title_en: x.en }))}
      />
      <TriField
        label="Subtitle"
        values={{ ka: v.subtitle_ka, ru: v.subtitle_ru, en: v.subtitle_en }}
        onChange={(x) => setV((p) => ({ ...p, subtitle_ka: x.ka, subtitle_ru: x.ru, subtitle_en: x.en }))}
      />
      <TriField
        label="Body"
        multiline rows={4}
        values={{ ka: v.body_ka, ru: v.body_ru, en: v.body_en }}
        onChange={(x) => setV((p) => ({ ...p, body_ka: x.ka, body_ru: x.ru, body_en: x.en }))}
      />

      <div className="grid grid-cols-2 gap-3">
        <Field label="Image URL">
          <input type="url" value={v.image_url ?? ""} onChange={(e) => set("image_url", e.target.value || null)} className="input" />
          {v.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.image_url} alt="" className="mt-2 w-24 h-24 object-cover rounded border border-neutral-200 dark:border-neutral-800" />
          )}
        </Field>
        <Field label="Secondary image URL">
          <input type="url" value={v.secondary_image_url ?? ""} onChange={(e) => set("secondary_image_url", e.target.value || null)} className="input" />
          {v.secondary_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.secondary_image_url} alt="" className="mt-2 w-24 h-24 object-cover rounded border border-neutral-200 dark:border-neutral-800" />
          )}
        </Field>
      </div>

      <JsonField
        label="Custom data (JSON)"
        hint={blockDataHint(v.block_type)}
        value={v.data}
        onChange={(o) => set("data", o)}
        rows={10}
      />

      {error && (
        <div className="rounded-md border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-900 px-4 py-2 text-sm text-red-800 dark:text-red-200">{error}</div>
      )}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving} className="rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-2 text-sm font-medium disabled:opacity-50">
          {saving ? "Saving…" : v.id ? "Save" : "Create"}
        </button>
        {v.id && (
          <button type="button" onClick={onDelete} disabled={saving} className="rounded-md border border-red-300 dark:border-red-900 text-red-700 dark:text-red-300 px-4 py-2 text-sm font-medium disabled:opacity-50">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}

function blockDataHint(type: string): string {
  switch (type) {
    case "image_gallery":     return 'e.g. { "images": [{ "url": "...", "caption_en": "...", "caption_ka": "...", "caption_ru": "..." }] }';
    case "cta_tiles":         return 'e.g. { "tiles": [{ "image_url": "...", "label_en": "...", "href": "..." }] }';
    case "variants_carousel": return 'e.g. { "items": [{ "image_url": "...", "code": "L01", "name_en": "..." }] }';
    case "contact_cta":       return 'e.g. { "button_label_en": "Get in touch", "form": "callback" }';
    case "technical_diagram": return 'e.g. { "callouts": [{ "x": 0.3, "y": 0.5, "text_en": "Hinge" }] }';
    case "text_with_image":   return 'e.g. { "image_position": "left" }';
    default: return "Block-type-specific JSON payload.";
  }
}
