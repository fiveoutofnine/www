import createMDX from '@next/mdx';
import rehypeKatex from 'rehype-katex';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkMath from 'remark-math';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeMdxCodeProps],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.fiveoutofnine.com'],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        // Backlink compatibility for the `<iframe>` in
        // https://rubin.io/bitcoin/2021/12/14/advent-17. :).
        source: '/asset/17',
        destination: '/api/chess/asset/17',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // Copied from: https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1487801131
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },
};

export default withMDX(nextConfig);
