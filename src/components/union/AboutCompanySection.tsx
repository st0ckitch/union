import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutCompanySection() {
  const { t } = useLanguage();

  const quickLinks = [
    { key: 'ourProjects', href: '/union/about#projects' },
    { key: 'news',         href: '/union/blog' },
    { key: 'tvAboutUs',    href: '/union/about#tv' },
    { key: 'career',       href: '/union/careers' },
  ];

  return (
    <section className="union-section bg-white">
      <div className="union-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="aspect-[4/3] overflow-hidden bg-surface">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80"
                alt="UNION factory"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-2"
          >
            <h2 className="union-section-title mb-5">
              {t('aboutCompanyTitle')}
            </h2>

            <p className="text-[15px] text-muted-foreground leading-[1.7] mb-6">
              {t('companyDesc')}
            </p>

            <div className="border-t border-border">
              {quickLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className="flex items-center justify-between border-b border-border py-4 text-[15px] text-foreground hover:text-primary transition-colors"
                >
                  <span>{t(link.key)}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.75} />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
