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
    <nav className="space-y-1">
      <Link
        to={basePath}
        className={cn(
          'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors',
          !activeCategory
            ? 'bg-primary text-primary-foreground'
            : 'text-foreground hover:bg-secondary'
        )}
      >
        <span>{language === 'ka' ? 'ყველა პროდუქტი' : 'All Products'}</span>
      </Link>

      {parentCategories.map((category) => {
        const isActive = activeCategory === category.slug;
        const subcategories = categories.filter(c => c.parent_id === category.id);
        const name = language === 'ka' ? category.name_ka : (category.name_en || category.name_ka);

        return (
          <div key={category.id}>
            <Link
              to={`${basePath}/${category.slug}`}
              className={cn(
                'flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              )}
            >
              <span>{name}</span>
              {subcategories.length > 0 && (
                <ChevronRight className="h-4 w-4" />
              )}
            </Link>

            {/* Subcategories */}
            {isActive && subcategories.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {subcategories.map((sub) => {
                  const subName = language === 'ka' ? sub.name_ka : (sub.name_en || sub.name_ka);
                  return (
                    <Link
                      key={sub.id}
                      to={`${basePath}/${category.slug}/${sub.slug}`}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
