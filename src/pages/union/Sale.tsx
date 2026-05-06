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
      <div className="union-container pt-6 pb-16">
        <Breadcrumb items={breadcrumbItems} />

        <div className="bg-accent-sale text-white p-8 md:p-12 mb-10 mt-4">
          <p className="text-[12px] uppercase tracking-[0.08em] mb-2 text-white/85">
            {language === 'ka' ? 'სპეციალური შეთავაზებები' : language === 'ru' ? 'Специальные предложения' : 'Special offers'}
          </p>
          <h1 className="font-display text-[44px] md:text-[60px] font-bold leading-[0.95] tracking-tight">
            SALE %
          </h1>
          <p className="text-[15px] mt-4 max-w-md text-white/90">
            {language === 'ka'
              ? 'სპეციალური შეთავაზებები და ფასდაკლებები ყველა კოლექციაზე.'
              : language === 'ru'
                ? 'Скидки на коллекции UNION — успейте купить.'
                : 'Discounts on UNION collections — limited-time only.'}
          </p>
        </div>

        {products.length === 0 && !isLoading ? (
          <div className="border border-border bg-surface text-center py-16">
            <p className="text-[14px] text-muted-foreground">
              {language === 'ka' ? 'ფასდაკლებები მალე დაემატება' : language === 'ru' ? 'Скоро' : 'Sales coming soon'}
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
