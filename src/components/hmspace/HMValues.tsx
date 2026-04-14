import { motion } from 'framer-motion';
import { Sparkles, Users, Package, Award } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const values = [
  { icon: Sparkles, titleKey: 'value1Title', descKey: 'value1Desc' },
  { icon: Users, titleKey: 'value2Title', descKey: 'value2Desc' },
  { icon: Package, titleKey: 'value3Title', descKey: 'value3Desc' },
  { icon: Award, titleKey: 'value4Title', descKey: 'value4Desc' },
] as const;

export function HMValues() {
  const { t } = useLanguage();

  return (
    <section id="values" className="relative py-24 md:py-32 bg-neutral-950 text-white overflow-hidden">
      {/* Background mesh */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 15% 20%, rgba(255,255,255,0.08), transparent 45%), radial-gradient(circle at 80% 40%, rgba(255,255,255,0.05), transparent 50%), radial-gradient(circle at 50% 90%, rgba(255,255,255,0.08), transparent 55%)',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-white/70 mb-4">HMspace</p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.1] tracking-tight max-w-2xl mx-auto">
            {t('valuesTitle')}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 perspective-1000">
          {values.map((v, i) => (
            <motion.div
              key={v.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel-dark rounded-3xl p-7 group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-4 group-hover:bg-white/15 transition-colors">
                <v.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-serif text-lg md:text-xl mb-2 leading-snug">{t(v.titleKey)}</h3>
              <p className="text-[13px] text-white/60 leading-relaxed">{t(v.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
