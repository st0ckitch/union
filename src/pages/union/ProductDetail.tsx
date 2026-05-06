import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingCart, Heart, Share2, Truck, Zap, Check, Download, Info, FileText, Phone, MapPin, Clock } from 'lucide-react';
import { UnionLayout } from '@/components/union/UnionLayout';
import { OrderModal } from '@/components/union/OrderModal';
import { CallbackModal } from '@/components/union/CallbackModal';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ProductGallery } from '@/components/products/ProductGallery';
import { ProductGrid } from '@/components/products/ProductGrid';
import { DoorConfigurator, ConfiguratorSelection } from '@/components/products/DoorConfigurator';
import { FurnitureConfigurator } from '@/components/products/FurnitureConfigurator';
import { ProductContentBlocks } from '@/components/products/ProductContentBlocks';
import { ProductVideo } from '@/components/products/ProductVideo';
import { LifestyleGallery } from '@/components/products/LifestyleGallery';
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
  const [callbackOpen, setCallbackOpen] = useState(false);
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
        <div className="union-container py-8">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-12">
            <Skeleton className="aspect-[4/5]" />
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
        <div className="union-container py-16 text-center">
          <h1 className="union-section-title mb-4">
            {language === 'ka' ? 'პროდუქტი ვერ მოიძებნა' : language === 'ru' ? 'Товар не найден' : 'Product not found'}
          </h1>
          <Link to="/union/catalog" className="inline-flex items-center justify-center bg-primary text-white h-11 px-7 text-[12px] font-bold uppercase tracking-[0.06em] hover:bg-primary-deep transition-colors">
            {language === 'ka' ? 'კატალოგში დაბრუნება' : language === 'ru' ? 'Назад в каталог' : 'Back to Catalog'}
          </Link>
        </div>
      </UnionLayout>
    );
  }

  const pickLocalizedCat = (cat: any) => {
    if (!cat) return '';
    if (language === 'ru') return cat.name_ru || cat.name_ka || cat.name_en || '';
    if (language === 'en') return cat.name_en || cat.name_ka || cat.name_ru || '';
    return cat.name_ka || cat.name_ru || cat.name_en || '';
  };
  const pickProductLocalized = (ka: string | null, ru: string | null, en: string | null) => {
    if (language === 'ru') return ru || en || ka || '';
    if (language === 'en') return en || ka || ru || '';
    return ka || ru || en || '';
  };
  const name = pickProductLocalized(product.name_ka, (product as any).name_ru, product.name_en) || product.name_ka;
  const description = pickProductLocalized(product.description_ka, (product as any).description_ru, product.description_en);
  const categoryName = pickLocalizedCat(product.categories);
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
    (product.has_model_variants ?? false) ||
    ((product as any).has_glass_variants ?? false) ||
    ((product as any).has_lock_variants ?? false) ||
    ((product as any).has_panel_variants ?? false);
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

  const parentCatLabel = pickLocalizedCat(parentCategory);

  // Structured spec sections (e.g. Polotno / Korobka / Hardware bullet lists)
  type SpecBullet = { ka?: string; ru?: string; en?: string };
  type SpecSection = { code?: string; title_ka?: string; title_ru?: string; title_en?: string; bullets?: SpecBullet[] };
  const specSections: SpecSection[] = Array.isArray((product as any).spec_sections)
    ? ((product as any).spec_sections as SpecSection[])
    : [];

  // Download / resource links
  type DownloadLink = { label_ka?: string; label_ru?: string; label_en?: string; url: string; icon?: string };
  const downloadLinks: DownloadLink[] = Array.isArray((product as any).download_links)
    ? ((product as any).download_links as DownloadLink[])
    : [];

  const pickLang = (item: { ka?: string; ru?: string; en?: string }) => {
    if (language === 'ru') return item.ru || item.en || item.ka || '';
    if (language === 'en') return item.en || item.ka || item.ru || '';
    return item.ka || item.ru || item.en || '';
  };
  const pickLabel = (item: DownloadLink) => {
    if (language === 'ru') return item.label_ru || item.label_en || item.label_ka || '';
    if (language === 'en') return item.label_en || item.label_ka || item.label_ru || '';
    return item.label_ka || item.label_ru || item.label_en || '';
  };
  const pickTitle = (s: SpecSection) => {
    if (language === 'ru') return s.title_ru || s.title_en || s.title_ka || '';
    if (language === 'en') return s.title_en || s.title_ka || s.title_ru || '';
    return s.title_ka || s.title_ru || s.title_en || '';
  };
  const downloadIcon = (icon?: string) => {
    if (icon === 'info') return <Info className="h-4 w-4" />;
    if (icon === 'file') return <FileText className="h-4 w-4" />;
    return <Download className="h-4 w-4" />;
  };

  const breadcrumbItems = [
    { label: language === 'ka' ? 'კატალოგი' : 'Catalog', path: '/union/catalog' },
    ...(parentCategory && parentCatLabel ? [{
      label: parentCatLabel,
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
      <div className="union-container pt-6 pb-16">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14 py-8">
          {/* Gallery */}
          <ProductGallery
            images={resolvedImages}
            productName={name}
          />

          {/* Product Info */}
          <div className="space-y-6">
            <div className="flex gap-2">
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

            <div>
              <h1 className="text-[28px] md:text-[32px] font-medium leading-tight">{name}</h1>
              {(product as any).designer_credit && (
                <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                  {(product as any).designer_credit}
                </p>
              )}
            </div>

            <div className="flex items-baseline gap-3 flex-wrap">
              {(((product as any).price_from) || (configSelection && configSelection.priceModifier !== 0)) && (
                <span className="text-[14px] text-muted-foreground self-baseline">
                  {language === 'ru' ? 'от' : language === 'en' ? 'from' : 'დან'}
                </span>
              )}
              <span className="text-[28px] font-bold text-primary leading-none">
                {displayPrice.toLocaleString()} ₾
              </span>
              {hasDiscount && (
                <span className="text-[16px] text-muted-foreground line-through">
                  {product.price.toLocaleString()} ₾
                </span>
              )}
              {configSelection && configSelection.priceModifier !== 0 && (
                <span className="text-[12px] text-muted-foreground">
                  ({language === 'ru' ? 'с опциями' : language === 'en' ? 'with options' : 'ოფციებით'})
                </span>
              )}
            </div>

            {/* Status / delivery / origin badges */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Stock status */}
              {(() => {
                const stockStatus = (product as any).stock_status as 'in_stock' | 'to_order' | null;
                if (stockStatus === 'in_stock' || (!stockStatus && (product.stock_quantity ?? 0) > 0)) {
                  return (
                    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-green-50 text-green-800 border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                      {language === 'ru' ? 'В наличии' : language === 'en' ? 'In stock' : 'მარაგშია'}
                    </span>
                  );
                }
                if (stockStatus === 'to_order') {
                  return (
                    <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200">
                      <Clock className="h-3 w-3" />
                      {language === 'ru' ? 'На заказ' : language === 'en' ? 'To order' : 'შეკვეთით'}
                    </span>
                  );
                }
                return (
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-red-50 text-red-700 border border-red-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    {t(UI_TEXT.outOfStock)}
                  </span>
                );
              })()}

              {/* Delivery time */}
              {(product as any).delivery_days && (
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-neutral-50 text-neutral-700 border border-neutral-200">
                  <Truck className="h-3 w-3" />
                  {pickProductLocalized(
                    (product as any).delivery_text_ka,
                    (product as any).delivery_text_ru,
                    (product as any).delivery_text_en,
                  ) || `${(product as any).delivery_days} ${language === 'ru' ? 'дней' : language === 'en' ? 'days' : 'დღე'}`}
                </span>
              )}

              {/* Country of origin */}
              {(product as any).country_of_origin && (
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 bg-neutral-50 text-neutral-700 border border-neutral-200">
                  <MapPin className="h-3 w-3" />
                  {language === 'ru' ? `Сделано в ${(product as any).country_of_origin === 'Italy' ? 'Италии' : (product as any).country_of_origin}`
                    : language === 'en' ? `Made in ${(product as any).country_of_origin}`
                    : `${(product as any).country_of_origin === 'Italy' ? 'იტალია' : (product as any).country_of_origin}`}
                </span>
              )}
            </div>

            {/* Furniture module configurator — for parent products with sub-modules (FORMINA-style) */}
            {((product as any).category_type === 'furniture' && (product as any).has_modules) ? (
              <FurnitureConfigurator
                parentProductId={product.id}
                parentProductName={name}
                parentImage={resolvedImages[0]}
              />
            ) : hasAnyVariants && (
              <DoorConfigurator
                productId={product.id}
                basePrice={basePrice}
                categoryType={(product as any).category_type}
                flags={{
                  hasOtdelka: product.has_otdelka_variants ?? false,
                  hasKorobka: product.has_korobka_variants ?? false,
                  hasModel:   product.has_model_variants ?? false,
                  hasGlass:   (product as any).has_glass_variants ?? false,
                  hasLock:    (product as any).has_lock_variants ?? false,
                  hasPanel:   (product as any).has_panel_variants ?? false,
                }}
                onSelectionChange={setConfigSelection}
              />
            )}

            <div className="space-y-3 pt-2">
              <div className="flex gap-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white h-12 text-[12px] font-bold uppercase tracking-[0.06em] hover:bg-primary-deep transition-colors"
                >
                  <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
                  {t(UI_TEXT.addToCart)}
                </button>
                <button
                  className="w-12 h-12 inline-flex items-center justify-center border border-border text-foreground hover:bg-surface transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  className="w-12 h-12 inline-flex items-center justify-center border border-border text-foreground hover:bg-surface transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <button
                onClick={() => setOrderOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent-sale text-white h-12 text-[12px] font-bold uppercase tracking-[0.06em] hover:bg-accent-sale-hover transition-colors"
              >
                <Zap className="h-4 w-4" strokeWidth={1.5} />
                {language === 'ru' ? 'Оставить заявку' : language === 'en' ? 'Order now' : 'შეკვეთა'}
              </button>
              <button
                onClick={() => setCallbackOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 border border-primary text-primary h-12 text-[12px] font-bold uppercase tracking-[0.06em] hover:bg-primary hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4" strokeWidth={1.5} />
                {language === 'ru' ? 'Заказать обратный звонок' : language === 'en' ? 'Request a callback' : 'უკავშირდით'}
              </button>
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

            <CallbackModal
              open={callbackOpen}
              onOpenChange={setCallbackOpen}
              productContext={{ name: displayName, slug: product.slug, price: displayPrice }}
            />
          </div>
        </div>

        {/* === FULL-WIDTH spec band (Polotno / Korobka / Hardware) — mirrors union.ru === */}
        {specSections.length > 0 && (
          <section className="border-t border-b py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
              {specSections.map((section, sIdx) => (
                <div key={section.code || sIdx} className="space-y-3">
                  {pickTitle(section) && (
                    <h3 className="text-base font-semibold text-foreground">{pickTitle(section)}</h3>
                  )}
                  <ul className="space-y-2">
                    {(section.bullets || []).map((b, bIdx) => (
                      <li key={bIdx} className="flex gap-2 text-sm text-foreground/80 leading-snug">
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{pickLang(b)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* === FULL-WIDTH download links row — Tech sheet / DWG / Catalog === */}
        {downloadLinks.length > 0 && (
          <section className="border-b py-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {downloadLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url || '#'}
                  target={link.url && link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url && link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-foreground hover:text-primary border border-transparent hover:border-primary/30 px-3 py-3 transition-colors text-center"
                >
                  {downloadIcon(link.icon)}
                  <span className="leading-tight">{pickLabel(link)}</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* === Description (smaller, full-width) === */}
        {description && (
          <section className="py-6">
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{description}</p>
          </section>
        )}

        {/* === Key-value Specifications (only if present) === */}
        {product.specifications && Object.keys(product.specifications as object).length > 0 && (
          <section className="border-t py-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {language === 'ka' ? 'მახასიათებლები' : language === 'ru' ? 'Характеристики' : 'Specifications'}
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm max-w-5xl">
              {Object.entries(product.specifications as Record<string, any>).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4 py-1.5 border-b border-border/40">
                  <dt className="text-muted-foreground capitalize">{key.replace(/_/g, ' ')}</dt>
                  <dd className="font-medium text-right">{String(value)}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Product video (YouTube/Yandex/mp4) */}
        {(product as any).video_url && (
          <section className="py-8 border-t">
            <h2 className="text-xl md:text-2xl font-semibold mb-5">
              {language === 'ru' ? 'Видеообзор' : language === 'en' ? 'Video review' : 'ვიდეო მიმოხილვა'}
            </h2>
            <ProductVideo url={(product as any).video_url} provider={(product as any).video_provider} title={name} />
          </section>
        )}

        {/* Lifestyle gallery — interior context shots */}
        {Array.isArray((product as any).lifestyle_gallery_image_urls) && (product as any).lifestyle_gallery_image_urls.length > 0 && (
          <LifestyleGallery images={(product as any).lifestyle_gallery_image_urls} />
        )}

        {/* CMS content blocks (specs, gallery, diagram, CTAs, FAQ, contact, etc.) */}
        <ProductContentBlocks productId={product.id} categoryId={product.category_id} />

        {relatedProducts.length > 0 && (
          <section className="py-12 border-t border-border mt-12">
            <h2 className="union-section-title mb-8">
              {language === 'ka' ? 'მსგავსი პროდუქტები' : language === 'ru' ? 'Похожие товары' : 'Related Products'}
            </h2>
            <ProductGrid products={relatedProducts} basePath="/union/product" />
          </section>
        )}
      </div>
    </UnionLayout>
  );
};

export default UnionProductDetail;
