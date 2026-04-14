import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Heart, Share2, Truck, Shield, CreditCard } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { UI_TEXT } from '@/lib/constants';

const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { language, t } = useLanguage();

  // Fetch product
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(*)')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  // Fetch related products
  const { data: relatedProducts = [] } = useQuery({
    queryKey: ['related-products', product?.category_id],
    queryFn: async () => {
      if (!product?.category_id) return [];
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category_id', product.category_id)
        .eq('is_active', true)
        .neq('id', product.id)
        .limit(4);
      if (error) throw error;
      return data;
    },
    enabled: !!product?.category_id,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-1/2" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ka' ? 'პროდუქტი ვერ მოიძებნა' : 'Product not found'}
          </h1>
          <Button asChild>
            <Link to="/catalog">
              {language === 'ka' ? 'კატალოგში დაბრუნება' : 'Back to Catalog'}
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const name = language === 'ka' ? product.name_ka : (product.name_en || product.name_ka);
  const description = language === 'ka' ? product.description_ka : (product.description_en || product.description_ka);
  const categoryName = product.categories 
    ? (language === 'ka' ? product.categories.name_ka : (product.categories.name_en || product.categories.name_ka))
    : '';
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const displayPrice = hasDiscount ? product.sale_price : product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100) 
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: name,
      price: displayPrice!,
      image: product.images?.[0] || '/placeholder.svg',
    });
  };

  const breadcrumbItems = [
    { label: language === 'ka' ? 'კატალოგი' : 'Catalog', path: '/catalog' },
    ...(product.categories ? [{ 
      label: categoryName, 
      path: `/catalog/${product.categories.slug}` 
    }] : []),
    { label: name },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid lg:grid-cols-2 gap-12 py-8">
          {/* Gallery */}
          <ProductGallery 
            images={product.images || []} 
            productName={name} 
          />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex gap-2">
              {product.is_new && (
                <Badge className="badge-new rounded-none">
                  {t(UI_TEXT.new)}
                </Badge>
              )}
              {hasDiscount && (
                <Badge className="badge-sale rounded-none">
                  -{discountPercent}%
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold">{name}</h1>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                {displayPrice?.toLocaleString()} ₾
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.price.toLocaleString()} ₾
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {(product.stock_quantity ?? 0) > 0 ? (
                <>
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-success font-medium">
                    {t(UI_TEXT.inStock)} ({product.stock_quantity} {language === 'ka' ? 'ერთეული' : 'units'})
                  </span>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 rounded-full bg-destructive" />
                  <span className="text-destructive font-medium">{t(UI_TEXT.outOfStock)}</span>
                </>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t(UI_TEXT.addToCart)}
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-secondary rounded-lg">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">
                  {language === 'ka' ? 'უფასო მიწოდება' : 'Free Shipping'}
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">
                  {language === 'ka' ? '2 წლიანი გარანტია' : '2 Year Warranty'}
                </p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <CreditCard className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">
                  {language === 'ka' ? '0% განვადება' : '0% Installments'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12">
            <h2 className="text-2xl font-bold mb-8">
              {language === 'ka' ? 'მსგავსი პროდუქტები' : 'Related Products'}
            </h2>
            <ProductGrid products={relatedProducts} />
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
