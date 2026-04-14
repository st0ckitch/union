import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { resolveProductImage } from '@/lib/unionImages';

const placeholderTrends = [
  {
    id: 1,
    name_ru: 'Гардеробная LAGUNA',
    name_ka: 'გარდერობი LAGUNA',
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80',
    slug: 'wardrobe-laguna',
  },
  {
    id: 2,
    name_ru: 'Мебель\nКомоды, витрины',
    name_ka: 'ავეჯი\nკომოდები, ვიტრინები',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
    slug: 'furniture-vitrines',
  },
  {
    id: 3,
    name_ru: 'Грунт под покраску\nFILO-60',
    name_ka: 'საღებავის გრუნტი\nFILO-60',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
    slug: 'filo-60',
  },
  {
    id: 4,
    name_ru: 'UNIFLEX-3D Step',
    name_ka: 'UNIFLEX-3D Step',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    slug: 'uniflex-3d-step',
  },
  {
    id: 5,
    name_ru: 'TONDA\nРадиусная кромка',
    name_ka: 'TONDA\nრადიუსული კიდე',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80',
    slug: 'tonda',
  },
  {
    id: 6,
    name_ru: 'STRATUS-SLIM\nПерегородки',
    name_ka: 'STRATUS-SLIM\nტიხრები',
    image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80',
    slug: 'stratus-slim',
  },
  {
    id: 7,
    name_ru: 'ALTO\nМодульный гардероб',
    name_ka: 'ALTO\nმოდულური გარდერობი',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    slug: 'alto',
  },
  {
    id: 8,
    name_ru: 'Стеновые панели\nWOOD',
    name_ka: 'კედლის პანელები\nWOOD',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
    slug: 'wood-panels',
  },
  {
    id: 9,
    name_ru: 'LINEA\nКоллекция',
    name_ka: 'LINEA\nკოლექცია',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    slug: 'linea',
  },
  {
    id: 10,
    name_ru: 'Скрытые двери\nINVISIBLE',
    name_ka: 'ფარული კარები\nINVISIBLE',
    image: 'https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=600&q=80',
    slug: 'invisible',
  },
];

// Icon components for quick links
const CameraIcon = () => (
  <svg viewBox="0 0 60 50" className="w-14 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="12" width="50" height="35" rx="3" />
    <circle cx="30" cy="30" r="10" />
    <rect x="15" y="5" width="20" height="8" rx="2" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 60 50" className="w-14 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="5" y="8" width="50" height="35" rx="3" />
    <polygon points="25,18 40,26 25,34" fill="currentColor" />
  </svg>
);

const NewIcon = () => (
  <svg viewBox="0 0 60 50" className="w-14 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="10" y="5" width="40" height="40" rx="3" />
    <text x="20" y="30" fontSize="12" fill="currentColor">New</text>
  </svg>
);

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

  const displayItems = products.length > 0 ? products : placeholderTrends;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const quickLinks = [
    { icon: CameraIcon, title: 'portfolio', description: 'portfolioDesc', href: '/union/about#portfolio' },
    { icon: PlayIcon, title: 'youtube', description: 'youtubeDesc', href: '#' },
    { icon: NewIcon, title: 'newArrivals', description: 'newArrivalsDesc', href: '/union/catalog?filter=new' },
  ];

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
            {t('trends')}
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

        {/* Products carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] md:w-[400px] group"
            >
              <Link 
                to={`/union/catalog/${item.slug}`} 
                className="block"
              >
                <div className="aspect-[4/3] bg-muted overflow-hidden mb-4 relative">
                  {(() => {
                    const raw =
                      ('images' in item && item.images?.[0]) ||
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
                        alt={language === 'ka' ? item.name_ka : (item as any).name_ru}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    );
                  })()}
                  
                  <button className="absolute bottom-4 left-4 w-10 h-10 bg-[#333] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronUp className="h-5 w-5 text-white" />
                  </button>
                </div>
                <h3 className="text-lg font-light whitespace-pre-line group-hover:text-primary transition-colors">
                  {language === 'ka' ? item.name_ka : (item as any).name_ru}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick links row */}
        <div className="grid md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-border">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${index < 2 ? 'border-r border-border' : ''}`}
            >
              <Link
                to={link.href}
                className="flex items-center gap-6 group px-4"
              >
                <div className="text-muted-foreground group-hover:text-foreground transition-colors">
                  <link.icon />
                </div>
                <div>
                  <h3 className="text-xl font-medium flex items-center gap-2 group-hover:text-primary transition-colors">
                    {t(link.title)}
                    <span className="text-muted-foreground">→</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(link.description)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
