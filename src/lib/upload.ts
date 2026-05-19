// Client-side helper for the upload API.
export async function uploadImage(file: File, scope?: string): Promise<{ url: string; path: string }> {
  const fd = new FormData();
  fd.append("file", file);
  if (scope) fd.append("scope", scope);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  if (!res.ok) {
    let msg = `Upload failed (${res.status})`;
    try {
      const j = (await res.json()) as { error?: string };
      if (j.error) msg = j.error;
    } catch {}
    throw new Error(msg);
  }
  return (await res.json()) as { url: string; path: string };
}
