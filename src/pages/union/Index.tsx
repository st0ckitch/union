import { UnionLayout } from '@/components/union/UnionLayout';
import { UnionHeroBanner } from '@/components/union/UnionHeroBanner';
import { PromoStrip } from '@/components/union/PromoStrip';
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
      {/* 1. Hero carousel (8 slides) */}
      <UnionHeroBanner />

      {/* 2. Red promo strip */}
      <PromoStrip />

      {/* 3. "Doors & Furniture UNION" — 15-card category grid + CTA to catalog */}
      <CategoryProductsGrid />

      {/* 4. Quick links bar (In Stock / Promotions / Reviews) */}
      <QuickLinksBar />

      {/* 5. Trends carousel (10 items) + Portfolio/YouTube/New arrivals strip */}
      <TrendsSection />

      {/* 6. Stars about us — 8-card video carousel */}
      <TestimonialsSection />

      {/* 7. Consultation / Measurement strip */}
      <ConsultationCTA />

      {/* 8. Blog — 4-card grid */}
      <BlogGrid />

      {/* 9. About company split section */}
      <AboutCompanySection />
    </UnionLayout>
  );
};

export default UnionIndex;
