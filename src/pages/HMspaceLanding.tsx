import { HMHeader } from '@/components/hmspace/HMHeader';
import { HMHero } from '@/components/hmspace/HMHero';
import { HMAbout } from '@/components/hmspace/HMAbout';
import { HMValues } from '@/components/hmspace/HMValues';
import { HMUnionSpotlight } from '@/components/hmspace/HMUnionSpotlight';
import { HMStats } from '@/components/hmspace/HMStats';
import { HMMission } from '@/components/hmspace/HMMission';
import { HMFooter } from '@/components/hmspace/HMFooter';

const HMspaceLanding = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans">
      <HMHeader />
      <HMHero />
      <HMAbout />
      <HMValues />
      <HMUnionSpotlight />
      <HMStats />
      <HMMission />
      <HMFooter />
    </div>
  );
};

export default HMspaceLanding;
