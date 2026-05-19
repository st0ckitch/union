"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, TriField } from "@/lib/ui";
import { saveCategory, deleteCategory, type CategoryValues } from "./actions";

export type CategoryOption = { id: string; name_en: string | null; name_ka: string | null; name_ru: string | null; parent_id: string | null };

export function CategoryForm({ initial, options }: { initial: CategoryValues; options: CategoryOption[] }) {
  const router = useRouter();
  const [v, setV] = useState<CategoryValues>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = <K extends keyof CategoryValues>(k: K, val: CategoryValues[K]) =>
    setV((p) => ({ ...p, [k]: val }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setError(null);
    const r = await saveCategory(v);
    setSaving(false);
    if (r.error) { setError(r.error); return; }
    if (!v.id && r.id) router.push(`/admin/categories/${r.id}`);
    else router.refresh();
  }
  async function onDelete() {
    if (!v.id || !confirm("Delete this category? Products linked to it will be unset.")) return;
    setSaving(true);
    const r = await deleteCategory(v.id);
    setSaving(false);
    if (r?.error) setError(r.error);
  }

  // Filter out self and any descendant from parent dropdown to avoid cycles.
  const parentOptions = options.filter((o) => o.id !== v.id);

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Slug" required>
          <input required value={v.slug} onChange={(e) => set("slug", e.target.value)} className="input font-mono" />
        </Field>
        <Field label="Parent">
          <select value={v.parent_id ?? ""} onChange={(e) => set("parent_id", e.target.value || null)} className="input">
            <option value="">— top level —</option>
            {parentOptions.map((c) => (
              <option key={c.id} value={c.id}>{c.name_en || c.name_ka || c.name_ru || c.id}</option>
            ))}
          </select>
        </Field>
      </div>

      <TriField
        label="Name"
        required
        values={{ ka: v.name_ka, ru: v.name_ru, en: v.name_en }}
        onChange={(x) => setV((p) => ({ ...p, name_ka: x.ka, name_ru: x.ru, name_en: x.en }))}
      />

      <Field label="Description (ka)">
        <textarea rows={4} value={v.description_ka} onChange={(e) => set("description_ka", e.target.value)} className="input" />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Image URL">
          <input type="url" value={v.image_url ?? ""} onChange={(e) => set("image_url", e.target.value || null)} className="input" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Sort order">
            <input type="number" value={v.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} className="input" />
          </Field>
          <Field label="Active">
            <select value={v.is_active ? "1" : "0"} onChange={(e) => set("is_active", e.target.value === "1")} className="input">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </Field>
        </div>
      </div>

      <fieldset className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
        <legend className="text-sm font-medium mb-2">Home page</legend>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Visible on home">
            <select value={v.home_visible ? "1" : "0"} onChange={(e) => set("home_visible", e.target.value === "1")} className="input">
              <option value="0">No</option><option value="1">Yes</option>
            </select>
          </Field>
          <Field label="Home sort order">
            <input type="number" value={v.home_sort_order} onChange={(e) => set("home_sort_order", Number(e.target.value))} className="input" />
          </Field>
          <Field label="Home image URL">
            <input type="url" value={v.home_image_url ?? ""} onChange={(e) => set("home_image_url", e.target.value || null)} className="input" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
        <legend className="text-sm font-medium mb-2">Category banner</legend>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Banner image URL">
            <input type="url" value={v.banner_image_url ?? ""} onChange={(e) => set("banner_image_url", e.target.value || null)} className="input" />
          </Field>
          <Field label="Banner link URL">
            <input type="url" value={v.banner_link_url ?? ""} onChange={(e) => set("banner_link_url", e.target.value || null)} className="input" />
          </Field>
        </div>
        <TriField
          label="Banner title"
          values={{ ka: v.banner_title_ka, ru: v.banner_title_ru, en: v.banner_title_en }}
          onChange={(x) => setV((p) => ({ ...p, banner_title_ka: x.ka, banner_title_ru: x.ru, banner_title_en: x.en }))}
        />
        <TriField
          label="Banner subtitle"
          values={{ ka: v.banner_subtitle_ka, ru: v.banner_subtitle_ru, en: v.banner_subtitle_en }}
          onChange={(x) => setV((p) => ({ ...p, banner_subtitle_ka: x.ka, banner_subtitle_ru: x.ru, banner_subtitle_en: x.en }))}
        />
      </fieldset>

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
