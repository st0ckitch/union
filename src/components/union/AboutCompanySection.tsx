import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function AboutCompanySection() {
  const { t } = useLanguage();

  const quickLinks = [
    { key: 'ourProjects', href: '/union/about#projects' },
    { key: 'news', href: '/union/blog' },
    { key: 'tvAboutUs', href: '/union/about#tv' },
    { key: 'career', href: '/union/about#career' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                alt="UNION factory"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Scroll up button */}
            <button className="absolute bottom-4 left-4 w-10 h-10 bg-[#333] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ChevronUp className="h-5 w-5 text-white" />
            </button>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <h2 className="text-2xl md:text-3xl font-light mb-6">
              {t('aboutCompanyTitle')}
            </h2>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t('companyDesc')}
            </p>

            <Link 
              to="/union/about"
              className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 mb-8"
            >
              {t('moreDetails')}
              <ChevronRight className="h-4 w-4" />
            </Link>

            {/* Quick links */}
            <div className="space-y-4 pt-6 border-t border-border">
              {quickLinks.map((link) => (
                <Link
                  key={link.key}
                  to={link.href}
                  className="block text-xl font-light text-foreground hover:text-primary transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
