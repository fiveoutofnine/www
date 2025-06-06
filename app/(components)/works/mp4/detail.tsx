'use client';

import { Fragment, useEffect, useRef, useState } from 'react';

import VHSNoise from './vhs-noise';
import VHSOverlay from './vhs-overlay';
import clsx from 'clsx';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import {
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
  Pause,
  Play,
  RectangleVertical,
  RotateCcw,
  RotateCw,
  SkipForward,
  StepBack,
  Volume2,
  VolumeOff,
} from 'lucide-react';

import { getRandomMp4Url } from '@/lib/utils';

import { Button, ButtonGroup, IconButton, Tooltip } from '@/components/ui';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const radixColors = require('@radix-ui/colors');
// The audio clip to be played when the VHS loading sequence is initialized.
const VHS_LOADING_SOUND_URL = 'https://assets.fiveoutofnine.com/vhs-loading.mp3';
// The audio clip to be played when the VHS eject button is clicked.
const VHS_EJECT_SOUND_URL = 'https://assets.fiveoutofnine.com/vhs-eject.mp3';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Mp4FeatureDetail: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [mp4, setMp4] = useState<ReturnType<typeof getRandomMp4Url>>();
  const [initialized, setInitialized] = useState<number>(0);
  const [ejecting, setEjecting] = useState<boolean>(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [vhsLoadingSound, setVhsLoadingSound] = useState<HTMLAudioElement | null>(null);
  const [vhsEjectSound, setVhsEjectSound] = useState<HTMLAudioElement | null>(null);
  const [overlayUiClicked, setOverlayUiClicked] = useState<{
    play: number;
    rewind: number;
    forward: number;
  }>({ play: 0, rewind: 0, forward: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);

    // Create and preload the VHS loading sound.
    const loadingAudio = new Audio(VHS_LOADING_SOUND_URL);
    loadingAudio.preload = 'auto';
    loadingAudio.addEventListener('canplaythrough', () => setVhsLoadingSound(loadingAudio));
    loadingAudio.load();

    return () => {
      loadingAudio.pause();
      loadingAudio.src = '';
    };
  }, []);

  const isTouchScreen = mounted ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false;

  const initialize = () => {
    setInitialized(1); // Static.

    // Play the VHS loading sound.
    if (vhsLoadingSound) {
      vhsLoadingSound.currentTime = 0;
      vhsLoadingSound.play();
    }

    // Create and preload the VHS eject sound.
    const ejectAudio = new Audio(VHS_EJECT_SOUND_URL);
    ejectAudio.preload = 'auto';
    ejectAudio.addEventListener('canplaythrough', () => setVhsEjectSound(ejectAudio));
    ejectAudio.load();

    setTimeout(() => setInitialized(2), 1900); // Blue.
    setTimeout(() => setInitialized(3), 4250); // Black.
    setTimeout(() => {
      setInitialized(4);
      setMp4(getRandomMp4Url());
    }, 6250);
  };

  const eject = () => {
    setEjecting(true);

    if (vhsEjectSound) {
      vhsEjectSound.currentTime = 0;
      vhsEjectSound.play();
    }

    setMp4(undefined);
    setInitialized(0);
    setPlaying(false);
    setMuted(false);
    setShowOverlay(false);
    setShowControls(true);

    // Finish ejecting after 2.5 seconds.
    setTimeout(() => setEjecting(false), 2500);
  };

  const togglePlay = () => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
      setPlaying(true);
    } else {
      videoRef.current?.pause();
      setPlaying(false);
    }
  };

  const toggleMuted = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(!muted);
    }
  };

  const rewind = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
    }
  };

  const forward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(
        videoRef.current.duration,
        videoRef.current.currentTime + 10,
      );
    }
  };

  const toggleOverlay = () => {
    if (showOverlay) {
      setShowOverlay(false);
      setOverlayUiClicked({ play: 0, rewind: 0, forward: 0 });
    } else {
      setShowOverlay(true);
    }
  };

  return (
    <div className="group relative flex h-full w-full flex-col">
      <motion.div
        className="relative flex w-full grow items-center justify-center overflow-hidden bg-black"
        animate={{ maxHeight: showControls ? 142 : 182 }}
        transition={{ type: 'spring', duration: 0.25 }}
      >
        {mp4 ? (
          <Fragment>
            <video
              className="object-fit max-h-full w-full duration-3000 animate-in fade-in"
              src={mp4.url}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onMouseEnter={!isTouchScreen ? () => setShowOverlay(true) : undefined}
              onMouseLeave={!isTouchScreen ? toggleOverlay : undefined}
              onTouchStart={isTouchScreen ? toggleOverlay : undefined}
              ref={videoRef}
              tabIndex={-1}
              controls={false}
              playsInline
              autoPlay
              loop
            />
            {showOverlay ? (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center gap-4 bg-black/50 animate-in fade-in"
                onMouseEnter={!isTouchScreen ? () => setShowOverlay(true) : undefined}
              >
                <button
                  key={`overlay-rewind-${overlayUiClicked.rewind}`}
                  className={clsx(
                    'pointer-events-auto flex size-10 items-center justify-center rounded-full bg-black/50 transition-colors hover:bg-black/80',
                    overlayUiClicked.rewind > 0 ? 'animate-border-pulse' : '',
                  )}
                  onClick={() => {
                    rewind();
                    setOverlayUiClicked((prev) => ({ ...prev, rewind: prev.rewind + 1 }));
                  }}
                  aria-label="Skip back 10 seconds"
                >
                  <span className="absolute select-none text-[6px] font-bold">10</span>
                  <RotateCcw
                    className={clsx(
                      'size-5',
                      overlayUiClicked.rewind === 0 ? 'animate-in fade-in zoom-in' : '',
                    )}
                  />
                </button>
                <button
                  key={`overlay-play-${overlayUiClicked.play}`}
                  className={clsx(
                    'pointer-events-auto flex size-16 items-center justify-center rounded-full bg-black/50 transition-colors hover:bg-black/80',
                    overlayUiClicked.play > 0 ? 'animate-border-pulse' : '',
                  )}
                  onClick={() => {
                    togglePlay();
                    setOverlayUiClicked((prev) => ({ ...prev, play: prev.play + 1 }));
                  }}
                  aria-label={playing ? 'Pause' : 'Play'}
                >
                  {playing ? (
                    <Pause className="size-8 animate-in fade-in zoom-in" />
                  ) : (
                    <Play className="size-8 animate-in fade-in zoom-in" />
                  )}
                </button>
                <button
                  key={`overlay-forward-${overlayUiClicked.forward}`}
                  className={clsx(
                    'pointer-events-auto flex size-10 items-center justify-center rounded-full bg-black/50 transition-colors hover:bg-black/80',
                    overlayUiClicked.forward > 0 ? 'animate-border-pulse' : '',
                  )}
                  onClick={() => {
                    forward();
                    setOverlayUiClicked((prev) => ({ ...prev, forward: prev.forward + 1 }));
                  }}
                  aria-label="Skip forward 10 seconds"
                >
                  <span className="absolute select-none text-[6px] font-bold">10</span>
                  <RotateCw
                    className={clsx(
                      'size-5',
                      overlayUiClicked.forward === 0 ? 'animate-in fade-in zoom-in' : '',
                    )}
                  />
                </button>
                <Button
                  className="pointer-events-auto absolute right-2 top-2 backdrop-blur animate-in fade-in"
                  size="sm"
                  variant="outline"
                  rightIcon={<SkipForward />}
                  onClick={(e) => {
                    setMp4(getRandomMp4Url(mp4?.index));
                    e.stopPropagation();
                  }}
                >
                  Next
                </Button>
                {!showControls ? (
                  <Fragment>
                    <Tooltip
                      content={!mp4 || muted ? 'Unmute' : 'Mute'}
                      side="right"
                      triggerProps={{ asChild: true }}
                    >
                      <IconButton
                        className="pointer-events-auto absolute left-2 top-2 backdrop-blur animate-in fade-in"
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          if (videoRef.current) toggleMuted();
                          e.stopPropagation();
                        }}
                        aria-label={muted ? 'Unmute' : 'Mute'}
                      >
                        {muted ? (
                          <VolumeOff className="animate-in fade-in zoom-in" />
                        ) : (
                          <Volume2 className="animate-in fade-in zoom-in" />
                        )}
                      </IconButton>
                    </Tooltip>
                    <Mp4FeatureDetailProgressText
                      videoRef={videoRef}
                      className={showOverlay ? 'opacity-100' : 'opacity-0'}
                    />
                    <Tooltip content="Show controls" side="left" triggerProps={{ asChild: true }}>
                      <IconButton
                        className="pointer-events-auto absolute bottom-2 right-2 backdrop-blur animate-in fade-in"
                        size="sm"
                        variant="outline"
                        aria-label="Show controls"
                        onClick={(e) => {
                          setShowControls(!showControls);
                          e.stopPropagation();
                        }}
                      >
                        <PanelLeftOpen className="-rotate-90" />
                      </IconButton>
                    </Tooltip>
                  </Fragment>
                ) : null}
              </div>
            ) : null}
          </Fragment>
        ) : ejecting ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="absolute inset-0 bg-[#00c]" />
            <VHSNoise opacity={0.1} />
          </div>
        ) : initialized > 0 ? (
          <div className="flex h-full w-full items-center justify-center">
            {initialized === 1 ? (
              <Fragment>
                <div className="absolute inset-0 bg-black" />
                <VHSOverlay />
                <VHSNoise opacity={0.4} />
              </Fragment>
            ) : initialized === 2 ? (
              <Fragment>
                <div className="absolute inset-0 bg-[#00c]" />
                <VHSNoise opacity={0.1} />
              </Fragment>
            ) : initialized === 3 ? (
              <Fragment>
                <div className="absolute inset-0 bg-black" />
                <VHSNoise opacity={0.05} />
              </Fragment>
            ) : null}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#00f]">
            <VHSOverlay fadeIn={true} />
            <VHSNoise opacity={0.1} />
          </div>
        )}
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 flex w-full items-center gap-1 border-gray-6 px-2"
        initial={{
          height: 0,
          borderTopWidth: 0,
          opacity: 0,
          pointerEvents: 'none',
          display: 'none',
        }}
        animate={{
          height: showControls ? 40 : 0,
          borderTopWidth: showControls ? 1 : 0,
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none',
          display: showControls ? 'flex' : 'none',
        }}
        transition={{ type: 'spring', duration: 0.25 }}
      >
        <ButtonGroup>
          <Tooltip
            content={mp4 && playing ? 'Pause' : 'Play'}
            side="top"
            align="start"
            triggerProps={{ asChild: true }}
          >
            <IconButton
              size="sm"
              onClick={videoRef.current ? togglePlay : undefined}
              disabled={!mp4}
              aria-label={mp4 && playing ? 'Pause' : 'Play'}
            >
              {mp4 && playing ? (
                <Pause className="animate-in fade-in zoom-in" />
              ) : (
                <Play className="animate-in fade-in zoom-in" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip content="Next video" side="top" triggerProps={{ asChild: true }}>
            <IconButton
              size="sm"
              onClick={() => setMp4(getRandomMp4Url(mp4?.index))}
              disabled={!mp4}
              aria-label="Next video"
            >
              <SkipForward />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
        <Tooltip
          content={!mp4 || muted ? 'Unmute' : 'Mute'}
          side="top"
          triggerProps={{ asChild: true }}
        >
          <IconButton
            size="sm"
            onClick={videoRef.current ? toggleMuted : undefined}
            disabled={!mp4}
            aria-label={!mp4 || muted ? 'Unmute' : 'Mute'}
          >
            {!mp4 || muted ? (
              <VolumeOff className="animate-in fade-in zoom-in" />
            ) : (
              <Volume2 className="animate-in fade-in zoom-in" />
            )}
          </IconButton>
        </Tooltip>
        <div className="flex grow -space-x-px">
          {mp4 ? <Mp4FeatureDetailProgressMeter data={mp4} videoRef={videoRef} /> : null}
          {mp4 ? (
            <IconButton
              className="rounded-l-none animate-in fade-in"
              size="sm"
              variant="outline"
              href={mp4.url}
              newTab
            >
              <ExternalLink />
            </IconButton>
          ) : null}
          {!mp4 ? (
            <Button
              className="grow font-vhs-display [&_[button-content]]:grow"
              size="sm"
              leftIcon={<RectangleVertical />}
              rightIcon={<RectangleVertical />}
              onClick={initialize}
              disabled={initialized > 0 || ejecting}
            >
              Hi-Fi Stereo
            </Button>
          ) : null}
        </div>
        <Tooltip content="Eject" side="top" triggerProps={{ asChild: true }}>
          <IconButton size="sm" aria-label="Eject" onClick={eject} disabled={!mp4}>
            <StepBack className="rotate-90" />
          </IconButton>
        </Tooltip>
        <Tooltip content="Hide controls" side="top" align="end" triggerProps={{ asChild: true }}>
          <IconButton
            size="sm"
            aria-label="Hide controls"
            onClick={() => setShowControls(!showControls)}
            disabled={!mp4}
          >
            <PanelLeftClose className="-rotate-90" />
          </IconButton>
        </Tooltip>
      </motion.div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Progress meters
// -----------------------------------------------------------------------------

const Mp4FeatureDetailProgressText: React.FC<{
  className?: string;
  videoRef: React.RefObject<HTMLVideoElement>;
}> = ({ className = '', videoRef }) => {
  const [progress, setProgress] = useState<number>(0);

  // Update the time elapsed.
  useEffect(() => {
    const updateProgress = () => {
      if (videoRef.current) {
        const { currentTime: time, duration } = videoRef.current;
        if (!isNaN(duration) && isFinite(duration)) {
          setProgress(time);
        }
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 250);

    return () => clearInterval(interval);
  }, [videoRef]);

  const duration = videoRef.current?.duration ?? 0;

  return (
    <div
      className={clsx(
        'absolute bottom-2 left-2 flex h-5 items-center rounded border border-gray-6 bg-black/50 px-1.5 font-mono text-xs leading-3 text-gray-12 backdrop-blur transition-opacity',
        className,
      )}
    >
      {Math.floor(progress / 60)}
      <span className="text-gray-11">:</span>
      {Math.floor(progress % 60)
        .toString()
        .padStart(2, '0')}
      <span className="mx-1 text-gray-11">/</span>
      {Math.floor(duration / 60)}
      <span className="text-gray-11">:</span>
      {Math.floor(duration % 60)
        .toString()
        .padStart(2, '0')}
    </div>
  );
};

const Mp4FeatureDetailProgressMeter: React.FC<{
  data: ReturnType<typeof getRandomMp4Url>;
  videoRef: React.RefObject<HTMLVideoElement>;
}> = ({ data, videoRef }) => {
  const [progress, setProgress] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressControls = useAnimation();
  const progressBackgroundControls = useAnimation();
  const nameControls = useAnimation();
  const durationControls = useAnimation();

  // Animate progress bar as audio plays when the user isn't adjusting it.
  useEffect(() => {
    if (expanded) return;

    const updateProgress = () => {
      if (videoRef.current) {
        const { currentTime: time, duration } = videoRef.current;
        setProgress(Math.min(100 * (time / duration), 100));
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 50);

    return () => clearInterval(interval);
  }, [videoRef, expanded]);

  // Handle resetting the progress bar's visual and set value on pointer up.
  useEffect(() => {
    const handlePointerUp = () => {
      if (window && expanded) {
        // Reset the progress bar visual.
        setExpanded(false);
        progressControls.start({
          height: 3,
          background: radixColors.grayDark.gray9,
          transition: { type: 'spring', stiffness: 400, damping: 30 },
        });
        progressBackgroundControls.start({
          height: 3,
          background: radixColors.grayDark.gray5,
          transition: { type: 'spring', stiffness: 400, damping: 30 },
        });
        nameControls.start({
          /* (24 - 2 - 3 - 16) / 2 = 1.5px */
          top: 1.5,
          mixBlendMode: 'normal',
          transition: { type: 'spring', stiffness: 400, damping: 30 },
        });
        durationControls.start({
          /* (24 - 2 - 3 - 12) / 2 = 3.5px */
          top: 3.5,
          mixBlendMode: 'normal',
          transition: { type: 'spring', stiffness: 400, damping: 30 },
        });

        // Set the audio value.
        if (videoRef.current) {
          videoRef.current.currentTime = (progress / 100) * videoRef.current.duration;
        }
      }
    };

    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [
    videoRef,
    durationControls,
    expanded,
    nameControls,
    progress,
    progressBackgroundControls,
    progressControls,
  ]);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (rect.width * progress) / 100 + info.delta.x * 0.75;
      const percentage = (x / rect.width) * 100;
      setProgress(Math.max(0, Math.min(100, Math.round(percentage))));
    }
  };

  const handlePointerDown = () => {
    setExpanded(true);
    progressControls.start({
      height: 24,
      background: radixColors.grayDark.gray12,
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    });
    progressBackgroundControls.start({
      height: 24,
      background: radixColors.grayDark.gray3,
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    });
    nameControls.start({
      /* (24 - 2 - 16) / 2 = 3px */
      top: 3,
      mixBlendMode: 'difference',
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    });
    durationControls.start({
      /* (24 - 2 - 12) / 2 = 5px */
      top: 5,
      mixBlendMode: 'difference',
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    });
  };

  let timeElapsed = (progress / 100) * (videoRef.current?.duration ?? 0);
  if (Number.isNaN(timeElapsed)) timeElapsed = 0;

  return (
    <div className="flex h-6 grow overflow-hidden rounded-l border border-gray-7 transition-colors animate-in fade-in hover:z-30 hover:border-gray-8">
      <motion.div
        className="relative flex h-6 grow cursor-ew-resize flex-col items-start bg-gray-3"
        drag="x"
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={containerRef}
        onDrag={handleDrag}
        onPointerDown={handlePointerDown}
        ref={containerRef}
      >
        <motion.div
          className="absolute left-1.5 z-20 line-clamp-1 text-xs font-medium leading-4 text-gray-12"
          animate={nameControls}
          /* (24 - 2 - 3 - 16) / 2 = 1.5px */
          initial={{ top: 1.5, mixBlendMode: 'normal' }}
        >
          {data.url.split('/').pop()}
        </motion.div>
        <motion.div
          className="absolute right-1.5 z-20 font-mono text-[10px] leading-3 text-gray-12"
          animate={durationControls}
          /* (24 - 2 - 3 - 12) / 2 = 3.5px */
          initial={{ top: 3.5, mixBlendMode: 'normal' }}
        >
          {Math.floor(timeElapsed / 60)}
          <span className="text-gray-11">:</span>
          {Math.floor(timeElapsed % 60)
            .toString()
            .padStart(2, '0')}
          <span className="text-gray-11">.</span>
          {Math.floor((10 * timeElapsed) % 10).toString()}
        </motion.div>
        <motion.div
          className="absolute bottom-0.5 left-0 z-10 w-full"
          animate={progressControls}
          initial={{ height: 3, background: radixColors.grayDark.gray9 }}
          style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
        />
        <motion.div
          className="absolute bottom-0.5 left-0 z-[9] w-full"
          animate={progressBackgroundControls}
          initial={{ height: 3, background: radixColors.grayDark.gray5 }}
        />
      </motion.div>
    </div>
  );
};

export default Mp4FeatureDetail;
