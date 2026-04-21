import { motion } from 'framer-motion';
import { Sparkles, Users, Package, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const values = [
  { icon: Sparkles, titleKey: 'value1Title', descKey: 'value1Desc', num: '01' },
  { icon: Users, titleKey: 'value2Title', descKey: 'value2Desc', num: '02' },
  { icon: Package, titleKey: 'value3Title', descKey: 'value3Desc', num: '03' },
  { icon: Award, titleKey: 'value4Title', descKey: 'value4Desc', num: '04' },
] as const;

export function HMValues() {
  const { t } = useLanguage();

  return (
    <section id="values" className="relative py-28 md:py-36 bg-neutral-950 text-white overflow-hidden grain">
      {/* Subtle grid lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-white/40" />
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/50 font-medium">HMspace</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight max-w-lg">
              {t('valuesTitle')}
            </h2>
          </div>
          <p className="text-sm text-white/40 max-w-sm leading-relaxed hidden md:block">
            {t('brandBody')}
          </p>
        </motion.div>

        {/* Values grid — 2x2 with large numbers */}
        <div className="grid md:grid-cols-2 gap-px bg-white/[0.06]">
          {values.map((v, i) => (
            <motion.div
              key={v.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              className="group bg-neutral-950 p-8 md:p-12 hover:bg-neutral-900/80 transition-colors duration-500 relative"
            >
              {/* Large faded number */}
              <span className="absolute top-6 right-8 text-6xl md:text-8xl font-extralight text-white/[0.04] leading-none tracking-tighter select-none">
                {v.num}
              </span>

              <div className="relative">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/25 transition-colors duration-500">
                  <v.icon className="h-5 w-5 text-white/70" strokeWidth={1.5} />
                </div>

                <h3 className="text-lg md:text-xl font-medium mb-3 tracking-tight">
                  {t(v.titleKey)}
                </h3>
                <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                  {t(v.descKey)}
                </p>

                {/* Bottom reveal line on hover */}
                <div className="mt-8 w-0 group-hover:w-12 h-px bg-white/30 transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
