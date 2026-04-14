import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { NAV_LINKS, CATEGORIES, CONTACT_INFO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-40 lg:hidden"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />

        {/* Menu panel */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="absolute left-0 top-0 h-full w-[300px] bg-background shadow-xl overflow-y-auto"
        >
          <div className="p-4">
            {/* Main navigation */}
            <nav className="space-y-1">
              <Link
                to={NAV_LINKS.home.path}
                onClick={onClose}
                className="block py-3 px-4 font-medium hover:bg-secondary rounded-lg transition-colors"
              >
                {t(NAV_LINKS.home)}
              </Link>

              {/* Catalog with subcategories */}
              <div>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === 'catalog' ? null : 'catalog')}
                  className="w-full flex items-center justify-between py-3 px-4 font-medium hover:bg-secondary rounded-lg transition-colors"
                >
                  {t(NAV_LINKS.catalog)}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      expandedCategory === 'catalog' && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {expandedCategory === 'catalog' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 py-2 space-y-1">
                        {Object.entries(CATEGORIES).map(([key, category]) => (
                          <div key={key}>
                            <Link
                              to={`/catalog/${category.slug}`}
                              onClick={onClose}
                              className="flex items-center justify-between py-2 px-4 text-sm font-medium hover:bg-secondary rounded-lg transition-colors"
                            >
                              {t(category)}
                              <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to={NAV_LINKS.about.path}
                onClick={onClose}
                className="block py-3 px-4 font-medium hover:bg-secondary rounded-lg transition-colors"
              >
                {t(NAV_LINKS.about)}
              </Link>
              <Link
                to={NAV_LINKS.showrooms.path}
                onClick={onClose}
                className="block py-3 px-4 font-medium hover:bg-secondary rounded-lg transition-colors"
              >
                {t(NAV_LINKS.showrooms)}
              </Link>
              <Link
                to={NAV_LINKS.designers.path}
                onClick={onClose}
                className="block py-3 px-4 font-medium hover:bg-secondary rounded-lg transition-colors"
              >
                {t(NAV_LINKS.designers)}
              </Link>
              <Link
                to={NAV_LINKS.sale.path}
                onClick={onClose}
                className="block py-3 px-4 font-medium text-sale hover:bg-secondary rounded-lg transition-colors"
              >
                {t(NAV_LINKS.sale)}
              </Link>
              <Link
                to={NAV_LINKS.blog.path}
                onClick={onClose}
                className="block py-3 px-4 font-medium hover:bg-secondary rounded-lg transition-colors"
              >
                {t(NAV_LINKS.blog)}
              </Link>
              <Link
                to={NAV_LINKS.contact.path}
                onClick={onClose}
                className="block py-3 px-4 font-medium hover:bg-secondary rounded-lg transition-colors"
              >
                {t(NAV_LINKS.contact)}
              </Link>
            </nav>

            {/* Contact info */}
            <div className="mt-8 pt-8 border-t">
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="block py-2 text-primary font-medium"
              >
                {CONTACT_INFO.phone}
              </a>
              <p className="text-sm text-muted-foreground">
                {t(CONTACT_INFO.workingHours)}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
