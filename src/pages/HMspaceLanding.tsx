import { HMHeader } from '@/components/hmspace/HMHeader';
import { HMHero } from '@/components/hmspace/HMHero';
import { HMAbout } from '@/components/hmspace/HMAbout';
import { HMValues } from '@/components/hmspace/HMValues';
import { HMUnionSpotlight } from '@/components/hmspace/HMUnionSpotlight';
import { HMStats } from '@/components/hmspace/HMStats';
import { HMProjects } from '@/components/hmspace/HMProjects';
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
      <HMProjects />
      <HMMission />
      <HMFooter />
    </div>
  );
};

export default HMspaceLanding;
