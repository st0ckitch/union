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
        <div className="container py-8">
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
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ka' ? 'სტატია ვერ მოიძებნა' : 'Article not found'}
          </h1>
          <Button asChild>
            <Link to="/union/blog">
              {language === 'ka' ? 'ბლოგში დაბრუნება' : 'Back to Blog'}
            </Link>
          </Button>
        </div>
      </UnionLayout>
    );
  }

  const title = language === 'ka' ? post.title_ka : (post.title_en || post.title_ka);
  const content = language === 'ka' ? post.content_ka : (post.content_en || post.content_ka);

  const breadcrumbItems = [
    { label: language === 'ka' ? 'ბლოგი' : 'Blog', path: '/union/blog' },
    { label: title },
  ];

  return (
    <UnionLayout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <article className="max-w-3xl mx-auto py-8">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/union/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {language === 'ka' ? 'უკან' : 'Back'}
            </Link>
          </Button>

          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={title}
              className="w-full aspect-video object-cover rounded-lg mb-8"
            />
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>

          {post.published_at && (
            <div className="flex items-center gap-2 text-muted-foreground mb-8">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString(language === 'ka' ? 'ka-GE' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </div>
    </UnionLayout>
  );
};

export default UnionBlogPost;
