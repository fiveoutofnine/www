export type ColormapSegmentData = {
  r: ColormapPartialSegmentData[];
  g: ColormapPartialSegmentData[];
  b: ColormapPartialSegmentData[];
};

export type ColormapPartialSegmentData = {
  position: number;
  startIntensity: number;
  endIntensity: number;
};
