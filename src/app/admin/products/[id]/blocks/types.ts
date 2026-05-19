// Shared types/constants for content blocks. Plain TS module so client
// components can import — server actions ("use server") can only export
// async functions, so this lives separately.

export const BLOCK_TYPES = [
  { value: "image_gallery",      label: "Image gallery",       hint: "Grid of captioned images." },
  { value: "technical_diagram",  label: "Technical diagram",   hint: "Hero image with title/subtitle." },
  { value: "text_with_image",    label: "Text with image",     hint: "Body text alongside an image." },
  { value: "cta_tiles",          label: "CTA tiles",           hint: "Clickable cards with image + label." },
  { value: "variants_carousel",  label: "Variants carousel",   hint: "Horizontally scrolling product/option variants." },
  { value: "contact_cta",        label: "Contact CTA",         hint: "Banner prompting a callback/form submission." },
] as const;

export type BlockType = (typeof BLOCK_TYPES)[number]["value"];

export type BlockValues = {
  id?: string;
  product_id: string;
  block_type: BlockType;
  sort_order: number;
  is_active: boolean;
  title_ka: string;
  title_ru: string;
  title_en: string;
  subtitle_ka: string;
  subtitle_ru: string;
  subtitle_en: string;
  body_ka: string;
  body_ru: string;
  body_en: string;
  image_url: string | null;
  secondary_image_url: string | null;
  data: unknown;
};
