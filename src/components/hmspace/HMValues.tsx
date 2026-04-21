import { motion } from 'framer-motion';
import { Sparkles, Users, Package, Award, Star, Heart, Shield, Clock, MapPin, Truck, CreditCard, Headphones, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHMSection, useLocalized, pickLocalized, HMSectionItem } from '@/hooks/useHMSection';

const iconMap: Record<string, LucideIcon> = { Sparkles, Users, Package, Award, Star, Heart, Shield, Clock, MapPin, Truck, CreditCard, Headphones };

const FALLBACK_VALUES: HMSectionItem[] = [
  { icon: 'Sparkles', num: '01', title_ka: 'Design craft',   description_ka: '' },
  { icon: 'Users',    num: '02', title_ka: 'People first',   description_ka: '' },
  { icon: 'Package',  num: '03', title_ka: 'Quality',        description_ka: '' },
  { icon: 'Award',    num: '04', title_ka: 'Lasting value',  description_ka: '' },
];

export function HMValues() {
  const { t, language } = useLanguage();
  const { data: section } = useHMSection('values');
  const L = useLocalized();

  const eyebrow = section ? L(section, 'eyebrow') : 'HMspace';
  const title = section ? L(section, 'title') : t('valuesTitle');
  const bodyAside = section ? L(section, 'body') : t('brandBody');
  const values: HMSectionItem[] = section?.items ? (section.items as unknown as HMSectionItem[]) : FALLBACK_VALUES;

  return (
    <section id="values" className="relative py-28 md:py-36 bg-neutral-950 text-white overflow-hidden grain">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-6">
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
              <p className="text-[11px] tracking-[0.35em] uppercase text-white/50 font-medium">{eyebrow}</p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-tight max-w-lg">
              {title}
            </h2>
          </div>
          {bodyAside && (
            <p className="text-sm text-white/40 max-w-sm leading-relaxed hidden md:block">
              {bodyAside}
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-px bg-white/[0.06]">
          {values.map((v, i) => {
            const Icon = (v.icon && iconMap[v.icon]) || Sparkles;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group bg-neutral-950 p-8 md:p-12 hover:bg-neutral-900/80 transition-colors duration-500 relative"
              >
                {v.num && (
                  <span className="absolute top-6 right-8 text-6xl md:text-8xl font-extralight text-white/[0.04] leading-none tracking-tighter select-none">
                    {v.num}
                  </span>
                )}

                <div className="relative">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/25 transition-colors duration-500">
                    <Icon className="h-5 w-5 text-white/70" strokeWidth={1.5} />
                  </div>

                  <h3 className="text-lg md:text-xl font-medium mb-3 tracking-tight">
                    {pickLocalized(v, 'title', language)}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                    {pickLocalized(v, 'description', language)}
                  </p>

                  <div className="mt-8 w-0 group-hover:w-12 h-px bg-white/30 transition-all duration-700" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
