import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function PromoStrip() {
  const { language } = useLanguage();

  const items = [
    {
      title: {
        ka: 'საგაზაფხულო ფასდაკლება 25%-მდე',
        ru: 'ВЕСЕННИЕ СКИДКИ до 25%',
        en: 'SPRING SALE up to 25%',
      },
      href: '/union/sale',
    },
    {
      title: {
        ka: '-15% ავეჯზე კარების შეძენისას',
        ru: '-15% на мебель при покупке дверей',
        en: '-15% on furniture when buying doors',
      },
      href: '/union/sale',
    },
  ];
  const lang = (language === 'ru' || language === 'en' ? language : 'ka') as 'ka' | 'ru' | 'en';

  return (
    <section className="bg-black text-white">
      <div className="container">
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={it.href}
                className="flex items-center justify-between gap-4 py-4 px-4 md:px-8 group"
              >
                <span className="text-xs md:text-sm font-bold uppercase tracking-[0.18em]">
                  {it.title[lang]}
                </span>
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
