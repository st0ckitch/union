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
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-neutral-200" />

      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-16"
        >
          <div className="w-8 h-px bg-neutral-900" />
          <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-500 font-medium">
            {t('statsTitle')}
          </p>
        </motion.div>

        {/* Stats — full-width horizontal with large typography */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative py-8 lg:py-0"
            >
              {/* Vertical separator (except first) */}
              {i > 0 && (
                <div className="hidden lg:block absolute top-0 bottom-0 left-0 w-px bg-neutral-200" />
              )}

              <div className="lg:px-8">
                <p className="text-5xl md:text-6xl lg:text-7xl font-extralight text-neutral-900 leading-none tracking-tighter mb-3">
                  {s.value}
                </p>
                <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
                  {t(s.key)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Infinite marquee ticker — subtle brand reinforcement */}
      <div className="mt-20 overflow-hidden border-t border-b border-neutral-100 py-4">
        <div className="animate-marquee flex items-center whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-10 text-[11px] tracking-[0.4em] uppercase text-neutral-300 font-medium select-none">
              HMspace
              <span className="mx-8 text-neutral-200">/</span>
              Premium Interiors
              <span className="mx-8 text-neutral-200">/</span>
              Italian Design
              <span className="mx-8 text-neutral-200">/</span>
              Since 2014
            </span>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-neutral-200" />
    </section>
  );
}
