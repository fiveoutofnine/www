import type { NextPage } from 'next';
import React from 'react';

import Experience from './contents/experience';
import Skills from './contents/skills';
import { NextSeo } from 'next-seo';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';
import KentMiguelHeader from '@/components/pages/home/header';
import { Button } from '@/components/ui';

const Resume = () => {
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

      <BaseLayout subtitle="Resume" pageSlug="/resume">
        <ContainerLayout className="flex flex-col space-y-4">
          <KentMiguelHeader />
          <Skills />
          <Experience />
        </ContainerLayout>
      </BaseLayout>
    </>
  );
};

export default Resume;
