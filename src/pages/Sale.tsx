import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const Sale = () => {
  const { language } = useLanguage();

  // Fetch products on sale
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
    { label: language === 'ka' ? 'აქცია' : 'Sale' },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        {/* Sale Banner */}
        <div className="bg-gradient-accent text-foreground rounded-lg p-8 md:p-12 mb-8 text-center">
          <Badge className="badge-sale mb-4 text-lg px-4 py-1">
            {language === 'ka' ? 'ფასდაკლება' : 'SALE'}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'ka' ? 'სეზონური აქცია' : 'Seasonal Sale'}
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            {language === 'ka' 
              ? 'მიიღე 50%-მდე ფასდაკლება არჩეულ პროდუქტებზე' 
              : 'Get up to 50% off on selected products'}
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6">
          {language === 'ka' ? 'აქციური პროდუქტები' : 'Products on Sale'}
          <span className="text-muted-foreground font-normal text-lg ml-2">
            ({products.length})
          </span>
        </h2>

        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default Sale;
