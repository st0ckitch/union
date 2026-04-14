import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function HMMission() {
  const { t } = useLanguage();

  return (
    <section id="mission" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=2000&q=85"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/70 to-black/90" />
      </div>

      <div className="relative max-w-[900px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel-dark rounded-3xl px-8 py-12 md:py-14 md:px-14"
        >
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/70 mb-4">
            HM<span className="text-white/50">space</span>
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-[1.15] tracking-tight mb-6">
            {t('missionTitle')}
          </h2>
          <div className="w-12 h-px bg-white/40 mx-auto mb-6" />
          <p className="text-sm md:text-base text-white/75 leading-relaxed max-w-2xl mx-auto">
            {t('missionBody')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
