import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHMSection, useLocalized } from '@/hooks/useHMSection';

export function HMHero() {
  const { t } = useLanguage();
  const { data: section } = useHMSection('hero');
  const L = useLocalized();

  // Fallbacks to keep layout intact before DB content is loaded / seeded
  const eyebrow = section ? L(section, 'eyebrow') : t('heroEyebrow');
  const title   = section ? L(section, 'title')   : t('heroTagline');
  const body    = section ? L(section, 'body')    : t('heroSub');
  const imageUrl = section?.image_url || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=85';
  const ctaLabel = section ? L(section, 'cta_label') : t('heroCtaUnion');
  const ctaUrl = section?.cta_url || '/union';
  const cta2Label = section ? L(section, 'cta_secondary_label') : t('heroCtaExplore');
  const cta2Url = section?.cta_secondary_url || '#brand';

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img src={imageUrl} alt="Premium interior" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 min-h-screen flex items-end">
        <div className="max-w-[1320px] mx-auto w-full px-6 pb-20 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              {eyebrow && (
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-px bg-white/40" />
                  <p className="text-[11px] tracking-[0.35em] uppercase text-white/60 font-medium">
                    {eyebrow}
                  </p>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.05] tracking-tight mb-8">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                {ctaLabel && (
                  <Link
                    to={ctaUrl}
                    className="group inline-flex items-center gap-3 h-13 px-7 bg-white text-neutral-900 hover:bg-neutral-100 transition-colors text-sm tracking-wide font-medium py-3"
                  >
                    {ctaLabel}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
                {cta2Label && (
                  <a
                    href={cta2Url}
                    className="group inline-flex items-center gap-3 h-13 px-7 border border-white/30 text-white hover:bg-white/10 transition-colors text-sm tracking-wide font-medium py-3"
                  >
                    {cta2Label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            </motion.div>

            {body && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-4 hidden lg:block"
              >
                <p className="text-sm text-white/40 leading-relaxed border-l border-white/15 pl-6">
                  {body}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
