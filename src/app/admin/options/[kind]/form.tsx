"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TriField, ArrayField } from "@/lib/ui";
import { saveOption, deleteOption, type OptionValues } from "./actions";

export function OptionForm({ kind, initial }: { kind: string; initial: OptionValues }) {
  const router = useRouter();
  const [v, setV] = useState<OptionValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof OptionValues>(k: K, val: OptionValues[K]) =>
    setV((p) => ({ ...p, [k]: val }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const r = await saveOption(kind, v);
    setSaving(false);
    if (r.error) { setError(r.error); return; }
    if (!v.id && r.id) router.push(`/admin/options/${kind}/${r.id}`);
    else router.refresh();
  }
  async function onDelete() {
    if (!v.id || !confirm("Delete this option?")) return;
    setSaving(true);
    const r = await deleteOption(kind, v.id);
    setSaving(false);
    if (r?.error) setError(r.error);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-3 gap-3">
        <Field label="Code" required hint="Short identifier (e.g. L01, V27, FONDO).">
          <input required value={v.code} onChange={(e) => set("code", e.target.value)} className="input font-mono" />
        </Field>
        <Field label="Price modifier" hint="Added to product price when this option is chosen.">
          <input type="number" step="0.01" value={v.price_modifier} onChange={(e) => set("price_modifier", Number(e.target.value))} className="input" />
        </Field>
        <Field label="Sort order">
          <input type="number" value={v.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} className="input" />
        </Field>
      </div>

      <TriField
        label="Name"
        required
        values={{ ka: v.name_ka, ru: v.name_ru, en: v.name_en }}
        onChange={(x) => setV((p) => ({ ...p, name_ka: x.ka, name_ru: x.ru, name_en: x.en }))}
      />
      <TriField
        label="Description"
        multiline rows={3}
        values={{ ka: v.description_ka, ru: v.description_ru, en: v.description_en }}
        onChange={(x) => setV((p) => ({ ...p, description_ka: x.ka, description_ru: x.ru, description_en: x.en }))}
      />

      <div className="grid grid-cols-2 gap-3">
        <Field label="Image URL" hint="Full-size image (used in detail view).">
          <input type="url" value={v.image_url ?? ""} onChange={(e) => set("image_url", e.target.value || null)} className="input" />
          {v.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.image_url} alt="" className="mt-2 w-32 h-32 object-cover rounded border border-neutral-200 dark:border-neutral-800" />
          )}
        </Field>
        <Field label="Preview image URL" hint="Thumbnail used in pickers/swatches.">
          <input type="url" value={v.preview_image_url ?? ""} onChange={(e) => set("preview_image_url", e.target.value || null)} className="input" />
          {v.preview_image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={v.preview_image_url} alt="" className="mt-2 w-16 h-16 object-cover rounded border border-neutral-200 dark:border-neutral-800" />
          )}
        </Field>
      </div>

      <ArrayField label="Gallery image URLs" value={v.gallery_image_urls} onChange={(a) => set("gallery_image_urls", a)} rows={5} />

      <Field label="Active">
        <select value={v.is_active ? "1" : "0"} onChange={(e) => set("is_active", e.target.value === "1")} className="input max-w-xs">
          <option value="1">Yes</option><option value="0">No</option>
        </select>
      </Field>

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
