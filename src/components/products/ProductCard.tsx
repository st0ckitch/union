import { Link } from 'react-router-dom';
import { ShoppingCart, Truck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UI_TEXT } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';
import { resolveProductImage } from '@/lib/unionImages';

interface Product {
  id: string;
  name_ka: string;
  name_en: string | null;
  name_ru?: string | null;
  slug: string;
  price: number;
  sale_price: number | null;
  images: string[] | null;
  is_new: boolean | null;
  is_featured: boolean | null;
  category_id: string | null;
  price_from?: boolean | null;
  delivery_days?: number | null;
  stock_status?: string | null;
}

interface ProductCardProps {
  product: Product;
  basePath?: string;
}

export function ProductCard({ product, basePath = '/product' }: ProductCardProps) {
  const { addItem } = useCart();
  const { language, t } = useLanguage();

  // Shared category lookup (cached by react-query → one fetch for the whole grid)
  const { data: categorySlugs } = useQuery({
    queryKey: ['category-slug-map'],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase.from('categories').select('id, slug');
      if (error) return {} as Record<string, string>;
      return Object.fromEntries((data ?? []).map((c: any) => [c.id, c.slug])) as Record<string, string>;
    },
  });

  const categorySlug = product.category_id ? categorySlugs?.[product.category_id] : null;
  const name = (() => {
    if (language === 'ru') return product.name_ru || product.name_en || product.name_ka;
    if (language === 'en') return product.name_en || product.name_ka;
    return product.name_ka;
  })();
  const imageUrl = resolveProductImage(product.images?.[0], categorySlug, product.slug);
  const fromPrefix = product.price_from
    ? (language === 'ru' ? 'от ' : language === 'en' ? 'from ' : '')
    : '';
  const showQuickDelivery = !!product.delivery_days && product.delivery_days <= 30;
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const displayPrice = hasDiscount ? product.sale_price : product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.sale_price!) / product.price) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: name,
      price: displayPrice!,
      image: imageUrl,
    });
  };

  return (
    <Link to={`${basePath}/${product.slug}`}>
      <Card className="group product-card overflow-hidden border-0 shadow-sm h-full">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <img
            src={imageUrl}
            alt={name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
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

          {/* Delivery chip — top-right */}
          {showQuickDelivery && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 bg-white/90 backdrop-blur-sm text-foreground border border-neutral-200">
                <Truck className="h-3 w-3" />
                {language === 'ru' ? `${product.delivery_days} дней` : language === 'en' ? `${product.delivery_days} days` : `${product.delivery_days} დღე`}
              </span>
            </div>
          )}

          {/* Quick add button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-medium text-foreground line-clamp-2 mb-2 min-h-[3rem]">
            {name}
          </h3>
          
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="text-lg font-bold text-primary">
              {fromPrefix}{displayPrice?.toLocaleString()} ₾
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                {product.price.toLocaleString()} ₾
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
