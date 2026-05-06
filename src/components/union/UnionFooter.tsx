import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Instagram, Youtube, Send, Bookmark, Music2 } from 'lucide-react';

const sections = [
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
    titleKey: 'services',
    links: [
      { ka: 'უფასო გაზომვა',                 ru: 'Обмер бесплатно',           en: 'Free measurement',          href: '#' },
      { ka: 'მიწოდება და მონტაჟი',           ru: 'Доставка и монтаж',         en: 'Delivery & installation',   href: '/union/delivery' },
      { ka: 'კონსულტანტის გამოძახება',       ru: 'Вызов консультанта на дом', en: 'On-site consultation',      href: '/union/contact' },
      { ka: 'კარების რესტავრაცია',           ru: 'Реставрация дверей',        en: 'Door restoration',          href: '#' },
      { ka: 'გარანტია',                      ru: 'Гарантия',                  en: 'Warranty',                  href: '/union/warranty' },
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
  {
    titleKey: 'pressCenter',
    links: [
      { ka: 'ჩვენი პროექტები',                ru: 'Наши проекты',              en: 'Our projects',              href: '/union/about' },
      { ka: 'სიახლეები',                      ru: 'Новости компании',          en: 'Company news',              href: '/union/blog' },
      { ka: 'ვიდეომასალები',                  ru: 'Видеоматериалы',            en: 'Videos',                    href: '/union/about' },
    ],
  },
];

export function UnionFooter() {
  const { language, t } = useLanguage();
  const { data: settings } = useSiteSettings();
  const phone = settings?.phone || '8 800 550 52 24';
  const email = settings?.email || 'info@union.ru';

  const socials = [
    { href: settings?.instagram_url ?? '#', label: 'Instagram', Icon: Instagram },
    { href: '#', label: 'Telegram', Icon: Send },
    { href: settings?.youtube_url ?? '#', label: 'YouTube', Icon: Youtube },
    { href: settings?.pinterest_url ?? '#', label: 'Pinterest', Icon: Bookmark },
    { href: settings?.tiktok_url ?? '#', label: 'TikTok', Icon: Music2 },
  ];

  return (
    <footer id="footer-main-new" className="bg-black text-[#cbcbcb] mt-12">
      {/* first-row: telegram banner */}
      <div className="union-container py-5 md:py-6">
        <p className="text-center md:text-left text-[15px] text-[#cbcbcb]">
          {language === 'ka'
            ? 'მეტი იდეა ოცნების ინტერიერისთვის — ოფიციალურ '
            : language === 'en'
              ? 'More ideas for your dream interior — on the official '
              : 'Больше идей для интерьера мечты — в официальном '}
          <a href="https://t.me/unionofficial" target="_blank" rel="noreferrer" className="text-white underline hover:text-[hsl(var(--sale))]">
            {language === 'ka' ? 'UNION-ის ტელეგრამ არხზე' : language === 'en' ? 'UNION Telegram channel' : 'телеграм канале UNION'}
          </a>
        </p>
      </div>

      {/* second-row: phone + email */}
      <div className="border-y border-[hsl(var(--footer-divider))]">
        <div className="union-container py-4 text-center text-white">
          <a href={`tel:${phone.replace(/\s|\(|\)|-/g, '')}`} className="text-[18px] font-normal tracking-[2px] hover:text-[hsl(var(--sale))] transition-colors">
            {phone}
          </a>
          <a href={`mailto:${email}`} className="ml-4 text-[18px] font-normal tracking-[2px] uppercase hover:text-[hsl(var(--sale))] transition-colors">
            {email}
          </a>
        </div>
      </div>

      {/* third-row: 6 columns */}
      <div className="union-container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-10 mx-auto" style={{ maxWidth: '85%' }}>
          {sections.map((section) => (
            <div key={section.titleKey}>
              <p className="text-[15px] font-medium uppercase border-t border-[hsl(var(--footer-divider))] pt-3 mb-4 text-white">
                {t(section.titleKey)}
              </p>
              <ul className="space-y-2.5">
                {section.links.map((link, idx) => (
                  <li key={`${section.titleKey}-${idx}`}>
                    <Link
                      to={link.href}
                      className="text-[15px] font-light text-white hover:text-[hsl(var(--sale))] transition-colors"
                    >
                      {language === 'ka' ? link.ka : language === 'en' ? link.en : link.ru}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* soc-row */}
        <div className="mx-auto mt-12 pt-6 border-t border-[hsl(var(--footer-divider))]" style={{ maxWidth: '85%' }}>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <ul className="flex items-center gap-4">
              {socials.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href !== '#' ? '_blank' : undefined}
                    rel="noreferrer"
                    className="text-white hover:text-[hsl(var(--sale))] transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-right text-[14px] text-[#c5c5c5]">
              {t('allRightsReserved')}
            </p>
          </div>
        </div>
      </div>

      {/* last-row: disclaimer */}
      <div className="border-t border-[hsl(var(--footer-divider))]">
        <div className="union-container py-5 text-center">
          <p className="text-[12px] text-[#c5c5c5] mx-auto" style={{ maxWidth: '1200px' }}>
            {language === 'ka'
              ? 'საქონლის ფასები და აღწერილობა მხოლოდ ინფორმაციული ხასიათისაა და არ წარმოადგენს საჯარო შეთავაზებას. საიტის გვერდების და მათი ეკრანის ასლების გამრავლება ნებართვის გარეშე იკრძალება.'
              : language === 'en'
                ? 'Prices and product descriptions are for informational purposes only and do not constitute a public offer. Reproduction of any pages of the site or screenshots without permission is PROHIBITED.'
                : 'Цены и описание товаров носят исключительно ознакомительный характер и не являются публичной офертой! Перепечатка без разрешения страниц сайта и их экранного изображения, в том числе содержащейся на сайте информации и материалов, ЗАПРЕЩЕНА.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
