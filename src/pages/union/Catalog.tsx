import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { CategorySidebar } from '@/components/catalog/CategorySidebar';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters, FacetCounts } from '@/components/products/ProductFilters';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

const UnionCatalog = () => {
  const { category: categorySlug, subcategory: subcategorySlug } = useParams();
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Filters — initial values come from the URL so links are shareable.
  const initialCsv = (k: string) => (searchParams.get(k) ?? '').split(',').filter(Boolean);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => initialCsv('cat'));
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const min = parseInt(searchParams.get('pmin') ?? '');
    const max = parseInt(searchParams.get('pmax') ?? '');
    return [Number.isFinite(min) ? min : 0, Number.isFinite(max) ? max : 100000];
  });
  const [showNewOnly, setShowNewOnly] = useState(searchParams.get('new') === '1');
  const [showSaleOnly, setShowSaleOnly] = useState(searchParams.get('sale') === '1');
  const [inStockOnly, setInStockOnly] = useState(searchParams.get('stock') === '1');
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>(() => initialCsv('finish'));
  const [selectedFrameTypes, setSelectedFrameTypes] = useState<string[]>(() => initialCsv('frame'));
  const [selectedCollections, setSelectedCollections] = useState<string[]>(() => initialCsv('coll'));
  const [sortBy, setSortBy] = useState<SortOption>(((searchParams.get('sort') as SortOption) || 'newest'));
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Push current filter state into the URL (shareable links). Defaults are omitted to keep URLs clean.
  useEffect(() => {
    const next = new URLSearchParams();
    if (selectedCategories.length) next.set('cat', selectedCategories.join(','));
    if (priceRange[0] > 0) next.set('pmin', String(priceRange[0]));
    if (priceRange[1] < 100000 && priceRange[1] > 0) next.set('pmax', String(priceRange[1]));
    if (showNewOnly)  next.set('new', '1');
    if (showSaleOnly) next.set('sale', '1');
    if (inStockOnly)  next.set('stock', '1');
    if (selectedFinishes.length)    next.set('finish', selectedFinishes.join(','));
    if (selectedFrameTypes.length)  next.set('frame',  selectedFrameTypes.join(','));
    if (selectedCollections.length) next.set('coll',   selectedCollections.join(','));
    if (sortBy !== 'newest') next.set('sort', sortBy);
    setSearchParams(next, { replace: true });
  }, [selectedCategories, priceRange, showNewOnly, showSaleOnly, inStockOnly, selectedFinishes, selectedFrameTypes, selectedCollections, sortBy, setSearchParams]);

  // Fetch all categories so we can resolve parents/children client-side
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  // Resolve URL → which category we're on. We do this AFTER categories load,
  // so an empty array on first render is fine.
  const parentCategory = categorySlug && categories.length > 0
    ? categories.find(c => c.slug === categorySlug) || null
    : null;
  const subCategory = subcategorySlug && categories.length > 0
    ? categories.find(c => c.slug === subcategorySlug) || null
    : null;

  // Detect mis-routed URLs (slug in path but no matching category) so the
  // user sees a clear "not found" instead of an unfiltered product dump.
  const slugUnknown = !!categorySlug && categories.length > 0 && !parentCategory;

  // The "active" category is the most specific one in the URL
  const activeCategory = subCategory || parentCategory;

  // Children of the parent (used for the subcategory grid)
  const children = useMemo(() => {
    if (!parentCategory) return [];
    return categories.filter(c => c.parent_id === parentCategory.id).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  }, [categories, parentCategory]);

  // Decide what to render:
  //   - If we're on a parent category that has children AND no subcategory selected → show subcategory grid
  //   - Otherwise → show products
  const showSubcategoryGrid = !!parentCategory && !subCategory && children.length > 0;

  // Fetch products (skipped when we're showing a subcategory grid).
  // We fetch the BASE result set with only category + price + universal filters;
  // facet-specific filters (finish/frame/collection/inStock) are applied client-side
  // so we can compute facet counts and let the user toggle without round-trips.
  const { data: baseProducts = [], isLoading } = useQuery({
    queryKey: ['products', activeCategory?.id, selectedCategories, priceRange, showNewOnly, showSaleOnly, showSubcategoryGrid],
    enabled: !showSubcategoryGrid,
    queryFn: async () => {
      let query = supabase.from('products').select('*').eq('is_active', true);

      if (activeCategory) {
        query = query.eq('category_id', activeCategory.id);
      } else if (selectedCategories.length > 0) {
        query = query.in('category_id', selectedCategories);
      }

      query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);
      if (showNewOnly) query = query.eq('is_new', true);
      if (showSaleOnly) query = query.not('sale_price', 'is', null);

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Apply facet filters client-side
  const products = useMemo(() => {
    return baseProducts.filter((p: any) => {
      if (inStockOnly && p.stock_status !== 'in_stock' && (p.stock_quantity ?? 0) <= 0) return false;
      if (selectedFinishes.length > 0) {
        const f = (p.finish ?? []) as string[];
        if (!selectedFinishes.some((s) => f.includes(s))) return false;
      }
      if (selectedFrameTypes.length > 0 && !selectedFrameTypes.includes(p.frame_type)) return false;
      if (selectedCollections.length > 0 && !selectedCollections.includes(p.collection_slug)) return false;
      return true;
    });
  }, [baseProducts, inStockOnly, selectedFinishes, selectedFrameTypes, selectedCollections]);

  // Compute facet counts from the base result set (so toggling one filter doesn't zero out the others)
  const facets: FacetCounts = useMemo(() => {
    const finish: Record<string, number> = {};
    const frame_type: Record<string, number> = {};
    const collection: Record<string, number> = {};
    baseProducts.forEach((p: any) => {
      ((p.finish ?? []) as string[]).forEach((f) => { finish[f] = (finish[f] ?? 0) + 1; });
      if (p.frame_type) frame_type[p.frame_type] = (frame_type[p.frame_type] ?? 0) + 1;
      if (p.collection_slug) collection[p.collection_slug] = (collection[p.collection_slug] ?? 0) + 1;
    });
    return { finish, frame_type, collection };
  }, [baseProducts]);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 100000;
    return Math.max(...products.map(p => p.price));
  }, [products]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':  return sorted.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
      case 'price-desc': return sorted.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
      case 'name':       return sorted.sort((a, b) => a.name_ka.localeCompare(b.name_ka, 'ka'));
      case 'newest':
      default:           return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  }, [products, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(id => id !== categoryId) : [...prev, categoryId]
    );
  };

  const toggle = (arr: string[], setter: (v: string[]) => void) => (code: string) =>
    setter(arr.includes(code) ? arr.filter(x => x !== code) : [...arr, code]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100000]);
    setShowNewOnly(false);
    setShowSaleOnly(false);
    setInStockOnly(false);
    setSelectedFinishes([]);
    setSelectedFrameTypes([]);
    setSelectedCollections([]);
  };

  const catLabel = (c: any) => {
    if (!c) return '';
    if (language === 'ru') return c.name_ru || c.name_ka || c.name_en || '';
    if (language === 'en') return c.name_en || c.name_ka || c.name_ru || '';
    return c.name_ka || c.name_ru || c.name_en || '';
  };

  const catalogLabel = language === 'ru' ? 'Каталог' : language === 'en' ? 'Catalog' : 'კატალოგი';

  // Hierarchical breadcrumb: Catalog → Parent → Subcategory
  const breadcrumbItems = [
    { label: catalogLabel, path: '/union/catalog' },
    ...(parentCategory
      ? [{
          label: catLabel(parentCategory),
          path: subCategory ? `/union/catalog/${parentCategory.slug}` : undefined,
        }]
      : []),
    ...(subCategory ? [{ label: catLabel(subCategory) }] : []),
  ];

  const pageTitle = activeCategory ? catLabel(activeCategory) : catalogLabel;

  // Small subtitle word next to H1 (e.g. "Межкомнатные двери" + "распашные").
  // Pulled from the active category's banner_subtitle_* (multilingual).
  const headlineSub = (() => {
    const c: any = activeCategory;
    if (!c) return '';
    if (language === 'ru') return c.banner_subtitle_ru || '';
    if (language === 'en') return c.banner_subtitle_en || '';
    return c.banner_subtitle_ka || '';
  })();

  // Collapsible SEO/description text under H1 (~70px tall, "Show all text" toggle).
  const description = (() => {
    const c: any = activeCategory;
    if (!c) return '';
    if (language === 'ka') return c.description_ka || '';
    // RU/EN don't have dedicated columns yet — fall back to KA so admins
    // still get to ship copy until a translation is added.
    return c.description_ka || '';
  })();

  const FiltersContent = () => (
    <ProductFilters
      categories={categories}
      selectedCategories={selectedCategories}
      onCategoryChange={handleCategoryChange}
      priceRange={priceRange}
      onPriceChange={setPriceRange}
      maxPrice={maxPrice}
      showNewOnly={showNewOnly}
      onNewOnlyChange={setShowNewOnly}
      showSaleOnly={showSaleOnly}
      onSaleOnlyChange={setShowSaleOnly}
      selectedFinishes={selectedFinishes}
      onFinishChange={toggle(selectedFinishes, setSelectedFinishes)}
      selectedFrameTypes={selectedFrameTypes}
      onFrameTypeChange={toggle(selectedFrameTypes, setSelectedFrameTypes)}
      selectedCollections={selectedCollections}
      onCollectionChange={toggle(selectedCollections, setSelectedCollections)}
      inStockOnly={inStockOnly}
      onInStockOnlyChange={setInStockOnly}
      facets={facets}
      onClearAll={clearAllFilters}
    />
  );

  // Category banner (resolved on the active category — parent or subcategory)
  const banner = (() => {
    const c: any = activeCategory;
    if (!c?.banner_image_url) return null;
    const title = language === 'ru' ? (c.banner_title_ru || c.banner_title_ka)
                : language === 'en' ? (c.banner_title_en || c.banner_title_ka)
                : (c.banner_title_ka || c.banner_title_ru);
    const subtitle = language === 'ru' ? (c.banner_subtitle_ru || c.banner_subtitle_ka)
                  : language === 'en' ? (c.banner_subtitle_en || c.banner_subtitle_ka)
                  : (c.banner_subtitle_ka || c.banner_subtitle_ru);
    return { image: c.banner_image_url, link: c.banner_link_url, title, subtitle };
  })();

  return (
    <UnionLayout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        {/* Category banner (per-category hero — set in admin → Categories) */}
        {banner && (
          (() => {
            const inner = (
              <div
                className="relative h-40 md:h-56 mt-3 overflow-hidden bg-neutral-200"
                style={{ backgroundImage: `url(${banner.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {(banner.title || banner.subtitle) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent flex items-center">
                    <div className="px-6 md:px-10 max-w-2xl text-white">
                      {banner.title && <h2 className="text-xl md:text-3xl font-bold mb-1">{banner.title}</h2>}
                      {banner.subtitle && <p className="text-sm md:text-base opacity-90">{banner.subtitle}</p>}
                    </div>
                  </div>
                )}
              </div>
            );
            return banner.link
              ? <Link to={banner.link} className="block">{inner}</Link>
              : inner;
          })()
        )}

        {/* Page title — H1 + small colored subtitle word, mirrors union.ru's `wrapper-h1 secH1` */}
        <div className="mt-4">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{pageTitle}</h1>
            {headlineSub && (
              <span className="text-base md:text-xl text-primary font-medium leading-none">
                {headlineSub}
              </span>
            )}
          </div>

          {description && <CollapsibleDescription html={description} language={language} />}

          {/* Inline subcategory chip nav — pipe-separated text links (top_submenu).
              Only shows on a parent page when there are children to drill into. */}
          {parentCategory && children.length > 0 && (
            <SubcategoryChipNav
              parent={parentCategory}
              children={children}
              activeSlug={subcategorySlug}
              t={catLabel}
              language={language}
            />
          )}
        </div>

        <div className="flex items-center justify-between mb-6 mt-6">
          <div className="text-sm text-muted-foreground">
            {!showSubcategoryGrid && sortedProducts.length > 0 && (
              <span>
                {language === 'ru'
                  ? `Найдено: ${sortedProducts.length}`
                  : language === 'en'
                  ? `Found: ${sortedProducts.length}`
                  : `ნაპოვნია: ${sortedProducts.length}`}
              </span>
            )}
          </div>

          {!showSubcategoryGrid && (
            <div className="flex items-center gap-4">
              <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    {language === 'ka' ? 'ფილტრი' : 'Filters'}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="mt-6"><FiltersContent /></div>
                </SheetContent>
              </Sheet>

              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={language === 'ka' ? 'დალაგება' : 'Sort by'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{language === 'ka' ? 'უახლესი' : 'Newest'}</SelectItem>
                  <SelectItem value="price-asc">{language === 'ka' ? 'ფასი: დაბალი' : 'Price: Low to High'}</SelectItem>
                  <SelectItem value="price-desc">{language === 'ka' ? 'ფასი: მაღალი' : 'Price: High to Low'}</SelectItem>
                  <SelectItem value="name">{language === 'ka' ? 'სახელით' : 'By Name'}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Unknown slug → friendly fallback */}
        {slugUnknown ? (
          <div className="py-16 text-center">
            <p className="text-lg font-semibold mb-2">
              {language === 'ka' ? 'კატეგორია ვერ მოიძებნა' : language === 'ru' ? 'Категория не найдена' : 'Category not found'}
            </p>
            <p className="text-muted-foreground text-sm mb-6">"{categorySlug}"</p>
            <Link to="/union/catalog" className="underline text-primary">
              {language === 'ka' ? 'მთლიანი კატალოგი' : language === 'ru' ? 'Открыть весь каталог' : 'Browse the full catalog'}
            </Link>
          </div>
        ) : showSubcategoryGrid ? (
          <SubcategorySectionedFeed parent={parentCategory!} children={children} t={catLabel} language={language} />
        ) : (
          <div className="flex gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <CategorySidebar categories={categories} basePath="/union/catalog" />
              <div className="mt-8"><FiltersContent /></div>
            </aside>

            <main className="flex-1">
              <ProductGrid products={sortedProducts} isLoading={isLoading} basePath="/union/product" />
            </main>
          </div>
        )}
      </div>
    </UnionLayout>
  );
};

/**
 * Sectioned feed for a parent category page — mirrors union.ru's layout
 * where each subcategory is a horizontal section: heading + ≤6 product cards
 * + a "See all (N) →" link that drills into the dedicated subcategory page.
 *
 * One Postgres query loads every product across all sub-IDs; we bucket them
 * client-side to avoid N+1.
 */
function SubcategorySectionedFeed({
  parent, children, t, language,
}: { parent: any; children: any[]; t: (c: any) => string; language: string }) {
  const subIds = children.map((c) => c.id);
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['parent-feed', parent.id, subIds],
    enabled: subIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .in('category_id', subIds)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    staleTime: 60_000,
  });

  // Bucket: subId → product[]
  const byCat = new Map<string, any[]>();
  for (const p of products) {
    if (!p.category_id) continue;
    if (!byCat.has(p.category_id)) byCat.set(p.category_id, []);
    byCat.get(p.category_id)!.push(p);
  }

  // If nothing found yet, show the old tile grid as a fallback (so the page
  // isn't empty for parents with no products yet)
  const totalProducts = products.length;
  if (!isLoading && totalProducts === 0) {
    return <SubcategoryGrid parent={parent} children={children} t={t} />;
  }

  const seeAllLabel = language === 'ru' ? 'Смотреть все' : language === 'en' ? 'See all' : 'ყველას ნახვა';

  return (
    <div className="space-y-12 py-2">
      {children.map((sub) => {
        const subProducts = byCat.get(sub.id) || [];
        if (subProducts.length === 0) return null;
        return (
          <section key={sub.id}>
            <div className="flex items-end justify-between mb-5 gap-4">
              {/* Subcategory title — mirrors union.ru's `title_sec` (light, simple paragraph) */}
              <p className="text-base md:text-lg font-medium tracking-tight uppercase text-foreground/85 leading-tight m-0">
                {t(sub)}
              </p>
              <Link
                to={`/union/catalog/${parent.slug}/${sub.slug}`}
                className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap shrink-0"
              >
                {seeAllLabel} ({subProducts.length}) →
              </Link>
            </div>
            <ProductGrid
              products={subProducts.slice(0, 6)}
              basePath="/union/product"
            />
          </section>
        );
      })}
    </div>
  );
}

/**
 * Renders a tile-grid of subcategories, each linking to its own URL.
 * Used as fallback when a parent has no products yet (so admins still see
 * something while they build the catalog).
 */
function SubcategoryGrid({ parent, children, t }: { parent: any; children: any[]; t: (c: any) => string }) {
  // Pull the first image of any product in each subcategory, in one query
  const subIds = children.map(c => c.id);
  const { data: fallbackImages = {} } = useQuery({
    queryKey: ['subcategory-fallback-images', subIds],
    enabled: subIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('category_id, images')
        .in('category_id', subIds)
        .eq('is_active', true)
        .not('images', 'is', null)
        .limit(200);
      if (error) throw error;
      const byCat: Record<string, string> = {};
      for (const row of data || []) {
        if (row.category_id && !byCat[row.category_id] && Array.isArray(row.images) && row.images[0]) {
          byCat[row.category_id] = row.images[0];
        }
      }
      return byCat;
    },
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="py-2 md:py-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {children.map((c) => {
          const explicit = c.home_image_url || c.image_url;
          const fallback = fallbackImages[c.id];
          const bg = explicit || fallback;
          return (
            <Link
              key={c.id}
              to={`/union/catalog/${parent.slug}/${c.slug}`}
              className="group relative overflow-hidden rounded-lg bg-secondary aspect-[4/5] flex flex-col"
            >
              {bg ? (
                <img
                  src={bg}
                  alt={t(c)}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="relative mt-auto p-4 md:p-5">
                <h3 className="text-white text-base md:text-xl font-semibold leading-tight">{t(c)}</h3>
                {c.description_ka && (
                  <p className="text-xs md:text-sm text-white/70 mt-1 line-clamp-2">{c.description_ka}</p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Mirrors union.ru's `top_submenu mrl15` — pipe-separated inline text links
 * that switch among a parent's subcategories. The active item is bold and
 * linked back to the parent (so users can clear the filter).
 */
function SubcategoryChipNav({
  parent, children, activeSlug, t, language,
}: { parent: any; children: any[]; activeSlug?: string; t: (c: any) => string; language: string }) {
  const allLabel = language === 'ru' ? 'Все' : language === 'en' ? 'All' : 'ყველა';
  return (
    <nav className="mt-4 text-[15px] leading-7 text-foreground/80 flex flex-wrap items-center gap-x-2">
      <Link
        to={`/union/catalog/${parent.slug}`}
        className={!activeSlug
          ? 'font-semibold text-foreground'
          : 'hover:text-foreground transition-colors'}
      >
        {allLabel}
      </Link>
      {children.map((sub) => {
        const isActive = activeSlug === sub.slug;
        return (
          <span key={sub.id} className="flex items-center gap-x-2">
            <span className="text-muted-foreground/50 select-none">|</span>
            <Link
              to={`/union/catalog/${parent.slug}/${sub.slug}`}
              className={isActive
                ? 'font-semibold text-foreground'
                : 'hover:text-foreground transition-colors'}
            >
              {t(sub)}
            </Link>
          </span>
        );
      })}
    </nav>
  );
}

/**
 * Mirrors union.ru's `part-toggle--text` — a description block that's clamped
 * to ~70px on first paint with a "Show all text" / "Hide" toggle.
 */
function CollapsibleDescription({ html, language }: { html: string; language: string }) {
  const [expanded, setExpanded] = useState(false);
  const showLabel = language === 'ru' ? 'Показать весь текст' : language === 'en' ? 'Show all text' : 'სრული ტექსტი';
  const hideLabel = language === 'ru' ? 'Свернуть' : language === 'en' ? 'Hide' : 'დაკეცვა';
  return (
    <div className="mt-4 max-w-4xl">
      <div
        className={'prose prose-sm max-w-none text-foreground/85 ' + (expanded ? '' : 'overflow-hidden')}
        style={!expanded ? { maxHeight: 70 } : undefined}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <button
        type="button"
        className="mt-2 text-sm text-primary hover:underline"
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? hideLabel : showLabel}
      </button>
    </div>
  );
}

export default UnionCatalog;
