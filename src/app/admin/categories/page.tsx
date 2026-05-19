import Link from "next/link";
import { Fragment } from "react";
import { createServiceSupabase } from "@/lib/supabase/server";
import { ActiveBadge } from "@/lib/ui";

export const dynamic = "force-dynamic";

type Cat = {
  id: string;
  parent_id: string | null;
  slug: string;
  name_en: string | null;
  name_ka: string | null;
  name_ru: string | null;
  sort_order: number | null;
  is_active: boolean;
  home_visible: boolean;
  image_url: string | null;
};

export default async function CategoriesListPage() {
  const sb = createServiceSupabase();
  const { data: cats, error } = await sb
    .from("categories")
    .select("id, parent_id, slug, name_en, name_ka, name_ru, sort_order, is_active, home_visible, image_url")
    .order("sort_order", { ascending: true })
    .order("name_en", { ascending: true });

  const byParent = new Map<string | null, Cat[]>();
  for (const c of ((cats ?? []) as Cat[])) {
    const arr = byParent.get(c.parent_id) ?? [];
    arr.push(c);
    byParent.set(c.parent_id, arr);
  }

  function renderTree(parentId: string | null, depth: number): React.ReactNode {
    const children = byParent.get(parentId) ?? [];
    return children.map((c) => (
      <Fragment key={c.id}>
        <tr className="hover:bg-neutral-50 dark:hover:bg-neutral-950/40">
          <td className="px-3 py-2">
            <div className="flex items-center gap-2" style={{ paddingLeft: depth * 18 }}>
              {c.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={c.image_url} alt="" className="w-8 h-8 object-cover rounded border border-neutral-200 dark:border-neutral-800 shrink-0" />
              ) : (
                <div className="w-8 h-8 bg-neutral-100 dark:bg-neutral-800 rounded shrink-0" />
              )}
              <Link href={`/admin/categories/${c.id}`} className="font-medium hover:underline truncate">
                {c.name_en || c.name_ka || c.name_ru || c.slug}
              </Link>
            </div>
          </td>
          <td className="px-3 py-2 text-xs text-neutral-500 font-mono">{c.slug}</td>
          <td className="px-3 py-2"><ActiveBadge active={c.is_active} /></td>
          <td className="px-3 py-2 text-xs text-neutral-500">{c.home_visible ? "yes" : "—"}</td>
          <td className="px-3 py-2 text-right tabular-nums text-neutral-500">{c.sort_order ?? 0}</td>
        </tr>
        {renderTree(c.id, depth + 1)}
      </Fragment>
    ));
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {(cats?.length ?? 0)} total — hierarchical tree, with home-page promotion flags &amp; banner art.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 py-1.5 text-sm font-medium hover:opacity-90"
        >
          + New category
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-900 px-4 py-3 text-sm text-red-800 dark:text-red-200">
          {error.message}
        </div>
      )}

      <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-950/50 text-left">
            <tr>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Slug</th>
              <th className="px-3 py-2 font-medium">Active</th>
              <th className="px-3 py-2 font-medium">Home</th>
              <th className="px-3 py-2 font-medium text-right">Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {renderTree(null, 0)}
            {(cats?.length ?? 0) === 0 && !error && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-neutral-500">No categories yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
