import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Heart, Share2, Truck, Shield, CreditCard, Zap } from 'lucide-react';
import { UnionLayout } from '@/components/union/UnionLayout';
import { OrderModal } from '@/components/union/OrderModal';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductGrid } from '@/components/products/ProductGrid';
import { DoorConfigurator, ConfiguratorSelection } from '@/components/products/DoorConfigurator';
import { ProductContentBlocks } from '@/components/products/ProductContentBlocks';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { UI_TEXT } from '@/lib/constants';
import { resolveProductImages } from '@/lib/unionImages';

const UnionProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { language, t } = useLanguage();
  const [orderOpen, setOrderOpen] = useState(false);
  const [configSelection, setConfigSelection] = useState<ConfiguratorSelection | null>(null);

  // Fetch product (and its category — we'll resolve the parent category separately)
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

  // Resolve parent category for hierarchical breadcrumb
  const { data: parentCategory } = useQuery({
    queryKey: ['parent-category', product?.categories?.parent_id],
    enabled: !!product?.categories?.parent_id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', product!.categories!.parent_id!)
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
      <UnionLayout>
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
      </UnionLayout>
    );
  }

  if (!product) {
    return (
      <UnionLayout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ka' ? 'პროდუქტი ვერ მოიძებნა' : 'Product not found'}
          </h1>
          <Button asChild>
            <Link to="/union/catalog">
              {language === 'ka' ? 'კატალოგში დაბრუნება' : 'Back to Catalog'}
            </Link>
          </Button>
        </div>
      </UnionLayout>
    );
  }

  const name = language === 'ka' ? product.name_ka : (product.name_en || product.name_ka);
  const description = language === 'ka' ? product.description_ka : (product.description_en || product.description_ka);
  const categoryName = product.categories
    ? (language === 'ka' ? product.categories.name_ka : (product.categories.name_en || product.categories.name_ka))
    : '';
  const categorySlug = product.categories?.slug ?? null;
  const resolvedImages = resolveProductImages(product.images, categorySlug, product.slug);
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const basePrice = hasDiscount ? product.sale_price! : product.price;
  const displayPrice = basePrice + (configSelection?.priceModifier || 0);
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100)
    : 0;

  const hasAnyVariants =
    (product.has_otdelka_variants ?? false) ||
    (product.has_korobka_variants ?? false) ||
    (product.has_model_variants ?? false);
  const variantSummary = configSelection?.summary || '';
  const displayName = variantSummary ? `${name} — ${variantSummary}` : name;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: displayName,
      price: displayPrice,
      image: resolvedImages[0] || '/placeholder.svg',
    });
  };

  const parentCatLabel = parentCategory
    ? (language === 'ka' ? parentCategory.name_ka : (parentCategory.name_en || parentCategory.name_ka))
    : null;

  const breadcrumbItems = [
    { label: language === 'ka' ? 'კატალოგი' : 'Catalog', path: '/union/catalog' },
    ...(parentCategory ? [{
      label: parentCatLabel!,
      path: `/union/catalog/${parentCategory.slug}`,
    }] : []),
    ...(product.categories ? [{
      label: categoryName,
      path: parentCategory
        ? `/union/catalog/${parentCategory.slug}/${product.categories.slug}`
        : `/union/catalog/${product.categories.slug}`,
    }] : []),
    { label: name },
  ];

  return (
    <UnionLayout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid lg:grid-cols-2 gap-12 py-8">
          {/* Gallery */}
          <ProductGallery
            images={resolvedImages}
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
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-bold text-primary">
                {displayPrice.toLocaleString()} ₾
              </span>
              {hasDiscount && (
                <span className="text-xl text-muted-foreground line-through">
                  {product.price.toLocaleString()} ₾
                </span>
              )}
              {configSelection && configSelection.priceModifier !== 0 && (
                <span className="text-xs text-muted-foreground">
                  ({language === 'ru' ? 'с опциями' : language === 'en' ? 'with options' : 'ოფციებით'})
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

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications as object).length > 0 && (
              <div className="border-t pt-5">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  {language === 'ka' ? 'მახასიათებლები' : language === 'ru' ? 'Характеристики' : 'Specifications'}
                </h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                  {Object.entries(product.specifications as Record<string, any>).map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4 py-1.5 border-b border-border/40 last:border-0">
                      <dt className="text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</dt>
                      <dd className="font-medium text-right">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Door configurator (only if product has variants enabled) */}
            {hasAnyVariants && (
              <DoorConfigurator
                productId={product.id}
                basePrice={basePrice}
                flags={{
                  hasOtdelka: product.has_otdelka_variants ?? false,
                  hasKorobka: product.has_korobka_variants ?? false,
                  hasModel:   product.has_model_variants ?? false,
                }}
                onSelectionChange={setConfigSelection}
              />
            )}

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex gap-3">
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
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-black text-white hover:bg-neutral-800 border-black"
                onClick={() => setOrderOpen(true)}
              >
                <Zap className="mr-2 h-5 w-5" />
                Order now
              </Button>
            </div>

            <OrderModal
              open={orderOpen}
              onOpenChange={setOrderOpen}
              singleProduct={{
                id: product.id,
                name: displayName,
                price: displayPrice,
                image: resolvedImages[0],
              }}
            />

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

        {/* CMS content blocks (specs, gallery, diagram, CTAs, FAQ, contact, etc.) */}
        <ProductContentBlocks productId={product.id} categoryId={product.category_id} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12">
            <h2 className="text-2xl font-bold mb-8">
              {language === 'ka' ? 'მსგავსი პროდუქტები' : 'Related Products'}
            </h2>
            <ProductGrid products={relatedProducts} basePath="/union/product" />
          </section>
        )}
      </div>
    </UnionLayout>
  );
};

export default UnionProductDetail;
