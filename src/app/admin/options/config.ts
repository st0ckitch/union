// Shared mapping for the seven door-option types. They all have the same
// 16-column schema (id, code, name_ka/ru/en, description_ka/ru/en, image_url,
// preview_image_url, gallery_image_urls[], price_modifier, sort_order, is_active,
// created_at, updated_at).

export const OPTION_KINDS = {
  "door-models":   { table: "door_model_options",    label: "Door models",        singular: "model" },
  "door-glass":    { table: "door_glass_options",    label: "Glass",              singular: "glass option" },
  "door-otdelka":  { table: "door_otdelka_options",  label: "Finish (otdelka)",   singular: "finish" },
  "door-korobka":  { table: "door_korobka_options",  label: "Frame (korobka)",    singular: "frame" },
  "door-lock":     { table: "door_lock_options",     label: "Locks",              singular: "lock" },
  "door-panel":    { table: "door_panel_options",    label: "Panels",             singular: "panel" },
  "door-lighting": { table: "door_lighting_options", label: "Lighting",           singular: "lighting" },
} as const;

export type KindSlug = keyof typeof OPTION_KINDS;

export function isKindSlug(k: string): k is KindSlug {
  return k in OPTION_KINDS;
}
