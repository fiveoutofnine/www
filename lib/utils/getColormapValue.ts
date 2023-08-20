import type { ColormapPartialSegmentData, ColormapSegmentData } from '@/lib/types/colormap';

const getColormapValue = (colormapSegmentData: ColormapSegmentData, position: number) => {
  return {
    r: computeLinearInterpolation(colormapSegmentData.r, position),
    g: computeLinearInterpolation(colormapSegmentData.g, position),
    b: computeLinearInterpolation(colormapSegmentData.b, position),
  };
};

const computeLinearInterpolation = (
  segmentData: ColormapPartialSegmentData[],
  position: number,
) => {
  // Clamp the position to the range `[0, 0xff]`.
  position = Math.max(0, Math.min(0xff, position));

  // We loop until we find the segment with the greatest position less than
  // `position`.
  let i = 0;
  while (segmentData[i + 1].position < position) {
    ++i;
  }

  // Retrieve the start and end of the identified segment.
  const start = segmentData[i];
  const end = segmentData[i + 1];
  const startIntensity = start.startIntensity;
  const endIntensity = end.endIntensity;

  // Compute the value with a piece-wise linear interpolation on the segments.
  const change = position - start.position;
  const length = end.position - start.position;

  return Math.floor(startIntensity + ((endIntensity - startIntensity) * change) / length);
};

export default getColormapValue;
