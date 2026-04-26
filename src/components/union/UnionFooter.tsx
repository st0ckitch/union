import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Youtube, Send, Facebook, Music2, Bookmark, Rss } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const footerSections = [
  {
    titleKey: 'catalogFooter',
    links: [
      { name_ru: 'Ассортимент Union',         name_ka: 'ასორტიმენტი Union',           name_en: 'Union assortment',          href: '/union/catalog' },
      { name_ru: 'Двери из Италии',           name_ka: 'იტალიური კარები',             name_en: 'Doors from Italy',          href: '/union/catalog/italian-doors' },
      { name_ru: 'Sale',                       name_ka: 'Sale',                        name_en: 'Sale',                       href: '/union/sale' },
      { name_ru: 'Контрактные двери',         name_ka: 'საკონტრაქტო კარები',           name_en: 'Contract doors',             href: '/union/catalog/contract' },
      { name_ru: 'Скачать каталог UNION',     name_ka: 'ჩამოტვირთეთ კატალოგი',         name_en: 'Download UNION catalog',     href: '#' },
    ],
  },
  {
    titleKey: 'cooperation',
    links: [
      { name_ru: 'О компании',                 name_ka: 'კომპანიის შესახებ',           name_en: 'About the company',          href: '/union/about' },
      { name_ru: 'Дилерам',                   name_ka: 'დილერებს',                    name_en: 'For dealers',                href: '/union/partnership' },
      { name_ru: 'Архитекторам и дизайнерам', name_ka: 'არქიტექტორებს და დიზაინერებს', name_en: 'For architects & designers', href: '/union/designers' },
      { name_ru: 'Корпоративным клиентам',     name_ka: 'კორპორატიულ კლიენტებს',       name_en: 'Corporate clients',          href: '/union/partnership#corporate' },
      { name_ru: 'Конфигуратор',               name_ka: 'კონფიგურატორი',               name_en: 'Configurator',               href: '/union/configurator' },
      { name_ru: 'Поставщикам',                name_ka: 'მომწოდებლებს',               name_en: 'For suppliers',              href: '/union/suppliers' },
      { name_ru: 'Вакансии',                   name_ka: 'ვაკანსიები',                  name_en: 'Careers',                    href: '/union/careers' },
    ],
  },
  {
    titleKey: 'forBuyer',
    links: [
      { name_ru: 'Оплата заказа',              name_ka: 'შეკვეთის გადახდა',           name_en: 'Order payment',              href: '/union/payment' },
      { name_ru: 'Проверка заказа',            name_ka: 'შეკვეთის შემოწმება',         name_en: 'Order tracking',             href: '/union/order-check' },
      { name_ru: 'Оставить отзыв',             name_ka: 'შეფასების დატოვება',         name_en: 'Leave a review',             href: '/union/review' },
      { name_ru: 'Товары со скидкой',          name_ka: 'ფასდაკლებული საქონელი',      name_en: 'Sale items',                 href: '/union/sale' },
      { name_ru: 'Склад',                      name_ka: 'საწყობი',                    name_en: 'Warehouse',                  href: '/union/warehouse' },
      { name_ru: 'Клиентская служба',          name_ka: 'მომხმარებელთა სერვისი',      name_en: 'Customer service',           href: '/union/support' },
      { name_ru: 'Где купить',                 name_ka: 'სად ვიყიდოთ',                 name_en: 'Where to buy',               href: '/union/showrooms' },
      { name_ru: 'Политика конфиденциальности', name_ka: 'კონფიდენციალურობის პოლიტიკა', name_en: 'Privacy policy',           href: '/union/privacy' },
    ],
  },
  {
    titleKey: 'services',
    links: [
      { name_ru: 'Обмер бесплатно',            name_ka: 'უფასო გაზომვა',              name_en: 'Free measurement',           href: '/union/services/measurement' },
      { name_ru: 'Доставка и монтаж',          name_ka: 'მიწოდება და მონტაჟი',         name_en: 'Delivery & installation',    href: '/union/delivery' },
      { name_ru: 'Вызов консультанта на дом',  name_ka: 'კონსულტანტის გამოძახება',     name_en: 'On-site consultation',       href: '/union/consultation' },
      { name_ru: 'Реставрация дверей',         name_ka: 'კარების რესტავრაცია',         name_en: 'Door restoration',           href: '/union/restoration' },
      { name_ru: 'Гарантия',                   name_ka: 'გარანტია',                    name_en: 'Warranty',                   href: '/union/warranty' },
    ],
  },
  {
    titleKey: 'usefulFooter',
    links: [
      { name_ru: 'Блог',                       name_ka: 'ბლოგი',                       name_en: 'Blog',                       href: '/union/blog' },
      { name_ru: 'FAQ',                        name_ka: 'FAQ',                         name_en: 'FAQ',                        href: '/union/faq' },
      { name_ru: 'Патенты и сертификаты',      name_ka: 'პატენტები და სერტიფიკატები',  name_en: 'Patents & certificates',     href: '/union/certificates' },
      { name_ru: 'Как выбрать дверь?',         name_ka: 'როგორ ავირჩიოთ კარი?',       name_en: 'How to choose a door?',      href: '/union/blog/how-to-choose' },
      { name_ru: 'Особенности дверей',         name_ka: 'კარების თავისებურებები',     name_en: 'Door features',              href: '/union/blog/features' },
      { name_ru: 'Советы по эксплуатации и уходу', name_ka: 'მოვლის რჩევები',         name_en: 'Care tips',                  href: '/union/blog/care-tips' },
    ],
  },
  {
    titleKey: 'pressCenter',
    links: [
      { name_ru: 'Наши проекты',               name_ka: 'ჩვენი პროექტები',             name_en: 'Our projects',               href: '/union/projects' },
      { name_ru: 'Новости компании',           name_ka: 'კომპანიის სიახლეები',         name_en: 'Company news',               href: '/union/news' },
      { name_ru: 'Видеоматериалы',             name_ka: 'ვიდეომასალები',               name_en: 'Videos',                     href: '/union/videos' },
    ],
  },
];

export function UnionFooter() {
  const { language, t } = useLanguage();
  const { data: settings } = useSiteSettings();

  const socials = [
    { href: settings?.instagram_url ?? '#', label: 'Instagram', Icon: Instagram },
    { href: settings?.facebook_url ?? '#', label: 'Facebook', Icon: Facebook },
    { href: '#', label: 'VK', Icon: Rss },
    { href: '#', label: 'Telegram', Icon: Send },
    { href: settings?.youtube_url ?? '#', label: 'YouTube', Icon: Youtube },
    { href: settings?.pinterest_url ?? '#', label: 'Pinterest', Icon: Bookmark },
    { href: settings?.tiktok_url ?? '#', label: 'TikTok', Icon: Music2 },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Telegram banner */}
      <div className="border-b border-white/10 py-4">
        <div className="container">
          <p className="text-sm">
            {language === 'en'
              ? 'More ideas for your dream interior — on the official'
              : language === 'ru'
                ? 'Больше идей для интерьера мечты - в официальном'
                : 'მეტი იდეა ოცნების ინტერიერისთვის - ოფიციალურ'}{' '}
            <a href="#" className="underline hover:text-white/80">
              {language === 'en'
                ? 'UNION Telegram channel'
                : language === 'ru'
                  ? 'телеграм канале UNION'
                  : 'UNION-ის ტელეგრამ არხზე'}
            </a>
          </p>
        </div>
      </div>

      {/* Contact bar */}
      <div className="border-b border-white/10 py-6">
        <div className="container flex flex-wrap items-center justify-center gap-8">
          <a href="tel:+995322000000" className="text-xl md:text-2xl font-light hover:text-white/80 transition-colors">
            8 800 550 52 24
          </a>
          <a href="mailto:info@union.ge" className="text-xl md:text-2xl font-light hover:text-white/80 transition-colors">
            INFO@UNION.GE
          </a>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h4 className="font-bold text-sm mb-4 tracking-wider">{t(section.titleKey)}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {language === 'ka'
                        ? link.name_ka
                        : language === 'en'
                          ? ((link as any).name_en || link.name_ru)
                          : link.name_ru}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social links and copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 flex-wrap">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href !== '#' ? '_blank' : undefined}
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          <p className="text-sm text-white/50">
            © {language === 'en'
              ? 'Official site of UNION — manufacturer of doors and furniture, since 1990'
              : language === 'ru'
                ? 'Официальный сайт производителя дверей и мебели UNION 1990'
                : 'კარებისა და ავეჯის მწარმოებელი UNION-ის ოფიციალური საიტი 1990'}
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10 py-4">
        <div className="container">
          <p className="text-[10px] text-white/40 text-center leading-relaxed">
            {language === 'en'
              ? 'Prices and product descriptions are for informational purposes only and do not constitute a public offer. Reproduction of any pages of the site, screenshots or content without permission is PROHIBITED.'
              : language === 'ru'
                ? 'Цены и описание товаров носят исключительно ознакомительный характер и не являются публичной офертой! Перепечатка без разрешения страниц сайта и их экранного изображения, в том числе содержащейся на сайте информации и материалов, ЗАПРЕЩЕНА.'
                : 'საქონლის ფასები და აღწერილობა მხოლოდ ინფორმაციულ ხასიათს ატარებს და არ წარმოადგენს საჯარო შეთავაზებას!'}
          </p>
        </div>
      </div>
    </footer>
  );
}
