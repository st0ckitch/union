import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const UNION_CDN = 'https://www.union.ru';

interface Article {
  id: string | number;
  image: string;
  title: { ka: string; ru: string; en: string };
  excerpt: { ka: string; ru: string; en: string };
  href: string;
}

const placeholderArticles: Article[] = [
  {
    id: 1,
    image: `${UNION_CDN}/upload/iblock/3bc/qkou0q5x7ue2a9yi1u13cc3yf91p74m6/FILO_60_-_-_-_.-_-_.jpg`,
    title: {
      ka: 'რატომ ღირს სტანდარტული ზომის კარების არჩევა?',
      ru: 'Почему стоит выбирать двери стандартных размеров?',
      en: 'Why choose standard-size doors?',
    },
    excerpt: {
      ka: 'ეძებთ იდეალურ კარებს თქვენი ბინისთვის ან სახლისთვის, მაგრამ გაინტერესებთ რომელი ზომა აირჩიოთ? ექსპერტების აზრით, საუკეთესო არჩევანია სტანდარტული ზომის კარები. სტანდარტულ ზომებად ითვლება…',
      ru: 'Ищете идеальные двери для вашей квартиры или дома, но столкнулись с вопросом, какой размер выбрать? По мнению экспертов лучше всего приобретать двери стандартных размеров. Стандартными считаются такие размеры...',
      en: 'Looking for the perfect doors for your home but unsure which size to pick? Experts agree standard-size doors are the most reliable choice — both economical and easy to install.',
    },
    href: '/union/blog/standard-doors',
  },
  {
    id: 2,
    image: `${UNION_CDN}/upload/iblock/fd2/puun2yjlco590dhjag5w8h4ihjgllb0a/ALTO-_-_-2400x1600.jpg`,
    title: {
      ka: 'როგორ ავირჩიოთ ფარული კარები? სასარგებლო ინსტრუქცია',
      ru: 'Как выбрать скрытые двери? Полезная инструкция',
      en: 'How to choose hidden doors — a useful guide',
    },
    excerpt: {
      ka: 'საიდუმლო არ არის, რომ ფარული კარების მოდა იტალიიდან მოვიდა, ხოლო პირველი ვინც ამ პროდუქტი რუსეთის ბაზარზე გამოიტანა — UNION. ამიტომ ჩვენი ექსპერტიზა ამ საკითხში ეჭვს არ ექვემდებარება.',
      ru: 'Не секрет, что мода на скрытые двери пришла к нам из Италии, а первой этот продукт вывела на российский рынок компания UNION. Поэтому нас можно смело назвать экспертами в этом вопросе.',
      en: 'Hidden doors became fashionable thanks to Italian design, and UNION was the first to bring them to the market. Here are the things to look out for when picking yours.',
    },
    href: '/union/blog/hidden-doors',
  },
];

export function BlogGrid() {
  const { language, t } = useLanguage();
  const lang = (language === 'ru' || language === 'en' ? language : 'ka') as 'ka' | 'ru' | 'en';

  const { data: posts = [] } = useQuery({
    queryKey: ['blog-preview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(2);
      if (error) throw error;
      return data;
    },
  });

  const items: Article[] = posts.length > 0
    ? posts.map((p: any) => ({
        id: p.id,
        image: p.featured_image ?? placeholderArticles[0].image,
        title: { ka: p.title_ka, ru: p.title_ka, en: p.title_en ?? p.title_ka },
        excerpt: { ka: p.excerpt_ka ?? '', ru: p.excerpt_ka ?? '', en: p.excerpt_en ?? '' },
        href: `/union/blog/${p.slug}`,
      }))
    : placeholderArticles;

  return (
    <section className="bg-[#f0f0f0] py-16 md:py-20">
      <div className="union-container space-y-16 md:space-y-20">
        {items.map((article, idx) => {
          const reverse = idx % 2 === 1;
          return (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-[56%_44%] items-center gap-0"
            >
              {/* Image */}
              <Link
                to={article.href}
                className={`block overflow-hidden ${reverse ? 'md:order-2' : ''}`}
              >
                <img
                  src={article.image}
                  alt={article.title[lang]}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  style={{ aspectRatio: '795/580' }}
                />
              </Link>

              {/* Content */}
              <div className={`${reverse ? 'md:pr-[100px] md:pl-5' : 'md:pl-[100px] md:pr-5'} bg-[#f0f0f0]`}>
                <h3 className="text-[20px] md:text-[24px] leading-snug font-semibold tracking-[0.04em] text-[#002b45] mt-8 mb-7">
                  {article.title[lang]}
                </h3>
                <p className="text-[16px] font-light leading-[1.625] text-[#5a5a5a] mb-8">
                  {article.excerpt[lang]}
                </p>
                <Link
                  to={article.href}
                  className="inline-flex items-center justify-center text-[#002b45] border border-[#002b45] hover:bg-[#002b45] hover:text-white transition-colors"
                  style={{
                    height: '51px',
                    minWidth: '66%',
                    padding: '0 32px',
                    fontSize: '14px',
                    fontWeight: 300,
                    letterSpacing: '0.16em',
                    textTransform: 'lowercase',
                  }}
                >
                  {language === 'ka' ? 'დაწვრილებით' : language === 'ru' ? 'подробнее' : 'read more'}
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
