import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

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
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-light mb-8"
        >
          {t('doorsAndFurnitureUnion')}
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.04 }}
            >
              <Link to={`/union/catalog/${cat.slug}`} className="block group">
                <div className="aspect-[4/5] bg-neutral-50 overflow-hidden mb-3 relative flex items-center justify-center p-4">
                  <img
                    src={cat.img}
                    alt={cat.name[lang]}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.visibility = 'hidden';
                    }}
                  />
                  <button className="absolute bottom-3 left-3 w-9 h-9 bg-[#333] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <ChevronUp className="h-4 w-4 text-white" />
                  </button>
                </div>
                <h3 className="text-sm md:text-base font-medium group-hover:text-primary transition-colors leading-snug text-center">
                  {cat.name[lang]}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            asChild
            size="lg"
            className="bg-black text-white hover:bg-neutral-800 rounded-none px-12 py-6 text-sm tracking-widest uppercase"
          >
            <Link to="/union/catalog">
              {t('toCatalog')} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
