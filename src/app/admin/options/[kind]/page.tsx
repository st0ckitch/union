import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceSupabase } from "@/lib/supabase/server";
import { ActiveBadge } from "@/lib/ui";
import { isKindSlug, OPTION_KINDS } from "../config";

export const dynamic = "force-dynamic";

export default async function OptionListPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!isKindSlug(kind)) notFound();
  const cfg = OPTION_KINDS[kind];

  const sb = createServiceSupabase();
  const { data: rows, error } = await sb
    .from(cfg.table)
    .select("id, code, name_en, name_ka, name_ru, image_url, preview_image_url, price_modifier, sort_order, is_active, updated_at")
    .order("sort_order", { ascending: true })
    .order("code", { ascending: true });

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin" className="text-sm text-neutral-500 hover:underline">← Dashboard</Link>
          <h1 className="text-2xl font-semibold mt-1">{cfg.label}</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {(rows?.length ?? 0)} option{rows?.length === 1 ? "" : "s"} — appears in the door configurator on the storefront.
          </p>
        </div>
        <Link href={`/admin/options/${kind}/new`} className="inline-flex items-center rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 py-1.5 text-sm font-medium hover:opacity-90">
          + New {cfg.singular}
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
              <th className="px-3 py-2 font-medium w-14"></th>
              <th className="px-3 py-2 font-medium">Code</th>
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium text-right">Price Δ</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium text-right">Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {(rows ?? []).map((r) => {
              const thumb = r.preview_image_url || r.image_url;
              return (
                <tr key={r.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-950/40">
                  <td className="px-3 py-2">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt="" className="w-10 h-10 object-cover rounded border border-neutral-200 dark:border-neutral-800" />
                    ) : (
                      <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded" />
                    )}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs">{r.code ?? "—"}</td>
                  <td className="px-3 py-2">
                    <Link href={`/admin/options/${kind}/${r.id}`} className="font-medium hover:underline">
                      {r.name_en || r.name_ka || r.name_ru || r.id.slice(0, 8)}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">{r.price_modifier ?? 0}</td>
                  <td className="px-3 py-2"><ActiveBadge active={r.is_active ?? false} /></td>
                  <td className="px-3 py-2 text-right tabular-nums text-neutral-500">{r.sort_order ?? 0}</td>
                </tr>
              );
            })}
            {(rows?.length ?? 0) === 0 && !error && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-neutral-500">
                No {cfg.singular}s yet. <Link className="underline" href={`/admin/options/${kind}/new`}>Create the first one →</Link>
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
