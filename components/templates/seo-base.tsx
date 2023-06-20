import Head from 'next/head';
import type { FC } from 'react';

/* Props */
export type SeoBaseProps = {
  title?: string;
  subtitle?: string;
};

/* Component */
const SeoBase: FC<SeoBaseProps> = ({ title = '5/9', subtitle }) => {
  const fullTitle = subtitle && subtitle.length > 0 ? `${title} | ${subtitle}` : title;

  return (
    <Head>
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />

      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="theme-color" content="#000" />
    </Head>
  );
};

export default SeoBase;
