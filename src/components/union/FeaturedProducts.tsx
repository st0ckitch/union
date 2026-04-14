import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { resolveProductImage } from '@/lib/unionImages';

const placeholderProducts = [
  { 
    id: 1, 
    name_ru: 'Распашные двери', 
    name_ka: 'გაშლადი კარები',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    slug: 'swing-doors'
  },
  { 
    id: 2, 
    name_ru: 'Раздвижные двери', 
    name_ka: 'სრიალა კარები',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&q=80',
    slug: 'sliding-doors'
  },
  { 
    id: 3, 
    name_ru: 'Раздвижные перегородки', 
    name_ka: 'სრიალა ტიხრები',
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80',
    slug: 'sliding-partitions'
  },
  { 
    id: 4, 
    name_ru: 'Стеновые панели', 
    name_ka: 'კედლის პანელები',
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600&q=80',
    slug: 'wall-panels'
  },
];

export function FeaturedProducts() {
  const { language, t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: products = [] } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .eq('is_featured', true)
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const displayProducts = products.length > 0 ? products : placeholderProducts;

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
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-light"
          >
            {t('doorsAndFurnitureUnion')}
          </motion.h2>
          
          {/* Navigation arrows */}
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
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] md:w-[400px] group"
            >
              <Link to={`/union/catalog/${product.slug}`} className="block">
                <div className="aspect-[4/3] bg-muted rounded-none overflow-hidden mb-4 relative">
                  {(() => {
                    const raw =
                      ('images' in product && product.images?.[0]) ||
                      ('image' in product ? (product as any).image : null);
                    const src = resolveProductImage(
                      raw,
                      (product as any).category_slug ?? null,
                      (product as any).slug ?? null,
                    );
                    return (
                      <img
                        src={src}
                        referrerPolicy="no-referrer"
                        alt={language === 'ka' ? product.name_ka : (product as any).name_ru || product.name_ka}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    );
                  })()}
                  
                  {/* Scroll up indicator */}
                  <button className="absolute bottom-4 left-4 w-10 h-10 bg-[#333] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronUp className="h-5 w-5 text-white" />
                  </button>
                </div>
                <h3 className="text-lg font-light group-hover:text-primary transition-colors">
                  {language === 'ka' ? product.name_ka : ((product as any).name_ru || product.name_ka)}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-10 text-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-[#333] text-white hover:bg-[#222] rounded-none px-12 py-6 text-sm tracking-widest"
          >
            <Link to="/union/catalog">
              {t('toCatalog')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
