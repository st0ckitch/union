// Helpers for linking back to the public storefront from the admin.
// Uses NEXT_PUBLIC_STOREFRONT_URL (set in .env.local).

function base(): string {
  const raw = process.env.NEXT_PUBLIC_STOREFRONT_URL ?? "";
  return raw.replace(/\/+$/, "");
}

export function storefrontProductUrl(slug: string | null | undefined): string | null {
  const b = base();
  if (!b || !slug) return null;
  return `${b}/product/${encodeURIComponent(slug)}`;
}

export function storefrontCategoryUrl(slug: string | null | undefined): string | null {
  const b = base();
  if (!b || !slug) return null;
  return `${b}/category/${encodeURIComponent(slug)}`;
}

export function storefrontHost(): string | null {
  const b = base();
  if (!b) return null;
  try {
    return new URL(b).host;
  } catch {
    return null;
  }
}
