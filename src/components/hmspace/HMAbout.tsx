import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function HMAbout() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden aurora-bg">
      {/* Floating decorative orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 right-[8%] w-72 h-72 rounded-full bg-neutral-900/5 blur-3xl animate-float-orb" />
        <div className="absolute bottom-10 left-[10%] w-64 h-64 rounded-full bg-neutral-900/5 blur-3xl animate-float-orb" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — image inside a glass 3D card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="perspective-1000"
          >
            <div className="glass-card-3d rounded-3xl p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85"
                  alt="HMspace interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between glass-panel rounded-2xl px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-900">HMspace</p>
                    <p className="font-serif text-xl text-neutral-900">Est. 2014</p>
                  </div>
                  <div className="w-px h-8 bg-neutral-300" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-neutral-900">Tbilisi</p>
                    <p className="font-serif text-xl text-neutral-900">Georgia</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-900 mb-4 font-semibold">
              {t('brandEyebrow')}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-neutral-900 leading-[1.1] mb-5 tracking-tight">
              {t('brandTitle')}
            </h2>
            <div className="w-12 h-px bg-neutral-900 mb-5" />
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
              {t('brandBody')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
