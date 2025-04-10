'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { Download, ThumbsUp, X } from 'lucide-react';

import { getRandomImgUrl } from '@/lib/utils';

import { Button, IconButton, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Constants and types
// -----------------------------------------------------------------------------

type AnimationState = 'idle' | 'swiping' | 'exiting-left' | 'exiting-right' | 'returning-to-center';

const SWIPE_X_THRESHOLD = 85;
const SWIPE_VELOCITY_THRESHOLD = 0.5;

const SCALE_MIN = 0.88;
const SCALE_MAX_SWIPING = 0.98;
const SCALE_FINAL = 1.0;

const OPACITY_MIN = 0.25;
const OPACITY_MAX_SWIPING = 0.85;
const OPACITY_FINAL = 1.0;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ImgFeatureDetail: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [image, setImage] = useState<ReturnType<typeof getRandomImgUrl>>(getRandomImgUrl());
  const [nextImage, setNextImage] = useState<ReturnType<typeof getRandomImgUrl>>(
    getRandomImgUrl(image.index),
  );
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [swipeAmount, setSwipeAmount] = useState<number>(0);
  const [lastExitDirection, setLastExitDirection] = useState<'left' | 'right' | null>(null);

  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const dragTimerRef = useRef<Date | null>(null);

  useEffect(() => setMounted(true), []);

  // We need this to sync the state of the swipe to prevent blocking.
  useEffect(() => {
    if (animationState === 'idle' && lastExitDirection !== null) {
      requestAnimationFrame(() => setLastExitDirection(null));
    }
  }, [animationState, lastExitDirection]);

  const isTouchScreen = mounted ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false;

  // ---------------------------------------------------------------------------
  // Animation styles
  // ---------------------------------------------------------------------------

  const getBottomStyle = () => {
    let scale = SCALE_MIN;
    let opacity = OPACITY_MIN;
    let transition = undefined;

    if (animationState.startsWith('exiting')) {
      scale = SCALE_FINAL;
      opacity = OPACITY_FINAL;
      transition = 'transform 150ms ease-out, opacity 300ms ease-out';
    } else if (animationState === 'swiping') {
      const absSwipeAmount = Math.abs(swipeAmount);

      // Calculate the scale and opacity using an asymptotic function
      // $1 - e^{-x}$ to provide a slight animation up til the threshold point
      // as the card is being swiped `scaleFactor` and `opacityFactor` never
      // exceeds 1.
      const scaleFactor = 1 - Math.exp(-absSwipeAmount / (SWIPE_X_THRESHOLD * 0.8));
      const scaleRange = SCALE_MAX_SWIPING - SCALE_MIN;
      scale = Math.min(SCALE_MAX_SWIPING, SCALE_MIN + scaleRange * scaleFactor);
      const opacityFactor = 1 - Math.exp(-absSwipeAmount / (SWIPE_X_THRESHOLD * 0.7));
      const opacityRange = OPACITY_MAX_SWIPING - OPACITY_MIN;
      opacity = Math.min(OPACITY_MAX_SWIPING, OPACITY_MIN + opacityRange * opacityFactor);

      transition = 'none';
    } else if (lastExitDirection) {
      // If the card has exited, the next card should be at full scale, as if
      // it's already been slotted in.
      scale = SCALE_FINAL;
      opacity = OPACITY_FINAL;
      transition = 'transform 450ms cubic-bezier(0.33, 0.66, 0.33, 1), opacity 500ms ease-in';
    } else {
      transition = 'transform 450ms cubic-bezier(0.33, 0.66, 0.33, 1), opacity 500ms ease-in-out';
    }

    return {
      transform: `scale(${scale})`,
      opacity,
      transition,
    };
  };

  const getTopStyle = () => {
    let transform = 'translateX(0) rotate(0deg)';
    let opacity = 1;
    let transition = undefined;
    let scale = 1;

    if (lastExitDirection && animationState === 'idle') {
      transform =
        lastExitDirection === 'left'
          ? 'translateX(-110%) rotate(-18deg)'
          : 'translateX(110%) rotate(18deg)';
      opacity = 0;
    } else if (animationState === 'swiping') {
      transform = `translateX(${swipeAmount}px) rotate(${swipeAmount * 0.05}deg)`;
      scale = 0.99;
      transition = 'transform 150ms ease-out';
    } else if (animationState === 'exiting-left') {
      transform = 'translateX(-110%) rotate(-18deg)';
      opacity = 0;
      transition = 'transform 300ms cubic-bezier(0.33, 0.9, 0.5, 1), opacity 400ms ease-out';
    } else if (animationState === 'exiting-right') {
      transform = 'translateX(110%) rotate(18deg)';
      opacity = 0;
      transition = 'transform 300ms cubic-bezier(0.33, 0.9, 0.5, 1), opacity 400ms ease-out';
    } else if (animationState === 'returning-to-center') {
      transition = 'transform 400ms cubic-bezier(0.25, 0.85, 0.25, 1.03), opacity 500ms ease-out';
    } else {
      transition = 'transform 150ms ease-out';
    }

    return {
      transform: `${transform} scale(${scale})`,
      opacity,
      transition,
    };
  };

  // ---------------------------------------------------------------------------
  // Event handlers
  // ---------------------------------------------------------------------------

  const handleSwipeStart = (clientX: number, clientY: number) => {
    // Don't swipe during animation.
    if (animationState !== 'idle') return;

    // Mark the start of a drag.
    dragTimerRef.current = new Date();
    setAnimationState('swiping');
    pointerRef.current = { x: clientX, y: clientY };
  };

  const handleSwipeMove = (clientX: number) => {
    if (!pointerRef.current || animationState !== 'swiping') return;

    // Only update the horizontal movement.
    const deltaX = clientX - pointerRef.current.x;
    setSwipeAmount(deltaX);
  };

  const handleSwipeEnd = () => {
    if (!pointerRef.current || !dragTimerRef.current || animationState !== 'swiping') {
      return;
    }

    // Determine whether or not to complete the swipe.
    const timeTaken = new Date().getTime() - dragTimerRef.current.getTime();
    const velocity = Math.abs(swipeAmount) / timeTaken;

    if (Math.abs(swipeAmount) < 5) {
      setAnimationState('idle');
    } else if (Math.abs(swipeAmount) >= SWIPE_X_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD) {
      setAnimationState(swipeAmount > 0 ? 'exiting-right' : 'exiting-left');
    } else {
      setAnimationState('returning-to-center');
      setSwipeAmount(0);
    }

    pointerRef.current = null;
    dragTimerRef.current = null;
  };

  const handleSwipeCancel = () => {
    setSwipeAmount(0);
    setAnimationState('idle');
    pointerRef.current = null;
    dragTimerRef.current = null;
  };

  const handleTransitionEnd = () => {
    if (animationState === 'exiting-left' || animationState === 'exiting-right') {
      // Update images after transition ends.
      setImage(nextImage);
      setNextImage(getRandomImgUrl(nextImage.index));

      // Reset swipe amount.
      setSwipeAmount(0);

      // Request animation frame to ensure DOM updates before returning to idle.
      requestAnimationFrame(() => {
        setLastExitDirection(null);
        setAnimationState('idle');
      });
    } else if (animationState === 'returning-to-center') {
      setAnimationState('idle');
    }
  };

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  const bottomStyle = getBottomStyle();
  const topStyle = getTopStyle();
  const disliked = swipeAmount <= -SWIPE_X_THRESHOLD || animationState === 'exiting-left';
  const liked = swipeAmount >= SWIPE_X_THRESHOLD || animationState === 'exiting-right';

  // Prepare event handlers based on device type.
  const swipeEventHandlers = isTouchScreen
    ? {
        onTouchStart: (e: React.TouchEvent) => {
          handleSwipeStart(e.touches[0].clientX, e.touches[0].clientY);
        },
        onTouchMove: (e: React.TouchEvent) => {
          if (animationState === 'swiping') {
            // Prevent scrolling while swiping.
            e.preventDefault();
            handleSwipeMove(e.touches[0].clientX);
          }
        },
        onTouchEnd: handleSwipeEnd,
        onTouchCancel: handleSwipeCancel,
        onTransitionEnd: handleTransitionEnd,
      }
    : {
        onPointerDown: (e: React.PointerEvent) => {
          e.preventDefault();
          handleSwipeStart(e.clientX, e.clientY);
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
        },
        onPointerMove: (e: React.PointerEvent) => {
          handleSwipeMove(e.clientX);
        },
        onPointerUp: handleSwipeEnd,
        onPointerCancel: handleSwipeCancel,
        onTransitionEnd: handleTransitionEnd,
      };

  return (
    <div className="relative flex h-[11.375rem] w-full flex-col overflow-hidden bg-gray-3">
      {/* Image container. */}
      <div className="relative flex h-full grow items-center justify-center bg-gray-3 p-1">
        <div className="relative h-full w-full">
          {/* Next image to be displayed. */}
          <div
            className="absolute inset-0 h-full w-full select-none overflow-hidden rounded-lg border border-gray-6 bg-black"
            key={`bottom-image-${nextImage.index}`}
            style={bottomStyle}
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
            className={clsx(
              'absolute inset-0 h-full w-full select-none overflow-hidden rounded-lg border border-gray-6 bg-black',
              animationState === 'swiping' ? 'cursor-grabbing' : 'cursor-grab',
              'touch-none',
            )}
            style={topStyle}
            draggable
            {...swipeEventHandlers}
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

      <div className="z-30 flex h-10 w-full items-center gap-1 px-2 pb-2 pt-0">
        <Tooltip side="top" align="start" content="Dislike" triggerProps={{ asChild: true }}>
          <IconButton
            size="sm"
            variant="outline"
            intent="fail"
            onClick={() => {
              setAnimationState('exiting-left');
              setLastExitDirection('left');
            }}
            disabled={animationState !== 'idle'}
          >
            <X />
          </IconButton>
        </Tooltip>
        <Button
          className="grow"
          size="sm"
          disabled={animationState !== 'idle'}
          rightIcon={<Download />}
          onClick={() => {
            const link = document.createElement('a');
            link.href = image.url;
            link.download = image.url.split('/').pop() ?? 'image.webp';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          Download
        </Button>
        <Tooltip side="top" align="end" content="Like" triggerProps={{ asChild: true }}>
          <IconButton
            size="sm"
            variant="outline"
            intent="success"
            onClick={() => {
              setAnimationState('exiting-right');
              setLastExitDirection('right');
            }}
            disabled={animationState !== 'idle'}
          >
            <ThumbsUp />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ImgFeatureDetail;
