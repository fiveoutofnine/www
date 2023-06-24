import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { ReactElement } from 'react';

import SeoBase from '@/components/templates/seo-base';

export class CustomDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en" className="dark" style={{ background: 'black' }}>
        <Head>
          <SeoBase />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
