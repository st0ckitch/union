import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Server-side Supabase client bound to the request's auth cookies.
// Use this in Server Components and Route Handlers when you want the
// session-scoped user (RLS enforced via their JWT).
export async function createServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(toSet) {
          try {
            toSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // ignored: called from a Server Component (cookies are read-only there)
          }
        },
      },
    },
  );
}

// Service-role client — bypasses RLS. Only use on the server, never expose
// the key to the client. Use for admin operations like bulk imports, lead
// dashboards, or anything that needs cross-tenant access.
export function createServiceSupabase() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    },
  );
}
