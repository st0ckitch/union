import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface Category {
  id: string;
  name_ka: string;
  name_en: string | null;
  slug: string;
  parent_id: string | null;
}

interface CategorySidebarProps {
  categories: Category[];
  basePath?: string;
}

export function CategorySidebar({ categories, basePath = '/catalog' }: CategorySidebarProps) {
  const { category: activeCategory } = useParams();
  const { language } = useLanguage();

  // Get parent categories (no parent_id)
  const parentCategories = categories.filter(c => !c.parent_id);

  return (
    <nav className="border border-border bg-surface">
      <Link
        to={basePath}
        className={cn(
          'flex items-center justify-between px-5 py-3 text-[13px] uppercase tracking-[0.04em] transition-colors border-b border-border last:border-b-0',
          !activeCategory
            ? 'bg-primary text-white font-semibold'
            : 'text-foreground hover:bg-white font-medium'
        )}
      >
        <span>{language === 'ka' ? 'ყველა' : language === 'ru' ? 'Все товары' : 'All Products'}</span>
      </Link>

      {parentCategories.map((category) => {
        const isActive = activeCategory === category.slug;
        const subcategories = categories.filter(c => c.parent_id === category.id);
        const name = language === 'ka' ? category.name_ka : (category.name_en || category.name_ka);

        return (
          <div key={category.id} className="border-b border-border last:border-b-0">
            <Link
              to={`${basePath}/${category.slug}`}
              className={cn(
                'flex items-center justify-between px-5 py-3 text-[13px] uppercase tracking-[0.04em] transition-colors',
                isActive
                  ? 'bg-primary text-white font-semibold'
                  : 'text-foreground hover:bg-white font-medium'
              )}
            >
              <span>{name}</span>
              {subcategories.length > 0 && (
                <ChevronRight className="h-3.5 w-3.5 opacity-60" strokeWidth={2} />
              )}
            </Link>

            {isActive && subcategories.length > 0 && (
              <div className="bg-white/60">
                {subcategories.map((sub) => {
                  const subName = language === 'ka' ? sub.name_ka : (sub.name_en || sub.name_ka);
                  return (
                    <Link
                      key={sub.id}
                      to={`${basePath}/${category.slug}/${sub.slug}`}
                      className="block px-8 py-2.5 text-[13px] text-muted-foreground hover:text-primary transition-colors"
                    >
                      {subName}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
