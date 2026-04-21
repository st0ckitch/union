import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useHMSection, useLocalized, pickLocalized, HMSectionItem } from '@/hooks/useHMSection';

export function HMAbout() {
  const { t, language } = useLanguage();
  const { data: section } = useHMSection('about');
  const L = useLocalized();

  const eyebrow = section ? L(section, 'eyebrow') : t('brandEyebrow');
  const title = section ? L(section, 'title') : t('brandTitle');
  const body = section ? L(section, 'body') : t('brandBody');
  const image = section?.image_url || 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85';
  const image2 = section?.secondary_image_url || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80';
  const stats: HMSectionItem[] = (section?.items as unknown as HMSectionItem[]) || [];
  const fallbackStats: HMSectionItem[] = [
    { value: '35+', label_ka: t('stat1Label'), label_ru: t('stat1Label'), label_en: t('stat1Label') },
    { value: '18',  label_ka: t('stat3Label'), label_ru: t('stat3Label'), label_en: t('stat3Label') },
  ];
  const shown = stats.length > 0 ? stats : fallbackStats;

  return (
    <section id="about" className="relative py-28 md:py-40 overflow-hidden bg-white grain">
      <div className="absolute top-0 left-0 right-0 h-px bg-neutral-200" />

      <div className="relative max-w-[1320px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-32"
          >
            {eyebrow && (
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-neutral-900" />
                <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-500 font-medium">
                  {eyebrow}
                </p>
              </div>
            )}

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-neutral-900 leading-[1.1] tracking-tight mb-8">
              {title}
            </h2>

            <p className="text-[15px] text-neutral-500 leading-relaxed max-w-md">
              {body}
            </p>

            <div className="mt-12 flex items-end gap-12 flex-wrap">
              {shown.map((s, i) => (
                <div key={i}>
                  <p className="text-5xl md:text-6xl font-extralight text-neutral-900 leading-none tracking-tighter">
                    {s.value}
                  </p>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 mt-2">
                    {pickLocalized(s, 'label', language)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative">
              <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                <img src={image} alt="HMspace interior" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-4 md:-left-12 bg-neutral-900 text-white px-8 py-6 max-w-[260px]">
                <p className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-1">HMspace</p>
                <p className="text-2xl font-light tracking-tight">Est. 2014</p>
                <div className="w-6 h-px bg-white/30 my-3" />
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/50">Tbilisi, Georgia</p>
              </div>
            </div>

            {image2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="hidden md:block absolute -top-8 -right-6 w-48 lg:w-56 aspect-square overflow-hidden shadow-2xl"
              >
                <img src={image2} alt="Interior detail" className="w-full h-full object-cover" />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
