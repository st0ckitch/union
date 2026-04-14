import { BlogCard } from './BlogCard';
import { Skeleton } from '@/components/ui/skeleton';

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

interface BlogGridProps {
  posts: BlogPost[];
  isLoading?: boolean;
  basePath?: string;
}

export function BlogGrid({ posts, isLoading, basePath = '/blog' }: BlogGridProps) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-video w-full" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">სტატიები ვერ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} basePath={basePath} />
      ))}
    </div>
  );
}
