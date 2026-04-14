import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface Article {
  id: string | number;
  image: string;
  title: { ka: string; ru: string; en: string };
  excerpt: { ka: string; ru: string; en: string };
  slug: string;
}

const placeholderArticles: Article[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    title: {
      ka: 'რატომ ღირს სტანდარტული ზომის კარების არჩევა?',
      ru: 'Почему стоит выбирать двери стандартных размеров?',
      en: 'Why choose standard-size doors?',
    },
    excerpt: {
      ka: 'ეძებთ იდეალურ კარებს თქვენი სახლისთვის, მაგრამ გაინტერესებთ რომელი ზომა აირჩიოთ?',
      ru: 'Ищете идеальные двери для дома, но не знаете, какой размер выбрать?',
      en: 'Looking for the perfect doors but not sure which size to pick?',
    },
    slug: 'standard-doors',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    title: {
      ka: 'როგორ ავირჩიოთ ფარული კარები?',
      ru: 'Как выбрать скрытые двери?',
      en: 'How to choose hidden doors?',
    },
    excerpt: {
      ka: 'ფარული კარების ტიპები, მათი უპირატესობები და მონტაჟის თავისებურებები.',
      ru: 'Типы скрытых дверей, их преимущества и особенности монтажа.',
      en: 'Types of hidden doors, their advantages, and installation specifics.',
    },
    slug: 'hidden-doors',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    title: {
      ka: 'გარდერობის დაგეგმვის 5 შეცდომა',
      ru: '5 ошибок при планировании гардеробной',
      en: '5 common wardrobe planning mistakes',
    },
    excerpt: {
      ka: 'ტიპიური შეცდომები, რომლებიც ხელს უშლის კომფორტული გარდერობის შექმნას.',
      ru: 'Типичные ошибки, мешающие создать удобную гардеробную.',
      en: 'Common mistakes that prevent creating a comfortable wardrobe.',
    },
    slug: 'wardrobe-mistakes',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80',
    title: {
      ka: 'ტიხრები, როგორც სივრცის ტრანსფორმაციის ინსტრუმენტი',
      ru: 'Перегородки как инструмент трансформации пространства',
      en: 'Partitions as a tool for transforming space',
    },
    excerpt: {
      ka: 'როგორ გავხადოთ ბინა ფუნქციური და სტილური ტიხრების დახმარებით.',
      ru: 'Как сделать квартиру функциональной и стильной с помощью перегородок.',
      en: 'How to make an apartment functional and stylish with partitions.',
    },
    slug: 'partitions-space',
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
        .limit(4);
      if (error) throw error;
      return data;
    },
  });

  const items: Article[] =
    posts.length > 0
      ? posts.map((p: any) => ({
          id: p.id,
          image: p.featured_image ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
          title: { ka: p.title_ka, ru: p.title_ka, en: p.title_en ?? p.title_ka },
          excerpt: { ka: p.excerpt_ka ?? '', ru: p.excerpt_ka ?? '', en: p.excerpt_en ?? '' },
          slug: p.slug,
        }))
      : placeholderArticles;

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-light mb-8"
        >
          {t('useful')}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link to={`/union/blog/${article.slug}`} className="block group">
                <div className="aspect-[4/3] overflow-hidden mb-4 bg-muted">
                  <img
                    src={article.image}
                    alt={article.title[lang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-light italic mb-3 leading-snug group-hover:text-primary transition-colors">
                  {article.title[lang]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3">
                  {article.excerpt[lang]}
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-foreground border-b border-foreground pb-0.5 group-hover:text-primary group-hover:border-primary transition-colors">
                  {t('moreDetails')} <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
