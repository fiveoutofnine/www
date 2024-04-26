import createMDX from '@next/mdx';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeMdxCodeProps],
    providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // Copied from: https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1487801131
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    return config;
  },
};

export default withMDX(nextConfig);
