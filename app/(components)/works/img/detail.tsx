'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { getRandomImgUrl } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

// Threshold to dismiss a card
const SWIPE_THRESHOLD = 100;

// Animation states
type AnimationState = 'idle' | 'swiping' | 'exiting-left' | 'exiting-right' | 'returning-to-center'; // State for incomplete swipes

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
    // Add a stop point at 70% of the scale progress
    const SCALE_STOP_POINT = 0.7;

    // Scale from 0.9 to 0.97 initially, then to 1.0 only after animation completes
    const scaleProgress = dragProgress > SCALE_STOP_POINT ? SCALE_STOP_POINT : dragProgress;
    const scale = animationState.startsWith('exiting')
      ? 1.0 // Fully scale when animation is completing
      : 0.9 + scaleProgress * 0.1;

    // Opacity from 0.5 to 1 as drag progress increases
    const opacity = 0.5 + dragProgress * 0.5;

    return {
      scale,
      opacity,
    };
  };

  // Handle swipe animation completion
  const completeSwipeAnimation = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setAnimationState('exiting-left');
    } else {
      setAnimationState('exiting-right');
    }
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
      if (lastExitDirection === 'left') {
        transform = 'translateX(-110%) rotate(-18deg)';
        opacity = 0;
      } else {
        transform = 'translateX(110%) rotate(18deg)';
        opacity = 0;
      }
    } else {
      switch (animationState) {
        case 'swiping':
          // When swiping left (negative X), rotate counterclockwise (negative angle)
          // When swiping right (positive X), rotate clockwise (positive angle)
          transform = `translateX(${swipeAmount}px) rotate(${swipeAmount * 0.05}deg)`;
          break;

        case 'exiting-left':
          // When exiting left, rotate counterclockwise (negative angle)
          transform = 'translateX(-110%) rotate(-18deg)';
          opacity = 0;
          break;

        case 'exiting-right':
          // When exiting right, rotate clockwise (positive angle)
          transform = 'translateX(110%) rotate(18deg)';
          opacity = 0;
          break;

        case 'idle':
        default:
          // Use default transform and opacity
          break;
      }
    }

    return {
      transform,
      opacity,
      transition,
    };
  };

  const { scale, opacity } = getNextCardStyle();
  const currentCardStyle = getCardStyle();

  return (
    <div className="flex h-[11.375rem] w-full overflow-hidden bg-black">
      <div className="h-full w-8 min-w-8 border-r border-red-6 bg-red-3" />

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
                const direction = swipeAmount > 0 ? 'right' : 'left';
                completeSwipeAnimation(direction);
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
        <div className="absolute bottom-0 left-0 z-30 font-mono text-xs text-white">
          {lastExitDirection ? `last:${lastExitDirection}` : animationState}
        </div>
      </div>

      <div className="z-20 flex h-full w-8 min-w-8 items-center justify-center border-l border-green-6 bg-green-3"></div>
    </div>
  );
};

export default ImgFeatureDetail;
