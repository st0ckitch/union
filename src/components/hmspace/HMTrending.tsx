import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const items = [
  {
    img: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&q=80',
    titleKa: 'სახლის ინსპირაცია',
    titleEn: 'HOME INSPIRATION',
    titleRu: 'ВДОХНОВЕНИЕ ДЛЯ ДОМА',
    href: '/union/blog',
  },
  {
    img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    titleKa: 'ANTONIO LUPI',
    titleEn: 'ANTONIO LUPI',
    titleRu: 'ANTONIO LUPI',
    href: '#',
  },
  {
    img: 'https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=1200&q=80',
    titleKa: 'ფასდაკლება',
    titleEn: 'SALE',
    titleRu: 'РАСПРОДАЖА',
    href: '/union/sale',
  },
];

export function HMTrending() {
  const { t, language } = useLanguage();
  const pick = (i: (typeof items)[number]) =>
    language === 'ka' ? i.titleKa : language === 'ru' ? i.titleRu : i.titleEn;

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif font-light text-neutral-900 mb-10">
          {t('currentlyTrending')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <Link key={idx} to={item.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-200 mb-4">
                <img
                  src={item.img}
                  alt={pick(item)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-lg font-serif text-neutral-900 mb-1">{pick(item)}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-neutral-700 group-hover:text-black">
                {t('viewMore')} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
