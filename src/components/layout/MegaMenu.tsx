import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { CATEGORIES } from '@/lib/constants';
import { motion } from 'framer-motion';

interface MegaMenuProps {
  onClose: () => void;
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full w-[800px] mega-menu shadow-2xl rounded-b-lg"
      style={{ marginLeft: '-200px' }}
    >
      <div className="p-6">
        <div className="grid grid-cols-4 gap-8">
          {Object.entries(CATEGORIES).map(([key, category]) => (
            <div key={key}>
              <Link
                to={`/catalog/${category.slug}`}
                onClick={onClose}
                className="block text-lg font-bold mb-4 text-white hover:text-accent transition-colors"
              >
                {t(category)}
              </Link>
              <ul className="space-y-2">
                {category.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      to={`/catalog/${category.slug}/${sub.slug}`}
                      onClick={onClose}
                      className="text-sm text-white/80 hover:text-accent transition-colors"
                    >
                      {t(sub)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Banner in mega menu */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">სეზონური შეთავაზება</p>
              <p className="text-accent font-bold text-lg">-30% ყველა კარზე</p>
            </div>
            <Link
              to="/sale"
              onClick={onClose}
              className="bg-accent text-accent-foreground px-4 py-2 rounded font-medium hover:opacity-90 transition-opacity"
            >
              შეთავაზებები
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
