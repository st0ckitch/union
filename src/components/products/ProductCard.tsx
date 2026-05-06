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
    <Link to={`${basePath}/${product.slug}`} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-surface">
        <img
          src={imageUrl}
          alt={name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/12 transition-colors" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-1 bg-primary text-white">
              {t(UI_TEXT.new)}
            </span>
          )}
          {hasDiscount && (
            <span className="text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-1 bg-accent-sale text-white">
              -{discountPercent}%
            </span>
          )}
        </div>

        {showQuickDelivery && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-1 bg-white/95 text-foreground border border-border">
              <Truck className="h-3 w-3" strokeWidth={1.5} />
              {language === 'ru' ? `${product.delivery_days} дней` : language === 'en' ? `${product.delivery_days} days` : `${product.delivery_days} დღე`}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            className="bg-primary hover:bg-primary-deep text-white rounded-none h-9 w-9"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-[15px] font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {name}
        </h3>
        <div className="mt-2 flex items-baseline gap-2 flex-wrap">
          <span className="text-[16px] font-bold text-primary">
            {fromPrefix}{displayPrice?.toLocaleString()} ₾
          </span>
          {hasDiscount && (
            <span className="text-[13px] text-muted-foreground line-through">
              {product.price.toLocaleString()} ₾
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
