import { Link } from 'react-router-dom';
import { ShoppingCart, Truck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
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
      {/* Image — full-bleed, no card chrome (matches union.ru `link_sec → divimg`) */}
      <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100">
        <img
          src={imageUrl}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Badges (top-left, stacked) — small chip-style overlays like union.ru's `all_avalible_img` */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-sm">
              {t(UI_TEXT.new)}
            </span>
          )}
          {hasDiscount && (
            <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-red-600 text-white rounded-sm">
              -{discountPercent}%
            </span>
          )}
          {showQuickDelivery && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-white/95 text-foreground border border-neutral-200 rounded-sm">
              <Truck className="h-3 w-3" />
              {language === 'ru' ? `${product.delivery_days} дней` : language === 'en' ? `${product.delivery_days} days` : `${product.delivery_days} დღე`}
            </span>
          )}
        </div>

        {/* Quick add button (bottom-right on hover) */}
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

      {/* Price line — bold, primary color (matches `price_el`) */}
      <div className="mt-3 flex items-baseline gap-2 flex-wrap">
        <span className="text-base md:text-lg font-bold text-foreground">
          {fromPrefix}{displayPrice?.toLocaleString()} ₾
        </span>
        {hasDiscount && (
          <span className="text-sm text-muted-foreground line-through">
            {product.price.toLocaleString()} ₾
          </span>
        )}
      </div>

      {/* Name — secondary, two lines max (matches `name_el`) */}
      <h3 className="mt-1 text-sm text-muted-foreground leading-snug line-clamp-2 group-hover:text-foreground transition-colors">
        {name}
      </h3>
    </Link>
  );
}
