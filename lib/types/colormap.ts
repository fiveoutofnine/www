/**
 * Type defining a colormap when read via piece-wise linear interpolation.
 * @dev From the project [**fiveoutofnine/colormap-registry**](https://github.com/fiveoutofnine/colormap-registry).
 * @param r Segment data for red's color value along the colormap.
 * @param g Segment data for green's color value along the colormap.
 * @param b Segment data for blue's color value along the colormap.
 */
export type ColormapSegmentData = {
  r: ColormapPartialSegmentData[];
  g: ColormapPartialSegmentData[];
  b: ColormapPartialSegmentData[];
};

/**
 * Type for a partial segment of a colormap.
 * @param position Position in the colormap the segment begins from.
 * @param startIntensity Intensity of R, G, or B the next segment starts at.
 * @param endIntensity Intensity of R, G, or B the previous segment ends at.
 */
export type ColormapPartialSegmentData = {
  position: number;
  startIntensity: number;
  endIntensity: number;
};
