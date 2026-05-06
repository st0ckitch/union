import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hero slide modeled after union.ru's discount carousel.
 * `eyebrow` is the small line above the headline ("при покупке дверей и перегородок"),
 * `headline` is the giant centerpiece ("СКИДКА -15%"), `accent` is the colored token
 * inside the headline (e.g. "-15%"), `subhead` is "на всю мебель UNION!",
 * `dateline` is "до 31.12.2026", and `cta` is the yellow button text.
 */
interface Slide {
  id: number | string;
  image: string;
  eyebrow?: { ka: string; ru: string; en: string };
  headline: { ka: string; ru: string; en: string };
  /** Colored token inside the headline — rendered yellow */
  accent?: { ka: string; ru: string; en: string };
  subhead: { ka: string; ru: string; en: string };
  dateline?: { ka: string; ru: string; en: string };
  cta: { ka: string; ru: string; en: string };
  href: string;
}

const fallbackSlides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&q=85',
    eyebrow: {
      ka: 'კარების და ტიხრების ყიდვისას',
      ru: 'при покупке дверей и перегородок',
      en: 'when buying doors and partitions',
    },
    headline: {
      ka: 'ფასდაკლება',
      ru: 'СКИДКА',
      en: 'DISCOUNT',
    },
    accent: { ka: '-15%', ru: '-15%', en: '-15%' },
    subhead: {
      ka: 'მთელ UNION ავეჯზე!',
      ru: 'на всю мебель UNION!',
      en: 'on all UNION furniture!',
    },
    dateline: {
      ka: '31.12.2026-მდე',
      ru: 'до 31.12.2026',
      en: 'until 31.12.2026',
    },
    cta: { ka: 'მოასწარი ყიდვა', ru: 'УСПЕЙ КУПИТЬ', en: 'BUY NOW' },
    href: '/union/sale',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=85',
    eyebrow: {
      ka: 'საუკეთესო კარები 30 დღეში',
      ru: 'лучшие двери за 30 дней',
      en: 'best doors in 30 days',
    },
    headline: {
      ka: 'UNION 35',
      ru: 'UNION 35',
      en: 'UNION 35',
    },
    accent: { ka: 'წელი', ru: 'ЛЕТ', en: 'YEARS' },
    subhead: {
      ka: 'პრემიუმ იტალიური ხარისხი',
      ru: 'премиальное итальянское качество',
      en: 'premium Italian quality',
    },
    cta: { ka: 'კატალოგი', ru: 'СМОТРЕТЬ КАТАЛОГ', en: 'BROWSE CATALOG' },
    href: '/union/catalog',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1920&q=85',
    eyebrow: {
      ka: 'ფარული მონტაჟი, Shadow-gap ეფექტი',
      ru: 'скрытый монтаж, эффект Shadow-gap',
      en: 'hidden mount, Shadow-gap effect',
    },
    headline: {
      ka: 'ფარული',
      ru: 'СКРЫТЫЕ',
      en: 'HIDDEN',
    },
    accent: { ka: 'კარები', ru: 'ДВЕРИ', en: 'DOORS' },
    subhead: {
      ka: 'უხილავი კოლექცია 2026',
      ru: 'invisible коллекция 2026',
      en: 'invisible collection 2026',
    },
    cta: { ka: 'კოლექცია', ru: 'СМОТРЕТЬ КОЛЛЕКЦИЮ', en: 'VIEW COLLECTION' },
    href: '/union/catalog/swing-doors',
  },
];

export function UnionHeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();

  const { data: dbBanners = [] } = useQuery({
    queryKey: ['union-hero-banners'],
    queryFn: async () => {
      const { data, error } = await (supabase as any)
        .from('banners')
        .select('*')
        .eq('is_active', true)
        .eq('section', 'union_hero')
        .order('sort_order', { ascending: true });
      if (error) throw error;
      return (data ?? []) as any[];
    },
  });

  const slides: Slide[] = useMemo(() => {
    if (dbBanners && dbBanners.length > 0) {
      return dbBanners.map((b: any) => ({
        id: b.id,
        image: b.image_url,
        // Subtitle column doubles as the eyebrow line
        eyebrow: {
          ka: b.subtitle_ka ?? '',
          ru: b.subtitle_ru ?? b.subtitle_en ?? b.subtitle_ka ?? '',
          en: b.subtitle_en ?? b.subtitle_ka ?? '',
        },
        headline: {
          ka: b.title_ka ?? '',
          ru: b.title_ru ?? b.title_en ?? b.title_ka ?? '',
          en: b.title_en ?? b.title_ka ?? '',
        },
        subhead: {
          ka: '',
          ru: '',
          en: '',
        },
        cta: {
          ka: b.button_text_ka ?? 'დაწვრილებით',
          ru: b.button_text_ru ?? b.button_text_en ?? 'Подробнее',
          en: b.button_text_en ?? 'Learn more',
        },
        href: b.link_url ?? '/union/catalog',
      }));
    }
    return fallbackSlides;
  }, [dbBanners]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[Math.min(currentSlide, slides.length - 1)] ?? fallbackSlides[0];
  const lang = language === 'ru' || language === 'en' || language === 'ka' ? language : 'ka';

  return (
    <section className="relative overflow-hidden h-[480px] md:h-[560px] lg:h-[640px] bg-neutral-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          {/* Strong dark gradient anchored on the left so the white headline pops */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container relative h-full flex items-center">
        <motion.div
          key={`text-${slide.id}`}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-[640px] text-white"
        >
          {slide.eyebrow && (
            <p className="text-base md:text-lg lg:text-xl font-light mb-3 md:mb-4 text-white/95 leading-snug">
              {slide.eyebrow[lang]}
            </p>
          )}

          <h1 className="font-extrabold uppercase leading-[0.95] tracking-tight mb-3 md:mb-4">
            <span className="block text-[44px] md:text-[68px] lg:text-[88px]">
              {slide.headline[lang]}
              {slide.accent && (
                <span className="ml-3 text-[#fcd000]">{slide.accent[lang]}</span>
              )}
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl font-light mb-2 text-white/95">
            {slide.subhead[lang]}
          </p>

          {slide.dateline && (
            <p className="text-base md:text-lg lg:text-xl font-light mb-6 md:mb-8 text-white/90">
              {slide.dateline[lang]}
            </p>
          )}

          <Link
            to={slide.href}
            className="inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-3.5 bg-[#fcd000] hover:bg-[#ffd900] text-black font-semibold text-sm md:text-[15px] uppercase tracking-wider transition-colors"
          >
            {slide.cta[lang]}
          </Link>
        </motion.div>
      </div>

      {/* Dot indicators — bottom right (matches union.ru) */}
      {slides.length > 1 && (
        <div className="absolute bottom-5 md:bottom-6 right-6 md:right-10 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={
                'rounded-full transition-all ' +
                (idx === currentSlide
                  ? 'w-2.5 h-2.5 bg-white'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70')
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}
