'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { getRandomImgUrl } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Constants and types
// -----------------------------------------------------------------------------

type AnimationState = 'idle' | 'swiping' | 'exiting-left' | 'exiting-right' | 'returning-to-center';

const SWIPE_THRESHOLD = 100;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ImgFeatureDetail: React.FC = () => {
  const [image, setImage] = useState<ReturnType<typeof getRandomImgUrl>>(getRandomImgUrl());
  const [nextImage, setNextImage] = useState<ReturnType<typeof getRandomImgUrl>>(
    getRandomImgUrl(image.index),
  );
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [swipeAmount, setSwipeAmount] = useState<number>(0);
  const [dragProgress, setDragProgress] = useState<number>(0);
  const [lastExitDirection, setLastExitDirection] = useState<'left' | 'right' | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const dragStartTimeRef = useRef<Date | null>(null);

  // Handle animation completion
  useEffect(() => {
    if (animationState === 'exiting-left' || animationState === 'exiting-right') {
      // Save the exit direction
      setLastExitDirection(animationState === 'exiting-left' ? 'left' : 'right');

      // Listen for transition end event on the card element
      const handleTransitionEnd = () => {
        // Update images directly after transition ends
        setImage(nextImage);
        setNextImage(getRandomImgUrl(nextImage.index));

        // Reset position variables
        setSwipeAmount(0);
        setDragProgress(0);

        // Request animation frame to ensure DOM updates before returning to idle
        requestAnimationFrame(() => {
          setLastExitDirection(null);
          setAnimationState('idle');
        });
      };

      const cardElement = cardRef.current;
      if (cardElement) {
        cardElement.addEventListener('transitionend', handleTransitionEnd, { once: true });

        // Cleanup listener if component unmounts during animation
        return () => {
          cardElement.removeEventListener('transitionend', handleTransitionEnd);
        };
      }
    }

    // Handle returning to center animation
    if (animationState === 'returning-to-center') {
      // Listen for transition end event on the card element
      const handleTransitionEnd = () => {
        setAnimationState('idle');
      };

      const cardElement = cardRef.current;
      if (cardElement) {
        cardElement.addEventListener('transitionend', handleTransitionEnd, { once: true });

        // Cleanup listener if component unmounts during animation
        return () => {
          cardElement.removeEventListener('transitionend', handleTransitionEnd);
        };
      }
    }
  }, [animationState, nextImage]);

  // Calculate scale and opacity for the next card based on drag progress
  const getNextCardStyle = () => {
    // Scale from 0.9 to 1.0 as drag progress increases
    const scale = animationState.startsWith('exiting')
      ? 1.0 // Fully scale when animation is completing
      : 0.9 + Math.min(0.1, dragProgress * 0.1);

    // Opacity from 0.5 to 1 as drag progress increases
    const opacity = 0.5 + dragProgress * 0.5;

    return { scale, opacity };
  };

  // Get styles for current card based on animation state
  const getCardStyle = () => {
    let transform = 'translateX(0) rotate(0deg)';
    let opacity = 1;
    let transition = 'none';

    // Apply transition for exiting and returning animations
    if (
      animationState === 'exiting-left' ||
      animationState === 'exiting-right' ||
      animationState === 'returning-to-center'
    ) {
      transition = 'transform 300ms ease-out, opacity 300ms ease-out';
    }

    // If we have a last exit direction and we're in idle state but still showing the exit direction
    if (lastExitDirection && animationState === 'idle') {
      transform =
        lastExitDirection === 'left'
          ? 'translateX(-110%) rotate(-18deg)'
          : 'translateX(110%) rotate(18deg)';
      opacity = 0;
    } else {
      switch (animationState) {
        case 'swiping':
          transform = `translateX(${swipeAmount}px) rotate(${swipeAmount * 0.05}deg)`;
          break;
        case 'exiting-left':
          transform = 'translateX(-110%) rotate(-18deg)';
          opacity = 0;
          break;
        case 'exiting-right':
          transform = 'translateX(110%) rotate(18deg)';
          opacity = 0;
          break;
      }
    }

    return { transform, opacity, transition };
  };

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  const { scale, opacity } = getNextCardStyle();
  const currentCardStyle = getCardStyle();

  // Determine if we should show the left or right gradient indicators
  const showLeftGradient = swipeAmount <= -SWIPE_THRESHOLD || animationState === 'exiting-left';
  const showRightGradient = swipeAmount >= SWIPE_THRESHOLD || animationState === 'exiting-right';

  return (
    <div className="relative flex h-[11.375rem] w-full overflow-hidden bg-gray-3">
      {/* Left indicator. */}
      <div
        className={clsx(
          'pointer-events-none absolute left-0 top-0 z-20 h-full w-8 min-w-8 bg-gradient-to-r from-red-3 to-transparent transition-opacity duration-300',
          showLeftGradient ? 'opacity-100' : 'opacity-0',
        )}
      ></div>

      {/* Image container. */}
      <div className="relative flex h-full grow items-center justify-center bg-gray-3 p-2">
        <div className="relative h-full w-full">
          {/* Next card (below) */}
          <div
            className="absolute inset-0 h-full w-full select-none overflow-hidden rounded-lg border border-gray-6 bg-black"
            key={`bottom-image-${nextImage.index}`}
            style={{
              transform: `scale(${scale})`,
              opacity: opacity,
              transition:
                animationState === 'swiping'
                  ? 'none'
                  : 'transform 300ms ease-in-out, opacity 300ms ease-in-out',
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

          {/* Current card (top) */}
          <div
            ref={cardRef}
            key={`top-image-${image.index}`}
            className="absolute inset-0 h-full w-full select-none overflow-hidden rounded-lg border border-gray-6 bg-black"
            style={currentCardStyle}
            onPointerDown={(event) => {
              // Don't swipe during animation.
              if (animationState !== 'idle' || lastExitDirection) return;

              event.preventDefault();
              // Mark the start of a drag.
              dragStartTimeRef.current = new Date();
              setAnimationState('swiping');
              pointerStartRef.current = { x: event.clientX, y: event.clientY };
              // Ensure we maintain correct pointer capture
              (event.target as HTMLElement).setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (!pointerStartRef.current || animationState !== 'swiping') return;

              // Calculate the displacement.
              const xDelta = event.clientX - pointerStartRef.current.x;
              setSwipeAmount(xDelta);

              // Calculate drag progress as percentage of threshold and clamp it
              // between 0 and 1.
              const progress = Math.min(1, Math.abs(xDelta) / SWIPE_THRESHOLD);
              setDragProgress(progress);
            }}
            onPointerUp={() => {
              if (
                !pointerStartRef.current ||
                !dragStartTimeRef.current ||
                animationState !== 'swiping'
              )
                return;

              // Calculate time taken and velocity.
              const timeTaken = new Date().getTime() - dragStartTimeRef.current.getTime();
              const velocity = Math.abs(swipeAmount) / timeTaken;

              // If swipe exceeds threshold or is fast enough.
              if (Math.abs(swipeAmount) >= SWIPE_THRESHOLD || velocity > 0.5) {
                // Set animation state directly instead of using a separate function
                setAnimationState(swipeAmount > 0 ? 'exiting-right' : 'exiting-left');
              } else {
                // If not swiped far enough, use the returning-to-center state
                setAnimationState('returning-to-center');
                setSwipeAmount(0);
                setDragProgress(0);
              }

              pointerStartRef.current = null;
              dragStartTimeRef.current = null;
            }}
            onPointerCancel={() => {
              setSwipeAmount(0);
              setDragProgress(0);
              setAnimationState('idle');
              pointerStartRef.current = null;
              dragStartTimeRef.current = null;
            }}
          >
            <Image
              src={image.url}
              alt={image.url}
              className="object-fit"
              sizes="(max-width: 768px) 100vw, 50vw"
              fill
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Right indicator. */}
      <div
        className={clsx(
          'pointer-events-none absolute right-0 top-0 z-20 h-full w-8 min-w-8 bg-gradient-to-l from-green-3 to-transparent transition-opacity duration-300',
          showRightGradient ? 'opacity-100' : 'opacity-0',
        )}
      ></div>
    </div>
  );
};

export default ImgFeatureDetail;
