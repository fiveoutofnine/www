'use client';

import { Fragment, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import {
  PanelLeftClose,
  PanelLeftOpen,
  Pause,
  Play,
  SkipForward,
  Volume2,
  VolumeOff,
} from 'lucide-react';

import { getRandomMp4Url } from '@/lib/utils';

import { ButtonGroup, IconButton, Tooltip } from '@/components/ui';

const Mp4FeatureDetail: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [mp4, setMp4] = useState<ReturnType<typeof getRandomMp4Url>>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => setMounted(true), []);

  const isTouchScreen = mounted ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false;

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
              className="object-fit max-h-full w-full"
              src={mp4.url}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onMouseEnter={!isTouchScreen ? () => setShowOverlay(true) : undefined}
              onMouseLeave={!isTouchScreen ? () => setShowOverlay(false) : undefined}
              ref={videoRef}
              autoPlay
              loop
            />
            {showOverlay ? (
              <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/50 animate-in fade-in"
                aria-hidden={true}
              >
                <div className="flex size-16 items-center justify-center rounded-full bg-black/70">
                  {playing ? (
                    <Pause className="size-8 animate-in fade-in zoom-in" />
                  ) : (
                    <Play className="size-8 animate-in fade-in zoom-in" />
                  )}
                </div>
              </div>
            ) : null}
          </Fragment>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-3">Loading...</div>
        )}
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 flex w-full items-center justify-between border-gray-6 px-2"
        animate={{
          height: showControls ? 40 : 0,
          borderTopWidth: showControls ? 1 : 0,
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? 'auto' : 'none',
        }}
        transition={{ type: 'spring', duration: 0.25 }}
      >
        <div className="flex gap-1">
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
        </div>
        <Tooltip content="Hide controls" side="top" align="end" triggerProps={{ asChild: true }}>
          <IconButton
            size="sm"
            aria-label="Hide controls"
            onClick={() => setShowControls(!showControls)}
          >
            <PanelLeftClose className="-rotate-90" />
          </IconButton>
        </Tooltip>
      </motion.div>
      {!showControls ? (
        <motion.div
          className={clsx(
            'absolute bottom-2 right-2',
            isTouchScreen ? 'flex' : 'hidden animate-in fade-in group-hover:flex',
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'spring', delay: 0.1, duration: 0.25 }}
        >
          <Tooltip content="Show controls" side="left" triggerProps={{ asChild: true }}>
            <IconButton
              className="backdrop-blur"
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
        </motion.div>
      ) : null}
    </div>
  );
};

export default Mp4FeatureDetail;
