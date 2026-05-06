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

const ALWAYS_AVAILABLE_BADGE = 'https://www.union.ru/img/always-available.svg';
const DAYS_30_BADGE = 'https://www.union.ru/img/30_days.svg';
const NEW_BADGE = 'https://www.union.ru/img/marks/New.svg';

/**
 * Catalog tile — mirrors union.ru's `.link_sec` markup exactly:
 *
 *   <a class="link_sec">
 *     <div class="divimg">
 *       <img class="elImgFirst">      // 25% opacity backdrop
 *       <img class="elImgSecond">     // foreground, object-contain
 *       <div class="all_avalible_img"><img></div>  // optional badge
 *     </div>
 *     <div class="price_el">от X ₽</div>
 *     <div class="name_el">Name<br>Description</div>
 *   </a>
 *
 * Sale prices wrap in `.two-price > .old-price + .new-price`.
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
  const inStock =
    product.stock_status === 'in_stock' ||
    (product.stock_status == null && (product as any).stock_quantity > 0);
  const fastDelivery =
    product.delivery_days != null && product.delivery_days > 0 && product.delivery_days <= 30;

  const fromLabel =
    language === 'ru' ? 'от' : language === 'en' ? 'from' : 'დან';
  const currency = language === 'ru' ? '₽' : '₾';

  // Pick the most relevant single badge (max one shown like union.ru):
  // priority: "Всегда в наличии" > "За N дней" > "NEW"
  const badge = (() => {
    if (inStock) return { src: ALWAYS_AVAILABLE_BADGE, alt: language === 'ru' ? 'Всегда в наличии' : language === 'en' ? 'Always available' : 'მუდმივად მარაგშია' };
    if (fastDelivery) return { src: DAYS_30_BADGE, alt: language === 'ru' ? `За ${product.delivery_days} дней` : language === 'en' ? `In ${product.delivery_days} days` : `${product.delivery_days} დღე` };
    if (product.is_new) return { src: NEW_BADGE, alt: language === 'ru' ? 'Новый' : language === 'en' ? 'New' : 'ახალი' };
    return null;
  })();

  const fmt = (n: number) => n.toLocaleString('ru-RU');

  return (
    <Link to={`${basePath}/${product.slug}`} className="link_sec">
      <div className="divimg">
        <img
          src={imageUrl}
          alt=""
          className="elImgFirst"
          aria-hidden="true"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <img
          src={imageUrl}
          alt={name}
          className="elImgSecond"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {badge && (
          <div className="all_avalible_img">
            <img src={badge.src} alt={badge.alt} title={badge.alt} width={85} />
          </div>
        )}
      </div>

      <div className="price_el">
        {hasDiscount ? (
          <div className="two-price">
            <div className="old-price">{fromLabel} {fmt(product.price)} {currency}</div>
            <div className="new-price">{fromLabel} {fmt(product.sale_price!)} {currency}</div>
          </div>
        ) : (
          <>{fromLabel} {fmt(product.price)} {currency}</>
        )}
      </div>

      <div className="name_el">
        <strong>{name}</strong>
        {description && (
          <>
            <br />
            <span>{description}</span>
          </>
        )}
      </div>
    </Link>
  );
}
