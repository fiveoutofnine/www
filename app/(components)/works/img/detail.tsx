'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import clsx from 'clsx';

import { getRandomImgUrl } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Constants and types
// -----------------------------------------------------------------------------

type AnimationState = 'idle' | 'swiping' | 'exiting-left' | 'exiting-right' | 'returning-to-center';

const SWIPE_X_THRESHOLD = 100;

const SWIPE_VELOCITY_THRESHOLD = 0.5;

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
  const [lastExitDirection, setLastExitDirection] = useState<'left' | 'right' | null>(null);

  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const dragTimerRef = useRef<Date | null>(null);

  // ---------------------------------------------------------------------------
  // Animation styles
  // ---------------------------------------------------------------------------

  // Calculate scale and opacity for the next card based on drag progress
  const getNextCardStyle = () => {
    // Start at 0.9 as minimum scale
    const minScale = 0.9;
    // Maximum scale during swiping (before exiting animation)
    const maxSwipingScale = 0.97;
    // Final scale value
    const finalScale = 1.0;

    let scale = minScale;

    if (animationState.startsWith('exiting')) {
      // For exiting animations, we set scale to the maximum swiping scale
      // The actual 1.0 scale is applied in the component style for proper animation
      scale = maxSwipingScale;
    } else if (animationState === 'swiping') {
      // Use an asymptotic function that continuously increases with more movement
      // but approaches maxSwipingScale asymptotically without ever quite reaching it
      // This gives a natural feel and ensures the scale is always responding to movement

      // Use absolute swipe amount for the calculation (direction doesn't matter)
      const absSwipeAmount = Math.abs(swipeAmount);

      // Calculate the scale using an asymptotic function: 1 - e^(-x)
      // This function approaches 1 as x increases but never quite reaches it
      // We scale this behavior to our desired range (minScale to maxSwipingScale)
      const factor = 1 - Math.exp(-absSwipeAmount / (SWIPE_X_THRESHOLD * 0.8));
      const scaleRange = maxSwipingScale - minScale;

      scale = minScale + scaleRange * factor;

      // Ensure scale never exceeds maxSwipingScale during swiping
      scale = Math.min(maxSwipingScale, scale);
    } else if (lastExitDirection) {
      // When we have a last exit direction but we're in idle state,
      // the next card should already be at full scale
      scale = finalScale;
    }

    // Create a similar asymptotic function for opacity
    const minOpacity = 0.5;
    const maxSwipingOpacity = 0.9;

    let opacity = minOpacity;

    if (animationState.startsWith('exiting') || lastExitDirection) {
      opacity = 1.0;
    } else if (animationState === 'swiping') {
      // Similar asymptotic approach for opacity
      const absSwipeAmount = Math.abs(swipeAmount);
      const factor = 1 - Math.exp(-absSwipeAmount / (SWIPE_X_THRESHOLD * 0.7));
      const opacityRange = maxSwipingOpacity - minOpacity;

      opacity = minOpacity + opacityRange * factor;
      opacity = Math.min(maxSwipingOpacity, opacity);
    }

    return { scale, opacity };
  };

  // Get styles for current card based on animation state
  const getCardStyle = () => {
    let transform = 'translateX(0) rotate(0deg)';
    let opacity = 1;
    let transition = undefined;

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
          transition = 'transform 400ms ease-out, opacity 400ms ease-out';
          break;
        case 'exiting-right':
          transform = 'translateX(110%) rotate(18deg)';
          opacity = 0;
          transition = 'transform 400ms ease-out, opacity 400ms ease-out';
          break;
        case 'returning-to-center':
          transition = 'transform 400ms ease-out, opacity 400ms ease-out';
          break;
      }
    }

    return { transform, opacity, transition };
  };

  const { scale, opacity } = getNextCardStyle();
  const currentCardStyle = getCardStyle();

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  const disliked = swipeAmount <= -SWIPE_X_THRESHOLD || animationState === 'exiting-left';
  const liked = swipeAmount >= SWIPE_X_THRESHOLD || animationState === 'exiting-right';

  return (
    <div className="relative flex h-[11.375rem] w-full overflow-hidden bg-gray-3">
      {/* Image container. */}
      <div className="relative flex h-full grow items-center justify-center bg-gray-3 p-1">
        <div className="relative h-full w-full">
          {/* Next image to be displayed. */}
          <div
            className={clsx(
              'absolute inset-0 h-full w-full select-none overflow-hidden rounded-lg border border-gray-6 bg-black',
              animationState === 'swiping' ? '' : 'duration-[400ms] transition-all',
              animationState.startsWith('exiting') ? 'ease-out' : 'ease-in-out',
            )}
            key={`bottom-image-${nextImage.index}`}
            style={{
              transform: animationState.startsWith('exiting')
                ? 'scale(1)' // Target scale 1.0 for the transition
                : `scale(${scale})`, // Use calculated scale for other states
              opacity: opacity,
              // Add a shorter delay to the full scale-up transition when in exiting state
              // This ensures the next card animates more during the top card's exit
              transitionDelay: animationState.startsWith('exiting') ? '50ms' : '0ms',
              // Ensure the transform property is included in the transition
              transition: animationState === 'swiping' ? 'none' : undefined, // Let CSS classes handle this when not swiping
            }}
          >
            <Image
              src={nextImage.url}
              alt={nextImage.url}
              className="object-contain"
              sizes="100vw"
              draggable={false}
              fill
            />
          </div>

          {/* Current image displayed. */}
          <div
            key={`top-image-${image.index}`}
            className="absolute inset-0 h-full w-full select-none overflow-hidden rounded-lg border border-gray-6 bg-black"
            style={{
              opacity: currentCardStyle.opacity,
              transform: currentCardStyle.transform,
              transition: currentCardStyle.transition,
            }}
            onPointerDown={(e) => {
              // Don't swipe during animation.
              if (animationState !== 'idle' || lastExitDirection) return;
              e.preventDefault();

              // Mark the start of a drag.
              dragTimerRef.current = new Date();
              setAnimationState('swiping');
              pointerRef.current = { x: e.clientX, y: e.clientY };
              (e.target as HTMLElement).setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (!pointerRef.current || animationState !== 'swiping') return;

              setSwipeAmount(e.clientX - pointerRef.current.x);
            }}
            onPointerUp={() => {
              if (!pointerRef.current || !dragTimerRef.current || animationState !== 'swiping') {
                return;
              }

              // Determine whether or not to complete the swipe.
              const timeTaken = new Date().getTime() - dragTimerRef.current.getTime();
              const velocity = Math.abs(swipeAmount) / timeTaken;
              if (
                Math.abs(swipeAmount) >= SWIPE_X_THRESHOLD ||
                velocity > SWIPE_VELOCITY_THRESHOLD
              ) {
                setAnimationState(swipeAmount > 0 ? 'exiting-right' : 'exiting-left');
              } else {
                setAnimationState('returning-to-center');
                setSwipeAmount(0);
              }

              pointerRef.current = null;
              dragTimerRef.current = null;
            }}
            onPointerCancel={() => {
              setSwipeAmount(0);
              setAnimationState('idle');
              pointerRef.current = null;
              dragTimerRef.current = null;
            }}
            onTransitionEnd={() => {
              if (animationState === 'exiting-left' || animationState === 'exiting-right') {
                // Update images after transition ends.
                setImage(nextImage);
                setNextImage(getRandomImgUrl(nextImage.index));

                // Reset swipe amount.
                setSwipeAmount(0);

                // Request animation frame to ensure DOM updates before
                // returning to idle.
                requestAnimationFrame(() => {
                  setLastExitDirection(null);
                  setAnimationState('idle');
                });
              } else if (animationState === 'returning-to-center') {
                setAnimationState('idle');
              }
            }}
          >
            <Image
              src={image.url}
              alt={image.url}
              className="object-contain"
              sizes="100vw"
              draggable={false}
              fill
            />
          </div>
        </div>
      </div>

      {/* Dislike indicator. */}
      <div
        className={clsx(
          'pointer-events-none absolute left-0 top-0 z-20 h-full w-8 min-w-8 bg-gradient-to-r from-red-3 to-transparent transition-opacity duration-200',
          disliked ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden={true}
      />
      {/* Like indicator. */}
      <div
        className={clsx(
          'pointer-events-none absolute right-0 top-0 z-20 h-full w-8 min-w-8 bg-gradient-to-l from-green-3 to-transparent transition-opacity duration-200',
          liked ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden={true}
      />
    </div>
  );
};

export default ImgFeatureDetail;
