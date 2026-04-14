import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { CATEGORIES } from '@/lib/constants';

const categoryImages: Record<string, string> = {
  doors: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
  accessories: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80',
  'wall-panels': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
};

export function CategoryGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">კატეგორიები</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {Object.entries(CATEGORIES).map(([key, category]) => (
            <Link key={key} to={`/catalog/${category.slug}`} className="category-card group rounded-lg overflow-hidden aspect-square">
              <img src={categoryImages[category.slug]} alt={t(category)} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 z-10 flex items-end p-4">
                <h3 className="text-white text-xl md:text-2xl font-bold">{t(category)}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
