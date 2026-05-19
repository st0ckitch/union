"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleBlockActive, reorderBlock } from "./actions";
import { BLOCK_TYPES, type BlockType } from "./types";

export type BlockRow = {
  id: string;
  block_type: BlockType;
  sort_order: number | null;
  is_active: boolean;
  title_en: string | null;
  title_ka: string | null;
  title_ru: string | null;
  image_url: string | null;
  data: unknown;
};

const TYPE_LABEL: Record<string, string> = Object.fromEntries(BLOCK_TYPES.map((t) => [t.value, t.label]));

const TYPE_COLOR: Record<string, string> = {
  image_gallery:     "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  technical_diagram: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  text_with_image:   "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  cta_tiles:         "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
  variants_carousel: "bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300",
  contact_cta:       "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300",
};

export function BlocksList({ productId, blocks }: { productId: string; blocks: BlockRow[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onToggle(blockId: string, current: boolean) {
    startTransition(async () => {
      await toggleBlockActive(blockId, productId, !current);
      router.refresh();
    });
  }
  function onMove(blockId: string, currentSort: number, dir: -1 | 1) {
    startTransition(async () => {
      await reorderBlock(blockId, productId, currentSort + dir * 10);
      router.refresh();
    });
  }

  if (blocks.length === 0) {
    return (
      <div className="text-sm text-neutral-500 italic">
        No content blocks yet. <Link className="underline" href={`/admin/products/${productId}/blocks/new`}>Add the first one →</Link>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {blocks.map((b) => {
        const title = b.title_en || b.title_ka || b.title_ru;
        const dataKeys = b.data && typeof b.data === "object" ? Object.keys(b.data as object) : [];
        const itemHint =
          b.data && typeof b.data === "object" && Array.isArray((b.data as { images?: unknown[] }).images)
            ? `${(b.data as { images: unknown[] }).images.length} images`
            : b.data && typeof b.data === "object" && Array.isArray((b.data as { tiles?: unknown[] }).tiles)
            ? `${(b.data as { tiles: unknown[] }).tiles.length} tiles`
            : b.data && typeof b.data === "object" && Array.isArray((b.data as { items?: unknown[] }).items)
            ? `${(b.data as { items: unknown[] }).items.length} items`
            : dataKeys.length > 0
            ? `${dataKeys.length} data keys`
            : null;
        return (
          <li key={b.id} className="py-3 flex items-start gap-3">
            {b.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={b.image_url} alt="" className="w-14 h-14 object-cover rounded border border-neutral-200 dark:border-neutral-800 shrink-0" />
            ) : (
              <div className="w-14 h-14 bg-neutral-100 dark:bg-neutral-800 rounded shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLOR[b.block_type] ?? "bg-neutral-200 text-neutral-700"}`}>
                  {TYPE_LABEL[b.block_type] ?? b.block_type}
                </span>
                <span className="text-xs text-neutral-500">order {b.sort_order ?? 0}</span>
                {itemHint && <span className="text-xs text-neutral-500">· {itemHint}</span>}
                {!b.is_active && <span className="text-xs text-amber-700 dark:text-amber-400">· inactive</span>}
              </div>
              <Link href={`/admin/products/${productId}/blocks/${b.id}`} className="block font-medium hover:underline mt-0.5 truncate">
                {title || <span className="italic text-neutral-500">(no title)</span>}
              </Link>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                disabled={pending}
                onClick={() => onMove(b.id, b.sort_order ?? 0, -1)}
                className="px-1.5 py-0.5 text-xs text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded disabled:opacity-50"
                title="Move up"
              >↑</button>
              <button
                type="button"
                disabled={pending}
                onClick={() => onMove(b.id, b.sort_order ?? 0, 1)}
                className="px-1.5 py-0.5 text-xs text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded disabled:opacity-50"
                title="Move down"
              >↓</button>
              <button
                type="button"
                disabled={pending}
                onClick={() => onToggle(b.id, b.is_active)}
                className="text-xs px-2 py-1 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
              >
                {b.is_active ? "hide" : "show"}
              </button>
              <Link
                href={`/admin/products/${productId}/blocks/${b.id}`}
                className="text-xs px-2 py-1 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
              >
                edit
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
