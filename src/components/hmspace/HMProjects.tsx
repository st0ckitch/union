import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export function HMProjects() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80"
              alt="Project"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-900 mb-4">
              {t('ourProjectsTitle')}
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-neutral-900 mb-6 leading-tight">
              {t('ourProjectsTitle')}
            </h2>
            <div className="w-12 h-px bg-neutral-900 mb-6" />
            <p className="text-neutral-600 mb-8 leading-relaxed">
              {t('companyDesc')}
            </p>
            <Link
              to="/union/designers"
              className="inline-flex items-center gap-3 text-sm tracking-[0.2em] uppercase text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-900 hover:border-neutral-900 transition-colors"
            >
              {t('viewMore')} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
