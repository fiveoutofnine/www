import type { ColormapSegmentData } from '@/lib/types/colormap';

export const COLORMAPS: { name: string; addedTxHash: string; data: ColormapSegmentData }[] = [
  {
    name: 'CMRmap',
    addedTxHash: '0x8184a1c8869377c83679d92038d4210738e6f05f0b01a415cb6895be9bc5b7f6',
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
    addedTxHash: '0x7638effd4e21bb6dd5fe5ea17053b3382d95bbf579f0009c84ada765e71b9232',
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
    addedTxHash: '0x09b5b20fe29c767abf94a262e7f3a883ce351c29cd3d2edac82937085e7d2e06',
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
    addedTxHash: '0x09b5b20fe29c767abf94a262e7f3a883ce351c29cd3d2edac82937085e7d2e06',
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
    addedTxHash: '0xdeccb58b761136fcc5482f584c035220692ce276d13a0dce8e5e5987e0ade324',
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
    addedTxHash: '0xe5551801b7affcd45caf3397152c18570bb18bf04f46799e3ecfb926474db590',
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
    addedTxHash: '0x4e3c47b320d76d35026059867b07df2ac7d73ae9f8b59f805ffb244fd436ae2e',
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
    addedTxHash: '0x02bde01f8ccf9cf6d1ac67aa96e412ed106152d14a8d7c34a0a3a701deae383e',
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
    addedTxHash: '0xd98446705fd122a756e10818007c1cb2d26a4c24a0bbd2a2b755e2b011918ac4',
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
    addedTxHash: '0x235d6a7ae3a51d8b9d9e2ee3413aaf6c52bf0be222c7c1619a684589a28560b7',
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
    addedTxHash: '0x1f7f6ade9815080c4363aadb072e44117920a9fbc4a2894497c98550bdd8a3de',
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
    addedTxHash: '0xaa0469abc479fdeec3cb7632bd6bbba67dc1f6b3ae491fdb6c0ad06d4432886a',
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
    addedTxHash: '0x7a9c4a017fea687b6c52866bdcc9bf85e6665f7824c7552633b44ac752389611',
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
    addedTxHash: '0x3a7ace4c624aad4f6725a66879fc3d926fe498c097ca9df590ba298775e532b4',
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
    addedTxHash: '0x9aa9ea3e34407c876696a03e028fb9daab397464946d72473d5e93d34f8c1053',
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
    addedTxHash: '0xe91c6010426a3ff162f03164c84d0968f4937b4fe695c39bd5b6d18fd2e76934',
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
    addedTxHash: '0x04597b68ead1418250438dafbac331a8e8a809c4e298e8fc8de2da97008e498b',
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
];
