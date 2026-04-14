import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ka, enUS } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogPost {
  id: string;
  title_ka: string;
  title_en: string | null;
  slug: string;
  excerpt_ka: string | null;
  excerpt_en: string | null;
  featured_image: string | null;
  published_at: string | null;
  created_at: string;
}

interface BlogCardProps {
  post: BlogPost;
  basePath?: string;
}

export function BlogCard({ post, basePath = '/blog' }: BlogCardProps) {
  const { language } = useLanguage();
  
  const title = language === 'ka' ? post.title_ka : (post.title_en || post.title_ka);
  const excerpt = language === 'ka' ? post.excerpt_ka : (post.excerpt_en || post.excerpt_ka);
  const imageUrl = post.featured_image || '/placeholder.svg';
  const date = post.published_at || post.created_at;
  const locale = language === 'ka' ? ka : enUS;

  return (
    <Link to={`${basePath}/${post.slug}`}>
      <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-shadow h-full">
        <div className="aspect-video overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-5">
          <time className="text-sm text-muted-foreground">
            {format(new Date(date), 'dd MMMM, yyyy', { locale })}
          </time>
          <h3 className="text-lg font-semibold mt-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-muted-foreground mt-2 line-clamp-3 text-sm">
              {excerpt}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
