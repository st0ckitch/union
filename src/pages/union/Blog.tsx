import { useQuery } from '@tanstack/react-query';
import { UnionLayout } from '@/components/union/UnionLayout';
import { Breadcrumb } from '@/components/catalog/Breadcrumb';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

const UnionBlog = () => {
  const { language } = useLanguage();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const breadcrumbItems = [
    { label: language === 'ka' ? 'ბლოგი' : 'Blog' },
  ];

  return (
    <UnionLayout>
      <div className="container py-4">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="text-3xl font-bold mb-8">
          {language === 'ka' ? 'ბლოგი' : 'Blog'}
        </h1>

        {posts.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'ka' ? 'სტატიები მალე დაემატება' : 'Articles coming soon'}
            </p>
          </div>
        ) : (
          <BlogGrid posts={posts} isLoading={isLoading} basePath="/union/blog" />
        )}
      </div>
    </UnionLayout>
  );
};

export default UnionBlog;
