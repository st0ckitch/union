import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
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
import { useParams } from 'react-router-dom';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

const Catalog = () => {
  const { category: categorySlug } = useParams();
  const { language } = useLanguage();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Fetch categories
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

  // Get current category
  const currentCategory = categorySlug 
    ? categories.find(c => c.slug === categorySlug) 
    : null;

  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', categorySlug, selectedCategories, priceRange, showNewOnly, showSaleOnly],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      // Filter by category from URL
      if (currentCategory) {
        query = query.eq('category_id', currentCategory.id);
      } else if (selectedCategories.length > 0) {
        query = query.in('category_id', selectedCategories);
      }

      // Price filter
      query = query.gte('price', priceRange[0]).lte('price', priceRange[1]);

      // New only filter
      if (showNewOnly) {
        query = query.eq('is_new', true);
      }

      // Sale only filter
      if (showSaleOnly) {
        query = query.not('sale_price', 'is', null);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Get max price for slider
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 10000;
    return Math.max(...products.map(p => p.price));
  }, [products]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
      case 'price-desc':
        return sorted.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
      case 'name':
        return sorted.sort((a, b) => a.name_ka.localeCompare(b.name_ka, 'ka'));
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  }, [products, sortBy]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const breadcrumbItems = [
    { label: language === 'ka' ? 'კატალოგი' : 'Catalog', path: '/catalog' },
    ...(currentCategory ? [{ 
      label: language === 'ka' ? currentCategory.name_ka : (currentCategory.name_en || currentCategory.name_ka) 
    }] : []),
  ];

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
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            {currentCategory 
              ? (language === 'ka' ? currentCategory.name_ka : (currentCategory.name_en || currentCategory.name_ka))
              : (language === 'ka' ? 'კატალოგი' : 'Catalog')
            }
          </h1>

          <div className="flex items-center gap-4">
            {/* Mobile filter button */}
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  {language === 'ka' ? 'ფილტრი' : 'Filters'}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="mt-6">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort dropdown */}
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={language === 'ka' ? 'დალაგება' : 'Sort by'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  {language === 'ka' ? 'უახლესი' : 'Newest'}
                </SelectItem>
                <SelectItem value="price-asc">
                  {language === 'ka' ? 'ფასი: დაბალი' : 'Price: Low to High'}
                </SelectItem>
                <SelectItem value="price-desc">
                  {language === 'ka' ? 'ფასი: მაღალი' : 'Price: High to Low'}
                </SelectItem>
                <SelectItem value="name">
                  {language === 'ka' ? 'სახელით' : 'By Name'}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <CategorySidebar categories={categories} />
            <div className="mt-8">
              <FiltersContent />
            </div>
          </aside>

          {/* Products grid */}
          <main className="flex-1">
            <ProductGrid products={sortedProducts} isLoading={isLoading} />
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Catalog;
