'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { getRandomImgUrl } from '@/lib/utils';

import { IconButton } from '@/components/ui';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SWIPE_THRESHOLD = 100; // Threshold to consider a swipe complete

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ImgFeatureDetail: React.FC = () => {
  const [image, setImage] = useState<ReturnType<typeof getRandomImgUrl>>(getRandomImgUrl());
  const [nextImage, setNextImage] = useState<ReturnType<typeof getRandomImgUrl>>(
    getRandomImgUrl(image.index),
  );
  const [phase, setPhase] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [swiping, setSwiping] = useState<boolean>(false);
  const [swipeOut, setSwipeOut] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  /* // Handle swipe gestures
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
      // Swipe was successful - animate out.
      setSwipeDirection(swipeAmount > 0 ? 'right' : 'left');
      setSwipeOut(true);

      // Complete the swipe animation.
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
      // Reset if swipe wasn't far enough.
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
  }; */

  return (
    <div className="flex h-[11.375rem] w-full overflow-hidden bg-black">
      <div className="h-full w-8 min-w-8 bg-red-9" />

      <div className="relative flex h-full grow items-center justify-center bg-gray-3 p-2">
        <div className="relative h-full w-full">
          <div
            className={clsx(
              'absolute inset-0 h-full w-full overflow-hidden rounded-lg border border-gray-6 bg-black',
              phase === 0
                ? 'scale-90 opacity-50'
                : phase === 1
                  ? 'scale-95 opacity-80'
                  : 'scale-100 opacity-100',
            )}
            style={{
              transitionProperty: 'opacity, transform',
              transitionDuration: '300ms',
              transitionTimingFunction: 'ease-in-out',
            }}
          >
            <Image
              src={nextImage.url}
              alt={nextImage.url}
              className="object-fit"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
            />
          </div>

          <div
            className={clsx(
              'absolute inset-0 h-full w-full overflow-hidden rounded-lg border border-gray-6 bg-black',
              phase === 0
                ? 'translate-x-0 rotate-0 opacity-100'
                : phase === 1
                  ? 'translate-x-1/2 rotate-[9deg] opacity-100'
                  : 'translate-x-[110%] rotate-[18deg] opacity-0',
            )}
            style={
              phase > 0
                ? {
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '300ms',
                    transitionTimingFunction: 'ease-in-out',
                  }
                : undefined
            }
          >
            <Image
              src={image.url}
              alt={image.url}
              className="object-fit"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
            />
          </div>
        </div>
      </div>

      <div className="z-20 flex h-full w-8 min-w-8 items-center justify-center bg-green-5">
        <IconButton
          size="sm"
          intent="success"
          onClick={() =>
            setPhase((prev) => {
              if (prev === 2) {
                setImage(nextImage);
                setNextImage(getRandomImgUrl(nextImage.index));
              }

              if (prev === 0) return 2;
              if (prev === 1) return 2;
              return (prev + 1) % 3;
            })
          }
        >
          {phase}
        </IconButton>
      </div>
    </div>
  );
};

export default ImgFeatureDetail;
