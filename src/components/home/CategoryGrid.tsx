import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const FALLBACK = [
  { id: 'f1', name_ka: 'კარები',          name_en: 'Doors',       slug: 'doors',        home_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 'f2', name_ka: 'ავეჯი',           name_en: 'Furniture',   slug: 'furniture',    home_image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80' },
  { id: 'f3', name_ka: 'აქსესუარები',     name_en: 'Accessories', slug: 'accessories',  home_image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80' },
  { id: 'f4', name_ka: 'კედლის პანელები', name_en: 'Wall Panels', slug: 'wall-panels',  home_image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80' },
];

export function CategoryGrid() {
  const { language } = useLanguage();

  const { data: cats } = useQuery({
    queryKey: ['home-category-grid'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories').select('*').eq('is_active', true).eq('home_visible', true).is('parent_id', null).order('home_sort_order', { ascending: true });
      if (error) throw error;
      return data;
    }
  });

  const items = (cats && cats.length > 0) ? cats : FALLBACK;

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          {language === 'en' ? 'Categories' : language === 'ru' ? 'Категории' : 'კატეგორიები'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((category) => {
            const name = language === 'en' ? (category.name_en || category.name_ka) : category.name_ka;
            return (
              <Link key={category.id} to={`/union/catalog/${category.slug}`} className="category-card group rounded-lg overflow-hidden aspect-square relative block">
                {category.home_image_url && (
                  <img src={category.home_image_url} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute inset-0 z-10 flex items-end p-4">
                  <h3 className="text-white text-xl md:text-2xl font-bold">{name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
