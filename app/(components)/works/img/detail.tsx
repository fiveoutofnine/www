'use client';

import Image from 'next/image';
import { useState } from 'react';

import { getRandomImgUrl } from '@/lib/utils';

const ImgFeatureDetail: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [image, setImage] = useState<ReturnType<typeof getRandomImgUrl>>(getRandomImgUrl());
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nextImage, setNextImage] = useState<ReturnType<typeof getRandomImgUrl>>(
    getRandomImgUrl(image.index),
  );

  return (
    <div className="flex h-[11.375rem] w-full overflow-hidden bg-black">
      <div className="h-full w-8 min-w-8 bg-red-9" />
      <div className="flex h-full grow items-center justify-center bg-gray-3 p-1">
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-md border border-gray-6 bg-black">
          <Image
            className="object-fit m-0"
            src={image.url}
            alt={image.url}
            width={1024}
            height={1024}
          />
        </div>
      </div>
      <div className="h-full w-8 min-w-8 bg-green-9" />
    </div>
  );
};

export default ImgFeatureDetail;
