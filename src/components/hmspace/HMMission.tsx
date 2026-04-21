import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function HMMission() {
  const { t } = useLanguage();

  return (
    <section id="mission" className="relative min-h-[70vh] overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&q=85"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        {/* Noise texture over image */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />
      </div>

      <div className="relative max-w-[1320px] mx-auto px-6 py-28 md:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — oversized quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-white/30" />
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/40 font-medium">
                HM<span className="text-white/25">space</span>
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-[1.1] tracking-tight">
              {t('missionTitle')}
            </h2>
          </motion.div>

          {/* Right — body text + decorative line */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:border-l lg:border-white/10 lg:pl-12"
          >
            <p className="text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-md">
              {t('missionBody')}
            </p>

            {/* Signature-style mark */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                <span className="text-xs font-medium text-white/60 tracking-wider">HM</span>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">Tbilisi</p>
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/30">Georgia, 2014</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
