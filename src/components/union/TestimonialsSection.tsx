import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionHeader } from './_shared/SectionHeader';

const placeholderTestimonials = [
  { id: 1, name_ru: 'Двери UNION в офисе Ксении', name_ka: 'UNION კარები ქსენიას ოფისში', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80', badge: 'NEW PROJECT' },
  { id: 2, name_ru: 'Борис Уборевич — интервью',  name_ka: 'ბორის უბორევიჩ — ინტერვიუ',  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80', badge: 'INTERVIEW' },
  { id: 3, name_ru: 'Диана Балашова — концепция', name_ka: 'დიანა ბალაშოვა — კონცეფცია', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80', badge: 'CONCEPT' },
  { id: 4, name_ru: 'Наталья Преображенская',     name_ka: 'ნატალია პრეობრაჟენსკაია',     image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80', badge: 'STUDIO' },
  { id: 5, name_ru: 'Александр Бродский',          name_ka: 'ალექსანდრე ბროდსკი',          image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80', badge: 'PROJECT' },
  { id: 6, name_ru: 'Мария Дулина — видео',        name_ka: 'მარია დულინა — ვიდეო',         image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80', badge: 'VIDEO' },
];

export function TestimonialsSection() {
  const { language, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const items = testimonials.length > 0 ? testimonials : placeholderTestimonials;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.66;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="union-section bg-white">
      <div className="union-container">
        <SectionHeader
          title={t('starsAboutUs')}
          showArrows
          onPrev={() => scroll('left')}
          onNext={() => scroll('right')}
        />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((testimonial, index) => {
            const name = 'name_ru' in testimonial
              ? (language === 'ka' ? (testimonial as any).name_ka : (testimonial as any).name_ru)
              : 'author_name' in testimonial
                ? (testimonial as any).author_name
                : '';
            const img = 'avatar_url' in testimonial && (testimonial as any).avatar_url
              ? (testimonial as any).avatar_url
              : 'image' in testimonial
                ? (testimonial as any).image
                : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80';
            const badge = 'badge' in testimonial ? (testimonial as any).badge : null;

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-[260px] md:w-[320px] group cursor-pointer"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-surface">
                  <img
                    src={img}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {badge && (
                    <div
                      className="absolute top-4 left-0 text-[10px] uppercase font-semibold tracking-[0.2em] text-white/80 px-3"
                      style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    >
                      {badge}
                    </div>
                  )}

                  <div className="absolute top-4 right-4 text-white/90 text-[10px] font-bold uppercase tracking-wider">
                    UNION 1990
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-white/40">
                      <Play className="h-5 w-5 text-white ml-0.5" fill="white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-white text-[14px] md:text-[15px] font-bold uppercase leading-tight tracking-[0.02em]">
                      {name}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
