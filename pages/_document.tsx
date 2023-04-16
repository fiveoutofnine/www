import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { ReactElement } from 'react';

import SeoBase from '@/components/templates/seo-base';

export class CustomDocument extends Document {
  render(): ReactElement {
    return (
      <Html
        lang="en"
        className="dark"
        style={{ background: 'hsl(0deg 0% 8.5%)', color: 'hsl(0deg 0% 93%)' }}
      >
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
