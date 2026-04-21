import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function HMHero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=85"
          alt="Premium interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Content — bottom-aligned editorial layout */}
      <div className="relative z-10 min-h-screen flex items-end">
        <div className="max-w-[1320px] mx-auto w-full px-6 pb-20 md:pb-28">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            {/* Main headline — takes most of the width */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-white/40" />
                <p className="text-[11px] tracking-[0.35em] uppercase text-white/60 font-medium">
                  {t('heroEyebrow')}
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.05] tracking-tight mb-8">
                {t('heroTagline')}
              </h1>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/union"
                  className="group inline-flex items-center gap-3 h-13 px-7 bg-white text-neutral-900 hover:bg-neutral-100 transition-colors text-sm tracking-wide font-medium"
                >
                  {t('heroCtaUnion')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#brand"
                  className="group inline-flex items-center gap-3 h-13 px-7 border border-white/30 text-white hover:bg-white/10 transition-colors text-sm tracking-wide font-medium"
                >
                  {t('heroCtaExplore')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>

            {/* Right side — small descriptor text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-4 hidden lg:block"
            >
              <p className="text-sm text-white/40 leading-relaxed border-l border-white/15 pl-6">
                {t('heroSub')}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
