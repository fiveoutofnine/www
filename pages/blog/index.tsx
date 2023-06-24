import type { NextPage } from 'next';
import Image from 'next/image';

import { ChevronLeft } from 'lucide-react';
import { NextSeo } from 'next-seo';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';
import { Button } from '@/components/ui';

/* Page */
const BlogPage: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          description: 'writing',
          url: 'https://fiveoutofnine.com/blog',
          site_name: 'fiveoutofnine',
          images: [
            {
              // TODO: replace base URL with `fiveoutofnine.com` before merging
              // to `main`.
              url: 'https://www-git-v1-fiveoutofnine.vercel.app/static/og/blog.png',
              width: 1200,
              height: 630,
              alt: '5/9 blog open-graph image',
            },
          ],
        }}
        twitter={{
          handle: '@fiveoutofnine',
        }}
      />

      <BaseLayout subtitle="Blog" pageSlug="/blog">
        <ContainerLayout className="flex flex-col space-y-4">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-12 md:text-4xl">Blog</h1>
          <div className="text-gray-11">Work in progress.</div>
          <Image
            className="rounded-2xl border border-gray-6"
            src="/static/chu_totoro.webp"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,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"
            width={1500}
            height={847}
            alt="Chu Totoro walking"
          />
          <Button variant="secondary" intent="primary" leftIcon={<ChevronLeft />}>
            Return home
          </Button>
        </ContainerLayout>
      </BaseLayout>
    </>
  );
};

export default BlogPage;
