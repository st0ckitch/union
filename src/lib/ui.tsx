"use client";

import * as React from "react";

export function Field({ label, hint, children, required }: { label: string; hint?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="text-neutral-700 dark:text-neutral-300">
        {label}{required ? " *" : ""}
      </span>
      <div className="mt-1">{children}</div>
      {hint && <p className="text-xs text-neutral-500 mt-1">{hint}</p>}
    </label>
  );
}

// Three side-by-side text inputs for ka/ru/en locale triplets.
// `requiredLocales` makes specific locale inputs required (browser-enforced).
export function TriField({
  label,
  required,
  requiredLocales,
  values,
  onChange,
  multiline,
  rows = 4,
}: {
  label: string;
  required?: boolean;
  requiredLocales?: Array<"ka" | "ru" | "en">;
  values: { ka: string; ru: string; en: string };
  onChange: (next: { ka: string; ru: string; en: string }) => void;
  multiline?: boolean;
  rows?: number;
}) {
  const setLocale = (loc: "ka" | "ru" | "en", v: string) => onChange({ ...values, [loc]: v });
  const reqSet = new Set(requiredLocales ?? []);
  return (
    <fieldset className="block">
      <legend className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">
        {label}{required ? " *" : ""}
      </legend>
      <div className="grid grid-cols-3 gap-2">
        {(["ka", "ru", "en"] as const).map((loc) => (
          <div key={loc}>
            <div className="text-[10px] uppercase tracking-wider text-neutral-500 mb-0.5">
              {loc.toUpperCase()}{reqSet.has(loc) ? " *" : ""}
            </div>
            {multiline ? (
              <textarea
                rows={rows}
                required={reqSet.has(loc)}
                value={values[loc] ?? ""}
                onChange={(e) => setLocale(loc, e.target.value)}
                className="input"
              />
            ) : (
              <input
                type="text"
                required={reqSet.has(loc)}
                value={values[loc] ?? ""}
                onChange={(e) => setLocale(loc, e.target.value)}
                className="input"
              />
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
}

// Newline-separated multi-value input (one value per line). Used for text[] columns.
export function ArrayField({
  label,
  hint,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  hint?: string;
  value: string[];
  onChange: (next: string[]) => void;
  rows?: number;
}) {
  const text = (value ?? []).join("\n");
  return (
    <Field label={label} hint={hint ?? "One item per line."}>
      <textarea
        rows={rows}
        value={text}
        onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
        className="input font-mono text-xs"
      />
    </Field>
  );
}

// JSON editor with on-blur parse + error display.
export function JsonField({
  label,
  hint,
  value,
  onChange,
  rows = 8,
}: {
  label: string;
  hint?: string;
  value: unknown;
  onChange: (next: unknown) => void;
  rows?: number;
}) {
  const [text, setText] = React.useState(() =>
    value == null ? "" : JSON.stringify(value, null, 2),
  );
  const [err, setErr] = React.useState<string | null>(null);

  function commit(t: string) {
    if (!t.trim()) {
      setErr(null);
      onChange(null);
      return;
    }
    try {
      const parsed = JSON.parse(t);
      setErr(null);
      onChange(parsed);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    }
  }

  return (
    <Field label={label} hint={hint}>
      <textarea
        rows={rows}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={() => commit(text)}
        className="input font-mono text-xs"
      />
      {err && <div className="text-xs text-red-600 mt-1">JSON error: {err}</div>}
    </Field>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const cls =
    status === "published" || status === "active" || status === "approved"
      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
      : status === "draft" || status === "pending"
      ? "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
      : status === "archived" || status === "rejected"
      ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
      : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300";
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>{status}</span>;
}

export function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
      active
        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
        : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
    }`}>{active ? "active" : "inactive"}</span>
  );
}
