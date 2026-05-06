import { useLanguage } from '@/contexts/LanguageContext';
import { SliderSection, SliderItem } from './_shared/SliderSection';

const UNION_CDN = 'https://www.union.ru';

interface Cat {
  slug: string;
  img: string;
  name: { ka: string; ru: string; en: string };
}

const categories: Cat[] = [
  { slug: 'swing-doors',          img: `${UNION_CDN}/upload/iblock/925/b7i0920o5w98wvphham2qw6iaeb0j7tq/2-_-uniflex-3D-Step-V.jpg`, name: { ka: 'გაშლადი კარები', ru: 'Распашные двери', en: 'Swing Doors' } },
  { slug: 'sliding-doors',        img: `${UNION_CDN}/upload/iblock/696/8m3n87auigl7187wrojilbl1bgv3c0df/SLIDER-1%202400x1600.jpg`, name: { ka: 'სრიალა კარები', ru: 'Раздвижные двери', en: 'Sliding Doors' } },
  { slug: 'sliding-partitions',   img: `${UNION_CDN}/upload/iblock/440/8kftu2p3od5du8ounc763o21044lrcjq/SLIM-Piatto-Transparente-Sole-01.jpg`, name: { ka: 'სრიალა ტიხრები', ru: 'Раздвижные перегородки', en: 'Sliding Partitions' } },
  { slug: 'stationary-partitions', img: `${UNION_CDN}/upload/iblock/37b/os04dopnsl11s93v1jkebipf1nagl3uf/WallStreet_Slim_2.jpg`, name: { ka: 'სტაციონარული ტიხრები', ru: 'Стационарные перегородки', en: 'Stationary Partitions' } },
  { slug: 'wall-panels',          img: `${UNION_CDN}/upload/iblock/dff/apet5du0g1xn6qwsomeb10y28fez2a6i/COVER-Veneer.jpg`, name: { ka: 'კედლის პანელები', ru: 'Стеновые панели', en: 'Wall Panels' } },
  { slug: 'wardrobes',            img: `${UNION_CDN}/upload/iblock/6a7/ycf8sfsurbilrjvqoal5syythcjx4ss8/ALTO%202400%D1%851600.jpg`, name: { ka: 'გარდერობი, შკაფები', ru: 'Гардеробные, шкафы', en: 'Wardrobes, Cabinets' } },
  { slug: 'vitrines',             img: `${UNION_CDN}/upload/iblock/917/rcfuqwy3w0s2sg2zd6bawmuzcq2kd3ku/_-_-MATEO-M_001-2400x1600.png`, name: { ka: 'ვიტრინები, კომოდები', ru: 'Витрины, комоды', en: 'Vitrines, Commodes' } },
  { slug: 'libraries',            img: `${UNION_CDN}/upload/iblock/d3b/y4o7w07z4rv7n109i0e8hb38dsgeaxku/Forte-_-04_00.jpg`, name: { ka: 'ბიბლიოთეკა, სტელაჟები', ru: 'Библиотеки, стеллажи', en: 'Libraries, Shelving' } },
  { slug: 'shelves',              img: `${UNION_CDN}/upload/iblock/82d/726ieuhep8v73cnx2ur3lfliru0hrmoh/_-04-_.jpg`, name: { ka: 'თაროები', ru: 'Полки', en: 'Shelves' } },
  { slug: 'tables',               img: `${UNION_CDN}/upload/iblock/94f/ixf3iuiw0wezy1mkchr72pi5x4ivciyj/MILAN-_1-2400_1600.jpg`, name: { ka: 'მაგიდები', ru: 'Столы', en: 'Tables' } },
  { slug: 'sofas',                img: `${UNION_CDN}/upload/iblock/baa/cafcd2drgff500g1o0u0clg8oos528fb/PORTOFINO_00-2400x1600.png`, name: { ka: 'დივნები', ru: 'Диваны', en: 'Sofas' } },
  { slug: 'mirrors',              img: `${UNION_CDN}/upload/iblock/ab2/wqti0kftwb5k2q9jpdlfnwh0e347tbv8/_SLIM_03.jpg`, name: { ka: 'სარკეები', ru: 'Зеркала', en: 'Mirrors' } },
  { slug: 'entrance-doors',       img: `${UNION_CDN}/upload/iblock/28a/e6y45uvr4h3irdkrtif9q9i9sj4josyo/DELTA%20PRO%20602-2%202400%D1%851600.png`, name: { ka: 'შესასვლელი კარები', ru: 'Входные двери', en: 'Entrance Doors' } },
  { slug: 'skirting',             img: `${UNION_CDN}/upload/iblock/936/c2842xi7v7u8tiro4ofyeg6ig9ia3epw/074-_-MINI-_-_00.jpg`, name: { ka: 'პლინტუსი', ru: 'Плинтусы', en: 'Baseboards' } },
  { slug: 'handles',              img: `${UNION_CDN}/upload/iblock/487/zhsqfwqpr3g7056sskcpglbkxlgih4fm/Roboquattro-_-2400_1600.jpg`, name: { ka: 'სახელურები, ფურნიტურა', ru: 'Ручки, Фурнитура', en: 'Handles, Hardware' } },
];

export function CategoryProductsGrid() {
  const { language, t } = useLanguage();
  const lang = (language === 'ru' || language === 'en' ? language : 'ka') as 'ka' | 'ru' | 'en';

  const items: SliderItem[] = categories.map((c) => ({
    id: c.slug,
    href: `/union/catalog/${c.slug}`,
    image: c.img,
    title: c.name[lang],
  }));

  return (
    <section className="union-section bg-white">
      <SliderSection
        title={t('doorsAndFurnitureUnion')}
        items={items}
        bottomCta={{ label: t('toCatalog'), href: '/union/catalog' }}
      />
    </section>
  );
}
