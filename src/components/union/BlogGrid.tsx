import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    title: {
      ka: 'რატომ ღირს სტანდარტული ზომის კარების არჩევა?',
      ru: 'Почему стоит выбирать двери стандартных размеров?',
      en: 'Why choose standard-size doors?',
    },
    excerpt: {
      ka: 'ეძებთ იდეალურ კარებს თქვენი ბინისთვის ან სახლისთვის, მაგრამ გაინტერესებთ რომელი ზომა აირჩიოთ? ჩვენი ექსპერტები გიხსნიან, თუ რატომ ღირს სტანდარტული ზომების არჩევა — ეს ეკონომიკური და პრაქტიკული გადაწყვეტილებაა, რომელიც საუკეთესოდ ერგება უმეტეს ინტერიერს.',
      ru: 'Ищете идеальные двери для вашей квартиры или дома, но столкнулись с вопросом, какой размер выбрать? Наши эксперты объясняют, почему стоит приобретать двери стандартных размеров. Стандартные размеры — это экономически выгодный и практичный выбор, который наилучшим образом подходит для большинства интерьеров…',
      en: 'Looking for the perfect doors for your home but not sure which size to pick? Our experts explain why standard-size doors are the most economical and practical choice that fits most interiors.',
    },
    slug: 'standard-doors',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&q=80',
    title: {
      ka: 'როგორ გავაკეთოთ გარდერობი და არ შევცდეთ?',
      ru: 'Как сделать гардеробную и не допустить ошибок?',
      en: 'How to plan a wardrobe — without the common mistakes',
    },
    excerpt: {
      ka: 'ბევრი მიიჩნევს, რომ გარდერობი თვითონ უნდა გააკეთონ, თვლიან, რომ ეს ადვილია. სინამდვილეში არც ისე იოლი — სანამ პროცესს დაიწყებთ, კარგად დაგეგმეთ სივრცე და მოდულების ზომები. ნუ გადააქცევთ გარდერობს დაუჯდომელი თაროების კოლექციად.',
      ru: 'Многие хотят иметь гардеробную в своей квартире, но не решаются её сделать. Считают, что это легко, и при попытке всё кончается неэффективно. Прежде чем браться за дело, продумайте размеры модулей и зону доступа, чтобы гардеробная служила удобно и долго.',
      en: 'Many people want a wardrobe at home and assume it’s easy to plan. The reality is more nuanced — measure the modules, plan access zones, and don’t turn the wardrobe into a stack of useless shelves.',
    },
    slug: 'wardrobe-planning',
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

  const items: Article[] =
    posts.length > 0
      ? posts.map((p: any) => ({
          id: p.id,
          image: p.featured_image ?? 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
          title: { ka: p.title_ka, ru: p.title_ka, en: p.title_en ?? p.title_ka },
          excerpt: { ka: p.excerpt_ka ?? '', ru: p.excerpt_ka ?? '', en: p.excerpt_en ?? '' },
          slug: p.slug,
        }))
      : placeholderArticles;

  return (
    <section className="union-section bg-surface">
      <div className="union-container space-y-12 md:space-y-16">
        {items.map((article, idx) => {
          const reverse = idx % 2 === 1;
          return (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div className={reverse ? 'md:order-2' : ''}>
                <Link to={`/union/blog/${article.slug}`} className="block group">
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    <img
                      src={article.image}
                      alt={article.title[lang]}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              </div>

              <div>
                <h3 className="text-[24px] md:text-[28px] leading-tight font-medium text-foreground">
                  {article.title[lang]}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.7] text-muted-foreground">
                  {article.excerpt[lang]}
                </p>
                <Link
                  to={`/union/blog/${article.slug}`}
                  className="mt-6 inline-flex items-center justify-center border border-primary text-primary px-7 h-11 text-[12px] font-bold uppercase tracking-[0.06em] hover:bg-primary hover:text-white transition-colors"
                >
                  {t('moreDetails')}
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
