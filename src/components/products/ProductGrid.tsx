import { ProductCard } from './ProductCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  id: string;
  name_ka: string;
  name_en: string | null;
  name_ru?: string | null;
  slug: string;
  price: number;
  sale_price: number | null;
  images: string[] | null;
  is_new: boolean | null;
  is_featured: boolean | null;
  category_id: string | null;
  price_from?: boolean | null;
  delivery_days?: number | null;
  stock_status?: string | null;
}

interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  basePath?: string;
}

export function ProductGrid({ products, isLoading, basePath = '/product' }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">პროდუქტები ვერ მოიძებნა</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} basePath={basePath} />
      ))}
    </div>
  );
}
