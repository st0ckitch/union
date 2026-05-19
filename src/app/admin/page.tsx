import { createServiceSupabase } from "@/lib/supabase/server";
import Link from "next/link";

type TableKey = string;

async function counts(): Promise<Record<TableKey, number>> {
  const sb = createServiceSupabase();
  const tables: TableKey[] = [
    "products", "categories", "furniture_modules",
    "door_model_options", "door_glass_options", "door_otdelka_options",
    "door_korobka_options", "door_lock_options", "door_panel_options", "door_lighting_options",
    "blog_posts", "banners", "menu_items", "legal_pages", "site_features",
    "showrooms", "testimonials", "orders", "consultations",
  ];
  const results = await Promise.all(
    tables.map(async (t) => {
      const { count } = await sb.from(t).select("*", { count: "exact", head: true });
      return [t, count ?? 0] as const;
    }),
  );
  return Object.fromEntries(results);
}

type Tile = { key: string; label: string; href: string; group: "Catalog" | "Configurator" | "Content" | "Ops" };

const TILES: Tile[] = [
  { key: "products",             label: "Products",          href: "/admin/products",           group: "Catalog" },
  { key: "categories",           label: "Categories",        href: "/admin/categories",         group: "Catalog" },
  { key: "furniture_modules",    label: "Modules",           href: "/admin/modules",            group: "Catalog" },

  { key: "door_model_options",   label: "Door models",       href: "/admin/options/door-models",    group: "Configurator" },
  { key: "door_glass_options",   label: "Glass",             href: "/admin/options/door-glass",     group: "Configurator" },
  { key: "door_otdelka_options", label: "Finishes",          href: "/admin/options/door-otdelka",   group: "Configurator" },
  { key: "door_korobka_options", label: "Frames",            href: "/admin/options/door-korobka",   group: "Configurator" },
  { key: "door_lock_options",    label: "Locks",             href: "/admin/options/door-lock",      group: "Configurator" },
  { key: "door_panel_options",   label: "Panels",            href: "/admin/options/door-panel",     group: "Configurator" },
  { key: "door_lighting_options",label: "Lighting",          href: "/admin/options/door-lighting",  group: "Configurator" },

  { key: "blog_posts",   label: "Blog posts",   href: "/admin/blog",    group: "Content" },
  { key: "banners",      label: "Banners",      href: "/admin/banners", group: "Content" },
  { key: "menu_items",   label: "Menu items",   href: "/admin/menu",    group: "Content" },
  { key: "legal_pages",  label: "Legal pages",  href: "/admin/pages",   group: "Content" },
  { key: "site_features",label: "Site features",href: "/admin/features",group: "Content" },

  { key: "showrooms",     label: "Showrooms",      href: "/admin/showrooms",     group: "Ops" },
  { key: "testimonials",  label: "Testimonials",   href: "/admin/testimonials",  group: "Ops" },
  { key: "orders",        label: "Orders",         href: "/admin/orders",        group: "Ops" },
  { key: "consultations", label: "Consultations",  href: "/admin/consultations", group: "Ops" },
];

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let data: Record<string, number> = {};
  let dbError: string | null = null;
  try {
    data = await counts();
  } catch (e) {
    dbError = e instanceof Error ? e.message : String(e);
  }

  const groups: Array<"Catalog" | "Configurator" | "Content" | "Ops"> = ["Catalog", "Configurator", "Content", "Ops"];

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-sm text-neutral-500 mb-6">Overview of catalog &amp; content.</p>

      {dbError && (
        <div className="mb-6 rounded-md border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-900 px-4 py-3 text-sm">
          <div className="font-medium text-red-800 dark:text-red-200">Database error</div>
          <div className="text-xs text-red-700/70 dark:text-red-300/70 mt-2 font-mono">{dbError}</div>
        </div>
      )}

      {groups.map((g) => (
        <section key={g} className="mb-8">
          <h2 className="text-sm uppercase tracking-wider text-neutral-500 mb-2">{g}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TILES.filter((t) => t.group === g).map((tile) => (
              <Link
                key={tile.key}
                href={tile.href}
                className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 py-3 hover:border-neutral-400 dark:hover:border-neutral-600 transition"
              >
                <div className="text-2xl font-semibold tabular-nums">{(data[tile.key] ?? 0).toLocaleString()}</div>
                <div className="text-sm text-neutral-500 mt-0.5">{tile.label}</div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
