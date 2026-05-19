"use client";

import { useState } from "react";

/* ────────────────────────────── KeyValueEditor ──────────────────────────────
 * Edit a flat { key: value } map as a list of input pairs.
 * Used for `specifications` and `specifications_en` columns.
 */
export function KeyValueEditor({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: Record<string, string> | null | unknown;
  onChange: (next: Record<string, string> | null) => void;
}) {
  const obj = isPlainObject(value) ? (value as Record<string, string>) : {};
  // Render as ordered array of [k, v] pairs so re-typing keys doesn't lose order.
  const [pairs, setPairs] = useState<Array<{ k: string; v: string }>>(() =>
    Object.entries(obj).map(([k, v]) => ({ k, v: typeof v === "string" ? v : JSON.stringify(v) })),
  );

  function flush(next: Array<{ k: string; v: string }>) {
    setPairs(next);
    const out: Record<string, string> = {};
    for (const p of next) {
      const k = p.k.trim();
      if (k) out[k] = p.v;
    }
    onChange(Object.keys(out).length ? out : null);
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-neutral-800">{label}</div>
      {hint && <p className="text-xs text-neutral-500 -mt-1">{hint}</p>}

      {pairs.length === 0 ? (
        <div className="text-xs text-neutral-500 italic py-1">No specs. Click &quot;+ Add row&quot; below.</div>
      ) : (
        <table className="w-full text-sm border border-neutral-200 rounded-md overflow-hidden">
          <thead className="bg-neutral-50 text-xs text-neutral-500 uppercase tracking-wider">
            <tr>
              <th className="text-left px-2 py-1 w-1/3 font-medium">Key</th>
              <th className="text-left px-2 py-1 font-medium">Value</th>
              <th className="w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {pairs.map((p, i) => (
              <tr key={i}>
                <td className="px-1 py-1">
                  <input
                    value={p.k}
                    onChange={(e) => {
                      const next = pairs.slice();
                      next[i] = { ...next[i], k: e.target.value };
                      flush(next);
                    }}
                    placeholder="e.g. lock"
                    className="input font-mono text-xs"
                  />
                </td>
                <td className="px-1 py-1">
                  <input
                    value={p.v}
                    onChange={(e) => {
                      const next = pairs.slice();
                      next[i] = { ...next[i], v: e.target.value };
                      flush(next);
                    }}
                    placeholder="value"
                    className="input"
                  />
                </td>
                <td className="px-1 py-1 text-right">
                  <button
                    type="button"
                    onClick={() => flush(pairs.filter((_, ix) => ix !== i))}
                    className="text-xs text-red-600 hover:underline px-1"
                    title="Remove"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        type="button"
        onClick={() => flush([...pairs, { k: "", v: "" }])}
        className="text-xs rounded-md border border-neutral-300 bg-white px-3 py-1.5 hover:bg-neutral-50"
      >
        + Add row
      </button>
    </div>
  );
}

/* ────────────────────────────── SpecSectionsEditor ──────────────────────────────
 * Edit an array of `{ code, title_ka, title_ru, title_en, bullets: [{ka,ru,en}] }`.
 * Used for `spec_sections` column.
 */
type Bullet = { ka: string; ru: string; en: string };
type SpecSection = {
  code: string;
  title_ka: string;
  title_ru: string;
  title_en: string;
  bullets: Bullet[];
};

export function SpecSectionsEditor({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: unknown;
  onChange: (next: SpecSection[] | null) => void;
}) {
  const initial: SpecSection[] = Array.isArray(value)
    ? (value as unknown[]).map((s) => normalizeSection(s))
    : [];
  const [sections, setSections] = useState<SpecSection[]>(initial);

  function flush(next: SpecSection[]) {
    setSections(next);
    onChange(next.length ? next : null);
  }

  function updateSection(i: number, patch: Partial<SpecSection>) {
    const next = sections.slice();
    next[i] = { ...next[i], ...patch };
    flush(next);
  }

  function moveSection(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = sections.slice();
    [next[i], next[j]] = [next[j], next[i]];
    flush(next);
  }

  function addSection() {
    flush([
      ...sections,
      { code: "", title_ka: "", title_ru: "", title_en: "", bullets: [{ ka: "", ru: "", en: "" }] },
    ]);
  }

  function removeSection(i: number) {
    flush(sections.filter((_, ix) => ix !== i));
  }

  function updateBullet(si: number, bi: number, loc: keyof Bullet, v: string) {
    const next = sections.slice();
    const bullets = next[si].bullets.slice();
    bullets[bi] = { ...bullets[bi], [loc]: v };
    next[si] = { ...next[si], bullets };
    flush(next);
  }

  function addBullet(si: number) {
    const next = sections.slice();
    next[si] = { ...next[si], bullets: [...next[si].bullets, { ka: "", ru: "", en: "" }] };
    flush(next);
  }

  function removeBullet(si: number, bi: number) {
    const next = sections.slice();
    next[si] = { ...next[si], bullets: next[si].bullets.filter((_, ix) => ix !== bi) };
    flush(next);
  }

  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-medium text-neutral-800">{label}</div>
        {hint && <p className="text-xs text-neutral-500 mt-0.5">{hint}</p>}
      </div>

      {sections.length === 0 ? (
        <div className="text-xs text-neutral-500 italic">
          No sections yet. Sections group together bullet points like &quot;Door leaf&quot; or &quot;Frame&quot;.
        </div>
      ) : (
        <div className="space-y-3">
          {sections.map((s, si) => (
            <div key={si} className="rounded-md border border-neutral-200 bg-neutral-50 p-3">
              <div className="flex items-start gap-2 mb-2">
                <input
                  value={s.code}
                  onChange={(e) => updateSection(si, { code: e.target.value })}
                  placeholder="section code (e.g. polotno)"
                  className="input font-mono text-xs flex-1"
                />
                <div className="flex items-center gap-1 shrink-0">
                  <button type="button" onClick={() => moveSection(si, -1)} className="text-xs px-2 py-1 text-neutral-500 hover:bg-neutral-200 rounded" title="Move up">↑</button>
                  <button type="button" onClick={() => moveSection(si, 1)} className="text-xs px-2 py-1 text-neutral-500 hover:bg-neutral-200 rounded" title="Move down">↓</button>
                  <button type="button" onClick={() => removeSection(si)} className="text-xs px-2 py-1 text-red-600 hover:bg-red-100 rounded" title="Delete section">✕</button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 mb-2">
                {(["ka", "ru", "en"] as const).map((loc) => (
                  <div key={loc}>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">Title {loc}</div>
                    <input
                      value={(s as unknown as Record<string, string>)[`title_${loc}`] ?? ""}
                      onChange={(e) => updateSection(si, { [`title_${loc}`]: e.target.value } as Partial<SpecSection>)}
                      placeholder={`Title (${loc})`}
                      className="input text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <div className="text-xs font-medium text-neutral-700">Bullets ({s.bullets.length})</div>
                {s.bullets.map((b, bi) => (
                  <div key={bi} className="flex items-start gap-1">
                    <div className="grid grid-cols-3 gap-1 flex-1">
                      {(["ka", "ru", "en"] as const).map((loc) => (
                        <textarea
                          key={loc}
                          value={b[loc]}
                          onChange={(e) => updateBullet(si, bi, loc, e.target.value)}
                          placeholder={loc.toUpperCase()}
                          rows={2}
                          className="input text-xs"
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeBullet(si, bi)}
                      className="text-xs px-1.5 py-0.5 text-red-600 hover:bg-red-100 rounded shrink-0 self-center"
                      title="Remove bullet"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addBullet(si)}
                  className="text-xs text-neutral-600 hover:text-neutral-900 hover:underline mt-1"
                >
                  + Add bullet
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={addSection}
        className="text-xs rounded-md border border-neutral-300 bg-white px-3 py-1.5 hover:bg-neutral-50"
      >
        + Add section
      </button>
    </div>
  );
}

function normalizeSection(s: unknown): SpecSection {
  const o = (s && typeof s === "object" ? (s as Record<string, unknown>) : {}) as Record<string, unknown>;
  const bulletsRaw = Array.isArray(o.bullets) ? (o.bullets as unknown[]) : [];
  const bullets: Bullet[] = bulletsRaw.map((b) => {
    const bo = (b && typeof b === "object" ? (b as Record<string, unknown>) : {}) as Record<string, unknown>;
    return {
      ka: typeof bo.ka === "string" ? bo.ka : "",
      ru: typeof bo.ru === "string" ? bo.ru : "",
      en: typeof bo.en === "string" ? bo.en : "",
    };
  });
  return {
    code: typeof o.code === "string" ? o.code : "",
    title_ka: typeof o.title_ka === "string" ? o.title_ka : "",
    title_ru: typeof o.title_ru === "string" ? o.title_ru : "",
    title_en: typeof o.title_en === "string" ? o.title_en : "",
    bullets,
  };
}

/* ────────────────────────────── DownloadLinksEditor ──────────────────────────────
 * Edit an array of `{ url, icon, label_ka, label_ru, label_en }`.
 * Used for `download_links` column.
 */
type DownloadLink = {
  url: string;
  icon: string;
  label_ka: string;
  label_ru: string;
  label_en: string;
};

const ICON_OPTIONS = [
  { value: "download", label: "📥 Download" },
  { value: "info",     label: "ℹ️ Info" },
  { value: "pdf",      label: "📄 PDF" },
  { value: "dwg",      label: "📐 DWG" },
  { value: "image",    label: "🖼️ Image" },
  { value: "external", label: "↗ External link" },
];

export function DownloadLinksEditor({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: unknown;
  onChange: (next: DownloadLink[] | null) => void;
}) {
  const initial: DownloadLink[] = Array.isArray(value)
    ? (value as unknown[]).map((l) => normalizeLink(l))
    : [];
  const [links, setLinks] = useState<DownloadLink[]>(initial);

  function flush(next: DownloadLink[]) {
    setLinks(next);
    onChange(next.length ? next : null);
  }

  function updateLink(i: number, patch: Partial<DownloadLink>) {
    const next = links.slice();
    next[i] = { ...next[i], ...patch };
    flush(next);
  }

  function moveLink(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= links.length) return;
    const next = links.slice();
    [next[i], next[j]] = [next[j], next[i]];
    flush(next);
  }

  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-medium text-neutral-800">{label}</div>
        {hint && <p className="text-xs text-neutral-500 mt-0.5">{hint}</p>}
      </div>

      {links.length === 0 ? (
        <div className="text-xs text-neutral-500 italic">No download links yet.</div>
      ) : (
        <div className="space-y-2">
          {links.map((l, i) => (
            <div key={i} className="rounded-md border border-neutral-200 bg-neutral-50 p-3 space-y-2">
              <div className="grid grid-cols-[1fr_180px_auto] gap-2">
                <input
                  value={l.url}
                  onChange={(e) => updateLink(i, { url: e.target.value })}
                  placeholder="https://… or #"
                  className="input"
                  type="url"
                />
                <select
                  value={l.icon}
                  onChange={(e) => updateLink(i, { icon: e.target.value })}
                  className="input"
                >
                  {ICON_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <div className="flex items-center gap-1 shrink-0">
                  <button type="button" onClick={() => moveLink(i, -1)} className="text-xs px-2 py-1 text-neutral-500 hover:bg-neutral-200 rounded">↑</button>
                  <button type="button" onClick={() => moveLink(i, 1)} className="text-xs px-2 py-1 text-neutral-500 hover:bg-neutral-200 rounded">↓</button>
                  <button type="button" onClick={() => flush(links.filter((_, ix) => ix !== i))} className="text-xs px-2 py-1 text-red-600 hover:bg-red-100 rounded">✕</button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {(["ka", "ru", "en"] as const).map((loc) => (
                  <div key={loc}>
                    <div className="text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">Label {loc}</div>
                    <input
                      value={(l as unknown as Record<string, string>)[`label_${loc}`] ?? ""}
                      onChange={(e) => updateLink(i, { [`label_${loc}`]: e.target.value } as Partial<DownloadLink>)}
                      placeholder={`Label (${loc})`}
                      className="input text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => flush([...links, { url: "", icon: "download", label_ka: "", label_ru: "", label_en: "" }])}
        className="text-xs rounded-md border border-neutral-300 bg-white px-3 py-1.5 hover:bg-neutral-50"
      >
        + Add link
      </button>
    </div>
  );
}

function normalizeLink(l: unknown): DownloadLink {
  const o = (l && typeof l === "object" ? (l as Record<string, unknown>) : {}) as Record<string, unknown>;
  return {
    url: typeof o.url === "string" ? o.url : "",
    icon: typeof o.icon === "string" ? o.icon : "download",
    label_ka: typeof o.label_ka === "string" ? o.label_ka : "",
    label_ru: typeof o.label_ru === "string" ? o.label_ru : "",
    label_en: typeof o.label_en === "string" ? o.label_en : "",
  };
}

function isPlainObject(v: unknown): boolean {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
