import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { CategorySidebar } from '@/components/catalog/CategorySidebar';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

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

  // Fetch products (skipped when we're showing a subcategory grid)
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', activeCategory?.id, selectedCategories, priceRange, showNewOnly, showSaleOnly, showSubcategoryGrid],
    enabled: !showSubcategoryGrid,
    queryFn: async () => {
      let query = supabase.from('products').select('*').eq('is_active', true);

      if (activeCategory) {
        // Use child if we drilled in, parent otherwise
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

  const catLabel = (c: any) => {
    if (!c) return '';
    if (language === 'ru') return c.name_ru || c.name_ka || c.name_en || '';
    if (language === 'en') return c.name_en || c.name_ka || c.name_ru || '';
    return c.name_ka || c.name_ru || c.name_en || '';
  };

  // Hierarchical breadcrumb: Catalog → Parent → Subcategory
  const breadcrumbItems = [
    { label: language === 'ka' ? 'კატალოგი' : 'Catalog', path: '/union/catalog' },
    ...(parentCategory
      ? [{
          label: catLabel(parentCategory),
          path: subCategory ? `/union/catalog/${parentCategory.slug}` : undefined,
        }]
      : []),
    ...(subCategory ? [{ label: catLabel(subCategory) }] : []),
  ];

  const pageTitle = activeCategory ? catLabel(activeCategory) : (language === 'ka' ? 'კატალოგი' : 'Catalog');

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
    />
  );

  return (
    <UnionLayout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between mb-6 mt-4">
          <h1 className="text-2xl md:text-3xl font-bold">{pageTitle}</h1>

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
          <SubcategoryGrid parent={parentCategory!} children={children} t={catLabel} />
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
 * Renders a tile-grid of subcategories, each linking to its own URL.
 * Mirrors union.ru's main category page where you click a tile to drill in.
 *
 * If a subcategory has no image set, we look up a product in that subcategory
 * and use its first image as the tile background. Caches via react-query.
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

export default UnionCatalog;
