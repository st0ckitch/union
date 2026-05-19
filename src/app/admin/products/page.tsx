import Link from "next/link";
import { createServiceSupabase } from "@/lib/supabase/server";
import { ActiveBadge } from "@/lib/ui";
import { storefrontProductUrl } from "@/lib/storefront";

export const dynamic = "force-dynamic";

const TYPE_LABELS: Record<string, string> = {
  hinged_door:   "Hinged door",
  sliding_door:  "Sliding door",
  entrance_door: "Entrance door",
  furniture:     "Furniture",
  hardware:      "Hardware",
  generic:       "Generic",
};

const PAGE_SIZE = 50;

export default async function ProductsListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; active?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const type = sp.type ?? "";
  const activeFilter = sp.active ?? "";
  const page = Math.max(1, Number(sp.page ?? "1"));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const sb = createServiceSupabase();
  let query = sb
    .from("products")
    .select("id, slug, name_ka, name_en, name_ru, price, sale_price, is_active, is_new, is_featured, category_type, stock_quantity, updated_at, images", { count: "exact" })
    .order("updated_at", { ascending: false })
    .range(from, to);

  if (q) {
    // Search across all three locales + slug.
    query = query.or(
      `name_ka.ilike.%${q}%,name_en.ilike.%${q}%,name_ru.ilike.%${q}%,slug.ilike.%${q}%`,
    );
  }
  if (type) query = query.eq("category_type", type);
  if (activeFilter === "yes") query = query.eq("is_active", true);
  else if (activeFilter === "no") query = query.eq("is_active", false);

  const { data: products, count, error } = await query;
  const totalPages = count ? Math.ceil(count / PAGE_SIZE) : 1;

  // Category-type counts for the filter chips.
  const { data: typeRows } = await sb
    .from("products")
    .select("category_type");
  const typeCounts: Record<string, number> = {};
  for (const r of typeRows ?? []) {
    const k = (r.category_type as string | null) ?? "(none)";
    typeCounts[k] = (typeCounts[k] ?? 0) + 1;
  }

  return (
    <div className="p-8 max-w-7xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-sm text-neutral-500 mt-0.5">
            {count?.toLocaleString() ?? 0} total — manage catalog items, configurator linkage, media.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 py-1.5 text-sm font-medium hover:opacity-90"
        >
          + New product
        </Link>
      </div>

      {/* filters */}
      <form className="mb-4 flex flex-wrap gap-2 items-end" action="/admin/products">
        <div>
          <label className="block text-xs text-neutral-500 mb-0.5">Search</label>
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="name or slug…"
            className="input min-w-[240px]"
          />
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-0.5">Type</label>
          <select name="type" defaultValue={type} className="input">
            <option value="">All ({(count ?? 0).toLocaleString()})</option>
            {Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([k, n]) => (
              <option key={k} value={k === "(none)" ? "" : k}>
                {TYPE_LABELS[k] ?? k} ({n})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-neutral-500 mb-0.5">Active</label>
          <select name="active" defaultValue={activeFilter} className="input">
            <option value="">All</option>
            <option value="yes">Active only</option>
            <option value="no">Inactive only</option>
          </select>
        </div>
        <button
          type="submit"
          className="rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-3 py-2 text-sm font-medium"
        >
          Apply
        </button>
        {(q || type || activeFilter) && (
          <Link href="/admin/products" className="text-sm text-neutral-500 hover:underline px-2 py-2">
            Clear
          </Link>
        )}
      </form>

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
              <th className="px-3 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Type</th>
              <th className="px-3 py-2 font-medium text-right">Price</th>
              <th className="px-3 py-2 font-medium text-right">Stock</th>
              <th className="px-3 py-2 font-medium">Flags</th>
              <th className="px-3 py-2 font-medium text-right">Updated</th>
              <th className="px-3 py-2 font-medium w-8"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {(products ?? []).map((p) => {
              const thumb = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : null;
              const displayName = p.name_en || p.name_ka || p.name_ru || p.slug;
              return (
                <tr key={p.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-950/40">
                  <td className="px-3 py-2">
                    {thumb ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={thumb} alt="" className="w-10 h-10 object-cover rounded border border-neutral-200 dark:border-neutral-800" />
                    ) : (
                      <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-800 rounded" />
                    )}
                  </td>
                  <td className="px-3 py-2 min-w-0">
                    <Link href={`/admin/products/${p.id}`} className="font-medium hover:underline block truncate max-w-md">
                      {displayName}
                    </Link>
                    <div className="text-xs text-neutral-500 font-mono truncate max-w-md">{p.slug}</div>
                  </td>
                  <td className="px-3 py-2 text-neutral-600 dark:text-neutral-400">
                    {p.category_type ? (TYPE_LABELS[p.category_type] ?? p.category_type) : "—"}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">
                    {p.sale_price ? (
                      <div>
                        <div className="font-medium">{Number(p.sale_price).toLocaleString()}</div>
                        <div className="text-xs text-neutral-500 line-through">{Number(p.price ?? 0).toLocaleString()}</div>
                      </div>
                    ) : p.price ? (
                      Number(p.price).toLocaleString()
                    ) : "—"}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums text-neutral-600">{p.stock_quantity ?? "—"}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1 flex-wrap">
                      <ActiveBadge active={p.is_active ?? false} />
                      {p.is_new && <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">new</span>}
                      {p.is_featured && <span className="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">featured</span>}
                    </div>
                  </td>
                  <td className="px-3 py-2 text-right text-xs text-neutral-500">
                    {p.updated_at ? new Date(p.updated_at).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-2 py-2 text-right">
                    {(() => {
                      const u = storefrontProductUrl(p.slug);
                      return u ? (
                        <a
                          href={u}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center w-7 h-7 rounded text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
                          title="Preview on storefront"
                        >
                          ↗
                        </a>
                      ) : null;
                    })()}
                  </td>
                </tr>
              );
            })}
            {(products?.length ?? 0) === 0 && !error && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-neutral-500">
                  No products match.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-neutral-500">
            Page {page} of {totalPages.toLocaleString()} ({count?.toLocaleString()} products)
          </div>
          <div className="flex gap-2">
            {page > 1 && (
              <Link
                href={{ pathname: "/admin/products", query: { ...sp, page: page - 1 } }}
                className="rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                ← Prev
              </Link>
            )}
            {page < totalPages && (
              <Link
                href={{ pathname: "/admin/products", query: { ...sp, page: page + 1 } }}
                className="rounded-md border border-neutral-300 dark:border-neutral-700 px-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                Next →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
