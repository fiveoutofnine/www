import type { ColormapSegmentData } from '@/lib/types/colormap';

export const COLORMAPS: { name: string; addedTxHash: string; data: ColormapSegmentData }[] = [
  {
    name: 'CMRmap',
    addedTxHash: '',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x1f, startIntensity: 0x26, endIntensity: 0x26 },
        { position: 0x3f, startIntensity: 0x4c, endIntensity: 0x4c },
        { position: 0x5f, startIntensity: 0x99, endIntensity: 0x99 },
        { position: 0x7f, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x9f, startIntensity: 0xe5, endIntensity: 0xe5 },
        { position: 0xbf, startIntensity: 0xe5, endIntensity: 0xe5 },
        { position: 0xdf, startIntensity: 0xe5, endIntensity: 0xe5 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x1f, startIntensity: 0x26, endIntensity: 0x26 },
        { position: 0x3f, startIntensity: 0x26, endIntensity: 0x26 },
        { position: 0x5f, startIntensity: 0x33, endIntensity: 0x33 },
        { position: 0x7f, startIntensity: 0x3f, endIntensity: 0x3f },
        { position: 0x9f, startIntensity: 0x7f, endIntensity: 0x7f },
        { position: 0xbf, startIntensity: 0xbf, endIntensity: 0xbf },
        { position: 0xdf, startIntensity: 0xe5, endIntensity: 0xe5 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x1f, startIntensity: 0x7f, endIntensity: 0x7f },
        { position: 0x3f, startIntensity: 0xbf, endIntensity: 0xbf },
        { position: 0x5f, startIntensity: 0x7f, endIntensity: 0x7f },
        { position: 0x7f, startIntensity: 0x26, endIntensity: 0x26 },
        { position: 0x9f, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xbf, startIntensity: 0x19, endIntensity: 0x19 },
        { position: 0xdf, startIntensity: 0x7f, endIntensity: 0x7f },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
    },
  },
];
