import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { CatalogIntro } from '@/components/catalog/CatalogIntro';
import { CatalogFilterChips } from '@/components/catalog/CatalogFilterChips';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CallbackModal } from '@/components/union/CallbackModal';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name';

const UnionCatalog = () => {
  const { category: categorySlug, subcategory: subcategorySlug } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<SortOption>('newest');
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
  const subCategory = subcategorySlug && categories.length > 0
    ? categories.find(c => c.slug === subcategorySlug) || null
    : null;

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

  const catDescription = (c: any) => {
    if (!c) return '';
    if (language === 'ru') return c.description_ru || c.description_ka || c.description_en || '';
    if (language === 'en') return c.description_en || c.description_ka || c.description_ru || '';
    return c.description_ka || c.description_ru || c.description_en || '';
  };

  // Fetch products for the active category (or all of parent's children if no subcategory)
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['catalog-products', parentCategory?.id, subCategory?.id],
    enabled: !slugUnknown && (!!parentCategory || !categorySlug),
    queryFn: async () => {
      let query = supabase.from('products').select('*').eq('is_active', true);
      if (subCategory) {
        query = query.eq('category_id', subCategory.id);
      } else if (parentCategory) {
        const childIds = categories
          .filter(c => c.parent_id === parentCategory.id)
          .map(c => c.id);
        if (childIds.length > 0) {
          query = query.in('category_id', [parentCategory.id, ...childIds]);
        } else {
          query = query.eq('category_id', parentCategory.id);
        }
      }
      const { data, error } = await query.order('sort_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  // Sorting
  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case 'price-asc':  return sorted.sort((a, b) => (a.sale_price || a.price) - (b.sale_price || b.price));
      case 'price-desc': return sorted.sort((a, b) => (b.sale_price || b.price) - (a.sale_price || a.price));
      case 'name':       return sorted.sort((a, b) => (a.name_ru || a.name_ka).localeCompare(b.name_ru || b.name_ka));
      case 'newest':
      default:           return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  }, [products, sortBy]);

  // Breadcrumb (Catalog → Parent → Subcategory?)
  const breadcrumbItems = [
    { label: language === 'ka' ? 'კატალოგი' : language === 'ru' ? 'Каталог' : 'Catalog', path: '/union/catalog' },
    ...(parentCategory ? [{
      label: catLabel(parentCategory),
      path: subCategory ? `/union/catalog/${parentCategory.slug}` : undefined,
    }] : []),
    ...(subCategory ? [{ label: catLabel(subCategory) }] : []),
  ];

  // Filter chips: only render when on a parent category with children
  const filterChips = parentCategory
    ? children.map(c => ({ slug: c.slug, label: catLabel(c) }))
    : [];

  const onChipChange = (slug?: string) => {
    if (!parentCategory) return;
    if (!slug) {
      navigate(`/union/catalog/${parentCategory.slug}`, { replace: true });
    } else {
      navigate(`/union/catalog/${parentCategory.slug}/${slug}`, { replace: true });
    }
  };

  const pageTitle = activeCategory ? catLabel(activeCategory) : (
    language === 'ka' ? 'კატალოგი' : language === 'ru' ? 'Каталог' : 'Catalog'
  );

  // Default lead/USP bullets — show only on the top-level "interior doors" parent
  // (or when no specific copy is set). Picked up from union.ru's
  // /mezhkomnatnye-dveri intro paragraphs.
  const defaultLead = (() => {
    if (!parentCategory) return null;
    if (language === 'ru') {
      return 'Мы предлагаем широкий выбор межкомнатных дверей премиального качества. Более 35 лет опыта, итальянские технологии и собственное производство — каждая деталь выверена до миллиметра.';
    }
    if (language === 'en') {
      return 'We offer a wide range of premium-quality interior doors. Over 35 years of experience, Italian technology, and in-house manufacturing — every detail is engineered to the millimeter.';
    }
    return 'ჩვენ გთავაზობთ პრემიუმ-ხარისხის შიდა კარების ფართო არჩევანს. 35 წელზე მეტი გამოცდილება, იტალიური ტექნოლოგიები და საკუთარი წარმოება.';
  })();

  const uspBullets = (() => {
    if (!parentCategory) return [];
    if (language === 'ru') {
      return [
        { label: 'Надёжность и тишина', body: 'Полотна на 50% толще стандарта, многослойная конструкция, повышенная звукоизоляция.' },
        { label: 'Сила в деталях',       body: 'Закалённые алюминиевые короба, влагостойкие материалы, итальянская сборка.' },
        { label: 'Безупречный комфорт',  body: 'Скрытые петли INVISTA / OTLAV, магнитные защёлки AGB, тихий ход.' },
        { label: 'Дизайн без границ',    body: 'Десятки коллекций, экологичные материалы, индивидуальные размеры под заказ.' },
      ];
    }
    if (language === 'en') {
      return [
        { label: 'Reliability and silence', body: 'Doors 50% thicker than standard, multilayer construction, enhanced soundproofing.' },
        { label: 'Strength in details',     body: 'Hardened aluminum frames, moisture-resistant materials, Italian assembly.' },
        { label: 'Flawless comfort',        body: 'Hidden INVISTA / OTLAV hinges, AGB magnetic latches, smooth quiet swing.' },
        { label: 'Design without limits',   body: 'Dozens of collections, eco-friendly materials, custom sizing.' },
      ];
    }
    return [
      { label: 'სანდოობა და სიჩუმე',    body: '50%-ით უფრო სქელი ფარდები, მრავალშრიანი კონსტრუქცია, გაუმჯობესებული ხმაიზოლაცია.' },
      { label: 'ძალა დეტალებში',         body: 'გამდნარი ალუმინის ჩარჩოები, ტენდამდგრადი მასალები, იტალიური აწყობა.' },
      { label: 'უნაკლო კომფორტი',        body: 'INVISTA / OTLAV ფარული ანჯამები, AGB მაგნიტური საკეტი, ჩუმი მოძრაობა.' },
      { label: 'დიზაინი ლიმიტების გარეშე', body: 'ათეულობით კოლექცია, ეკოლოგიური მასალები, ინდივიდუალური ზომები.' },
    ];
  })();

  // Optional category banner from admin
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

  return (
    <UnionLayout>
      <div className="union-container pb-20">
        <Breadcrumb items={breadcrumbItems} />

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
            return banner.link
              ? <Link to={banner.link} className="block">{inner}</Link>
              : inner;
          })()
        )}

        <CatalogIntro
          title={pageTitle}
          subhead={subCategory ? catLabel(parentCategory) : undefined}
          lead={catDescription(activeCategory) || defaultLead}
          bullets={parentCategory && !subCategory ? uspBullets : []}
        />

        {/* Filter chips (only when there are subcategories) */}
        {filterChips.length > 0 && (
          <CatalogFilterChips
            chips={filterChips}
            active={subCategory?.slug}
            onChange={onChipChange}
          />
        )}

        {/* Sort row */}
        {!slugUnknown && (
          <div className="flex items-center justify-between gap-4 mb-8 md:mb-10">
            <p className="text-[14px] text-[#5a5a5a]">
              {language === 'ru'
                ? `Показано: ${sortedProducts.length}`
                : language === 'en'
                  ? `Showing: ${sortedProducts.length}`
                  : `ნაჩვენებია: ${sortedProducts.length}`}
            </p>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[200px] h-10 rounded-none border-[#e3e5ef] bg-white text-[14px] focus:ring-[hsl(var(--accent))]">
                <SelectValue placeholder={language === 'ka' ? 'დალაგება' : language === 'ru' ? 'Сортировка' : 'Sort by'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{language === 'ka' ? 'უახლესი' : language === 'ru' ? 'Новинки' : 'Newest'}</SelectItem>
                <SelectItem value="price-asc">{language === 'ka' ? 'ფასი: დაბალი' : language === 'ru' ? 'Цена ↑' : 'Price ↑'}</SelectItem>
                <SelectItem value="price-desc">{language === 'ka' ? 'ფასი: მაღალი' : language === 'ru' ? 'Цена ↓' : 'Price ↓'}</SelectItem>
                <SelectItem value="name">{language === 'ka' ? 'სახელით' : language === 'ru' ? 'По названию' : 'By Name'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

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
        ) : (
          <ProductGrid products={sortedProducts} isLoading={isLoading} basePath="/union/product" />
        )}

        {/* Bottom CTA — request callback */}
        {!slugUnknown && (
          <section className="mt-20 md:mt-28 bg-[#f4f4f4] py-14 md:py-16 -mx-4 md:-mx-6 lg:-mx-10 px-4 md:px-6 lg:px-10">
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
