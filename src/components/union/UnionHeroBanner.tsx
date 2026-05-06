import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';

interface Slide {
  id: number | string;
  image: string;
  eyebrow?: { ka: string; ru: string; en: string };
  title: { ka: string; ru: string; en: string };
  subtitle?: { ka: string; ru: string; en: string };
  text?: { ka: string; ru: string; en: string };
  cta: { ka: string; ru: string; en: string };
  href: string;
  /** sale slides have a red ribbon */
  isSale?: boolean;
}

const fallbackSlides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=2400&q=85',
    eyebrow: {
      ka: 'კარების და ტიხრების შეძენისას',
      ru: 'при покупке дверей и перегородок',
      en: 'when buying doors and partitions',
    },
    title: { ka: 'ფასდაკლება -15%', ru: 'СКИДКА -15%', en: 'SALE -15%' },
    subtitle: {
      ka: 'მთელ UNION ავეჯზე!',
      ru: 'на всю мебель UNION!',
      en: 'on all UNION furniture!',
    },
    text: { ka: 'ვადა: 31.12.2026', ru: 'до 31.12.2026', en: 'until 31.12.2026' },
    cta: { ka: 'მოასწარი ყიდვა', ru: 'УСПЕЙ КУПИТЬ', en: 'BUY NOW' },
    href: '/union/sale',
    isSale: true,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=2400&q=85',
    eyebrow: {
      ka: 'UNION —',
      ru: 'UNION —',
      en: 'UNION —',
    },
    title: { ka: 'ბაზრის აღიარებული ლიდერი', ru: 'признанный лидер рынка', en: 'recognized market leader' },
    text: {
      ka: '› იტალიური დიზაინი\n› თანამედროვე ტექნოლოგიები\n› უნაკლო ხარისხი',
      ru: '› Итальянский дизайн\n› Современные технологии\n› Безупречное качество',
      en: '› Italian design\n› Modern technology\n› Flawless quality',
    },
    cta: { ka: 'დაწვრილებით', ru: 'ПОДРОБНЕЕ', en: 'LEARN MORE' },
    href: '/union/about',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=2400&q=85',
    title: {
      ka: 'ინდივიდუალური ზომის ავეჯი',
      ru: 'Мебель по индивидуальным размерам',
      en: 'Custom-sized furniture',
    },
    text: {
      ka: 'თქვენი იდეები — ჩვენი ზუსტი განხორციელება',
      ru: 'Ваши смелые идеи — наше точное воплощение!',
      en: 'Your bold ideas — our precise execution!',
    },
    cta: { ka: 'შეკვეთა', ru: 'ЗАКАЗАТЬ', en: 'ORDER' },
    href: '/union/catalog',
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
        eyebrow: { ka: b.subtitle_ka ?? '', ru: b.subtitle_en ?? b.subtitle_ka ?? '', en: b.subtitle_en ?? b.subtitle_ka ?? '' },
        title: { ka: b.title_ka ?? '', ru: b.title_en ?? b.title_ka ?? '', en: b.title_en ?? b.title_ka ?? '' },
        cta: { ka: b.button_text_ka ?? 'დაწვრილებით', ru: b.button_text_en ?? 'ПОДРОБНЕЕ', en: b.button_text_en ?? 'MORE' },
        href: b.link_url ?? '/union/catalog',
      }));
    }
    return fallbackSlides;
  }, [dbBanners]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [slides.length]);

  const slide = slides[Math.min(currentSlide, slides.length - 1)] ?? fallbackSlides[0];
  const lang = (language === 'ru' || language === 'en' || language === 'ka' ? language : 'ka') as 'ka' | 'ru' | 'en';
  const lines = (slide.text?.[lang] || '').split('\n').filter(Boolean);

  return (
    <section className="relative bg-black overflow-hidden">
      <div className="relative h-[420px] md:h-[520px] lg:h-[583px] w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={`bg-${slide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
            {/* Gradient overlay to keep text legible */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="relative h-full union-container flex items-center text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${slide.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              {slide.eyebrow?.[lang] && (
                <p className="text-[18px] md:text-[22px] font-light leading-snug mb-3 text-white/90">
                  {slide.eyebrow[lang]}
                </p>
              )}

              <h2 className={cn(
                'leading-[0.95] tracking-[0.05em] text-white',
                'text-[44px] md:text-[56px] lg:text-[64px]',
                'font-normal'
              )}>
                {slide.title[lang]}
              </h2>

              {slide.subtitle?.[lang] && (
                <p className="mt-3 text-[20px] md:text-[26px] font-light leading-snug text-white">
                  {slide.subtitle[lang]}
                </p>
              )}

              {lines.length > 0 && (
                <div className="mt-6 text-[16px] md:text-[18px] font-light leading-[1.7] text-white/90 whitespace-pre-line">
                  {slide.text![lang]}
                </div>
              )}

              <Link
                to={slide.href}
                className="union-btn-outline mt-8 text-white"
              >
                <span>{slide.cta[lang]}</span>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={cn(
                  'h-1 transition-all',
                  idx === currentSlide ? 'w-10 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
