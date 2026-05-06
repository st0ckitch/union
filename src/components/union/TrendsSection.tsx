import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Youtube, Sparkles, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { resolveProductImage } from '@/lib/unionImages';
import { SectionHeader } from './_shared/SectionHeader';

const placeholderTrends = [
  { id: 1, name_ru: 'Гардеробная LAGUNA',           name_ka: 'გარდერობი LAGUNA',           image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80', slug: 'wardrobe-laguna' },
  { id: 2, name_ru: 'Мебель — комоды, витрины',     name_ka: 'ავეჯი — კომოდები, ვიტრინები', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', slug: 'furniture-vitrines' },
  { id: 3, name_ru: 'Грунт под покраску FILO-60',   name_ka: 'გრუნტი FILO-60',              image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80', slug: 'filo-60' },
  { id: 4, name_ru: 'UNIFLEX-3D Step',              name_ka: 'UNIFLEX-3D Step',             image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80', slug: 'uniflex-3d-step' },
  { id: 5, name_ru: 'TONDA — радиусная кромка',     name_ka: 'TONDA — რადიუსული კიდე',     image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80', slug: 'tonda' },
  { id: 6, name_ru: 'STRATUS-SLIM — перегородки',   name_ka: 'STRATUS-SLIM — ტიხრები',     image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80', slug: 'stratus-slim' },
  { id: 7, name_ru: 'ALTO — модульный гардероб',    name_ka: 'ALTO — მოდულური გარდერობი', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80', slug: 'alto' },
  { id: 8, name_ru: 'Стеновые панели WOOD',         name_ka: 'კედლის პანელები WOOD',       image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', slug: 'wood-panels' },
  { id: 9, name_ru: 'LINEA — коллекция',            name_ka: 'LINEA — კოლექცია',           image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80', slug: 'linea' },
  { id: 10, name_ru: 'Скрытые двери INVISIBLE',     name_ka: 'ფარული კარები INVISIBLE',    image: 'https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=600&q=80', slug: 'invisible' },
];

export function TrendsSection() {
  const { language, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const items = products.length > 0 ? products : placeholderTrends;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.66;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -amount : amount,
        behavior: 'smooth',
      });
    }
  };

  const quickLinks = [
    { Icon: Camera,   title: 'portfolio',    description: 'portfolioDesc',    href: '/union/about#portfolio' },
    { Icon: Youtube,  title: 'youtube',      description: 'youtubeDesc',      href: '#' },
    { Icon: Sparkles, title: 'newArrivals',  description: 'newArrivalsDesc',  href: '/union/catalog?filter=new' },
  ];

  return (
    <section className="union-section bg-white">
      <div className="union-container">
        <SectionHeader
          title={t('trends')}
          showArrows
          onPrev={() => scroll('left')}
          onNext={() => scroll('right')}
        />

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-snap-x pb-2 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="flex-shrink-0 w-[260px] md:w-[340px]"
            >
              <Link to={`/union/catalog/${(item as any).slug || ''}`} className="block group">
                <div className="aspect-[4/3] bg-surface overflow-hidden relative">
                  {(() => {
                    const raw =
                      ('images' in item && (item as any).images?.[0]) ||
                      ('image' in item ? (item as any).image : null);
                    const src = resolveProductImage(
                      raw,
                      (item as any).category_slug ?? null,
                      (item as any).slug ?? null,
                    );
                    return (
                      <img
                        src={src}
                        referrerPolicy="no-referrer"
                        alt={language === 'ka' ? (item as any).name_ka : (item as any).name_ru}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    );
                  })()}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/12 transition-colors" />
                </div>
                <h3 className="mt-3 text-[15px] font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                  {language === 'ka' ? (item as any).name_ka : (item as any).name_ru}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick links row */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border bg-surface mt-12">
          {quickLinks.map((link, idx) => (
            <Link
              key={link.title}
              to={link.href}
              className={`group flex items-center gap-5 p-6 md:p-8 transition-colors hover:bg-surface-muted ${
                idx < 2 ? 'md:border-r border-border border-b md:border-b-0' : ''
              }`}
            >
              <link.Icon className="h-10 w-10 text-primary shrink-0" strokeWidth={1.25} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-[16px] font-semibold text-primary">{t(link.title)}</h3>
                  <ChevronRight className="h-3.5 w-3.5 text-primary opacity-60 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
                </div>
                <p className="text-[13px] text-muted-foreground mt-1 leading-snug">{t(link.description)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
