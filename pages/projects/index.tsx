import React from 'react';

import Contents from './contents/contents';
import { NextSeo } from 'next-seo';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';
import KentMiguelHeader from '@/components/pages/home/header';

const Projects = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          description: 'writing',
          url: 'https://kentmiguel.com/resume',
          site_name: 'kentmiguel',
          images: [
            {
              url: 'https://kentmiguel.com/static/og/blog.png',
              width: 1200,
              height: 630,
              alt: 'Kent Miguel resume open-graph image',
            },
          ],
        }}
        twitter={{
          handle: '@kmiguel10',
        }}
      />

      <BaseLayout subtitle="Projects" pageSlug="/projects">
        <ContainerLayout className="flex flex-col space-y-4">
          <KentMiguelHeader />
          <Contents />
        </ContainerLayout>
      </BaseLayout>
    </>
  );
};

export default Projects;
