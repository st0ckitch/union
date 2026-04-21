import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { UnionLogo } from '@/components/union/UnionLogo';

export function HMUnionSpotlight() {
  const { t } = useLanguage();

  return (
    <section id="brand" className="py-20 md:py-28 bg-white">
      <div className="max-w-[1320px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="w-8 h-px bg-neutral-900" />
          <p className="text-[11px] tracking-[0.35em] uppercase text-neutral-500 font-medium">
            {t('ourBrands')}
          </p>
        </motion.div>

        <Link to="/union" className="block group">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden bg-neutral-950"
          >
            <div className="grid md:grid-cols-2">
              {/* Image side */}
              <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[500px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85"
                  alt="UNION premium interiors"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-700" />
              </div>

              {/* Text side */}
              <div className="flex flex-col justify-center p-10 md:p-16 text-white">
                <UnionLogo className="h-28 md:h-36 w-auto text-white mb-8" />
                <div className="w-10 h-px bg-white/20 mb-6" />
                <p className="text-sm md:text-[15px] text-white/50 mb-10 max-w-sm leading-relaxed">
                  {t('unionTagline')}
                </p>
                <div className="inline-flex items-center gap-3 text-white text-[11px] tracking-[0.3em] uppercase font-medium">
                  <span>{t('enterUnionCatalog')}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2 duration-500" />
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-white/10" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b border-l border-white/10" />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
