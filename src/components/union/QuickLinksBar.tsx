import { Link } from 'react-router-dom';
import { Truck, Percent, MessageSquare, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function QuickLinksBar() {
  const { t } = useLanguage();

  const links = [
    {
      Icon: Truck,
      title: 'inStock',
      description: 'inStockDesc',
      href: '/union/catalog?filter=in-stock',
    },
    {
      Icon: Percent,
      title: 'promotions',
      description: 'promotionsDesc',
      href: '/union/sale',
    },
    {
      Icon: MessageSquare,
      title: 'reviews',
      description: 'reviewsDesc',
      href: '/union/about#reviews',
    },
  ];

  return (
    <section className="union-section bg-white">
      <div className="union-container">
        <div className="grid grid-cols-1 md:grid-cols-3 border border-border bg-surface">
          {links.map((link, idx) => (
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
