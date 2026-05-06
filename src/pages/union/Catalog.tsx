import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { ProductCard } from '@/components/products/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import { CallbackModal } from '@/components/union/CallbackModal';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const UnionCatalog = () => {
  const { category: categorySlug, subcategory: subcategorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  // ?f=sub-slug — union.ru-style filter (parallel to route-based navigation)
  const filterParam = searchParams.get('f');

  const [seoExpanded, setSeoExpanded] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

  // Categories tree
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });

  const parentCategory = categorySlug && categories.length > 0
    ? categories.find(c => c.slug === categorySlug) || null
    : null;
  const subFromRoute = subcategorySlug && categories.length > 0
    ? categories.find(c => c.slug === subcategorySlug) || null
    : null;
  const subFromQuery = filterParam && categories.length > 0
    ? categories.find(c => c.slug === filterParam) || null
    : null;

  const subCategory = subFromRoute || subFromQuery;
  const slugUnknown = !!categorySlug && categories.length > 0 && !parentCategory;
  const activeCategory = subCategory || parentCategory;

  const children = useMemo(() => {
    if (!parentCategory) return [];
    return categories
      .filter(c => c.parent_id === parentCategory.id)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
  }, [categories, parentCategory]);

  const catLabel = (c: any) => {
    if (!c) return '';
    if (language === 'ru') return c.name_ru || c.name_ka || c.name_en || '';
    if (language === 'en') return c.name_en || c.name_ka || c.name_ru || '';
    return c.name_ka || c.name_ru || c.name_en || '';
  };

  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['catalog-products', parentCategory?.id, subCategory?.id],
    enabled: !slugUnknown && (!!parentCategory || !categorySlug),
    queryFn: async () => {
      let query = supabase.from('products').select('*').eq('is_active', true);
      if (subCategory) {
        query = query.eq('category_id', subCategory.id);
      } else if (parentCategory) {
        const childIds = categories.filter(c => c.parent_id === parentCategory.id).map(c => c.id);
        if (childIds.length > 0) {
          query = query.in('category_id', [parentCategory.id, ...childIds]);
        } else {
          query = query.eq('category_id', parentCategory.id);
        }
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // Group products by their direct category for the sectioned layout
  const productsBySubcat = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const p of products) {
      if (!p.category_id) continue;
      if (!map.has(p.category_id)) map.set(p.category_id, []);
      map.get(p.category_id)!.push(p);
    }
    return map;
  }, [products]);

  // Breadcrumb
  const breadcrumbItems = [
    { label: language === 'ka' ? 'კატალოგი' : language === 'ru' ? 'Каталог' : 'Catalog', path: '/union/catalog' },
    ...(parentCategory ? [{
      label: catLabel(parentCategory),
      path: subCategory ? `/union/catalog/${parentCategory.slug}` : undefined,
    }] : []),
    ...(subCategory ? [{ label: catLabel(subCategory) }] : []),
  ];

  // Page title + subtitle (h1 with adjacent span)
  // Real union.ru: H1 = "Межкомнатные двери", span = "распашные" (the parent slug name lowercase).
  // We expose: title = active category, subtitle = parent category when on a sub.
  const pageTitle = activeCategory ? catLabel(activeCategory) : (
    language === 'ka' ? 'კატალოგი' : language === 'ru' ? 'Каталог' : 'Catalog'
  );
  const pageSubtitle = subCategory ? catLabel(parentCategory).toLowerCase() : null;

  // Default lead/USP bullets (only shown when no DB description)
  const defaultLead = (() => {
    if (!parentCategory && !subCategory) return null;
    if (language === 'ru') {
      return (
        <>
          <p>В каталоге представлены премиальные межкомнатные распашные, скрытые и поворотные двери. Каждая модель доступна в нескольких вариантах коробов, включая инновационный короб с теневым зазором.</p>
          <p><strong>Почему архитекторы выбирают двери UNION:</strong></p>
          <ul>
            <li><strong>Надёжность и тишина:</strong> полотна на 50% толще стандарта, безупречная геометрия даже на высоте 3.5 м.</li>
            <li><strong>Сила в деталях:</strong> закалённые алюминиевые короба, патент UNION, итальянская сборка.</li>
            <li><strong>Безупречный комфорт:</strong> скрытые петли INVISTA / OTLAV и магнитные защёлки AGB.</li>
            <li><strong>Дизайн без границ:</strong> широчайший выбор отделок и индивидуальные размеры под заказ.</li>
          </ul>
        </>
      );
    }
    if (language === 'en') {
      return (
        <>
          <p>The catalog features premium swing, hidden and pivot interior doors. Each model is available with several frame options, including the patented shadow-gap frame.</p>
          <p><strong>Why architects choose UNION:</strong></p>
          <ul>
            <li><strong>Reliability & silence:</strong> doors 50% thicker than standard, perfect geometry up to 3.5 m height.</li>
            <li><strong>Strength in details:</strong> hardened aluminum frames, UNION patent, Italian assembly.</li>
            <li><strong>Flawless comfort:</strong> hidden INVISTA / OTLAV hinges and AGB magnetic latches.</li>
            <li><strong>Design without limits:</strong> the widest range of finishes and custom sizing on order.</li>
          </ul>
        </>
      );
    }
    return (
      <>
        <p>კატალოგში წარმოდგენილია პრემიუმ შიდა, ფარული და მბრუნავი კარები. თითოეული მოდელი ხელმისაწვდომია რამდენიმე ჩარჩოს ვარიანტში.</p>
        <ul>
          <li><strong>სანდოობა და სიჩუმე</strong> — 50%-ით უფრო სქელი ფარდები.</li>
          <li><strong>ძალა დეტალებში</strong> — გამდნარი ალუმინის ჩარჩოები, UNION-ის პატენტი.</li>
          <li><strong>უნაკლო კომფორტი</strong> — INVISTA / OTLAV ფარული ანჯამები.</li>
          <li><strong>დიზაინი ლიმიტების გარეშე</strong> — ფართო არჩევანი და ინდივიდუალური ზომები.</li>
        </ul>
      </>
    );
  })();

  const introHtml = activeCategory && (activeCategory as any).description_ka
    ? (language === 'ru' ? (activeCategory as any).description_ru : language === 'en' ? (activeCategory as any).description_en : (activeCategory as any).description_ka) || ''
    : null;

  // Banner (admin-managed)
  const banner = (() => {
    const c: any = activeCategory;
    if (!c?.banner_image_url) return null;
    const title = language === 'ru' ? (c.banner_title_ru || c.banner_title_ka)
                : language === 'en' ? (c.banner_title_en || c.banner_title_ka)
                : (c.banner_title_ka || c.banner_title_ru);
    const subtitle = language === 'ru' ? (c.banner_subtitle_ru || c.banner_subtitle_ka)
                  : language === 'en' ? (c.banner_subtitle_en || c.banner_subtitle_ka)
                  : (c.banner_subtitle_ka || c.banner_subtitle_ru);
    return { image: c.banner_image_url, link: c.banner_link_url, title, subtitle };
  })();

  // Filter row navigation
  const setFilter = (slug?: string) => {
    if (!parentCategory) return;
    if (!slug) {
      setSearchParams({}, { replace: true });
      navigate(`/union/catalog/${parentCategory.slug}`, { replace: true });
    } else {
      navigate(`/union/catalog/${parentCategory.slug}?f=${slug}`, { replace: true });
    }
  };

  // Decide what to render in #blockSection:
  //   - When a subcategory is active → render that single section
  //   - Else if parent has children with products → render a section per child
  //   - Else → flat row of all products
  const sectionsToRender = useMemo(() => {
    if (subCategory) {
      const list = productsBySubcat.get(subCategory.id) || [];
      return [{ id: subCategory.id, title: catLabel(subCategory), items: list }];
    }
    if (parentCategory && children.length > 0) {
      return children
        .map((c) => ({
          id: c.id,
          title: catLabel(c),
          items: productsBySubcat.get(c.id) || [],
        }))
        .filter((s) => s.items.length > 0);
    }
    return [{ id: 'all', title: '', items: products }];
  }, [parentCategory, subCategory, children, productsBySubcat, products]);

  const totalShown = sectionsToRender.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <UnionLayout>
      <div className="union-container pb-20">
        {/* breadcrumb-main / breadcrumb-h1 */}
        <div className="breadcrumb-main breadcrumb-h1">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Optional banner from admin */}
        {banner && (
          (() => {
            const inner = (
              <div
                className="relative h-44 md:h-64 mt-4 overflow-hidden bg-[#f4f4f4]"
                style={{ backgroundImage: `url(${banner.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                {(banner.title || banner.subtitle) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#002b45]/70 via-[#002b45]/30 to-transparent flex items-center">
                    <div className="px-8 md:px-12 max-w-2xl text-white">
                      {banner.title && <h2 className="text-[28px] md:text-[40px] font-medium leading-tight mb-1">{banner.title}</h2>}
                      {banner.subtitle && <p className="text-[14px] md:text-[15px] opacity-90">{banner.subtitle}</p>}
                    </div>
                  </div>
                )}
              </div>
            );
            return banner.link ? <Link to={banner.link} className="block">{inner}</Link> : inner;
          })()
        )}

        {/* H1 + adjacent subtitle */}
        <div className="wrapper-h1 secH1 mrl15 mt-3">
          <h1>{pageTitle}</h1>
          {pageSubtitle && <span>{pageSubtitle}</span>}
        </div>

        {/* SEO text — collapsible */}
        {(introHtml || defaultLead) && (
          <div className="seotext_top mrl15">
            <div
              className="part-toggle--text"
              style={{
                height: seoExpanded ? 'auto' : '70px',
                maskImage: seoExpanded ? 'none' : 'linear-gradient(180deg, #000 60%, transparent)',
                WebkitMaskImage: seoExpanded ? 'none' : 'linear-gradient(180deg, #000 60%, transparent)',
              }}
            >
              {introHtml ? (
                <div dangerouslySetInnerHTML={{ __html: introHtml }} />
              ) : (
                defaultLead
              )}
            </div>
            <button
              type="button"
              className="btn-show-more-ext"
              onClick={() => setSeoExpanded((v) => !v)}
            >
              {seoExpanded
                ? (language === 'ru' ? 'Свернуть' : language === 'en' ? 'Hide' : 'დაკეცვა')
                : (language === 'ru' ? 'Показать весь текст' : language === 'en' ? 'Show full text' : 'სრული ტექსტი')}
            </button>
          </div>
        )}

        {/* Pipe-separated filter row */}
        {children.length > 0 && (
          <div className="top_submenu mrl15">
            <span
              className={cn(!subCategory && 'active')}
              onClick={() => setFilter(undefined)}
            >
              <a href={`/union/catalog/${parentCategory!.slug}`} onClick={(e) => { e.preventDefault(); setFilter(undefined); }}>
                {language === 'ru' ? 'Все' : language === 'en' ? 'All' : 'ყველა'}
              </a>
            </span>
            {children.map((c, i) => (
              <span key={c.id} className="contents">
                <span className="delimiter_sec">|</span>
                <span className={cn(subCategory?.id === c.id && 'active')}>
                  <a
                    href={`/union/catalog/${parentCategory!.slug}?f=${c.slug}`}
                    onClick={(e) => { e.preventDefault(); setFilter(c.slug); }}
                  >
                    {catLabel(c)}
                  </a>
                </span>
              </span>
            ))}
          </div>
        )}

        {/* Result count */}
        {!slugUnknown && !isLoading && (
          <p className="text-center text-[13px] text-[#5a5a5a] mt-4 mb-10">
            {language === 'ru'
              ? `Показано: ${totalShown}`
              : language === 'en'
                ? `Showing: ${totalShown}`
                : `ნაჩვენებია: ${totalShown}`}
          </p>
        )}

        {/* Product sections (#blockSection > .section > <p class="title_sec"> + .row > col-lg-4*) */}
        <div className="view-container2">
          <div id="blockSection">
            {slugUnknown ? (
              <div className="py-20 text-center border-t border-[#e3e5ef]">
                <p className="text-[18px] font-medium text-[#002b45] mb-2">
                  {language === 'ka' ? 'კატეგორია ვერ მოიძებნა' : language === 'ru' ? 'Категория не найдена' : 'Category not found'}
                </p>
                <p className="text-[14px] text-[#5a5a5a] mb-6">"{categorySlug}"</p>
                <Link to="/union/catalog" className="text-[hsl(var(--accent))] hover:underline">
                  {language === 'ka' ? 'მთლიანი კატალოგი' : language === 'ru' ? 'Открыть весь каталог' : 'Browse the full catalog'}
                </Link>
              </div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[60px] my-12">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="w-full" style={{ aspectRatio: '490/330' }} />
                    <Skeleton className="h-5 w-1/3 mx-auto" />
                    <Skeleton className="h-4 w-2/3 mx-auto" />
                  </div>
                ))}
              </div>
            ) : sectionsToRender.length === 0 || totalShown === 0 ? (
              <div className="py-20 text-center">
                <p className="text-[15px] text-[#5a5a5a]">
                  {language === 'ru' ? 'Товары пока не добавлены' : language === 'en' ? 'No products yet' : 'ჯერ პროდუქტები არაა'}
                </p>
              </div>
            ) : (
              sectionsToRender.map((section) => (
                <section key={section.id} className="mb-14">
                  {section.title && (
                    <p className="title_sec">{section.title}</p>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[30px] gap-y-[50px]">
                    {section.items.map((p: any) => (
                      <ProductCard key={p.id} product={p} basePath="/union/product" />
                    ))}
                  </div>
                </section>
              ))
            )}
          </div>
        </div>

        {/* Bottom callback */}
        {!slugUnknown && (
          <section className="mt-20 md:mt-24 bg-[#f4f4f4] py-14 md:py-16 -mx-4 md:-mx-6 lg:-mx-10 px-4 md:px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-[#002b45] text-[26px] md:text-[32px] font-normal leading-tight tracking-[0.04em] uppercase">
                {language === 'ru' ? 'Оставить заявку' : language === 'en' ? 'Leave a request' : 'შეტყობინების გაგზავნა'}
              </h2>
              <p className="mt-4 text-[15px] font-light leading-[1.6] text-[#5a5a5a]">
                {language === 'ru'
                  ? 'Подберём решение под ваш проект, рассчитаем стоимость и пригласим в шоурум.'
                  : language === 'en'
                    ? "We'll match a solution to your project, prepare a quote, and invite you to a showroom."
                    : 'შევარჩევთ თქვენი პროექტის შესაფერის ვარიანტს და მოგიწვევთ შოურუმში.'}
              </p>
              <button
                type="button"
                onClick={() => setCallbackOpen(true)}
                className="union-btn-dark mt-7 inline-flex"
              >
                {language === 'ru' ? 'Заказать звонок' : language === 'en' ? 'Request a callback' : 'უკავშირდით'}
              </button>
            </div>
          </section>
        )}
      </div>

      <CallbackModal open={callbackOpen} onOpenChange={setCallbackOpen} />
    </UnionLayout>
  );
};

export default UnionCatalog;
