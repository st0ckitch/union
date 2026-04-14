import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const placeholderTestimonials = [
  {
    id: 1,
    name_ru: 'ДВЕРИ UNION\nВ ОФИСЕ\nКСЕНИИ',
    name_ka: 'UNION კარები\nქსენიას\nოფისში',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    badge: 'NEW PROJECT',
  },
  {
    id: 2,
    name_ru: 'БОРИС\nУБОРЕВИЧ\nИНТЕРВЬЮ',
    name_ka: 'ბორის\nუბორევიჩ\nინტერვიუ',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    badge: 'INTERVIEW',
  },
  {
    id: 3,
    name_ru: 'ДИАНА\nБАЛАШОВА\nКОНЦЕПЦИЯ',
    name_ka: 'დიანა\nბალაშოვა\nკონცეფცია',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    badge: 'CONCEPT',
  },
  {
    id: 4,
    name_ru: 'НАТАЛЬЯ\nПРЕОБРАЖЕНСКАЯ\nСТУДИЯ',
    name_ka: 'ნატალია\nპრეობრაჟენსკაია\nსტუდია',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    badge: 'STUDIO',
  },
  {
    id: 5,
    name_ru: 'АЛЕКСАНДР\nБРОДСКИЙ\nПРОЕКТ',
    name_ka: 'ალექსანდრე\nბროდსკი\nპროექტი',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    badge: 'PROJECT',
  },
  {
    id: 6,
    name_ru: 'МАРИЯ\nДУЛИНА\nВИДЕО',
    name_ka: 'მარია\nდულინა\nვიდეო',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    badge: 'VIDEO',
  },
  {
    id: 7,
    name_ru: 'УНИКАЛЬНЫЙ\nИНТЕРЬЕР\nАРХИТЕКТОР',
    name_ka: 'უნიკალური\nინტერიერი\nარქიტექტორი',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    badge: 'ARCHITECT',
  },
  {
    id: 8,
    name_ru: 'ШОУРУМ\nUNION\nНОВОСТИ',
    name_ka: 'შოურუმი\nUNION\nსიახლეები',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    badge: 'NEWS',
  },
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
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  const displayTestimonials = testimonials.length > 0 ? testimonials : placeholderTestimonials;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container">
        {/* Header with arrows */}
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-light"
          >
            {t('starsAboutUs')}
          </motion.h2>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1} />
            </button>
          </div>
        </div>

        {/* Testimonials carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] md:w-[400px] group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                {/* Background image */}
                <img
                  src={'avatar_url' in testimonial && testimonial.avatar_url 
                    ? testimonial.avatar_url 
                    : 'image' in testimonial 
                      ? (testimonial as any).image 
                      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'}
                  alt=""
                  className="w-full h-full object-cover"
                />
                
                {/* Red accent shape */}
                <div className="absolute bottom-0 left-0 w-32 h-32">
                  <div className="absolute bottom-0 left-0 w-full h-full bg-black rounded-tr-full" />
                </div>
                
                {/* Badge */}
                {'badge' in testimonial && (
                  <div className="absolute top-4 left-0 bg-transparent">
                    <span className="text-[10px] text-white/80 tracking-widest uppercase writing-mode-vertical transform -rotate-180" 
                      style={{ writingMode: 'vertical-rl' }}>
                      {(testimonial as any).badge}
                    </span>
                  </div>
                )}
                
                {/* UNION logo watermark */}
                <div className="absolute top-4 right-4 text-white/80 text-xs">
                  <span className="font-bold">UNION</span>
                  <span className="text-[8px] ml-1">1990</span>
                </div>
                
                {/* Play button for video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-8 w-8 text-white ml-1" fill="white" />
                  </div>
                </div>

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-bold text-lg leading-tight whitespace-pre-line">
                    {'name_ru' in testimonial 
                      ? (language === 'ka' ? (testimonial as any).name_ka : (testimonial as any).name_ru)
                      : 'author_name' in testimonial 
                        ? testimonial.author_name 
                        : ''}
                  </p>
                </div>

                {/* Scroll up button */}
                <button className="absolute bottom-4 left-4 w-10 h-10 bg-[#333] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <ChevronUp className="h-5 w-5 text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
