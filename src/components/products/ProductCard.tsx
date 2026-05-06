import { Link } from 'react-router-dom';
import { ShoppingCart, BadgeCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { UI_TEXT } from '@/lib/constants';
import { supabase } from '@/integrations/supabase/client';
import { resolveProductImage } from '@/lib/unionImages';

/** Russian-style number with thin spaces between thousands (matches union.ru's "49 900 ₽") */
function fmtPrice(n: number) {
  return new Intl.NumberFormat('ru-RU').format(n).replace(/,/g, ' ');
}

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

  // Currency: ₽ in RU, ₾ otherwise (matches union.ru pricing for the RU locale)
  const currency = language === 'ru' ? '₽' : '₾';

  // Stock label for the always-available badge
  const inStockLabel = language === 'ru' ? 'ВСЕГДА В НАЛИЧИИ' : language === 'en' ? 'ALWAYS IN STOCK' : 'მუდამ მარაგში';
  const quickShipLabel = language === 'ru' ? 'ЗА 30 ДНЕЙ' : language === 'en' ? 'IN 30 DAYS' : '30 დღეში';
  const isAlwaysAvailable = product.stock_status === 'in_stock';

  return (
    <Link to={`${basePath}/${product.slug}`} className="group block text-center">
      {/* Image — full-bleed, no card chrome (matches union.ru `link_sec → divimg`) */}
      <div className="relative aspect-[3/2] overflow-hidden bg-neutral-100">
        <img
          src={imageUrl}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Badges — top-RIGHT, stacked, red boxes with checkmark (matches union.ru `all_avalible_img`) */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {product.is_new && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-[#e63946] text-white">
              <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
              {t(UI_TEXT.new)}
            </span>
          )}
          {isAlwaysAvailable && !product.is_new && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-tight leading-tight bg-[#e63946] text-white max-w-[120px] text-left">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
              <span>{inStockLabel}</span>
            </span>
          )}
          {showQuickDelivery && !isAlwaysAvailable && !product.is_new && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold uppercase tracking-tight leading-tight bg-[#e63946] text-white">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={2.4} />
              <span>{quickShipLabel}</span>
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

      {/* Price line — centered (matches `price_el`). Old price strikethrough (red) on the left, current price on the right. */}
      <div className="mt-4 flex items-baseline justify-center gap-2 flex-wrap">
        {hasDiscount && (
          <span className="text-base md:text-lg text-[#e63946] line-through font-medium">
            {fromPrefix}{fmtPrice(product.price)} {currency}
          </span>
        )}
        <span className="text-base md:text-lg font-medium text-foreground">
          {fromPrefix}{fmtPrice(displayPrice ?? 0)} {currency}
        </span>
      </div>

      {/* Name — centered, multi-line (matches `name_el`). Renders <br/> tags from the DB if present. */}
      <h3
        className="mt-1 text-sm md:text-[15px] text-foreground/80 leading-snug group-hover:text-foreground transition-colors px-2"
        dangerouslySetInnerHTML={{ __html: name }}
      />
    </Link>
  );
}
