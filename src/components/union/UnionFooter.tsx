import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Youtube, Send, Facebook, Music2, Bookmark } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const footerSections = [
  {
    titleKey: 'catalogFooter',
    links: [
      { ka: 'ასორტიმენტი Union',           ru: 'Ассортимент Union',          en: 'Union assortment',          href: '/union/catalog' },
      { ka: 'იტალიური კარები',             ru: 'Двери из Италии',            en: 'Doors from Italy',          href: '/union/catalog/italian-doors' },
      { ka: 'Sale',                          ru: 'Sale',                       en: 'Sale',                      href: '/union/sale' },
      { ka: 'საკონტრაქტო კარები',           ru: 'Контрактные двери',          en: 'Contract doors',            href: '/union/catalog/contract' },
      { ka: 'ჩამოტვირთეთ კატალოგი',         ru: 'Скачать каталог UNION',     en: 'Download UNION catalog',    href: '#' },
    ],
  },
  {
    titleKey: 'cooperation',
    links: [
      { ka: 'კომპანიის შესახებ',             ru: 'О компании',                en: 'About the company',         href: '/union/about' },
      { ka: 'დილერებს',                      ru: 'Дилерам',                   en: 'For dealers',               href: '/union/partnership' },
      { ka: 'არქიტექტორებს და დიზაინერებს',  ru: 'Архитекторам и дизайнерам', en: 'For architects & designers', href: '/union/designers' },
      { ka: 'კორპორატიულ კლიენტებს',         ru: 'Корпоративным клиентам',    en: 'Corporate clients',         href: '/union/partnership' },
      { ka: 'კონფიგურატორი',                 ru: 'Конфигуратор',              en: 'Configurator',              href: '/union/catalog' },
      { ka: 'მომწოდებლებს',                  ru: 'Поставщикам',               en: 'For suppliers',             href: '/union/partnership' },
      { ka: 'ვაკანსიები',                    ru: 'Вакансии',                  en: 'Careers',                   href: '/union/careers' },
    ],
  },
  {
    titleKey: 'forBuyer',
    links: [
      { ka: 'შეკვეთის გადახდა',              ru: 'Оплата заказа',             en: 'Order payment',             href: '/union/delivery' },
      { ka: 'შეკვეთის შემოწმება',            ru: 'Проверка заказа',           en: 'Order tracking',            href: '#' },
      { ka: 'შეფასების დატოვება',            ru: 'Оставить отзыв',            en: 'Leave a review',            href: '#' },
      { ka: 'ფასდაკლებული საქონელი',         ru: 'Товары со скидкой',         en: 'Sale items',                href: '/union/sale' },
      { ka: 'საწყობი',                       ru: 'Склад',                     en: 'Warehouse',                 href: '/union/showrooms' },
      { ka: 'მომხმარებელთა სერვისი',         ru: 'Клиентская служба',         en: 'Customer service',          href: '/union/contact' },
      { ka: 'სად ვიყიდოთ',                   ru: 'Где купить',                en: 'Where to buy',              href: '/union/showrooms' },
      { ka: 'კონფიდენციალურობა',             ru: 'Конфиденциальность',        en: 'Privacy',                   href: '/union/privacy' },
    ],
  },
  {
    titleKey: 'usefulFooter',
    links: [
      { ka: 'ბლოგი',                          ru: 'Блог',                      en: 'Blog',                      href: '/union/blog' },
      { ka: 'FAQ',                            ru: 'FAQ',                       en: 'FAQ',                       href: '#' },
      { ka: 'პატენტები და სერტიფიკატები',    ru: 'Патенты и сертификаты',     en: 'Patents & certificates',    href: '#' },
      { ka: 'როგორ ავირჩიოთ კარი?',         ru: 'Как выбрать дверь?',        en: 'How to choose a door?',     href: '/union/blog' },
      { ka: 'მოვლის რჩევები',                ru: 'Советы по уходу',           en: 'Care tips',                 href: '/union/blog' },
    ],
  },
];

export function UnionFooter() {
  const { language, t } = useLanguage();
  const { data: settings } = useSiteSettings();

  const phone = settings?.phone || '+7 (495) 110 49 79';
  const email = settings?.email || 'info@union.ru';

  const socials = [
    { href: settings?.instagram_url ?? '#', label: 'Instagram', Icon: Instagram },
    { href: settings?.facebook_url ?? '#', label: 'Facebook', Icon: Facebook },
    { href: '#', label: 'Telegram', Icon: Send },
    { href: settings?.youtube_url ?? '#', label: 'YouTube', Icon: Youtube },
    { href: settings?.pinterest_url ?? '#', label: 'Pinterest', Icon: Bookmark },
    { href: settings?.tiktok_url ?? '#', label: 'TikTok', Icon: Music2 },
  ];

  return (
    <footer className="bg-primary text-white/90 mt-12">
      <div className="union-container py-12 md:py-16">
        {/* Top: contact + columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_3fr] gap-10 mb-12">
          <div>
            <a
              href={`tel:${phone.replace(/\s|\(|\)|-/g, '')}`}
              className="block text-[22px] md:text-[26px] font-bold leading-tight tracking-tight hover:text-white"
            >
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="block mt-2 text-[14px] uppercase tracking-[0.04em] hover:text-white"
            >
              {email}
            </a>
            <div className="mt-6 text-[13px] text-white/70 leading-relaxed">
              {language === 'ka'
                ? 'მეტი იდეა ოცნების ინტერიერისთვის — UNION-ის ოფიციალურ ტელეგრამ არხზე'
                : language === 'en'
                  ? 'More ideas for your dream interior — on the official UNION Telegram channel'
                  : 'Больше идей для интерьера мечты — в официальном Telegram-канале UNION'}
            </div>
            <div className="mt-6 flex items-center gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href !== '#' ? '_blank' : undefined}
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-colors"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerSections.map((section) => (
              <div key={section.titleKey}>
                <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] mb-4 text-white">
                  {t(section.titleKey)}
                </h4>
                <ul className="space-y-2.5">
                  {section.links.map((link) => (
                    <li key={`${section.titleKey}-${link.href}-${link.ru}`}>
                      <Link
                        to={link.href}
                        className="text-[13px] text-white/70 hover:text-white transition-colors"
                      >
                        {language === 'ka' ? link.ka : language === 'en' ? link.en : link.ru}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/15 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[12px] text-white/50">
            {t('allRightsReserved')}
          </p>
          <div className="flex items-center gap-5 text-[12px] text-white/60">
            <Link to="/union/privacy" className="hover:text-white">{t('privacy')}</Link>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10 bg-primary-deep">
        <div className="union-container py-4">
          <p className="text-[10px] text-white/40 leading-relaxed">
            {language === 'ka'
              ? 'საქონლის ფასები და აღწერილობა მხოლოდ ინფორმაციული ხასიათისაა და არ წარმოადგენს საჯარო შეთავაზებას.'
              : language === 'en'
                ? 'Prices and product descriptions are for informational purposes only and do not constitute a public offer. Reproduction of any pages of the site without permission is PROHIBITED.'
                : 'Цены и описание товаров носят исключительно ознакомительный характер и не являются публичной офертой. Перепечатка без разрешения страниц сайта ЗАПРЕЩЕНА.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
