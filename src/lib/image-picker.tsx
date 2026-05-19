"use client";

import { useRef, useState } from "react";
import { uploadImage } from "./upload";

/** Single image: text URL input + file picker + live preview. */
export function ImagePicker({
  value,
  onChange,
  scope,
  size = "md",
  label,
}: {
  value: string | null;
  onChange: (url: string | null) => void;
  scope?: string;
  size?: "sm" | "md" | "lg";
  label?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onFile(f: File) {
    setBusy(true); setErr(null);
    try {
      const r = await uploadImage(f, scope);
      onChange(r.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  const dim = size === "sm" ? "w-16 h-16" : size === "lg" ? "w-40 h-40" : "w-24 h-24";

  return (
    <div className="space-y-2">
      {label && <div className="text-sm text-neutral-700">{label}</div>}
      <div className="flex items-start gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className={`${dim} object-cover rounded border border-neutral-300`} />
        ) : (
          <div className={`${dim} bg-neutral-100 border border-neutral-300 rounded grid place-items-center text-xs text-neutral-400`}>
            no image
          </div>
        )}
        <div className="flex-1 space-y-1.5 min-w-0">
          <input
            type="url"
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value || null)}
            placeholder="https://… or upload below"
            className="input"
          />
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs hover:bg-neutral-50 disabled:opacity-50"
            >
              {busy ? "Uploading…" : "📁 Upload from computer"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="text-xs text-red-600 hover:underline"
              >
                remove
              </button>
            )}
          </div>
          {err && <div className="text-xs text-red-600">{err}</div>}
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f); }}
          />
        </div>
      </div>
    </div>
  );
}

/** Multiple images: drag-drop zone + thumbnails with reorder/remove. */
export function ImageArrayPicker({
  values,
  onChange,
  scope,
  label,
  hint,
}: {
  values: string[];
  onChange: (next: string[]) => void;
  scope?: string;
  label?: string;
  hint?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);

  async function uploadAll(files: FileList | File[]) {
    setBusy(true); setErr(null);
    try {
      const uploaded: string[] = [];
      for (const f of Array.from(files)) {
        const r = await uploadImage(f, scope);
        uploaded.push(r.url);
      }
      onChange([...(values ?? []), ...uploaded]);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function remove(i: number) {
    onChange(values.filter((_, ix) => ix !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= values.length) return;
    const next = values.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  function addUrl() {
    const url = prompt("Paste image URL:");
    if (url && url.trim()) onChange([...(values ?? []), url.trim()]);
  }

  return (
    <div className="space-y-2">
      {label && <div className="text-sm text-neutral-700">{label}</div>}
      {hint && <p className="text-xs text-neutral-500">{hint}</p>}

      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault(); setDrag(false);
          if (e.dataTransfer.files?.length) uploadAll(e.dataTransfer.files);
        }}
        className={`rounded-md border-2 border-dashed px-4 py-6 text-center text-sm cursor-pointer transition ${
          drag ? "border-emerald-500 bg-emerald-50" : "border-neutral-300 bg-neutral-50 hover:border-neutral-400"
        }`}
        onClick={() => fileRef.current?.click()}
      >
        {busy ? (
          <span className="text-neutral-500">Uploading…</span>
        ) : (
          <>
            <div className="text-neutral-700">
              📁 Click or drop images here
            </div>
            <div className="text-xs text-neutral-500 mt-0.5">PNG, JPG, WebP, GIF, AVIF · up to 20 MB each</div>
          </>
        )}
        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => { if (e.target.files?.length) uploadAll(e.target.files); }}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-500">{values.length} image{values.length === 1 ? "" : "s"}</span>
        <button
          type="button"
          onClick={addUrl}
          className="text-xs text-neutral-500 hover:text-neutral-700 hover:underline"
        >
          + add by URL
        </button>
      </div>

      {err && <div className="text-xs text-red-600">{err}</div>}

      {values.length > 0 && (
        <ul className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {values.map((url, i) => (
            <li key={`${url}-${i}`} className="relative group rounded border border-neutral-200 overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-24 object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[10px] px-1 py-0.5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition">
                <span className="tabular-nums">#{i + 1}</span>
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => move(i, -1)} className="hover:underline" title="Move left">←</button>
                  <button type="button" onClick={() => move(i, 1)} className="hover:underline" title="Move right">→</button>
                  <button type="button" onClick={() => remove(i)} className="text-red-300 hover:text-red-100" title="Remove">✕</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
