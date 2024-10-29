'use client';

import BytebeatFeatureDetail from './detail';
import { KeyboardMusic } from 'lucide-react';

import FeatureDisplay from '@/components/templates/feature-display';
import { Tooltip } from '@/components/ui';

const BytebeatFeature: React.FC = () => {
  return (
    <FeatureDisplay
      className="col-span-2 w-full min-[560px]:col-span-4"
      name="Bytebeat"
      description={
        <span>
          <Tooltip
            content={
              <span>
                Bytebeat music defines a function to output a waveform value betwen 0 (silence) and
                255 given some time tick. Browse more songs{' '}
                <a
                  className="font-medium text-blue-9 hover:underline"
                  href="https://dollchan.net/bytebeat/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                .
              </span>
            }
            side="bottom"
            inverted
            inPortal
            triggerProps={{
              className:
                'text-gray-11 rounded-sm underline decoration-dotted transition-colors hover:text-gray-12 data-[state="instant-open"]:text-gray-12 data-[state="delayed-open"]:text-gray-12',
            }}
          >
            <span>Algorithmic</span>
          </Tooltip>{' '}
          music with no score, instruments, or oscillators
        </span>
      }
      symbol={<KeyboardMusic />}
    >
      <BytebeatFeatureDetail />
    </FeatureDisplay>
  );
};

export default BytebeatFeature;
