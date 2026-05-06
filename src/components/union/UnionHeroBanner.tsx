import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Slide {
  id: number | string;
  image: string;
  eyebrow: { ka: string; ru: string; en: string };
  headline: { ka: string; ru: string; en: string };
  subhead: { ka: string; ru: string; en: string };
  date?: { ka: string; ru: string; en: string };
  cta: { ka: string; ru: string; en: string };
  href: string;
}

const fallbackSlides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&q=80',
    eyebrow: {
      ka: 'კარების და ტიხრების შეძენისას',
      ru: 'при покупке дверей и перегородок',
      en: 'when buying doors and partitions',
    },
    headline: { ka: 'ფასდაკლება -15%', ru: 'СКИДКА -15%', en: 'SALE -15%' },
    subhead: {
      ka: 'მთელი UNION ავეჯი!',
      ru: 'на всю мебель UNION!',
      en: 'on all UNION furniture!',
    },
    date: { ka: 'ვადა: 31.12.2026', ru: 'до 31.12.2026', en: 'until 31.12.2026' },
    cta: { ka: 'მოასწარი ყიდვა', ru: 'УСПЕЙ КУПИТЬ', en: 'BUY NOW' },
    href: '/union/sale',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1920&q=80',
    eyebrow: {
      ka: 'კოლექცია 2026',
      ru: 'коллекция 2026',
      en: 'collection 2026',
    },
    headline: { ka: 'ფარული კარები', ru: 'СКРЫТЫЕ ДВЕРИ', en: 'HIDDEN DOORS' },
    subhead: {
      ka: 'Shadow-gap ეფექტით',
      ru: 'с эффектом Shadow-gap',
      en: 'with Shadow-gap effect',
    },
    cta: { ka: 'კოლექცია', ru: 'КОЛЛЕКЦИЯ', en: 'COLLECTION' },
    href: '/union/catalog/swing-doors',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1920&q=80',
    eyebrow: {
      ka: 'UNION 35 წელი',
      ru: 'UNION 35 лет на рынке',
      en: 'UNION 35 years',
    },
    headline: { ka: 'ჩვენი ისტორია', ru: 'НАША ИСТОРИЯ', en: 'OUR STORY' },
    subhead: {
      ka: 'იტალიური ტრადიციით',
      ru: 'Итальянские традиции',
      en: 'Italian traditions',
    },
    cta: { ka: 'ისტორია', ru: 'ИСТОРИЯ', en: 'OUR STORY' },
    href: '/union/about',
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
        eyebrow: {
          ka: b.subtitle_ka ?? '',
          ru: b.subtitle_en ?? b.subtitle_ka ?? '',
          en: b.subtitle_en ?? b.subtitle_ka ?? '',
        },
        headline: {
          ka: b.title_ka ?? '',
          ru: b.title_en ?? b.title_ka ?? '',
          en: b.title_en ?? b.title_ka ?? '',
        },
        subhead: { ka: '', ru: '', en: '' },
        cta: {
          ka: b.button_text_ka ?? 'დაწვრილებით',
          ru: b.button_text_en ?? 'Подробнее',
          en: b.button_text_en ?? 'Learn more',
        },
        href: b.link_url ?? '/union/catalog',
      }));
    }
    return fallbackSlides;
  }, [dbBanners]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[Math.min(currentSlide, slides.length - 1)] ?? fallbackSlides[0];
  const lang = language === 'ru' || language === 'en' || language === 'ka' ? language : 'ka';

  const goPrev = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  const goNext = () => setCurrentSlide((p) => (p + 1) % slides.length);

  return (
    <section className="bg-white">
      <div className="union-container pt-4">
        <div className="grid grid-cols-1 md:grid-cols-[36%_64%] min-h-[300px] md:h-[420px]">
          {/* Left red panel */}
          <div className="bg-accent-sale text-white p-8 md:p-10 lg:p-12 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`txt-${slide.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-[12px] md:text-[13px] mb-2 leading-relaxed text-white/90">
                  {slide.eyebrow[lang]}
                </p>
                <h1 className="font-display text-[44px] md:text-[56px] lg:text-[64px] font-bold leading-[0.95] tracking-tight mb-2">
                  {slide.headline[lang]}
                </h1>
                {slide.subhead[lang] && (
                  <p className="text-[16px] md:text-[18px] font-medium leading-tight mb-4">
                    {slide.subhead[lang]}
                  </p>
                )}
                {slide.date && (
                  <p className="text-[12px] md:text-[13px] font-bold mb-5 text-black/80">
                    {slide.date[lang]}
                  </p>
                )}
                <Link
                  to={slide.href}
                  className="inline-flex items-center justify-center bg-white text-accent-sale px-7 h-11 text-[12px] font-bold uppercase tracking-[0.06em] hover:bg-accent-sale-hover hover:text-white border border-white transition-colors"
                >
                  {slide.cta[lang]}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right image pane */}
          <div className="relative bg-surface overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={slide.id}
                src={slide.image}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {slides.length > 1 && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <button
                  onClick={goPrev}
                  aria-label="Previous slide"
                  className="w-9 h-9 bg-white/85 hover:bg-white flex items-center justify-center text-foreground transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next slide"
                  className="w-9 h-9 bg-white/85 hover:bg-white flex items-center justify-center text-foreground transition-colors"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
                </button>
              </div>
            )}
            {slides.length > 1 && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-1 transition-all ${
                      idx === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
