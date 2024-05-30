'use client';

import { Circle } from 'lucide-react';

import { Radio } from '@/components/ui';

export const RadioTypeDemo: React.FC = () => {
  return (
    <Radio.Group className="flex flex-col gap-4">
      <div className="flex items-center gap-1.5">
        <Radio.Item id="radio_type_normal" value="1" type="normal" />
        <label htmlFor="radio_type_normal" className="text-sm font-medium text-gray-12">
          Normal
        </label>
      </div>
      <Radio.Item
        value="2"
        type="detailed"
        title="Detailed"
        description="This is a detailed radio button."
      />
    </Radio.Group>
  );
};

export const RadioNormalDemo: React.FC = () => {
  return (
    <Radio.Group>
      <div className="flex items-center gap-1.5">
        <Radio.Item id="radio_normal_1" value="1" type="normal" />
        <label htmlFor="radio_normal_1" className="text-sm font-medium text-gray-12">
          Option 1
        </label>
      </div>
      <div className="flex items-center gap-1.5">
        <Radio.Item id="radio_normal_2" value="2" type="normal" />
        <label htmlFor="radio_normal_2" className="text-sm font-medium text-gray-12">
          Option 2
        </label>
      </div>
      <div className="flex items-center gap-1.5">
        <Radio.Item id="radio_normal_3" value="3" type="normal" disabled />
        <label htmlFor="radio_normal_3" className="text-sm font-medium text-gray-12">
          Option 3
        </label>
      </div>
    </Radio.Group>
  );
};

export const RadioDetailedDemo: React.FC = () => {
  return (
    <Radio.Group className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
      <Radio.Item value="0" type="detailed" intent="none" title="Minimal option" />
      <Radio.Item value="1" type="detailed" intent="info" title="Minimal option" />
      <Radio.Item
        value="2"
        type="detailed"
        intent="success"
        title="Option with description"
        description="Some short description."
      />
      <Radio.Item
        value="3"
        type="detailed"
        intent="fail"
        title="Option with description"
        description="Some short description."
      />
      <Radio.Item
        value="4"
        type="detailed"
        intent="warning"
        title="Option with icon"
        icon={<Circle />}
      />
      <Radio.Item
        value="5"
        type="detailed"
        intent="orange"
        title="Option with icon and description"
        description="Some short description."
        icon={<Circle />}
      />
      <Radio.Item value="6" type="detailed" title="Disabled minimal option" disabled />
      <Radio.Item
        value="7"
        type="detailed"
        title="Disabled option with icon and description"
        description="Some short description."
        icon={<Circle />}
        disabled
      />
    </Radio.Group>
  );
};
