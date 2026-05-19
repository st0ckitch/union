import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabase, createServiceSupabase } from "@/lib/supabase/server";
import { SignOutButton } from "./sign-out";

// Nav reflects the actual schema in this Supabase project.
const NAV = [
  { group: "Catalog", items: [
    { href: "/admin/products",   label: "Products" },
    { href: "/admin/categories", label: "Categories" },
    { href: "/admin/modules",    label: "Furniture modules" },
  ]},
  { group: "Door configurator", items: [
    { href: "/admin/options/door-models",     label: "Models" },
    { href: "/admin/options/door-glass",      label: "Glass" },
    { href: "/admin/options/door-otdelka",    label: "Finish (otdelka)" },
    { href: "/admin/options/door-korobka",    label: "Frame (korobka)" },
    { href: "/admin/options/door-lock",       label: "Locks" },
    { href: "/admin/options/door-panel",      label: "Panels" },
    { href: "/admin/options/door-lighting",   label: "Lighting" },
  ]},
  { group: "Content", items: [
    { href: "/admin/blog",       label: "Blog posts" },
    { href: "/admin/banners",    label: "Banners" },
    { href: "/admin/menu",       label: "Menu items" },
    { href: "/admin/pages",      label: "Legal pages" },
    { href: "/admin/features",   label: "Site features" },
    { href: "/admin/hmspace",    label: "Homespace projects" },
  ]},
  { group: "Operations", items: [
    { href: "/admin/showrooms",     label: "Showrooms" },
    { href: "/admin/testimonials",  label: "Testimonials" },
    { href: "/admin/orders",        label: "Orders" },
    { href: "/admin/consultations", label: "Consultation requests" },
  ]},
  { group: "System", items: [
    { href: "/admin/settings", label: "Site settings" },
    { href: "/admin/users",    label: "Users & roles" },
  ]},
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Authorise via existing user_roles table.
  const service = createServiceSupabase();
  const { data: role } = await service
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!role) {
    return (
      <div className="p-8 max-w-xl mx-auto text-sm">
        <h1 className="text-lg font-semibold mb-2">No admin access</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          Your account ({user.email}) doesn&apos;t have the admin role in
          <code className="mx-1 px-1 py-0.5 bg-neutral-100 dark:bg-neutral-800 rounded">user_roles</code>.
          An existing admin must grant it.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <aside className="border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 sticky top-0 h-screen overflow-y-auto">
        <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <Link href="/admin" className="block text-base font-semibold">UNION admin</Link>
          <div className="text-xs text-neutral-500 mt-0.5">{user.email}</div>
        </div>
        <nav className="px-3 py-3 space-y-5 text-sm">
          {NAV.map((group) => (
            <div key={group.group}>
              <div className="px-2 mb-1 text-[11px] uppercase tracking-wider text-neutral-500">
                {group.group}
              </div>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block px-2 py-1.5 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <SignOutButton />
          </div>
        </nav>
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
