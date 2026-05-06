import { UnionLayout } from '@/components/union/UnionLayout';
import { UnionHeroBanner } from '@/components/union/UnionHeroBanner';
import { CategoryProductsGrid } from '@/components/union/CategoryProductsGrid';
import { TrendsSection } from '@/components/union/TrendsSection';
import { TestimonialsSection } from '@/components/union/TestimonialsSection';
import { BlogGrid } from '@/components/union/BlogGrid';
import { AboutCompanySection } from '@/components/union/AboutCompanySection';

const UnionIndex = () => {
  return (
    <UnionLayout>
      <UnionHeroBanner />
      <CategoryProductsGrid />
      <TrendsSection />
      <TestimonialsSection />
      <BlogGrid />
      <AboutCompanySection />
    </UnionLayout>
  );
};

export default UnionIndex;
