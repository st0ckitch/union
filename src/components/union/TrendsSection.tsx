import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { resolveProductImage } from '@/lib/unionImages';
import { SliderSection, SliderItem } from './_shared/SliderSection';

const UNION_CDN = 'https://www.union.ru';

const placeholderTrends = [
  { id: 1, name_ru: 'Гардеробные, шкафы',         name_ka: 'გარდერობი, შკაფები',         image: `${UNION_CDN}/upload/iblock/bfc/qr4nuawm7z2l28b3cxiaeuq3bir8vhc9/_-LAGUNA-2400x1600.jpg`, slug: 'wardrobes' },
  { id: 2, name_ru: 'Мебель — Комоды, витрины',   name_ka: 'ავეჯი — კომოდები, ვიტრინები', image: `${UNION_CDN}/upload/iblock/199/aglo90clm2j38bkmifjfp0e7rjyo2vz2/_-Fondo-05.jpg`, slug: 'vitrines' },
  { id: 3, name_ru: 'Грунт под покраску FILO-60', name_ka: 'საღებავის გრუნტი FILO-60',   image: `${UNION_CDN}/upload/iblock/925/b7i0920o5w98wvphham2qw6iaeb0j7tq/2-_-uniflex-3D-Step-V.jpg`, slug: 'filo-60' },
  { id: 4, name_ru: 'UNIFLEX-3D Step',             name_ka: 'UNIFLEX-3D Step',            image: `${UNION_CDN}/upload/iblock/a88/045rcj25j8co351kggpt5qqrnt8cy9h4/2-_-TONDA-03.jpg`, slug: 'uniflex' },
  { id: 5, name_ru: 'TONDA — радиусная кромка',    name_ka: 'TONDA — რადიუსული კიდე',     image: `${UNION_CDN}/upload/iblock/e6d/fegr5tlqyih0mp2wbun80n1799nkl6xc/LAGO_Modelica12_2.jpg`, slug: 'tonda' },
  { id: 6, name_ru: 'STRATUS-SLIM перегородки',    name_ka: 'STRATUS-SLIM ტიხრები',       image: `${UNION_CDN}/upload/iblock/64f/h96c4ap710omx3gsf7td1nebszmm6qmm/SLIM-Ritmo-01.jpg`, slug: 'stratus-slim' },
  { id: 7, name_ru: 'PIVOT 45 laccato',           name_ka: 'PIVOT 45 laccato',           image: `${UNION_CDN}/upload/iblock/fca/92r24oex5f868iw2os1x201wne6fqxff/2-_-PIVOT-45-laccato.jpg`, slug: 'pivot' },
  { id: 8, name_ru: 'WallStreet Slim',             name_ka: 'WallStreet Slim',           image: `${UNION_CDN}/upload/iblock/6f6/m62tm59lwkzgchoeeyvkec2kmao9k6yp/WallStreet-Slim-2.jpg`, slug: 'wallstreet' },
  { id: 9, name_ru: 'LAGO',                        name_ka: 'LAGO',                       image: `${UNION_CDN}/upload/iblock/be8/skpbo4kcob2tiyhnlhqhfj7j71qura0d/_-LAGO-03.jpg`, slug: 'lago' },
];

export function TrendsSection() {
  const { language, t } = useLanguage();

  const { data: products = [] } = useQuery({
    queryKey: ['trending-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

  const items: SliderItem[] = (products.length > 0 ? products : placeholderTrends).map((item: any) => ({
    id: item.id,
    href: `/union/${item.slug ? `product/${item.slug}` : `catalog`}`,
    image: 'images' in item && item.images?.[0]
      ? resolveProductImage(item.images[0], item.category_slug ?? null, item.slug ?? null)
      : item.image,
    title: language === 'ka' ? (item.name_ka || item.name_ru) : (item.name_ru || item.name_ka),
  }));

  return (
    <section className="union-section bg-white">
      <SliderSection title={t('trends')} items={items} />
    </section>
  );
}
