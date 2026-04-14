/**
 * Real UNION product photos, hot-linked from union.ru's CDN.
 * These are used as deterministic fallbacks whenever a product in
 * the database still points at an Unsplash placeholder URL.
 *
 * We never rewrite valid custom images — only Unsplash stock photos.
 */

const BASE = 'https://www.union.ru/upload/resize_cache/iblock';

// Interior / swing doors collection photos (from union.ru trends section)
const DOORS = [
  `${BASE}/925/b7i0920o5w98wvphham2qw6iaeb0j7tq/570_380_2/2-_-uniflex-3D-Step-V.jpg`,
  `${BASE}/440/8kftu2p3od5du8ounc763o21044lrcjq/570_380_2/SLIM-Piatto-Transparente-Sole-01.jpg`,
  `${BASE}/dff/apet5du0g1xn6qwsomeb10y28fez2a6i/570_380_2/COVER-Veneer.jpg`,
  `${BASE}/94f/ixf3iuiw0wezy1mkchr72pi5x4ivciyj/570_380_2/MILAN-_1-2400_1600.jpg`,
  `${BASE}/baa/cafcd2drgff500g1o0u0clg8oos528fb/570_380_2/PORTOFINO_00-2400x1600.png`,
  `${BASE}/82d/726ieuhep8v73cnx2ur3lfliru0hrmoh/570_380_2/_-04-_.jpg`,
];

// Sliding doors / partitions
const SLIDING = [
  `${BASE}/696/8m3n87auigl7187wrojilbl1bgv3c0df/570_380_2/SLIDER-1 2400x1600.jpg`,
  `${BASE}/ab2/wqti0kftwb5k2q9jpdlfnwh0e347tbv8/570_380_2/_SLIM_03.jpg`,
  `${BASE}/37b/os04dopnsl11s93v1jkebipf1nagl3uf/570_380_2/WallStreet_Slim_2.jpg`,
];

// Wardrobes / cabinets
const WARDROBES = [
  `${BASE}/6a7/ycf8sfsurbilrjvqoal5syythcjx4ss8/570_380_2/гардеробная ALTO 2400х1600 главн стр.jpg`,
  `${BASE}/917/rcfuqwy3w0s2sg2zd6bawmuzcq2kd3ku/570_380_2/_-_-MATEO-M_001-2400x1600.png`,
];

// Tables / furniture
const FURNITURE = [
  `${BASE}/d3b/y4o7w07z4rv7n109i0e8hb38dsgeaxku/570_380_2/Forte-_-04_00.jpg`,
  `${BASE}/936/c2842xi7v7u8tiro4ofyeg6ig9ia3epw/570_380_2/074-_-MINI-_-_00.jpg`,
];

// Handles / hardware
const HANDLES = [
  `${BASE}/28a/e6y45uvr4h3irdkrtif9q9i9sj4josyo/570_380_2/DELTA PRO 602-2 2400х1600.png`,
  `${BASE}/487/zhsqfwqpr3g7056sskcpglbkxlgih4fm/570_380_2/Roboquattro-_-2400_1600.jpg`,
];

const CATEGORY_POOLS: Record<string, string[]> = {
  'swing-doors': DOORS,
  'sliding-doors': SLIDING,
  'sliding-partitions': SLIDING,
  'stationary-partitions': SLIDING,
  'wall-panels': [...DOORS.slice(2), ...SLIDING.slice(2)],
  'wardrobes': WARDROBES,
  'vitrines': WARDROBES,
  'libraries': WARDROBES,
  'shelves': WARDROBES,
  'tables': FURNITURE,
  'sofas': FURNITURE,
  'mirrors': [...WARDROBES, ...DOORS.slice(3)],
  'entrance-doors': DOORS,
  'skirting': HANDLES,
  'handles': HANDLES,
  'hidden-doors': DOORS.slice(0, 3),
  'furniture': FURNITURE,
};

const ALL_UNION_IMAGES = [
  ...DOORS,
  ...SLIDING,
  ...WARDROBES,
  ...FURNITURE,
  ...HANDLES,
];

// Fast deterministic string hash → integer
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function isPlaceholder(url: string | null | undefined): boolean {
  if (!url) return true;
  return (
    url.includes('unsplash.com') ||
    url.includes('placeholder.svg') ||
    url.includes('placehold.co')
  );
}

/**
 * Resolve a product's display image. If the stored image is an Unsplash
 * placeholder (or missing), return a deterministic real UNION photo
 * derived from the product slug + its category.
 */
export function resolveProductImage(
  storedUrl: string | null | undefined,
  categorySlug?: string | null,
  productSlug?: string | null
): string {
  if (!isPlaceholder(storedUrl)) return storedUrl as string;

  const pool = (categorySlug && CATEGORY_POOLS[categorySlug]) || ALL_UNION_IMAGES;
  const seed = hashString(productSlug || storedUrl || 'union');
  return pool[seed % pool.length];
}

/**
 * Resolve a whole image array (common case: `product.images`).
 */
export function resolveProductImages(
  images: (string | null)[] | null | undefined,
  categorySlug?: string | null,
  productSlug?: string | null
): string[] {
  if (!images || images.length === 0) {
    return [resolveProductImage(null, categorySlug, productSlug)];
  }
  return images.map((img) => resolveProductImage(img, categorySlug, productSlug));
}
