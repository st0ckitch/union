import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar } from 'lucide-react';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const UnionBlogPost = () => {
  const { slug } = useParams();
  const { language } = useLanguage();

  const { data: post, isLoading } = useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <UnionLayout>
        <div className="union-container py-8">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </UnionLayout>
    );
  }

  if (!post) {
    return (
      <UnionLayout>
        <div className="union-container py-16 text-center">
          <h1 className="union-section-title mb-4">
            {language === 'ka' ? 'სტატია ვერ მოიძებნა' : language === 'ru' ? 'Статья не найдена' : 'Article not found'}
          </h1>
          <Link to="/union/blog" className="inline-flex items-center justify-center bg-primary text-white h-11 px-7 text-[12px] font-bold uppercase tracking-[0.06em] hover:bg-primary-deep transition-colors">
            {language === 'ka' ? 'ბლოგში დაბრუნება' : language === 'ru' ? 'Назад в блог' : 'Back to Blog'}
          </Link>
        </div>
      </UnionLayout>
    );
  }

  const title = language === 'ka' ? post.title_ka : (post.title_en || post.title_ka);
  const content = language === 'ka' ? post.content_ka : (post.content_en || post.content_ka);

  const breadcrumbItems = [
    { label: language === 'ka' ? 'ბლოგი' : language === 'ru' ? 'Блог' : 'Blog', path: '/union/blog' },
    { label: title },
  ];

  return (
    <UnionLayout>
      <div className="union-container pt-6 pb-16">
        <Breadcrumb items={breadcrumbItems} />

        <article className="max-w-[760px] mx-auto py-8">
          <Link
            to="/union/blog"
            className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.06em] text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            {language === 'ka' ? 'უკან' : language === 'ru' ? 'Назад' : 'Back'}
          </Link>

          {post.featured_image && (
            <div className="aspect-[16/9] overflow-hidden bg-surface mb-8">
              <img
                src={post.featured_image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-[32px] md:text-[40px] font-medium leading-tight mb-4">{title}</h1>

          {post.published_at && (
            <div className="flex items-center gap-2 text-[13px] text-muted-foreground mb-8">
              <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString(language === 'ka' ? 'ka-GE' : language === 'ru' ? 'ru-RU' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          )}

          <div
            className="prose prose-base max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-a:text-primary prose-img:my-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </UnionLayout>
  );
};

export default UnionBlogPost;
