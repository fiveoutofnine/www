import Head from 'next/head';
import type { FC } from 'react';

/* Props */
export type SeoBaseProps = {
  name?: string;
};

/* Component */
const SeoBase: FC<SeoBaseProps> = ({ name }) => {
  const title = name ? `5/9 | ${name}` : '5/9';

  return (
    <Head>
      <link rel="shortcut icon" href="/images/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />

      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="theme-color" content="#FCFCFC" />
    </Head>
  );
};

export default SeoBase;
