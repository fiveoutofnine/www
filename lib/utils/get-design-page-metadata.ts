import type { Metadata } from 'next';

const getDesignPageMetadata = ({
  category,
  name,
  description,
}: {
  category: string;
  name: string;
  description: string;
}): Metadata => {
  const images = [
    {
      url: `https://fiveoutofnine.com/api/og/design?title=${category}&subtitle=${name}&description=${description}`,
      alt: `Open Graph image for 5/9 Design | ${name}`,
      width: 1200,
      height: 630,
    },
  ];

  return {
    title: name,
    description,
    openGraph: {
      title: `5/9 Design | ${name}`,
      description,
      images,
      url: 'https://fiveoutofnine.com/design',
      siteName: 'fiveoutofnine',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `5/9 Design | ${name}`,
      description,
      images,
      card: 'summary_large_image',
      creator: '@fiveoutofnine',
      creatorId: '1269561030272643076',
    },
  };
};

export default getDesignPageMetadata;
