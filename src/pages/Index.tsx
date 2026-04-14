import { Layout } from '@/components/layout/Layout';
import { HeroSlider } from '@/components/home/HeroSlider';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturesBar } from '@/components/home/FeaturesBar';

const Index = () => {
  return (
    <Layout>
      <HeroSlider />
      <FeaturesBar />
      <CategoryGrid />
      
      {/* Placeholder sections */}
      <section className="py-16 bg-secondary">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">ტრენდული პროდუქტები</h2>
          <p className="text-muted-foreground">პროდუქტები მალე დაემატება</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">მომხმარებელთა შეფასებები</h2>
          <p className="text-muted-foreground">შეფასებები მალე დაემატება</p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
