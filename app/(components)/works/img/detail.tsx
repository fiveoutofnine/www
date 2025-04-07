'use client';

import { useState } from 'react';

import { getRandomImgUrl } from '@/lib/utils';

const ImgFeatureDetail: React.FC = () => {
  const [image, setImage] = useState<ReturnType<typeof getRandomImgUrl>>();
  const [nextImage, setNextImage] = useState<ReturnType<typeof getRandomImgUrl>>();
  const [mounted, setMounted] = useState<boolean>(false);

  return (
    <div className="flex h-[11.375rem] w-full overflow-hidden bg-black">
      <div className="h-full w-8 bg-red-9" />
      <div className="h-full grow bg-black" />
      <div className="h-full w-8 bg-green-9" />
    </div>
  );
};

export default ImgFeatureDetail;
