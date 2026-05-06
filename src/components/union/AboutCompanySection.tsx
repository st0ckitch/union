import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const UNION_CDN = 'https://www.union.ru';

export function AboutCompanySection() {
  const { language, t } = useLanguage();

  const links = [
    { key: 'ourProjects', href: '/union/about#projects' },
    { key: 'news',         href: '/union/blog' },
    { key: 'tvAboutUs',    href: '/union/about#tv' },
    { key: 'career',       href: '/union/careers' },
  ];

  return (
    <section className="union-section bg-white">
      <div className="union-container">
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-0 bg-white">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden"
          >
            <img
              src={`${UNION_CDN}/upload/iblock/f61/5j7s2ttljhknilk6dcz23mnbceelzabz/_-_-_._._01.jpg`}
              alt="UNION"
              className="w-full h-full object-cover"
              style={{ aspectRatio: '715/680' }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 flex flex-col justify-center"
          >
            <h2 className="union-section-title mb-6">{t('aboutCompanyTitle')}</h2>

            <p className="text-[18px] font-light leading-[1.45] text-[#000] mb-6">
              {t('companyDesc')}
            </p>

            <Link
              to="/union/about"
              className="inline-block self-start text-[16px] font-medium text-[#002b45] hover:text-[hsl(var(--accent))] transition-colors mb-8"
            >
              {language === 'ka' ? 'დაწვრილებით' : language === 'ru' ? 'Подробнее' : 'Read more'}
            </Link>

            <ul className="border-t border-[#e3e5ef]">
              {links.map((link) => (
                <li key={link.key} className="border-b border-[#e3e5ef]">
                  <Link
                    to={link.href}
                    className="block py-4 text-[16px] font-normal text-[#002b45] hover:text-[hsl(var(--accent))] transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
