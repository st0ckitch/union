import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK = [
  { id: 'f1', title_ka: 'პრემიუმ კარები',      title_en: 'Premium Doors',      subtitle_ka: 'იტალიური ხარისხი თქვენს სახლში', subtitle_en: 'Italian Quality for Your Home', button_text_ka: 'კატალოგის ნახვა', button_text_en: 'View Catalog', image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80', link_url: '/union/catalog/doors' },
  { id: 'f2', title_ka: 'თანამედროვე ავეჯი',    title_en: 'Modern Furniture',   subtitle_ka: 'დიზაინი და ფუნქციონალობა',         subtitle_en: 'Design and Functionality',       button_text_ka: 'აღმოაჩინე',       button_text_en: 'Discover',     image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80', link_url: '/union/catalog/furniture' },
  { id: 'f3', title_ka: 'სეზონური ფასდაკლება',  title_en: 'Seasonal Sale',      subtitle_ka: '50%-მდე ფასდაკლება',              subtitle_en: 'Up to 50% Off',                  button_text_ka: 'შეთავაზებები',   button_text_en: 'View Offers',  image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80', link_url: '/union/sale' },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();

  const { data: banners } = useQuery({
    queryKey: ['home-hero-banners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('banners').select('*').eq('is_active', true).eq('section', 'main_hero').order('sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const slides = (banners && banners.length > 0) ? banners : FALLBACK;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const slide = slides[Math.min(currentSlide, slides.length - 1)];
  const pick = (ka?: string | null, en?: string | null) => language === 'en' ? (en || ka || '') : (ka || en || '');

  return (
    <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img src={slide.image_url} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-xl text-white"
              >
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">{pick(slide.title_ka, slide.title_en)}</h2>
                {(slide.subtitle_ka || slide.subtitle_en) && (
                  <p className="text-lg md:text-xl mb-6 text-white/90">{pick(slide.subtitle_ka, slide.subtitle_en)}</p>
                )}
                {slide.link_url && (slide.button_text_ka || slide.button_text_en) && (
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <Link to={slide.link_url}>{pick(slide.button_text_ka, slide.button_text_en)}</Link>
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${idx === currentSlide ? 'bg-accent' : 'bg-white/50'}`}
              />
            ))}
          </div>
          <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}
    </section>
  );
}
