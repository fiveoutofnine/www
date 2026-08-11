'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { RotateCcw, RotateCw } from 'lucide-react';

import { getRandomWebPUrl } from '@/lib/utils';

import { Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const SWIPE_X_THRESHOLD = 85;
const SWIPE_VELOCITY_THRESHOLD = 0.5;
const GESTURE_FALLBACK_MS = 10_000;
const TRANSITION_FALLBACK_MS = 700;

const SCALE_MIN = 0.88;
const SCALE_MAX_SWIPING = 0.98;
const SCALE_FINAL = 1.0;

const OPACITY_MIN = 0.25;
const OPACITY_MAX_SWIPING = 0.85;
const OPACITY_FINAL = 1.0;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type AnimationState =
  | 'idle'
  | 'swiping'
  | 'waiting-for-next'
  | 'exiting-left'
  | 'exiting-right'
  | 'returning-to-center';

type CarouselCard = {
  id: number;
  image: ReturnType<typeof getRandomWebPUrl> | null;
  ready: boolean;
  failed: boolean;
};

type ActiveGesture = {
  pointerId: number;
  startX: number;
  startTimestamp: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const WebPFeatureDetail: React.FC = () => {
  const [cards, setCards] = useState<CarouselCard[]>([
    {
      id: 0,
      image: null,
      ready: true,
      failed: false,
    },
  ]);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [swipeAmount, setSwipeAmount] = useState<number>(0);
  const [polaroidAngle, setPolaroidAngle] = useState<number>(0);

  const cardsRef = useRef(cards);
  const nextCardIdRef = useRef(1);
  const animationStateRef = useRef<AnimationState>('idle');
  const activeGestureRef = useRef<ActiveGesture | null>(null);
  const latestSwipeRef = useRef({ deltaX: 0, timestamp: 0 });
  const pendingExitRef = useRef<'exiting-left' | 'exiting-right' | null>(null);

  // Initialize the next card on the client to avoid a hydration mismatch from
  // `Math.random()` in `getRandomWebPUrl`.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (cardsRef.current.length > 1) return;

      const nextCards = [
        ...cardsRef.current,
        {
          id: nextCardIdRef.current++,
          image: getRandomWebPUrl(),
          ready: false,
          failed: false,
        },
      ];
      cardsRef.current = nextCards;
      setCards(nextCards);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const completeAnimation = useCallback((expectedState: AnimationState) => {
    if (animationStateRef.current !== expectedState) return;

    if (expectedState === 'exiting-left' || expectedState === 'exiting-right') {
      const promotedCard = cardsRef.current[1];

      // A swipe cannot normally begin before this card is ready, but recover
      // the outgoing card if an image disappears during the transition.
      if (!promotedCard?.ready || !promotedCard.image) {
        pendingExitRef.current = null;
        latestSwipeRef.current = { deltaX: 0, timestamp: 0 };
        animationStateRef.current = 'returning-to-center';
        setSwipeAmount(0);
        setAnimationState('returning-to-center');
        return;
      }

      const nextCards: CarouselCard[] = [
        promotedCard,
        {
          id: nextCardIdRef.current++,
          image: getRandomWebPUrl(promotedCard.image.index),
          ready: false,
          failed: false,
        },
      ];

      cardsRef.current = nextCards;
      pendingExitRef.current = null;
      latestSwipeRef.current = { deltaX: 0, timestamp: 0 };
      animationStateRef.current = 'idle';
      setCards(nextCards);
      setSwipeAmount(0);
      setAnimationState('idle');
      return;
    }

    if (expectedState === 'returning-to-center') {
      pendingExitRef.current = null;
      latestSwipeRef.current = { deltaX: 0, timestamp: 0 };
      animationStateRef.current = 'idle';
      setSwipeAmount(0);
      setAnimationState('idle');
    }
  }, []);

  // Pointer capture normally guarantees a terminal event, but mobile browsers
  // can omit one when the page or app loses focus mid-gesture.
  useEffect(() => {
    const handleInterruption = () => {
      const activeState = animationStateRef.current;

      if (activeState === 'swiping' || activeState === 'waiting-for-next') {
        activeGestureRef.current = null;
        pendingExitRef.current = null;
        latestSwipeRef.current = { deltaX: 0, timestamp: 0 };
        animationStateRef.current = 'idle';
        setSwipeAmount(0);
        setAnimationState('idle');
      } else if (
        activeState === 'exiting-left' ||
        activeState === 'exiting-right' ||
        activeState === 'returning-to-center'
      ) {
        completeAnimation(activeState);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') handleInterruption();
    };

    window.addEventListener('blur', handleInterruption);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('blur', handleInterruption);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [completeAnimation]);

  // Transition events can be skipped when the browser loses a frame or the
  // page changes visibility, so always keep a bounded completion path.
  useEffect(() => {
    if (animationState === 'swiping' || animationState === 'waiting-for-next') {
      const timeout = window.setTimeout(() => {
        if (animationStateRef.current !== animationState) return;

        const shouldReturnToCenter = Math.abs(latestSwipeRef.current.deltaX) >= 5;
        activeGestureRef.current = null;
        pendingExitRef.current = null;
        latestSwipeRef.current = { deltaX: 0, timestamp: 0 };
        animationStateRef.current = shouldReturnToCenter ? 'returning-to-center' : 'idle';
        setSwipeAmount(0);
        setAnimationState(animationStateRef.current);
      }, GESTURE_FALLBACK_MS);

      return () => window.clearTimeout(timeout);
    }

    if (
      animationState !== 'exiting-left' &&
      animationState !== 'exiting-right' &&
      animationState !== 'returning-to-center'
    ) {
      return;
    }

    const timeout = window.setTimeout(() => {
      completeAnimation(animationState);
    }, TRANSITION_FALLBACK_MS);

    return () => window.clearTimeout(timeout);
  }, [animationState, completeAnimation]);

  // ---------------------------------------------------------------------------
  // Animation styles
  // ---------------------------------------------------------------------------

  const getBottomStyle = (ready: boolean) => {
    let scale = SCALE_MIN;
    let opacity = ready ? OPACITY_MIN : 0;
    let transition = 'transform 450ms cubic-bezier(0.33, 0.66, 0.33, 1), opacity 500ms ease-in-out';

    if (ready && animationState.startsWith('exiting')) {
      scale = SCALE_FINAL;
      opacity = OPACITY_FINAL;
      transition = 'transform 150ms ease-out, opacity 300ms ease-out';
    } else if (ready && animationState === 'swiping') {
      const absSwipeAmount = Math.abs(swipeAmount);

      // Calculate scale and opacity using the asymptotic function `1 - e^-x`
      // so both values approach, but never exceed, their swiping maximums.
      const scaleFactor = 1 - Math.exp(-absSwipeAmount / (SWIPE_X_THRESHOLD * 0.8));
      const scaleRange = SCALE_MAX_SWIPING - SCALE_MIN;
      scale = Math.min(SCALE_MAX_SWIPING, SCALE_MIN + scaleRange * scaleFactor);
      const opacityFactor = 1 - Math.exp(-absSwipeAmount / (SWIPE_X_THRESHOLD * 0.7));
      const opacityRange = OPACITY_MAX_SWIPING - OPACITY_MIN;
      opacity = Math.min(OPACITY_MAX_SWIPING, OPACITY_MIN + opacityRange * opacityFactor);
      transition = 'none';
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
    let transition = 'none';
    let scale = 1;

    if (animationState === 'swiping' || animationState === 'waiting-for-next') {
      transform = `translateX(${swipeAmount}px) rotate(${swipeAmount * 0.05}deg)`;
      scale = 0.99;
      transition = 'none';
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

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      !event.isPrimary ||
      (event.pointerType === 'mouse' && event.button !== 0) ||
      animationStateRef.current !== 'idle' ||
      (event.target instanceof Element &&
        event.target.closest(
          'button, a, input, select, textarea, [role="button"], [contenteditable="true"]',
        ))
    ) {
      return;
    }

    event.preventDefault();

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      return;
    }

    activeGestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTimestamp: event.timeStamp,
    };
    latestSwipeRef.current = { deltaX: 0, timestamp: event.timeStamp };
    pendingExitRef.current = null;
    animationStateRef.current = 'swiping';
    setSwipeAmount(0);
    setAnimationState('swiping');
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const activeGesture = activeGestureRef.current;
    if (!activeGesture || activeGesture.pointerId !== event.pointerId) return;

    event.preventDefault();
    const deltaX = event.clientX - activeGesture.startX;
    latestSwipeRef.current = { deltaX, timestamp: event.timeStamp };
    setSwipeAmount(deltaX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const activeGesture = activeGestureRef.current;
    if (!activeGesture || activeGesture.pointerId !== event.pointerId) return;

    latestSwipeRef.current = {
      deltaX: event.clientX - activeGesture.startX,
      timestamp: event.timeStamp,
    };
    const { deltaX, timestamp } = latestSwipeRef.current;
    const timeTaken = Math.max(timestamp - activeGesture.startTimestamp, 1);
    const velocity = Math.abs(deltaX) / timeTaken;

    activeGestureRef.current = null;

    if (Math.abs(deltaX) < 5) {
      pendingExitRef.current = null;
      latestSwipeRef.current = { deltaX: 0, timestamp: 0 };
      animationStateRef.current = 'idle';
      setSwipeAmount(0);
      setAnimationState('idle');
    } else if (Math.abs(deltaX) >= SWIPE_X_THRESHOLD || velocity > SWIPE_VELOCITY_THRESHOLD) {
      const exitState = deltaX > 0 ? 'exiting-right' : 'exiting-left';
      setSwipeAmount(deltaX);

      if (cardsRef.current[1]?.ready) {
        animationStateRef.current = exitState;
        setAnimationState(exitState);
      } else {
        pendingExitRef.current = exitState;
        animationStateRef.current = 'waiting-for-next';
        setAnimationState('waiting-for-next');
      }
    } else {
      pendingExitRef.current = null;
      animationStateRef.current = 'returning-to-center';
      setSwipeAmount(0);
      setAnimationState('returning-to-center');
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    const activeGesture = activeGestureRef.current;
    if (!activeGesture || activeGesture.pointerId !== event.pointerId) return;

    const shouldReturnToCenter = Math.abs(latestSwipeRef.current.deltaX) >= 5;
    activeGestureRef.current = null;
    pendingExitRef.current = null;
    latestSwipeRef.current = { deltaX: 0, timestamp: 0 };
    animationStateRef.current = shouldReturnToCenter ? 'returning-to-center' : 'idle';
    setSwipeAmount(0);
    setAnimationState(animationStateRef.current);
  };

  const handleTransitionComplete = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform') return;

    completeAnimation(animationStateRef.current);
  };

  const completeCardLoad = (cardId: number, failed: boolean) => {
    const card = cardsRef.current.find((candidate) => candidate.id === cardId);
    if (!card || card.ready) return;

    const nextCards = cardsRef.current.map((candidate) =>
      candidate.id === cardId ? { ...candidate, ready: true, failed } : candidate,
    );
    cardsRef.current = nextCards;
    setCards(nextCards);

    const pendingExit = pendingExitRef.current;
    if (
      pendingExit &&
      animationStateRef.current === 'waiting-for-next' &&
      cardsRef.current[1]?.id === cardId
    ) {
      pendingExitRef.current = null;
      animationStateRef.current = pendingExit;
      setAnimationState(pendingExit);
    }
  };

  // ---------------------------------------------------------------------------
  // Return
  // ---------------------------------------------------------------------------

  const topStyle = getTopStyle();
  const disliked = swipeAmount <= -SWIPE_X_THRESHOLD || animationState === 'exiting-left';
  const liked = swipeAmount >= SWIPE_X_THRESHOLD || animationState === 'exiting-right';

  return (
    <div className="relative flex h-[11.375rem] w-full flex-col overflow-hidden bg-gray-3">
      {/* Image container. */}
      <div className="relative flex h-full grow items-center justify-center bg-gray-3 p-1">
        <div className="relative h-full w-full">
          {cards.map((card, index) => {
            const isTopCard = index === 0;

            return (
              <div
                key={card.id}
                className={clsx(
                  'absolute inset-0 h-full w-full touch-none select-none overflow-hidden rounded-lg border border-gray-6 bg-black',
                  isTopCard &&
                    (animationState === 'swiping'
                      ? 'cursor-grabbing'
                      : animationState === 'waiting-for-next'
                        ? 'cursor-wait'
                        : 'cursor-grab'),
                )}
                style={{
                  ...(isTopCard ? topStyle : getBottomStyle(card.ready)),
                  zIndex: isTopCard ? 10 : 0,
                }}
                draggable={false}
                onPointerDown={isTopCard ? handlePointerDown : undefined}
                onPointerMove={isTopCard ? handlePointerMove : undefined}
                onPointerUp={isTopCard ? handlePointerUp : undefined}
                onPointerCancel={isTopCard ? handlePointerCancel : undefined}
                onLostPointerCapture={isTopCard ? handlePointerCancel : undefined}
                onTransitionEnd={isTopCard ? handleTransitionComplete : undefined}
                onTransitionCancel={isTopCard ? handleTransitionComplete : undefined}
              >
                {card.failed ? (
                  <div className="flex h-full w-full items-center justify-center bg-gray-3 px-4 text-center text-sm text-gray-11">
                    Image unavailable
                  </div>
                ) : card.image ? (
                  <Image
                    src={card.image.url}
                    alt={card.image.url}
                    className="flex items-center justify-center object-contain px-4 text-center text-sm text-gray-11"
                    sizes="(max-width: 559px) calc(100vw - 2.625rem), 382px"
                    draggable={false}
                    loading="eager"
                    onLoad={(event) => {
                      const imageElement = event.currentTarget;
                      void imageElement.decode().then(
                        () => completeCardLoad(card.id, false),
                        () => completeCardLoad(card.id, true),
                      );
                    }}
                    onError={() => completeCardLoad(card.id, true)}
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
                          .map(
                            (color, colorIndex) =>
                              `${color} ${colorIndex * 20}% ${(colorIndex + 1) * 20}%`,
                          )
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
                            onClick: () =>
                              setPolaroidAngle((previousAngle) => (previousAngle - 15) % 360),
                          },
                          {
                            icon: <RotateCw />,
                            label: 'Rotate background right',
                            align: 'end',
                            onClick: () =>
                              setPolaroidAngle((previousAngle) => (previousAngle + 15) % 360),
                          },
                        ] as const
                      ).map(({ icon, label, align, onClick }, buttonIndex) => (
                        <Tooltip
                          key={buttonIndex}
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
            );
          })}
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
