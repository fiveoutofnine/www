import type { NextConfig } from 'next';

import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: 'assets.fiveoutofnine.com' },],
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  redirects: async () => [
    {
      // Backlink compatibility for the `<iframe>` in
      // https://rubin.io/bitcoin/2021/12/14/advent-17.
      source: '/asset/17',
      destination: '/api/chess/asset/17',
      permanent: true,
    },
  ],
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // Copied from: https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1487801131
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-math'],
    rehypePlugins: ['rehype-katex', 'rehype-mdx-code-props'],
  },
});

export default withMDX(nextConfig);
