import { UnionLayout } from '@/components/union/UnionLayout';
import { UnionHeroBanner } from '@/components/union/UnionHeroBanner';
import { CategoryProductsGrid } from '@/components/union/CategoryProductsGrid';
import { QuickLinksBar } from '@/components/union/QuickLinksBar';
import { TrendsSection } from '@/components/union/TrendsSection';
import { TestimonialsSection } from '@/components/union/TestimonialsSection';
import { ConsultationCTA } from '@/components/union/ConsultationCTA';
import { BlogGrid } from '@/components/union/BlogGrid';
import { AboutCompanySection } from '@/components/union/AboutCompanySection';

const UnionIndex = () => {
  return (
    <UnionLayout>
      <UnionHeroBanner />
      <CategoryProductsGrid />
      <QuickLinksBar />
      <TrendsSection />
      <TestimonialsSection />
      <ConsultationCTA />
      <BlogGrid />
      <AboutCompanySection />
    </UnionLayout>
  );
};

export default UnionIndex;
