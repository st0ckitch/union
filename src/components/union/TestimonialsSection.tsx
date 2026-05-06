import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { SliderSection, SliderItem } from './_shared/SliderSection';

const UNION_CDN = 'https://www.union.ru';

const placeholderStars = [
  { id: 1, name_ru: 'Двери UNION в офисе Ксении Собчак',     name_ka: 'UNION კარები ქსენიას ოფისში',                   image: `${UNION_CDN}/upload/iblock/3b3/o5y9439m76ztoyxjdjbzfzm7ci7gnlqr/Sobchak.png` },
  { id: 2, name_ru: 'Интервью с Борисом Уборевичем-Боровским', name_ka: 'ინტერვიუ ბორის უბორევიჩთან',                  image: `${UNION_CDN}/upload/iblock/881/nht3k694q7g3kbzds0fcqzfakvy9xxwu/YouTube-cover_Uborevich-2.jpg` },
  { id: 3, name_ru: 'Интервью с Дианой Балашовой',             name_ka: 'ინტერვიუ დიანა ბალაშოვასთან',                 image: `${UNION_CDN}/upload/iblock/83a/cjq4fskxvsxp0dvu47uu7x7ytwy6rm95/YouTube-cover_19-_1_.jpg` },
  { id: 4, name_ru: 'Интервью с Натальей Преображенской',      name_ka: 'ინტერვიუ ნატალია პრეობრაჟენსკაიასთან',         image: `${UNION_CDN}/upload/iblock/fd1/bu0ft6zxjo8tkvn3ma01d8yssdw62ag1/_.png` },
  { id: 5, name_ru: 'Видеообзор',                              name_ka: 'ვიდეო მიმოხილვა',                              image: `${UNION_CDN}/upload/iblock/0fa/kscnwsscfscyx60l3wcb9hzzhokr0ycj/YouTube-cover_Rubleva-2.jpg` },
  { id: 6, name_ru: 'Шоурум UNION',                             name_ka: 'UNION-ის შოურუმი',                              image: `${UNION_CDN}/upload/iblock/331/w3nnohx7w1kmdhh5rpe7gph94b0qwjmc/YouTube-cover_OK-2.jpg` },
];

export function TestimonialsSection() {
  const { language, t } = useLanguage();

  const { data: testimonials = [] } = useQuery({
    queryKey: ['featured-testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .limit(8);
      if (error) throw error;
      return data;
    },
  });

  const items: SliderItem[] = (testimonials.length > 0 ? testimonials : placeholderStars).map((item: any) => ({
    id: item.id,
    href: '#',
    image: 'avatar_url' in item && item.avatar_url ? item.avatar_url : item.image,
    title: 'name_ru' in item
      ? (language === 'ka' ? item.name_ka : item.name_ru)
      : item.author_name || '',
  }));

  return (
    <section className="union-section bg-white">
      <SliderSection
        title={t('starsAboutUs')}
        items={items}
        titleAsParagraph
        asLinks={false}
      />
    </section>
  );
}
