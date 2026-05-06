import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ka' | 'ru' | 'en';

const LANG_STORAGE_KEY = 'union.language';

function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'ka';
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'ka' || stored === 'ru' || stored === 'en') return stored;
  } catch {
    // ignore (private mode, etc.)
  }
  return 'ka';
}

interface TranslationObject {
  ka: string;
  ru?: string;
  en?: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyOrObj: string | TranslationObject) => string;
}

// Translations dictionary
const translations: Record<string, { ka: string; ru: string; en?: string }> = {
  // Header
  'catalog': { ka: 'კატალოგი', ru: 'КАТАЛОГ', en: 'CATALOG' },
  'showrooms': { ka: 'შოურუმები', ru: 'ШОУ-РУМЫ', en: 'SHOWROOMS' },
  'forBuyers': { ka: 'მყიდველებს', ru: 'ПОКУПАТЕЛЯМ', en: 'FOR BUYERS' },
  'forDesigners': { ka: 'დიზაინერებს', ru: 'ДИЗАЙНЕРАМ', en: 'FOR DESIGNERS' },
  'useful': { ka: 'სასარგებლო', ru: 'ПОЛЕЗНОЕ', en: 'HELPFUL' },
  'sales': { ka: 'აქციები %', ru: 'АКЦИИ %', en: 'SALE %' },
  'aboutCompany': { ka: 'კომპანია', ru: 'О КОМПАНИИ', en: 'ABOUT' },
  'contacts': { ka: 'კონტაქტი', ru: 'КОНТАКТЫ', en: 'CONTACTS' },

  // Hero
  'hurryBuy': { ka: 'მოასწარი ყიდვა!', ru: 'УСПЕЙ КУПИТЬ!', en: 'HURRY UP!' },
  'atPrices2025': { ka: '2025 წლის ფასებით', ru: 'ПО ЦЕНАМ 2025 года', en: 'AT 2025 PRICES' },
  'doorsAndFurniture': { ka: 'კარები და ავეჯი', ru: 'ДВЕРИ И МЕБЕЛЬ', en: 'DOORS & FURNITURE' },
  'until': { ka: 'ვადა:', ru: 'до', en: 'until' },
  'moreDetails': { ka: 'დაწვრილებით', ru: 'ПОДРОБНЕЕ', en: 'LEARN MORE' },

  // Products
  'doorsAndFurnitureUnion': { ka: 'კარები და ავეჯი UNION', ru: 'Двери и мебель UNION', en: 'UNION Doors & Furniture' },
  'toCatalog': { ka: 'კატალოგში', ru: 'В КАТАЛОГ', en: 'TO CATALOG' },
  'swingDoors': { ka: 'გაშლადი კარები', ru: 'Распашные двери', en: 'Swing Doors' },
  'slidingDoors': { ka: 'სრიალა კარები', ru: 'Раздвижные двери', en: 'Sliding Doors' },
  'slidingPartitions': { ka: 'სრიალა ტიხრები', ru: 'Раздвижные перегородки', en: 'Sliding Partitions' },
  'stationaryPartitions': { ka: 'სტაციონარული ტიხრები', ru: 'Стационарные перегородки', en: 'Stationary Partitions' },
  'wallPanels': { ka: 'კედლის პანელები', ru: 'Стеновые панели', en: 'Wall Panels' },
  'wardrobes': { ka: 'საგარდერობო', ru: 'Гардеробная', en: 'Wardrobes' },
  'furniture': { ka: 'ავეჯი', ru: 'Мебель', en: 'Furniture' },
  'vitrinesCommodes': { ka: 'ვიტრინები, კომოდები', ru: 'Комоды, витрины', en: 'Vitrines & Commodes' },

  // Quick links
  'inStock': { ka: 'მარაგშია', ru: 'В наличии', en: 'In Stock' },
  'inStockDesc': { ka: 'მზა პროდუქცია მიწოდებით', ru: 'отгрузим со склада в день покупки', en: 'Ready stock, same-day shipping' },
  'promotions': { ka: 'აქციები', ru: 'Акции', en: 'Promotions' },
  'promotionsDesc': { ka: 'სპეციალური შეთავაზებები', ru: 'актуальные акции и распродажи', en: 'Current offers and sales' },
  'reviews': { ka: 'შეფასებები', ru: 'Отзывы', en: 'Reviews' },
  'reviewsDesc': { ka: 'მომხმარებელთა რეცენზიები', ru: 'отзывы о компании, обратная связь', en: 'Customer feedback' },

  // Trends
  'trends': { ka: 'ტრენდები', ru: 'Тренды', en: 'Trends' },
  'portfolio': { ka: 'პორტფოლიო', ru: 'Портфолио', en: 'Portfolio' },
  'portfolioDesc': { ka: 'განხორციელებული პროექტები', ru: 'реализованные проекты', en: 'Completed projects' },
  'youtube': { ka: 'YouTube', ru: 'YouTube', en: 'YouTube' },
  'youtubeDesc': { ka: 'ვიდეო მიმოხილვები', ru: 'обзор продукции на нашем канале', en: 'Product video tours' },
  'newArrivals': { ka: 'სიახლეები', ru: 'Новинки', en: 'New Arrivals' },
  'newArrivalsDesc': { ka: 'ახალი პროდუქცია', ru: 'подборка новых продуктов', en: 'Latest products' },

  // Testimonials
  'starsAboutUs': { ka: 'ვარსკვლავები ჩვენზე', ru: 'Звезды о нас', en: 'Stars about us' },

  // Article
  'whyChooseStandardDoors': {
    ka: 'რატომ ღირს სტანდარტული ზომის კარების არჩევა?',
    ru: 'Почему стоит выбирать двери стандартных размеров?',
    en: 'Why choose standard-size doors?',
  },
  'articleDesc': {
    ka: 'ეძებთ იდეალურ კარებს თქვენი ბინისთვის ან სახლისთვის, მაგრამ გაინტერესებთ რა ზომა აირჩიოთ?',
    ru: 'Ищете идеальные двери для вашей квартиры или дома, но столкнулись с вопросом, какой размер выбрать?',
    en: 'Looking for the perfect doors for your home but not sure which size to pick?',
  },

  // Company
  'aboutCompanyTitle': { ka: 'კომპანიის შესახებ', ru: 'О компании', en: 'About the company' },
  'companyDesc': {
    ka: '1990 წელს დაარსებული კომპანია UNION დღეს ლიდერია კარებისა და ავეჯის ბაზარზე.',
    ru: 'Основанная в 1990 году компания UNION на сегодняшний день является лидером рынка по производству дверей и мебели.',
    en: 'Founded in 1990, UNION is today a leader in premium doors and furniture.',
  },
  'ourProjects': { ka: 'ჩვენი პროექტები', ru: 'Наши проекты', en: 'Our projects' },
  'news': { ka: 'სიახლეები', ru: 'Новости', en: 'News' },
  'tvAboutUs': { ka: 'TV ჩვენზე', ru: 'ТВ о нас', en: 'TV about us' },
  'career': { ka: 'კარიერა', ru: 'Карьера', en: 'Careers' },

  // Footer
  'catalogFooter': { ka: 'კატალოგი', ru: 'КАТАЛОГ', en: 'CATALOG' },
  'cooperation': { ka: 'თანამშრომლობა', ru: 'СОТРУДНИЧЕСТВО', en: 'PARTNERSHIP' },
  'forBuyer': { ka: 'მყიდველს', ru: 'ПОКУПАТЕЛЮ', en: 'FOR BUYERS' },
  'services': { ka: 'სერვისები', ru: 'УСЛУГИ', en: 'SERVICES' },
  'usefulFooter': { ka: 'სასარგებლო', ru: 'ПОЛЕЗНОЕ', en: 'HELPFUL' },
  'pressCenter': { ka: 'პრესცენტრი', ru: 'ПРЕСС-ЦЕНТР', en: 'PRESS CENTER' },

  // Mega menu
  'unionAssortment': { ka: 'ასორტიმენტი UNION', ru: 'Ассортимент UNION', en: 'UNION Assortment' },
  'orderFromItaly': { ka: 'იტალიიდან შეკვეთით', ru: 'На заказ из Италии', en: 'Made to order from Italy' },
  'forDevelopers': { ka: 'დეველოპერებისთვის', ru: 'Для застройщиков', en: 'For developers' },

  // 35 years badge
  'yearsOfExcellence': { ka: 'წლიანი გამოცდილება', ru: 'ЛЕТ УВЕРЕННОГО ПРЕВОСХОДСТВА', en: 'YEARS OF EXCELLENCE' },

  // Search
  'search': { ka: 'ძიება...', ru: 'Поиск...', en: 'Search...' },

  // Schedule
  'workingHours': { ka: 'ორშ-შაბ: 10:00 - 19:00', ru: 'Пн-Сб: 10:00 - 19:00', en: 'Mon-Sat: 10:00 - 19:00' },

  // HMspace landing - nav (villa-haven style)
  'navHome': { ka: 'მთავარი', ru: 'ГЛАВНАЯ', en: 'Home' },
  'navAbout': { ka: 'ჩვენ შესახებ', ru: 'О НАС', en: 'About' },
  'navBrand': { ka: 'ბრენდი', ru: 'БРЕНД', en: 'Brand' },
  'unionNav': { ka: 'UNION', ru: 'UNION', en: 'UNION' },
  'navProjects': { ka: 'ღირებულებები', ru: 'ЦЕННОСТИ', en: 'Values' },
  'navContact': { ka: 'კონტაქტი', ru: 'КОНТАКТ', en: 'Contact' },
  'navShowroom': { ka: 'შოურუმი', ru: 'ШОУ-РУМ', en: 'Showroom' },
  'navProducts': { ka: 'პროდუქცია', ru: 'ПРОДУКЦИЯ', en: 'Products' },
  'navInStock': { ka: 'მარაგშია', ru: 'В НАЛИЧИИ', en: 'In Stock' },
  'navSale': { ka: 'ფასდაკლება', ru: 'СКИДКИ', en: 'Sale' },
  'navNews': { ka: 'სიახლეები', ru: 'НОВОСТИ', en: 'News' },
  'navBlog': { ka: 'ბლოგი', ru: 'БЛОГ', en: 'Blog' },
  'orderCall': { ka: 'ზარის მოთხოვნა', ru: 'Заказать звонок', en: 'Order a Call' },

  // HMspace hero
  'heroEyebrow': {
    ka: 'ინტერიერის პრემიუმ ბრენდების სახლი',
    ru: 'Дом премиальных интерьерных брендов',
    en: 'Home of premium interior brands',
  },
  'heroTagline': {
    ka: 'პრემიუმ ინტერიერის გადაწყვეტილებები',
    ru: 'Премиальные решения для интерьера',
    en: 'Premium interior solutions',
  },
  'heroSub': {
    ka: 'HMspace აერთიანებს საუკეთესო ბრენდებს ინტერიერის დიზაინში — თქვენი სივრცისთვის, რომელიც ცხოვრებას იცვლის.',
    ru: 'HMspace объединяет лучшие бренды в дизайне интерьера — для пространства, которое меняет жизнь.',
    en: 'HMspace brings together the best brands in interior design — for a space that transforms the way you live.',
  },
  'heroCtaExplore': {
    ka: 'ბრენდების გაცნობა',
    ru: 'Узнать бренды',
    en: 'Explore brands',
  },
  'heroCtaUnion': {
    ka: 'UNION-ში გადასვლა',
    ru: 'Перейти в UNION',
    en: 'Enter UNION',
  },

  // Brand / About sections
  'brandEyebrow': { ka: 'HMSPACE-ის შესახებ', ru: 'О HMSPACE', en: 'About HMspace' },
  'brandTitle': {
    ka: 'ერთი სივრცე, საუკეთესო ბრენდები',
    ru: 'Одно пространство — лучшие бренды',
    en: 'One space, the finest brands',
  },
  'brandBody': {
    ka: 'HMspace — პლატფორმაა, რომელიც აერთიანებს პრემიუმ იტალიურ და ევროპულ ბრენდებს. ჩვენი მიზანია, დიზაინერებს, არქიტექტორებს და მომხმარებელს ერთ სივრცეში მივცეთ წვდომა უმაღლესი ხარისხის კარებზე, ავეჯზე და ინტერიერის გადაწყვეტილებებზე.',
    ru: 'HMspace — платформа, объединяющая премиальные итальянские и европейские бренды. Наша цель — предоставить дизайнерам, архитекторам и клиентам доступ к дверям, мебели и интерьерным решениям высочайшего качества в одном пространстве.',
    en: 'HMspace is a platform that unites premium Italian and European brands. Our mission is to give designers, architects, and end clients one place where they can access doors, furniture, and interior solutions of the highest quality.',
  },

  'valuesTitle': {
    ka: 'რა გვაქცევს HMspace-ად',
    ru: 'Что делает нас HMspace',
    en: 'What makes us HMspace',
  },
  'value1Title': { ka: 'კურირებული ბრენდები', ru: 'Кураторская подборка брендов', en: 'Curated brands' },
  'value1Desc': {
    ka: 'თითოეული ბრენდი, რომელსაც ვამატებთ, გადის ხარისხის, დიზაინისა და მდგრადობის ფილტრს.',
    ru: 'Каждый бренд проходит фильтр качества, дизайна и устойчивости.',
    en: 'Every brand we add passes a filter for quality, design, and durability.',
  },
  'value2Title': { ka: 'დიზაინერული მხარდაჭერა', ru: 'Поддержка дизайнеров', en: 'Designer support' },
  'value2Desc': {
    ka: 'პროფესიონალი კონსულტანტები, რომლებიც გვერდით გიდგანან პროექტის ყოველ ეტაპზე.',
    ru: 'Профессиональные консультанты сопровождают на каждом этапе проекта.',
    en: 'Professional consultants stand with you at every stage of the project.',
  },
  'value3Title': { ka: 'ერთი წყარო', ru: 'Единая точка', en: 'Single source' },
  'value3Desc': {
    ka: 'კარებიდან ავეჯამდე — ყველაფერი ერთი ბრენდის ეკოსისტემის ფარგლებში.',
    ru: 'От дверей до мебели — всё в одной экосистеме.',
    en: 'From doors to furniture — everything under one brand ecosystem.',
  },
  'value4Title': { ka: 'იტალიური მემკვიდრეობა', ru: 'Итальянское наследие', en: 'Italian heritage' },
  'value4Desc': {
    ka: 'ჩვენი ბრენდები ინარჩუნებენ ევროპული ხელოსნობის უძველეს ტრადიციებს.',
    ru: 'Наши бренды хранят старинные традиции европейского мастерства.',
    en: 'Our brands carry the enduring traditions of European craftsmanship.',
  },

  'statsTitle': { ka: 'რიცხვები', ru: 'В цифрах', en: 'By the numbers' },
  'stat1Label': { ka: 'წლიანი გამოცდილება', ru: 'лет опыта', en: 'years of experience' },
  'stat2Label': { ka: 'დასრულებული პროექტი', ru: 'завершённых проектов', en: 'completed projects' },
  'stat3Label': { ka: 'პარტნიორი ბრენდი', ru: 'брендов-партнёров', en: 'partner brands' },
  'stat4Label': { ka: 'ბედნიერი კლიენტი', ru: 'счастливых клиентов', en: 'happy clients' },

  'missionTitle': { ka: 'ჩვენი მისია', ru: 'Наша миссия', en: 'Our mission' },
  'missionBody': {
    ka: 'ვქმნით სივრცეს, სადაც ხარისხი, დიზაინი და ემოცია ერთმანეთს ხვდება. HMspace-ის თითოეული გადაწყვეტილება მიზნად ისახავს სახლის ან ოფისის გადაქცევას პირადი ისტორიის ნაწილად.',
    ru: 'Мы создаём пространство, где качество, дизайн и эмоция встречаются. Каждое решение HMspace направлено на то, чтобы превратить дом или офис в часть вашей личной истории.',
    en: 'We create a space where quality, design, and emotion meet. Every HMspace decision is made to turn a home or office into a part of your personal story.',
  },

  // Sections
  'mainAccents': { ka: 'მთავარი აქცენტები', ru: 'ГЛАВНЫЕ АКЦЕНТЫ', en: 'MAIN ACCENTS' },
  'currentlyTrending': { ka: 'აქტუალურია', ru: 'АКТУАЛЬНО', en: 'CURRENTLY' },
  'ourBrands': { ka: 'ჩვენი ბრენდი', ru: 'НАШ БРЕНД', en: 'OUR BRAND' },

  // Union spotlight
  'unionTagline': {
    ka: '35+ წლიანი გამოცდილება პრემიუმ იტალიურ პროდუქციაში',
    ru: '35+ лет опыта в премиальной итальянской продукции',
    en: '35+ years of expertise in premium Italian craftsmanship',
  },
  'enterUnionCatalog': { ka: 'UNION კატალოგში შესვლა', ru: 'ВОЙТИ В КАТАЛОГ UNION', en: 'ENTER UNION CATALOG' },

  // Categories
  'catFurniture': { ka: 'ავეჯი', ru: 'МЕБЕЛЬ', en: 'FURNITURE' },
  'catBathroom': { ka: 'სააბაზანო', ru: 'ВАННАЯ', en: 'BATHROOM' },
  'catTiles': { ka: 'ფილა', ru: 'ПЛИТКА', en: 'TILES' },
  'catKitchen': { ka: 'სამზარეულო', ru: 'КУХНЯ', en: 'KITCHEN' },
  'catParquet': { ka: 'პარკეტი', ru: 'ПАРКЕТ', en: 'PARQUET' },
  'catDoors': { ka: 'კარი', ru: 'ДВЕРИ', en: 'DOORS' },
  'catLighting': { ka: 'განათება & აქსესუარები', ru: 'СВЕТ & АКСЕССУАРЫ', en: 'LIGHTING & ACCESSORIES' },

  // Projects section
  'ourProjectsTitle': { ka: 'ჩვენი პროექტები', ru: 'НАШИ ПРОЕКТЫ', en: 'OUR PROJECTS' },
  'viewMore': { ka: 'მეტი', ru: 'БОЛЬШЕ', en: 'MORE' },

  // Newsletter
  'newsletterTitle': {
    ka: 'გამოიწერე სიახლეები',
    ru: 'ПОДПИСАТЬСЯ НА РАССЫЛКУ',
    en: 'SUBSCRIBE TO OUR NEWSLETTER',
  },
  'emailPlaceholder': { ka: 'თქვენი ელფოსტა', ru: 'Ваш email', en: 'Your email' },
  'subscribe': { ka: 'გამოწერა', ru: 'ПОДПИСАТЬСЯ', en: 'SUBSCRIBE' },

  // Footer
  'footerProducts': { ka: 'პროდუქცია', ru: 'ПРОДУКЦИЯ', en: 'PRODUCTS' },
  'footerAbout': { ka: 'ჩვენ შესახებ', ru: 'О НАС', en: 'ABOUT' },
  'footerSupport': { ka: 'მხარდაჭერა', ru: 'ПОДДЕРЖКА', en: 'SUPPORT' },
  'footerConnect': { ka: 'დაგვიკავშირდი', ru: 'СВЯЗЬ', en: 'CONNECT' },
  'allRightsReserved': {
    ka: '© 2026. ყველა უფლება დაცულია.',
    ru: '© 2026. Все права защищены.',
    en: '© 2026. All Rights Reserved.',
  },
  'privacy': { ka: 'კონფიდენციალურობა', ru: 'Конфиденциальность', en: 'Privacy' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => readStoredLanguage());

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = (keyOrObj: string | TranslationObject): string => {
    if (typeof keyOrObj === 'string') {
      const translation = translations[keyOrObj];
      if (!translation) return keyOrObj;
      return translation[language] ?? translation.ka;
    }

    if (language === 'ka' && keyOrObj.ka) return keyOrObj.ka;
    if (language === 'ru' && keyOrObj.ru) return keyOrObj.ru;
    if (language === 'en' && keyOrObj.en) return keyOrObj.en;
    return keyOrObj.ka || keyOrObj.en || keyOrObj.ru || '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
