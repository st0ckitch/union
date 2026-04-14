import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

type CatTile = { key: string; img: string; href: string; span?: string };

const categories: CatTile[] = [
  { key: 'catFurniture', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80', href: '/union/catalog/furniture', span: 'md:col-span-2' },
  { key: 'catBathroom', img: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80', href: '#' },
  { key: 'catTiles', img: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80', href: '#' },
  { key: 'catKitchen', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', href: '#', span: 'md:col-span-2' },
  { key: 'catParquet', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', href: '#' },
  { key: 'catDoors', img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80', href: '/union/catalog/swing-doors' },
  { key: 'catLighting', img: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=80', href: '#', span: 'md:col-span-3' },
];

export function HMCategoryGrid() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.href}
              className={`group relative aspect-[4/3] overflow-hidden bg-neutral-900 ${cat.span ?? ''}`}
            >
              <img
                src={cat.img}
                alt={t(cat.key)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-2xl md:text-3xl font-serif text-white tracking-wide">
                  {t(cat.key)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
