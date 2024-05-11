import type { ColormapSegmentData } from '@/lib/types/colormap';

/**
 * Colormaps added to [`ColormapRegistry`](https://github.com/fiveoutofnine/colormap-registry),
 * a contract deployed to
 * [`0x0000000012883D1da628e31c0FE52e35DcF95D50`](https://etherscan.io/address/0x0000000012883D1da628e31c0FE52e35DcF95D50)
 * on Ethereum.
 */
export const COLORMAPS: { name: string; hash: string; data: ColormapSegmentData }[] = [
  {
    name: 'CMRmap',
    hash: '0x850ce48e7291439b1e41d21fc3f75dddd97580a4ff94aa9ebdd2bcbd423ea1e8',
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
  {
    name: 'Wistia',
    hash: '0x4f5e8ea8862eff315c110b682ee070b459ba8983a7575c9a9c4c25007039109d',
    data: {
      r: [
        { position: 0x00, startIntensity: 0xe4, endIntensity: 0xe4 },
        { position: 0x3f, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x7f, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xbf, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xfc, endIntensity: 0xfc },
      ],

      g: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x3f, startIntensity: 0xe8, endIntensity: 0xe8 },
        { position: 0x7f, startIntensity: 0xbd, endIntensity: 0xbd },
        { position: 0xbf, startIntensity: 0xa0, endIntensity: 0xa0 },
        { position: 0xff, startIntensity: 0x7f, endIntensity: 0x7f },
      ],

      b: [
        { position: 0x00, startIntensity: 0x7a, endIntensity: 0x7a },
        { position: 0x3f, startIntensity: 0x1a, endIntensity: 0x1a },
        { position: 0x7f, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xbf, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
    },
  },
  {
    name: 'autumn',
    hash: '0xf2e92189cb6903b98d854cd74ece6c3fafdb2d3472828a950633fdaa52e05032',
    data: {
      r: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
    },
  },
  {
    name: 'binary',
    hash: '0xa33e6c7c5627ecabfd54c4d85f9bf04815fe89a91379fcf56ccd8177e086db21',
    data: {
      r: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
      g: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
      b: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
    },
  },
  {
    name: 'bone',
    hash: '0xaa84b30df806b46f859a413cb036bc91466307aec5903fc4635c00a421f25d5c',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xbe, startIntensity: 0xa6, endIntensity: 0xa6 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x5d, startIntensity: 0x51, endIntensity: 0x51 },
        { position: 0xbe, startIntensity: 0xc6, endIntensity: 0xc6 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x5d, startIntensity: 0x71, endIntensity: 0x71 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
    },
  },
  {
    name: 'cool',
    hash: '0x864a6ee98b9b21ac0291523750d637250405c24a6575e1f75cfbd7209a810ce6',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
      b: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
    },
  },
  {
    name: 'copper',
    hash: '0xfd60cd3811f002814944a7d36167b7c9436187a389f2ee476dc883e37dc76bd2',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xce, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xc7, endIntensity: 0xc7 },
      ],
      b: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0x7e, endIntensity: 0x7e },
      ],
    },
  },
  {
    name: 'gist_rainbow',
    hash: '0xa8309447f8bd3b5e5e88a0abc05080b7682e4456c388b8636d45f5abb2ad2587',
    data: {
      r: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x07, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x36, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x66, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x95, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xc4, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xf3, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x07, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x36, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x66, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x95, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xc4, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xf3, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
      b: [
        { position: 0x00, startIntensity: 0x28, endIntensity: 0x28 },
        { position: 0x07, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x36, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x66, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x95, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xc4, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xf3, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xbf, endIntensity: 0xbf },
      ],
    },
  },
  {
    name: 'gist_stern',
    hash: '0x3be719b0c342797212c4cb33fde865ed9cbe486eb67176265bc0869b54dee925',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x0d, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x3f, startIntensity: 0x3f, endIntensity: 0x06 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x7f, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xbb, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
    },
  },
  {
    name: 'gray',
    hash: '0xca0da6b6309ed2117508207d68a59a18ccaf54ba9aa329f4f60a77481fcf2027',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
    },
  },
  {
    name: 'hot',
    hash: '0x5ccb29670bb9de0e3911d8e47bde627b0e3640e49c3d6a88d51ff699160dfbe1',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x0a, endIntensity: 0x0a },
        { position: 0x5d, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x5d, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xbe, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xbe, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
    },
  },
  {
    name: 'hsv',
    hash: '0x3de8f27f386dab3dbab473f3cc16870a717fe5692b4f6a45003d175c559dfcba',
    data: {
      r: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x28, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x2c, startIntensity: 0xf7, endIntensity: 0xf7 },
        { position: 0x54, startIntensity: 0x07, endIntensity: 0x07 },
        { position: 0x59, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xaa, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xae, startIntensity: 0x07, endIntensity: 0x07 },
        { position: 0xd6, startIntensity: 0xf7, endIntensity: 0xf7 },
        { position: 0xda, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x28, startIntensity: 0xef, endIntensity: 0xef },
        { position: 0x2c, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x81, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xaa, startIntensity: 0x0f, endIntensity: 0x0f },
        { position: 0xae, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
      b: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x54, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x59, startIntensity: 0x0f, endIntensity: 0x0f },
        { position: 0x81, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xd6, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xda, startIntensity: 0xef, endIntensity: 0xef },
        { position: 0xff, startIntensity: 0x17, endIntensity: 0x17 },
      ],
    },
  },
  {
    name: 'jet',
    hash: '0x026736ef8439ebcf8e7b8006bf8cb7482ced84d71b900407a9ed63e1b7bfe234',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x59, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xa8, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xe2, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0x7f, endIntensity: 0x7f },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x1f, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x5f, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xa3, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xe8, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
      b: [
        { position: 0x00, startIntensity: 0x7f, endIntensity: 0x7f },
        { position: 0x1c, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x56, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xa5, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
    },
  },
  {
    name: 'spring',
    hash: '0xc1806ea961848ac00c1f20aa0611529da522a7bd125a3036fe4641b07ee5c61c',
    data: {
      r: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
    },
  },
  {
    name: 'summer',
    hash: '0x87970b686eb726750ec792d49da173387a567764d691294d764e53439359c436',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x7f, endIntensity: 0x7f },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0x66, endIntensity: 0x66 },
        { position: 0xff, startIntensity: 0x66, endIntensity: 0x66 },
      ],
    },
  },
  {
    name: 'terrain',
    hash: '0xaa6277ab923279cf59d78b9b5b7fb5089c90802c353489571fca3c138056fb1b',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x33, endIntensity: 0x33 },
        { position: 0x26, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x3f, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0x7f, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xbf, startIntensity: 0x7f, endIntensity: 0x7f },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x33, endIntensity: 0x33 },
        { position: 0x26, startIntensity: 0x99, endIntensity: 0x99 },
        { position: 0x3f, startIntensity: 0xcc, endIntensity: 0xcc },
        { position: 0x7f, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xbf, startIntensity: 0x5b, endIntensity: 0x5b },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0x99, endIntensity: 0x99 },
        { position: 0x26, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0x3f, startIntensity: 0x66, endIntensity: 0x66 },
        { position: 0x7f, startIntensity: 0x99, endIntensity: 0x99 },
        { position: 0xbf, startIntensity: 0x54, endIntensity: 0x54 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
    },
  },
  {
    name: 'winter',
    hash: '0xdc1cecffc00e2f3196daaf53c27e53e6052a86dc875adb91607824d62469b2bf',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0x00, endIntensity: 0x00 },
      ],
      g: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0x7f, endIntensity: 0x7f },
      ],
    },
  },
  {
    name: 'base-chain',
    hash: '0xe5ec9a5a3ef46e357143cc14278c12216a0741868448333a333bee0579cb50e7',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x00, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x52, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0xff, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
    },
  },
  {
    name: 'farcaster',
    hash: '0xe0ac19c2ffc50b0fb5289138b9c918aa1e0975cb0734ce852b29bbbf4de269de',
    data: {
      r: [
        { position: 0x00, startIntensity: 0x8a, endIntensity: 0x00 },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      g: [
        { position: 0x00, startIntensity: 0x63, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
      b: [
        { position: 0x00, startIntensity: 0xd2, endIntensity: 0xff },
        { position: 0xff, startIntensity: 0xff, endIntensity: 0xff },
      ],
    },
  },
];
