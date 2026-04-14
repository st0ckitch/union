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
        {/* Strong dark overlay so the headline reads clearly over any photo */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />
      </div>

      {/* Monochrome floating orbs — subtle depth */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] left-[6%] w-40 h-40 rounded-full bg-white/10 blur-3xl animate-float-orb" />
        <div className="absolute top-[50%] right-[10%] w-56 h-56 rounded-full bg-white/5 blur-3xl animate-float-orb" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[15%] left-[30%] w-48 h-48 rounded-full bg-white/10 blur-3xl animate-float-orb" style={{ animationDelay: '4s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-end">
        <div className="max-w-[1280px] mx-auto w-full px-6 pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/85 mb-5 px-4 py-2 rounded-full glass-panel-dark">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {t('heroEyebrow')}
            </p>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6 tracking-tight">
              {t('heroTagline')}
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-xl leading-relaxed mb-8">
              {t('heroSub')}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/union"
                className="group inline-flex items-center gap-3 h-12 px-6 rounded-full bg-white text-neutral-900 hover:bg-neutral-200 transition-colors text-xs md:text-sm tracking-wide font-semibold"
              >
                {t('heroCtaUnion')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="#brand"
                className="group inline-flex items-center gap-3 h-12 px-6 rounded-full border border-white/40 text-white hover:bg-white/10 transition-colors text-xs md:text-sm tracking-wide font-medium"
              >
                {t('heroCtaExplore')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
