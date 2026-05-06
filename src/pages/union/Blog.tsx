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
      <div className="union-container pt-6 pb-16">
        <Breadcrumb items={breadcrumbItems} />

        <h1 className="union-section-title mb-10 mt-4">
          {language === 'ka' ? 'ბლოგი' : language === 'ru' ? 'Блог' : 'Blog'}
        </h1>

        {posts.length === 0 && !isLoading ? (
          <div className="border border-border bg-surface text-center py-16">
            <p className="text-[14px] text-muted-foreground">
              {language === 'ka' ? 'სტატიები მალე დაემატება' : language === 'ru' ? 'Статьи скоро' : 'Articles coming soon'}
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
