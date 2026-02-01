'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { RotateCcw, RotateCw } from 'lucide-react';

import { useIsTouchScreen } from '@/lib/hooks';
import { getRandomWebPUrl } from '@/lib/utils';

import { Tooltip } from '@/components/ui';

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

const WebPFeatureDetail: React.FC = () => {
  const [image, setImage] = useState<ReturnType<typeof getRandomWebPUrl> | null>();
  const [nextImage, setNextImage] =
    useState<ReturnType<typeof getRandomWebPUrl>>(getRandomWebPUrl());
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [swipeAmount, setSwipeAmount] = useState<number>(0);
  const [lastExitDirection, setLastExitDirection] = useState<'left' | 'right' | null>(null);
  const [polaroidAngle, setPolaroidAngle] = useState<number>(0);

  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const dragTimerRef = useRef<Date | null>(null);
  const isTouchScreen = useIsTouchScreen();


  // We need this to sync the state of the swipe to prevent blocking.
  useEffect(() => {
    if (animationState === 'idle' && lastExitDirection !== null) {
      requestAnimationFrame(() => setLastExitDirection(null));
    }
  }, [animationState, lastExitDirection]);

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
      setNextImage(getRandomWebPUrl(nextImage.index));

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
              className="flex items-center justify-center object-contain px-4 text-center text-sm text-gray-11"
              sizes="100vw"
              draggable={false}
              fill
            />
          </div>

          {/* Current image displayed. */}
          <div
            key={`top-image-${image?.index ?? 'null'}`}
            className={clsx(
              'absolute inset-0 h-full w-full select-none overflow-hidden rounded-lg border border-gray-6 bg-black',
              animationState === 'swiping' ? 'cursor-grabbing' : 'cursor-grab',
              'touch-none',
            )}
            style={topStyle}
            draggable
            {...swipeEventHandlers}
          >
            {image ? (
              <Image
                src={image.url}
                alt={image.url}
                className="flex items-center justify-center object-contain px-4 text-center text-sm text-gray-11"
                sizes="100vw"
                draggable={false}
                fill
              />
            ) : (
              <div className="relative flex h-full w-full p-2.5">
                <div
                  className="flex h-full w-full flex-col justify-between p-2.5 text-white"
                  style={{
                    backgroundImage: `linear-gradient(${polaroidAngle}deg, ${[
                      '#D60026', // red
                      '#FF8200', // orange
                      '#FFB500', // yellow
                      '#78BE20', // green
                      '#198CD9', // blue
                    ]
                      .map((color, index) => `${color} ${index * 20}% ${(index + 1) * 20}%`)
                      .join(', ')})`,
                  }}
                >
                  <div className="text-4xl font-medium leading-none tracking-tight">
                    Swipe left
                    <br />
                    or right
                  </div>
                  <div className="text-lg font-normal tracking-tight">
                    {process.env.NEXT_PUBLIC_NUMBER_OF_IMAGES.toLocaleString()} images
                  </div>
                </div>
                <div className="absolute bottom-[1.375rem] right-[1.375rem] grid grid-cols-2 gap-2">
                  {(
                    [
                      {
                        icon: <RotateCcw />,
                        label: 'Rotate background left',
                        align: undefined,
                        onClick: () => setPolaroidAngle((prev) => (prev - 15) % 360),
                      },
                      {
                        icon: <RotateCw />,
                        label: 'Rotate background right',
                        align: 'end',
                        onClick: () => setPolaroidAngle((prev) => (prev + 15) % 360),
                      },
                    ] as const
                  ).map(({ icon, label, align, onClick }, index) => (
                    <Tooltip
                      key={index}
                      content={label}
                      align={align}
                      triggerProps={{ asChild: true }}
                    >
                      <button
                        className="flex size-8 items-center justify-center border border-white bg-white text-black transition-colors hover:bg-transparent hover:text-white"
                        aria-label={label}
                        onClick={onClick}
                      >
                        <span className="flex size-4 items-center justify-center">{icon}</span>
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}
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

export default WebPFeatureDetail;
