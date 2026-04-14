import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ka, enUS } from 'date-fns/locale';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const BlogPost = () => {
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

  const locale = language === 'ka' ? ka : enUS;

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 max-w-3xl">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/4 mb-8" />
          <Skeleton className="aspect-video w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">
            {language === 'ka' ? 'სტატია ვერ მოიძებნა' : 'Article not found'}
          </h1>
          <Button asChild>
            <Link to="/blog">
              {language === 'ka' ? 'ბლოგში დაბრუნება' : 'Back to Blog'}
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const title = language === 'ka' ? post.title_ka : (post.title_en || post.title_ka);
  const content = language === 'ka' ? post.content_ka : (post.content_en || post.content_ka);
  const date = post.published_at || post.created_at;

  const breadcrumbItems = [
    { label: language === 'ka' ? 'ბლოგი' : 'Blog', path: '/blog' },
    { label: title },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <article className="max-w-3xl mx-auto py-8">
          {/* Header */}
          <header className="mb-8">
            <time className="text-sm text-muted-foreground">
              {format(new Date(date), 'dd MMMM, yyyy', { locale })}
            </time>
            <h1 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              {title}
            </h1>
          </header>

          {/* Featured Image */}
          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={title}
              className="w-full aspect-video object-cover rounded-lg mb-8"
            />
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Actions */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t">
            <Button variant="ghost" asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === 'ka' ? 'უკან დაბრუნება' : 'Back'}
              </Link>
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              {language === 'ka' ? 'გაზიარება' : 'Share'}
            </Button>
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default BlogPost;
