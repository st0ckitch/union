import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const stats = [
  { value: '35+', key: 'stat1Label' },
  { value: '1,200+', key: 'stat2Label' },
  { value: '18', key: 'stat3Label' },
  { value: '5K+', key: 'stat4Label' },
] as const;

export function HMStats() {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 md:py-28 aurora-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[32rem] h-[32rem] rounded-full bg-neutral-900/5 blur-3xl animate-float-orb" />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">{t('statsTitle')}</p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-neutral-900 tracking-tight">
            {t('missionTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 perspective-1000">
          {stats.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card-3d rounded-3xl p-7 text-center"
            >
              <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-none mb-2">
                {s.value}
              </p>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-neutral-500">
                {t(s.key)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
