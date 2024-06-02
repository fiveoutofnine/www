'use client';

import { Radio } from '@/components/ui';

const DesignRadioFeature: React.FC = () => {
  return (
    <Radio.Group>
      <div className="flex items-center gap-1.5">
        <Radio.Item id="radio_feature_0" value="0" aria-labelledby="radio_feature_0_label" />
        <label
          id="radio_feature_0_label"
          htmlFor="radio_feature_0"
          className="text-sm font-medium text-gray-12"
        >
          Radio
        </label>
      </div>
    </Radio.Group>
  );
};

export default DesignRadioFeature;
