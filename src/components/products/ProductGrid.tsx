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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[30px] gap-y-[60px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="w-full" style={{ aspectRatio: '490/330' }} />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 border-t border-[#e3e5ef]">
        <p className="text-[15px] font-light text-[#5a5a5a]">
          ჯერ პროდუქტები არაა
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[30px] gap-y-[60px]">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} basePath={basePath} />
      ))}
    </div>
  );
}
