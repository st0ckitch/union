import { useQuery } from '@tanstack/react-query';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ProductGrid } from '@/components/products/ProductGrid';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const UnionSale = () => {
  const { language } = useLanguage();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['sale-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .not('sale_price', 'is', null)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const breadcrumbItems = [
    { label: language === 'ka' ? 'SALE' : 'SALE' },
  ];

  return (
    <UnionLayout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sale mb-2">
            SALE %
          </h1>
          <p className="text-muted-foreground">
            {language === 'ka' 
              ? 'სპეციალური შეთავაზებები და ფასდაკლებები' 
              : 'Special offers and discounts'}
          </p>
        </div>

        {products.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'ka' ? 'ფასდაკლებები მალე დაემატება' : 'Sales coming soon'}
            </p>
          </div>
        ) : (
          <ProductGrid products={products} isLoading={isLoading} basePath="/union/product" />
        )}
      </div>
    </UnionLayout>
  );
};

export default UnionSale;
