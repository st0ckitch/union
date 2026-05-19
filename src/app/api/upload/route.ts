import { NextResponse } from "next/server";
import { createServerSupabase, createServiceSupabase } from "@/lib/supabase/server";

const BUCKET = "product-media";
const MAX_SIZE = 20 * 1024 * 1024; // 20 MB
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

export async function POST(req: Request) {
  // Auth: must be an admin.
  const sb = await createServerSupabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const service = createServiceSupabase();
  const { data: role } = await service
    .from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin").maybeSingle();
  if (!role) return NextResponse.json({ error: "Not an admin" }, { status: 403 });

  // Parse multipart form.
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (e) {
    return NextResponse.json({ error: `Bad form data: ${e instanceof Error ? e.message : String(e)}` }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file in form data (expected field 'file')" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: `File too large (${Math.round(file.size / 1024 / 1024)}MB > 20MB)` }, { status: 413 });
  }
  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json({ error: `Unsupported type: ${file.type}` }, { status: 415 });
  }

  // Prefix path by what the caller wants to scope this to (e.g. "products/<id>").
  // Defaults to "uploads/YYYY-MM" if not provided.
  const scope = (formData.get("scope") as string | null) ?? defaultScope();
  const safeScope = scope.replace(/[^a-zA-Z0-9/_-]/g, "_").replace(/^\/+|\/+$/g, "");
  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const key = `${safeScope}/${crypto.randomUUID()}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: upErr } = await service.storage
    .from(BUCKET)
    .upload(key, arrayBuffer, {
      contentType: file.type,
      cacheControl: "31536000",
      upsert: false,
    });
  if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 });

  const { data: pub } = service.storage.from(BUCKET).getPublicUrl(key);
  return NextResponse.json({
    url: pub.publicUrl,
    path: key,
    size: file.size,
    type: file.type,
  });
}

function defaultScope(): string {
  const d = new Date();
  return `uploads/${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
