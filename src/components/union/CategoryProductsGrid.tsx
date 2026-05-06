import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { SectionHeader } from './_shared/SectionHeader';

interface Category {
  slug: string;
  img: string;
  name: { ka: string; ru: string; en: string };
}

// Ordered to match union.ru's homepage "Двери и мебель UNION" grid.
// Images are hot-linked from union.ru's CDN (originals, not the 75×75 thumbnails).
const UNION_CDN = 'https://www.union.ru';

const categories: Category[] = [
  {
    slug: 'swing-doors',
    img: `${UNION_CDN}/upload/iblock/571/530o2vv7amsl33y88q2p1017wfh2j6zi/2.png`,
    name: { ka: 'გაშლადი კარები', ru: 'Распашные двери', en: 'Swing Doors' },
  },
  {
    slug: 'sliding-doors',
    img: `${UNION_CDN}/upload/iblock/4c7/qypj5vy8x9wrlkcx9mpfdneyh8kecbfk/Раздвижные двери.png`,
    name: { ka: 'სრიალა კარები', ru: 'Раздвижные двери', en: 'Sliding Doors' },
  },
  {
    slug: 'sliding-partitions',
    img: `${UNION_CDN}/upload/iblock/2c9/z049pd2wodxwasjqo8rdfre4iqqvbzav/4.png`,
    name: { ka: 'სრიალა ტიხრები', ru: 'Раздвижные перегородки', en: 'Sliding Partitions' },
  },
  {
    slug: 'stationary-partitions',
    img: `${UNION_CDN}/upload/iblock/493/k9e53aek1j8t0u3pfu1w2zov39hnc43f/6.png`,
    name: { ka: 'სტაციონარული ტიხრები', ru: 'Стационарные перегородки', en: 'Stationary Partitions' },
  },
  {
    slug: 'wall-panels',
    img: `${UNION_CDN}/upload/iblock/ec8/w0ofz2k7ydo6po1u3ztg46autatx5k0j/st.png`,
    name: { ka: 'კედლის პანელები', ru: 'Стеновые панели', en: 'Wall Panels' },
  },
  {
    slug: 'wardrobes',
    img: `${UNION_CDN}/upload/iblock/e55/ysqovtrf6l9u7wc00s3ii39zki8giinf/Гардеробные, шкафы.png`,
    name: { ka: 'გარდერობი, შკაფები', ru: 'Гардеробные, шкафы', en: 'Wardrobes, Cabinets' },
  },
  {
    slug: 'vitrines',
    img: `${UNION_CDN}/upload/iblock/4e0/igqstkk7bj9om3mll2ytxwi170gfjluw/g.png`,
    name: { ka: 'ვიტრინები, კომოდები', ru: 'Витрины, комоды', en: 'Vitrines, Commodes' },
  },
  {
    slug: 'libraries',
    img: `${UNION_CDN}/upload/iblock/934/runnh7ztij4ic59w4gqpakhw2fl231l0/_01.png`,
    name: { ka: 'ბიბლიოთეკა, სტელაჟები', ru: 'Библиотеки, стеллажи', en: 'Libraries, Shelving' },
  },
  {
    slug: 'shelves',
    img: `${UNION_CDN}/upload/iblock/20e/2bl6wfbclhuhnmuxjtomvfg1yu5oxzwi/8.png`,
    name: { ka: 'თაროები', ru: 'Полки', en: 'Shelves' },
  },
  {
    slug: 'tables',
    img: `${UNION_CDN}/upload/iblock/a6a/fas5bbghzomak248x05xt1f3yc9ak74i/10.png`,
    name: { ka: 'მაგიდები', ru: 'Столы', en: 'Tables' },
  },
  {
    slug: 'sofas',
    img: `${UNION_CDN}/upload/iblock/340/pktqnb2oh4iw80eayoxe13dou5h9lcf6/12.png`,
    name: { ka: 'დივნები', ru: 'Диваны', en: 'Sofas' },
  },
  {
    slug: 'mirrors',
    img: `${UNION_CDN}/upload/iblock/8d0/jsw8nqtlastiyyyttw7gvcdc9pdl35hi/d.png`,
    name: { ka: 'სარკეები', ru: 'Зеркала', en: 'Mirrors' },
  },
  {
    slug: 'entrance-doors',
    img: `${UNION_CDN}/upload/iblock/16a/r9ichfdqk2xd1sw80vhsj4dd6ccfqzg7/14_1_.png`,
    name: { ka: 'შესასვლელი კარები', ru: 'Входные двери', en: 'Entrance Doors' },
  },
  {
    slug: 'skirting',
    img: `${UNION_CDN}/upload/iblock/0a4/mktncis28n47xsx3m86uugksnneitfc6/14_2_.png`,
    name: { ka: 'პლინტუსი', ru: 'Плинтусы', en: 'Baseboards' },
  },
  {
    slug: 'handles',
    img: `${UNION_CDN}/upload/iblock/c79/zoyqrwiq4vitxmfqcrhgcwrwj0ygwb1u/14_3_.png`,
    name: { ka: 'სახელურები, ფურნიტურა', ru: 'Ручки, Фурнитура', en: 'Handles, Hardware' },
  },
];

export function CategoryProductsGrid() {
  const { language, t } = useLanguage();
  const lang = (language === 'ru' || language === 'en' ? language : 'ka') as 'ka' | 'ru' | 'en';

  return (
    <section className="union-section bg-white">
      <div className="union-container">
        <SectionHeader title={t('doorsAndFurnitureUnion')} />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-10">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.03 }}
            >
              <Link to={`/union/catalog/${cat.slug}`} className="block group">
                <div className="aspect-[4/3] bg-surface overflow-hidden relative">
                  <img
                    src={cat.img}
                    alt={cat.name[lang]}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                    }}
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/12 transition-colors" />
                </div>
                <h3 className="mt-3 text-[15px] font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                  {cat.name[lang]}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/union/catalog"
            className="flex w-full items-center justify-center bg-primary text-white h-14 text-[13px] font-bold uppercase tracking-[0.06em] hover:bg-primary-deep transition-colors"
          >
            {t('toCatalog')}
          </Link>
        </div>
      </div>
    </section>
  );
}
