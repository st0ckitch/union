import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { UnionLogo } from '@/components/union/UnionLogo';

export function HMUnionSpotlight() {
  const { t } = useLanguage();

  return (
    <section id="brand" className="py-20 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
            {t('ourBrands')}
          </p>
        </div>

        <Link to="/union" className="block group">
          <div className="grid md:grid-cols-2 bg-neutral-950 overflow-hidden rounded-3xl">
            <div className="relative aspect-[4/5] md:aspect-auto min-h-[380px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85"
                alt="UNION premium interiors"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12 text-white">
              <UnionLogo className="h-32 md:h-40 w-auto text-white mb-6" />
              <div className="w-10 h-px bg-white/40 mb-5" />
              <p className="text-sm md:text-base text-white/75 mb-7 max-w-md leading-relaxed">
                {t('unionTagline')}
              </p>
              <div className="inline-flex items-center gap-3 text-white text-[11px] md:text-xs tracking-[0.25em] uppercase">
                <span>{t('enterUnionCatalog')}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
