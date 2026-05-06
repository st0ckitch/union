import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { UnionLayout } from '@/components/union/UnionLayout';
import { ProductCard } from '@/components/products/ProductCard';
import { CallbackModal } from '@/components/union/CallbackModal';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const UnionCatalog = () => {
  const { category: categorySlug, subcategory: subcategorySlug } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const filterParam = searchParams.get('f');
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [callbackOpen, setCallbackOpen] = useState(false);

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

  const productsBySubcat = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const p of products) {
      if (!p.category_id) continue;
      if (!map.has(p.category_id)) map.set(p.category_id, []);
      map.get(p.category_id)!.push(p);
    }
    return map;
  }, [products]);

  const setFilter = (slug?: string) => {
    if (!parentCategory) return;
    if (!slug) navigate(`/union/catalog/${parentCategory.slug}`, { replace: true });
    else navigate(`/union/catalog/${parentCategory.slug}?f=${slug}`, { replace: true });
  };

  const sectionsToRender = useMemo(() => {
    if (subCategory) {
      return [{ id: subCategory.id, title: catLabel(subCategory), items: productsBySubcat.get(subCategory.id) || [] }];
    }
    if (parentCategory && children.length > 0) {
      return children
        .map((c) => ({ id: c.id, title: catLabel(c), items: productsBySubcat.get(c.id) || [] }))
        .filter((s) => s.items.length > 0);
    }
    return [{ id: 'all', title: '', items: products }];
  }, [parentCategory, subCategory, children, productsBySubcat, products, language]);

  const totalShown = sectionsToRender.reduce((sum, s) => sum + s.items.length, 0);

  // Page title + adjacent subtitle (matching union.ru's wrapper-h1)
  const pageTitle = activeCategory ? catLabel(activeCategory) : (
    language === 'ka' ? 'კატალოგი' : language === 'ru' ? 'Каталог' : 'Catalog'
  );
  const pageSubtitle = subCategory ? catLabel(parentCategory).toLowerCase() : (
    parentCategory ? (
      language === 'ka' ? 'გაშლადი' : language === 'ru' ? 'распашные' : 'swing'
    ) : null
  );

  // Default lead/USP bullets when no DB description
  const introNode = (() => {
    if (!parentCategory) return null;
    const desc = (() => {
      const c: any = activeCategory;
      if (language === 'ru') return c?.description_ru || c?.description_ka;
      if (language === 'en') return c?.description_en || c?.description_ka;
      return c?.description_ka;
    })();
    if (desc) return <div dangerouslySetInnerHTML={{ __html: desc }} />;
    if (language === 'ru') {
      return (
        <>
          <p style={{ color: '#2c2d2e' }}>В каталоге представлены все виды премиальных межкомнатных распашных, скрытых дверей и поворотных дверей, каждая из которых может быть поставлена в одном из нескольких коробов на выбор, включая новейшую разработку компании — короб с теневым зазором.</p>
          <p style={{ color: '#2c2d2e' }}><u><span style={{ color: '#0f1115' }}>Почему архитекторы выбирают двери UNION:</span></u></p>
          <ul style={{ color: '#2c2d2e' }}>
            <li><span style={{ fontWeight: 700 }}>Надёжность и тишина:</span> Полотна дверей UNION на 50% толще стандартных, что улучшает звукоизоляцию и гарантирует идеальную геометрию даже при высоте до 3.5 метров.</li>
            <li><span style={{ fontWeight: 700 }}>Сила в деталях: </span>Усиленные короба изготовлены из закалённого алюминия по итальянской технологии и запатентованы UNION. Они абсолютно устойчивы к влаге и прослужат вам долгие годы.</li>
            <li><span style={{ fontWeight: 700 }}>Безупречный комфорт:</span> Европейская фурнитура (скрытые петли INVISTA / OTLAV, магнитный AGB) обеспечивает максимально плавное и комфортное использование.</li>
            <li><span style={{ fontWeight: 700 }}>Дизайн без границ:</span> Широчайший выбор моделей и отделок из экологически чистых материалов даст возможность вписать дверь в любой стиль интерьера.</li>
          </ul>
        </>
      );
    }
    return (
      <>
        <p>The catalog features premium swing, hidden and pivot interior doors. Each model is available with several frame options, including the patented shadow-gap frame.</p>
        <p><u><strong>Why architects choose UNION:</strong></u></p>
        <ul>
          <li><strong>Reliability & silence:</strong> doors 50% thicker than standard.</li>
          <li><strong>Strength in details:</strong> hardened aluminum frames, UNION patent.</li>
          <li><strong>Flawless comfort:</strong> hidden INVISTA / OTLAV hinges.</li>
          <li><strong>Design without limits:</strong> custom finishes and sizing.</li>
        </ul>
      </>
    );
  })();

  return (
    <UnionLayout>
      <main className="main">
        <div className="container">
          <div className="bf_skv_b_area"></div>
        </div>
        <div className="container-fluid combine-container page-container">
          <div className="row">

            {/* Breadcrumb */}
            <div className="breadcrumb-main breadcrumb-h1">
              <div className="container">
                <ol id="breadcrumbs-list" className="breadcrumb">
                  <li className="active">
                    <Link to="/union/catalog" title={language === 'ru' ? 'Каталог' : 'Catalog'}>
                      <span>{language === 'ru' ? 'Каталог' : language === 'ka' ? 'კატალოგი' : 'Catalog'}</span>
                    </Link>
                  </li>
                  {parentCategory && (
                    <li className="active">
                      {subCategory ? (
                        <Link to={`/union/catalog/${parentCategory.slug}`}>
                          <span>{catLabel(parentCategory)}</span>
                        </Link>
                      ) : (
                        <span>{catLabel(parentCategory)}</span>
                      )}
                    </li>
                  )}
                  {subCategory && (
                    <li className="active">
                      <span>{catLabel(subCategory)}</span>
                    </li>
                  )}
                </ol>
              </div>
            </div>

            {/* H1 + adjacent subtitle */}
            <div className="wrapper-h1 secH1 mrl15">
              <h1>{pageTitle}</h1>
              {pageSubtitle && <span>{pageSubtitle}</span>}
            </div>

            {/* SEO text — collapsible */}
            <div className="col-xs-12">
              <div id="seotext_top">
                <div
                  className="pdrl15 part-toggle--text"
                  style={{
                    overflow: 'hidden',
                    height: seoExpanded ? 'auto' : '70px',
                  }}
                >
                  {introNode}
                </div>
                <button
                  type="button"
                  className="btn btn-sm mr-b15 btn-show-more-ext"
                  onClick={() => setSeoExpanded(v => !v)}
                >
                  {seoExpanded
                    ? (language === 'ru' ? 'Свернуть' : language === 'en' ? 'Hide' : 'დაკეცვა')
                    : (language === 'ru' ? 'Показать весь текст' : language === 'en' ? 'Show full text' : 'სრული ტექსტი')}
                </button>
              </div>
            </div>

            {/* Pipe-separated filter row */}
            {children.length > 0 && (
              <div className="top_submenu mrl15">
                <span className={cn(!subCategory && 'active')}>
                  <a
                    href={`/union/catalog/${parentCategory!.slug}`}
                    onClick={(e) => { e.preventDefault(); setFilter(undefined); }}
                  >
                    {language === 'ru' ? ' Все ' : language === 'en' ? ' All ' : ' ყველა '}
                  </a>
                </span>
                {children.map((c) => (
                  <span key={c.id} style={{ display: 'contents' }}>
                    <span className="delimiter_sec">|</span>
                    <span className={cn(subCategory?.id === c.id && 'active')}>
                      <a
                        href={`/union/catalog/${parentCategory!.slug}?f=${c.slug}`}
                        onClick={(e) => { e.preventDefault(); setFilter(c.slug); }}
                      >
                        {' '}{catLabel(c)}{' '}
                      </a>
                    </span>
                  </span>
                ))}
                <hr style={{ marginTop: 0 }} />
              </div>
            )}

            {/* #blockSection */}
            <div className="view-container2">
              <div className="container-fluid">
                <div id="blockSection">
                  {slugUnknown ? (
                    <div style={{ padding: '80px 0', textAlign: 'center' }}>
                      <p style={{ fontSize: 18, fontWeight: 500, color: '#002b45', marginBottom: 8 }}>
                        {language === 'ka' ? 'კატეგორია ვერ მოიძებნა' : language === 'ru' ? 'Категория не найдена' : 'Category not found'}
                      </p>
                      <p style={{ fontSize: 14, color: '#5a5a5a', marginBottom: 24 }}>"{categorySlug}"</p>
                      <Link to="/union/catalog" style={{ color: '#e3ae46' }}>
                        {language === 'ka' ? 'მთლიანი კატალოგი' : language === 'ru' ? 'Открыть весь каталог' : 'Browse the full catalog'}
                      </Link>
                    </div>
                  ) : isLoading ? (
                    <div className="section">
                      <div className="row">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                            <div className="divimg" style={{ background: '#f4f4f4' }} />
                            <div className="price_el">&nbsp;</div>
                            <div className="name_el">&nbsp;</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : totalShown === 0 ? (
                    <div style={{ padding: '80px 0', textAlign: 'center' }}>
                      <p style={{ fontSize: 15, color: '#5a5a5a' }}>
                        {language === 'ru' ? 'Товары пока не добавлены' : language === 'en' ? 'No products yet' : 'ჯერ პროდუქტები არაა'}
                      </p>
                    </div>
                  ) : (
                    sectionsToRender.map((section) => (
                      <div key={section.id} className="section">
                        {section.title && (
                          <p className="title_sec">{section.title}</p>
                        )}
                        <div className="row">
                          {section.items.map((p: any) => (
                            <div key={p.id} className="col-xs-12 col-sm-6 col-md-4">
                              <ProductCard product={p} basePath="/union/product" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Bottom callback CTA */}
            {!slugUnknown && (
              <div className="col-xs-12">
                <section style={{ marginTop: 60, marginBottom: 40, background: '#f4f4f4', padding: '56px 24px', textAlign: 'center' }}>
                  <h2 style={{ color: '#002b45', fontSize: 28, fontWeight: 400, letterSpacing: '0.04em', textTransform: 'uppercase', margin: 0 }}>
                    {language === 'ru' ? 'Оставить заявку' : language === 'en' ? 'Leave a request' : 'შეტყობინების გაგზავნა'}
                  </h2>
                  <p style={{ marginTop: 16, fontSize: 15, fontWeight: 300, lineHeight: 1.6, color: '#5a5a5a', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
                    {language === 'ru'
                      ? 'Подберём решение под ваш проект, рассчитаем стоимость и пригласим в шоурум.'
                      : language === 'en'
                        ? "We'll match a solution to your project, prepare a quote, and invite you to a showroom."
                        : 'შევარჩევთ თქვენი პროექტის შესაფერის ვარიანტს და მოგიწვევთ შოურუმში.'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setCallbackOpen(true)}
                    className="btn"
                    style={{ marginTop: 28, background: '#484848', color: '#fff', height: 50, padding: '0 32px', fontSize: 14, fontWeight: 300, letterSpacing: '0.16em', textTransform: 'uppercase', border: 0 }}
                  >
                    {language === 'ru' ? 'Заказать звонок' : language === 'en' ? 'Request a callback' : 'უკავშირდით'}
                  </button>
                </section>
              </div>
            )}

          </div>
        </div>
      </main>

      <CallbackModal open={callbackOpen} onOpenChange={setCallbackOpen} />
    </UnionLayout>
  );
};

export default UnionCatalog;
