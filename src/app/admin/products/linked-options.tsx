"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { linkOption, unlinkOption, type OptionKind } from "./actions";

export type Option = { id: string; code: string | null; name_en: string | null; name_ka: string | null; name_ru: string | null };
export type Linked = { option_id: string; is_default: boolean };

const KIND_LABELS: Record<OptionKind, string> = {
  model: "Models",
  glass: "Glass",
  otdelka: "Finish (otdelka)",
  korobka: "Frame (korobka)",
  lock: "Locks",
  panel: "Panels",
};

export function LinkedOptionsPanel({
  productId,
  kind,
  allOptions,
  linked,
}: {
  productId: string;
  kind: OptionKind;
  allOptions: Option[];
  linked: Linked[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const linkedIds = new Set(linked.map((l) => l.option_id));
  const available = allOptions.filter((o) => !linkedIds.has(o.id));
  const [pickId, setPickId] = useState<string>("");
  const [isDefault, setIsDefault] = useState(false);

  function onAdd() {
    if (!pickId) return;
    startTransition(async () => {
      const r = await linkOption(productId, kind, pickId, isDefault);
      if (r.error) { setError(r.error); return; }
      setPickId(""); setIsDefault(false); setError(null);
      router.refresh();
    });
  }
  function onRemove(optionId: string) {
    startTransition(async () => {
      const r = await unlinkOption(productId, kind, optionId);
      if (r.error) { setError(r.error); return; }
      setError(null);
      router.refresh();
    });
  }

  const linkedOptions = linked
    .map((l) => ({ ...l, opt: allOptions.find((o) => o.id === l.option_id) }))
    .filter((x) => x.opt);

  return (
    <div className="rounded-md border border-neutral-200 dark:border-neutral-800 p-3">
      <div className="text-sm font-medium mb-2">{KIND_LABELS[kind]}</div>
      {linkedOptions.length === 0 ? (
        <div className="text-xs text-neutral-500 mb-2">No {KIND_LABELS[kind].toLowerCase()} linked.</div>
      ) : (
        <ul className="space-y-1 mb-3">
          {linkedOptions.map((l) => (
            <li key={l.option_id} className="flex items-center justify-between text-sm">
              <div className="truncate">
                <span className="font-medium">{l.opt!.code ?? "—"}</span>
                <span className="text-neutral-500 ml-2 truncate">
                  {l.opt!.name_en || l.opt!.name_ka || l.opt!.name_ru || ""}
                </span>
                {l.is_default && <span className="ml-2 text-[10px] uppercase tracking-wider text-emerald-600">default</span>}
              </div>
              <button
                type="button"
                disabled={pending}
                onClick={() => onRemove(l.option_id)}
                className="text-xs text-red-600 hover:underline disabled:opacity-50"
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center gap-2 border-t border-neutral-200 dark:border-neutral-800 pt-2">
        <select value={pickId} onChange={(e) => setPickId(e.target.value)} className="input flex-1 text-xs">
          <option value="">+ link a {KIND_LABELS[kind].toLowerCase().replace(/s$/, "")}…</option>
          {available.map((o) => (
            <option key={o.id} value={o.id}>{o.code ?? o.id.slice(0, 8)} — {o.name_en || o.name_ka || o.name_ru}</option>
          ))}
        </select>
        <label className="text-xs flex items-center gap-1">
          <input type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
          default
        </label>
        <button
          type="button"
          disabled={!pickId || pending}
          onClick={onAdd}
          className="text-xs rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-2 py-1 disabled:opacity-50"
        >
          add
        </button>
      </div>
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  );
}
