'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { getRandomImgUrl } from '@/lib/utils';

const SWIPE_THRESHOLD = 250; // Threshold to consider a swipe complete

const ImgFeatureDetail: React.FC = () => {
  const [image, setImage] = useState<ReturnType<typeof getRandomImgUrl>>(getRandomImgUrl());
  const [nextImage, setNextImage] = useState<ReturnType<typeof getRandomImgUrl>>(
    getRandomImgUrl(image.index),
  );
  const [swiping, setSwiping] = useState<boolean>(false);
  const [swipeOut, setSwipeOut] = useState<boolean>(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragStartTime = useRef<Date | null>(null);

  // Reset the image after swipe out animation completes
  useEffect(() => {
    if (swipeOut) {
      const timeout = setTimeout(() => {
        setImage(nextImage);
        setNextImage(getRandomImgUrl(nextImage.index));
        setSwipeOut(false);
        setSwiping(false);
        setSwipeDirection(null);
        if (imageContainerRef.current) {
          imageContainerRef.current.style.setProperty('--swipe-amount', '0px');
          imageContainerRef.current.style.setProperty('--rotation', '0deg');
          imageContainerRef.current.style.setProperty('--scale', '1');
        }
      }, 300); // match this with CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [swipeOut, nextImage]);

  // Handle swipe gestures
  const handlePointerDown = (event: React.PointerEvent) => {
    dragStartTime.current = new Date();
    // Ensure we maintain correct pointer capture
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    setSwiping(true);
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (!pointerStartRef.current || swipeOut) return;

    const xDelta = event.clientX - pointerStartRef.current.x;

    // Calculate rotation based on swipe distance (max ±10 degrees)
    const rotationDegree = Math.min(Math.max(xDelta / 20, -10), 10);

    // Calculate scale decrease as card moves away (0.9 to 1)
    const scaleFactor = Math.max(0.9, 1 - Math.abs(xDelta) / 1000);

    // Apply transform
    if (imageContainerRef.current) {
      imageContainerRef.current.style.setProperty('--swipe-amount', `${xDelta}px`);
      imageContainerRef.current.style.setProperty('--rotation', `${rotationDegree}deg`);
      imageContainerRef.current.style.setProperty('--scale', `${scaleFactor}`);

      // Visual feedback for swipe direction.
      if (xDelta > 30) setSwipeDirection('right');
      else if (xDelta < -30) setSwipeDirection('left');
      else setSwipeDirection(null);
    }
  };

  const handlePointerUp = () => {
    if (!pointerStartRef.current || swipeOut) return;

    const swipeAmount = imageContainerRef.current
      ? parseFloat(imageContainerRef.current.style.getPropertyValue('--swipe-amount') || '0')
      : 0;

    const timeTaken = dragStartTime.current
      ? new Date().getTime() - dragStartTime.current.getTime()
      : 0;

    const velocity = Math.abs(swipeAmount) / (timeTaken || 1);

    if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.11) {
      // Swipe was successful - animate out
      setSwipeDirection(swipeAmount > 0 ? 'right' : 'left');
      setSwipeOut(true);

      // Complete the swipe animation
      if (imageContainerRef.current) {
        const direction = swipeAmount > 0 ? 1 : -1;
        const rotation = direction * 45; // Rotate more dramatically on swipe out

        imageContainerRef.current.style.setProperty(
          '--swipe-amount',
          `${direction * window.innerWidth}px`,
        );
        imageContainerRef.current.style.setProperty('--rotation', `${rotation}deg`);
        imageContainerRef.current.style.setProperty('--scale', '0.8');
      }
    } else {
      // Reset if swipe wasn't far enough
      if (imageContainerRef.current) {
        imageContainerRef.current.style.setProperty('--swipe-amount', '0px');
        imageContainerRef.current.style.setProperty('--rotation', '0deg');
        imageContainerRef.current.style.setProperty('--scale', '1');
      }
      setSwiping(false);
      setSwipeDirection(null);
    }

    pointerStartRef.current = null;
    dragStartTime.current = null;
  };

  const handlePointerCancel = () => {
    if (imageContainerRef.current) {
      imageContainerRef.current.style.setProperty('--swipe-amount', '0px');
      imageContainerRef.current.style.setProperty('--rotation', '0deg');
      imageContainerRef.current.style.setProperty('--scale', '1');
    }
    setSwiping(false);
    setSwipeDirection(null);
    pointerStartRef.current = null;
    dragStartTime.current = null;
  };

  return (
    <div className="flex h-[11.375rem] w-full overflow-hidden bg-black">
      <div className="h-full w-8 min-w-8 bg-red-9" />

      <div className="flex h-full grow items-center justify-center bg-gray-3 p-1">
        {/* Card stack container with relative positioning */}
        <div className="relative h-full w-full overflow-hidden rounded-md border border-gray-6 bg-black">
          {/* Current image with swipe functionality */}
          <div
            ref={imageContainerRef}
            className={clsx(
              'absolute inset-0 z-10 flex transform touch-none select-none items-center justify-center',
              swiping ? 'cursor-grabbing' : 'cursor-grab',
              swipeOut
                ? 'transition-all duration-300 ease-out'
                : 'transition-all duration-200 ease-out',
            )}
            style={{
              transform: `
                translateX(var(--swipe-amount, 0px)) 
                rotate(var(--rotation, 0deg))
                scale(var(--scale, 1))
              `,
              opacity: swipeOut ? 0 : 1,
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onPointerLeave={handlePointerCancel}
          >
            <Image
              className="object-fit pointer-events-none m-0 h-full w-full"
              src={image.url}
              alt={image.url}
              width={1024}
              height={1024}
            />

            {/* Direction indicators that appear during swipe */}
            <div
              className={clsx(
                'pointer-events-none absolute inset-0 flex items-center justify-center',
                swipeDirection === 'left' ? 'opacity-100' : 'opacity-0',
                'transition-opacity duration-200',
              )}
            >
              <div className="-rotate-12 transform rounded-lg bg-red-500 bg-opacity-70 px-4 py-2 font-bold text-white">
                NOPE
              </div>
            </div>
            <div
              className={clsx(
                'pointer-events-none absolute inset-0 flex items-center justify-center',
                swipeDirection === 'right' ? 'opacity-100' : 'opacity-0',
                'transition-opacity duration-200',
              )}
            >
              <div className="rotate-12 transform rounded-lg bg-green-500 bg-opacity-70 px-4 py-2 font-bold text-white">
                LIKE
              </div>
            </div>
          </div>

          {/* Next image (positioned beneath current image) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              className="object-fit pointer-events-none m-0"
              src={nextImage.url}
              alt={nextImage.url}
              width={1024}
              height={1024}
            />
          </div>
        </div>
      </div>

      <div className="h-full w-8 min-w-8 bg-green-9" />
    </div>
  );
};

export default ImgFeatureDetail;
