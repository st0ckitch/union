import Link from "next/link";
import { createServiceSupabase } from "@/lib/supabase/server";

export async function StubPage({ title, description, table }: { title: string; description?: string; table?: string }) {
  let count: number | null = null;
  if (table) {
    try {
      const sb = createServiceSupabase();
      const r = await sb.from(table).select("*", { count: "exact", head: true });
      count = r.count ?? 0;
    } catch {}
  }
  return (
    <div className="p-8 max-w-3xl">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      {description && <p className="text-sm text-neutral-500 mb-4">{description}</p>}
      <div className="rounded-md border border-dashed border-neutral-300 dark:border-neutral-700 px-6 py-10 text-center text-sm text-neutral-500">
        Admin UI not built yet.
        {count !== null && (
          <div className="mt-2">
            Backing table <code className="px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">{table}</code> has <strong className="text-neutral-700 dark:text-neutral-300">{count.toLocaleString()}</strong> row{count === 1 ? "" : "s"}.
          </div>
        )}
        <div className="mt-4">
          Follow the <Link className="underline" href="/admin/products">Products</Link> page as the implementation pattern.
        </div>
      </div>
    </div>
  );
}
