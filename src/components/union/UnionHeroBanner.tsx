import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface Slide {
  id: number | string;
  image: string;
  headline: { ka: string; ru: string; en: string };
  subhead: { ka: string; ru: string; en: string };
  tagline?: { ka: string; ru: string; en: string };
  cta: { ka: string; ru: string; en: string };
  href: string;
  theme?: 'light' | 'dark';
  align?: 'left' | 'right';
}

const fallbackSlides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&q=80',
    headline: {
      ka: 'საგაზაფხულო ფასდაკლება 25%-მდე',
      ru: 'ВЕСЕННИЕ СКИДКИ до 25%',
      en: 'SPRING SALE up to 25%',
    },
    subhead: {
      ka: 'მთელ კოლექციაზე',
      ru: 'НА ВСЁ!',
      en: 'ON EVERYTHING!',
    },
    tagline: {
      ka: 'კარები და ავეჯი',
      ru: 'Двери и мебель',
      en: 'Doors & Furniture',
    },
    cta: { ka: 'დაწვრილებით', ru: 'ПОДРОБНЕЕ', en: 'LEARN MORE' },
    href: '/union/sale',
    theme: 'light',
    align: 'left',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80',
    headline: {
      ka: '-15% ავეჯზე',
      ru: '-15% на мебель',
      en: '-15% on furniture',
    },
    subhead: {
      ka: 'კარების შეძენისას',
      ru: 'при покупке дверей',
      en: 'when buying doors',
    },
    cta: { ka: 'შეკვეთა', ru: 'ЗАКАЗАТЬ', en: 'ORDER NOW' },
    href: '/union/catalog',
    theme: 'light',
    align: 'left',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1920&q=80',
    headline: {
      ka: 'UNION 35 წელი',
      ru: 'UNION 35 ЛЕТ',
      en: 'UNION 35 YEARS',
    },
    subhead: {
      ka: 'საუკეთესო დიზაინის იტალიური ტრადიციით',
      ru: 'Итальянские традиции премиального дизайна',
      en: 'Italian traditions of premium design',
    },
    cta: { ka: 'ისტორია', ru: 'ИСТОРИЯ', en: 'OUR STORY' },
    href: '/union/about',
    theme: 'dark',
    align: 'right',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80',
    headline: {
      ka: 'ინდივიდუალური ავეჯი',
      ru: 'Мебель на заказ',
      en: 'Custom furniture',
    },
    subhead: {
      ka: 'ნებისმიერი ზომის, ნებისმიერი ფორმის',
      ru: 'Любой размер, любая форма',
      en: 'Any size, any shape',
    },
    cta: { ka: 'კონფიგურატორი', ru: 'КОНФИГУРАТОР', en: 'CONFIGURATOR' },
    href: '/union/catalog',
    theme: 'light',
    align: 'left',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1920&q=80',
    headline: {
      ka: 'ფარული კარები',
      ru: 'Скрытые двери',
      en: 'Hidden doors',
    },
    subhead: {
      ka: 'Shadow-gap ეფექტით',
      ru: 'с эффектом Shadow-gap',
      en: 'with Shadow-gap effect',
    },
    cta: { ka: 'კოლექცია', ru: 'КОЛЛЕКЦИЯ', en: 'COLLECTION' },
    href: '/union/catalog/swing-doors',
    theme: 'dark',
    align: 'right',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1920&q=80',
    headline: {
      ka: '30 დღე',
      ru: '30 дней',
      en: '30 days',
    },
    subhead: {
      ka: 'ინდივიდუალური კარების დამზადება',
      ru: 'на изготовление дверей под заказ',
      en: 'to craft doors made-to-order',
    },
    cta: { ka: 'შეკვეთა', ru: 'ЗАКАЗАТЬ', en: 'ORDER' },
    href: '/union/catalog/swing-doors',
    theme: 'light',
    align: 'left',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&q=80',
    headline: {
      ka: 'SLIM ალუმინის კარები',
      ru: 'SLIM алюминиевые двери',
      en: 'SLIM aluminum doors',
    },
    subhead: {
      ka: 'მინიმალისტური კონტური, მაქსიმალური შუქი',
      ru: 'Минималистичный контур, максимум света',
      en: 'Minimalist frame, maximum light',
    },
    cta: { ka: 'გაიცანი', ru: 'УЗНАТЬ БОЛЬШЕ', en: 'DISCOVER' },
    href: '/union/catalog/sliding-doors',
    theme: 'dark',
    align: 'right',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    headline: {
      ka: 'ALTO მოდულური გარდერობი',
      ru: 'ALTO модульный гардероб',
      en: 'ALTO modular wardrobe',
    },
    subhead: {
      ka: 'ახალი კოლექცია 2026',
      ru: 'Новая коллекция 2026',
      en: 'New collection 2026',
    },
    cta: { ka: 'ნახე ახალი', ru: 'СМОТРЕТЬ', en: 'VIEW COLLECTION' },
    href: '/union/catalog/wardrobes',
    theme: 'light',
    align: 'left',
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
        headline: {
          ka: b.title_ka ?? '',
          ru: b.title_en ?? b.title_ka ?? '',
          en: b.title_en ?? b.title_ka ?? '',
        },
        subhead: {
          ka: b.subtitle_ka ?? '',
          ru: b.subtitle_en ?? b.subtitle_ka ?? '',
          en: b.subtitle_en ?? b.subtitle_ka ?? '',
        },
        cta: {
          ka: b.button_text_ka ?? 'დაწვრილებით',
          ru: b.button_text_en ?? 'Подробнее',
          en: b.button_text_en ?? 'Learn more',
        },
        href: b.link_url ?? '/union/catalog',
        theme: 'light',
        align: 'left',
      }));
    }
    return fallbackSlides;
  }, [dbBanners]);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[Math.min(currentSlide, slides.length - 1)] ?? fallbackSlides[0];
  const isDark = slide.theme === 'dark';
  const isRight = slide.align === 'right';
  const lang = language === 'ru' || language === 'en' || language === 'ka' ? language : 'ka';

  const goPrev = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  const goNext = () => setCurrentSlide((p) => (p + 1) % slides.length);

  return (
    <section className="relative bg-neutral-100 overflow-hidden h-[440px] md:h-[560px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
          <div
            className={`absolute inset-0 ${
              isRight
                ? 'bg-gradient-to-l from-black/60 via-black/20 to-transparent'
                : isDark
                ? 'bg-gradient-to-r from-black/70 via-black/30 to-transparent'
                : 'bg-gradient-to-r from-white/90 via-white/50 to-transparent'
            }`}
          />
        </motion.div>
      </AnimatePresence>

      <div className="container relative h-full flex items-center">
        <motion.div
          key={`text-${slide.id}`}
          initial={{ opacity: 0, x: isRight ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`max-w-xl ${isRight ? 'ml-auto text-right' : ''} ${
            isDark ? 'text-white' : 'text-foreground'
          }`}
        >
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 leading-[1.1] uppercase tracking-tight">
            {slide.headline[lang]}
          </h1>
          <p className={`text-lg md:text-xl lg:text-2xl font-light italic mb-5 ${isDark ? 'text-white/80' : 'text-neutral-700'}`}>
            {slide.subhead[lang]}
          </p>
          {slide.tagline && (
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] mb-5">
              {slide.tagline[lang]}
            </p>
          )}
          <Button
            asChild
            size="lg"
            className={`font-medium tracking-wider px-7 rounded-none h-11 text-xs md:text-sm ${
              isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
            }`}
          >
            <Link to={slide.href}>{slide.cta[lang]}</Link>
          </Button>
        </motion.div>
      </div>

      {/* Arrows */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center shadow transition"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentSlide ? 'w-8 bg-black' : 'w-3 bg-black/30 hover:bg-black/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
