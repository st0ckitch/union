import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { resolveProductImage } from '@/lib/unionImages';

interface Product {
  id: string;
  name_ka: string;
  name_en: string | null;
  name_ru?: string | null;
  description_ka?: string | null;
  description_en?: string | null;
  description_ru?: string | null;
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

/**
 * Catalog tile — matches union.ru's `.product-item-card`:
 *   image (1.48:1) with optional badge in top-right
 *   product name 26px / 500 / +0.78px
 *   short description 1-line, light grey
 *   price "от X ₽" (with struck-through old price on sale)
 * No border, no shadow. Hover scales the image.
 */
export function ProductCard({ product, basePath = '/product' }: ProductCardProps) {
  const { language } = useLanguage();

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
  const description = (() => {
    if (language === 'ru') return (product.description_ru || product.description_en || product.description_ka) ?? '';
    if (language === 'en') return (product.description_en || product.description_ka) ?? '';
    return product.description_ka ?? '';
  })();

  const imageUrl = resolveProductImage(product.images?.[0], categorySlug, product.slug);
  const hasDiscount = product.sale_price && product.sale_price < product.price;
  const displayPrice = hasDiscount ? product.sale_price! : product.price;
  const inStock =
    product.stock_status === 'in_stock' ||
    (product.stock_status == null && (product as any).stock_quantity > 0);
  const fastDelivery = product.delivery_days != null && product.delivery_days <= 30 && product.delivery_days > 0;

  const fromLabel =
    language === 'ru' ? 'от' : language === 'en' ? 'from' : 'დან';
  const currency = language === 'ru' ? '₽' : '₾';

  return (
    <Link to={`${basePath}/${product.slug}`} className="group block text-left">
      {/* Image with optional badge */}
      <div className="relative overflow-hidden bg-[#fafafa]" style={{ aspectRatio: '490/330' }}>
        {/* faded backdrop layer (mirrors union.ru's elImgFirst trick) */}
        <img
          src={imageUrl}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <img
          src={imageUrl}
          alt={name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="relative w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Badges in top-right */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {product.is_new && (
            <span className="bg-[hsl(var(--accent))] text-white text-[10px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1">
              {language === 'ru' ? 'Новый' : language === 'en' ? 'New' : 'ახალი'}
            </span>
          )}
          {hasDiscount && (
            <span className="bg-[hsl(var(--sale))] text-black text-[10px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1">
              SALE
            </span>
          )}
          {inStock && (
            <span className="bg-white border border-[#e3e5ef] text-[10px] uppercase tracking-[0.06em] text-[#5a5a5a] px-2.5 py-1">
              {language === 'ru' ? 'В наличии' : language === 'en' ? 'In stock' : 'მარაგშია'}
            </span>
          )}
          {fastDelivery && !inStock && (
            <span className="bg-white border border-[#e3e5ef] text-[10px] uppercase tracking-[0.06em] text-[#5a5a5a] px-2.5 py-1">
              {language === 'ru' ? `За ${product.delivery_days} дней` : language === 'en' ? `In ${product.delivery_days} days` : `${product.delivery_days} დღე`}
            </span>
          )}
        </div>
      </div>

      {/* Text block */}
      <div className="mt-5">
        <h3 className="text-[#002b45] text-[20px] md:text-[24px] lg:text-[26px] font-medium leading-[1.15] tracking-[0.03em] m-0 group-hover:text-[hsl(var(--accent))] transition-colors">
          {name}
        </h3>

        {description && (
          <p className="mt-2 text-[14px] md:text-[15px] font-light leading-[1.4] text-[#5a5a5a] line-clamp-2 m-0">
            {description}
          </p>
        )}

        <div className="mt-3 flex items-baseline gap-3">
          {hasDiscount && (
            <span className="text-[14px] text-[#999] line-through">
              {fromLabel} {product.price.toLocaleString('ru-RU')} {currency}
            </span>
          )}
          <span className="text-[16px] md:text-[17px] font-medium text-[#002b45]">
            {fromLabel} {displayPrice.toLocaleString('ru-RU')} {currency}
          </span>
        </div>
      </div>
    </Link>
  );
}
