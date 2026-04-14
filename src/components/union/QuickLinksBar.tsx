import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// SVG icons matching the reference
const TrolleyIcon = () => (
  <svg viewBox="0 0 80 60" className="w-16 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="10" y="15" width="40" height="25" rx="2" />
    <line x1="50" y1="25" x2="70" y2="25" />
    <line x1="50" y1="35" x2="65" y2="35" />
    <circle cx="20" cy="50" r="5" />
    <circle cx="40" cy="50" r="5" />
    <line x1="15" y1="10" x2="25" y2="15" />
  </svg>
);

const TagIcon = () => (
  <svg viewBox="0 0 80 60" className="w-16 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 15 L45 15 L60 30 L45 45 L20 45 Z" />
    <circle cx="30" cy="30" r="4" />
    <line x1="50" y1="20" x2="65" y2="35" />
    <line x1="55" y1="15" x2="70" y2="30" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 80 60" className="w-16 h-12" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="40" cy="30" r="20" />
    <circle cx="30" cy="30" r="2" fill="currentColor" />
    <circle cx="40" cy="30" r="2" fill="currentColor" />
    <circle cx="50" cy="30" r="2" fill="currentColor" />
  </svg>
);

export function QuickLinksBar() {
  const { t } = useLanguage();

  const quickLinks = [
    {
      icon: TrolleyIcon,
      title: 'inStock',
      description: 'inStockDesc',
      href: '/union/catalog?filter=in-stock',
    },
    {
      icon: TagIcon,
      title: 'promotions',
      description: 'promotionsDesc',
      href: '/union/sale',
    },
    {
      icon: ChatIcon,
      title: 'reviews',
      description: 'reviewsDesc',
      href: '/union/about#reviews',
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-b border-border">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8">
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
                    <ArrowRight className="h-4 w-4" />
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
