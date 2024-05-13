'use client';

import type { MileageLog } from '@/lib/types/running';
import type { LengthUnit } from '@/lib/types/units';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RunningFeatureDetailHeatmapProps = {
  runningLogs: MileageLog[];
  unit: LengthUnit;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RunningFeatureDetailHeatmap: React.FC<RunningFeatureDetailHeatmapProps> = () => {
  return <div />;
};

export default RunningFeatureDetailHeatmap;
