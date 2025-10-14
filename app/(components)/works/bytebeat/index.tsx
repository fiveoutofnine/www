'use client';

import BytebeatFeatureDetail from './detail';
import { KeyboardMusic } from 'lucide-react';

import FeatureDisplay from '@/components/templates/feature-display';
import Vocab from '@/components/templates/vocab';

const BytebeatFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-4"
      name="Bytebeat"
      description={
        <span>
          <Vocab word="algorithmic music">Algorithmic</Vocab> music with no score, instruments, or
          oscillators
        </span>
      }
      symbol={<KeyboardMusic />}
    >
      <BytebeatFeatureDetail />
    </FeatureDisplay>
  );
};

export default BytebeatFeature;
