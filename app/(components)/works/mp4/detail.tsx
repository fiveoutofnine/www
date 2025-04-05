'use client';

import { useRef, useState } from 'react';

import { PanelLeftClose, Pause, Play, SkipForward, Volume2, VolumeOff } from 'lucide-react';

import { getRandomMp4Url } from '@/lib/utils';

import { ButtonGroup, IconButton, Tooltip } from '@/components/ui';

const Mp4FeatureDetail: React.FC = () => {
  const [mp4, setMp4] = useState<ReturnType<typeof getRandomMp4Url>>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="flex h-full w-full flex-col">
      <div className="flex max-h-[8.875rem] w-full grow items-center justify-center overflow-hidden bg-black">
        {mp4 ? (
          <video
            className="object-fit max-h-full w-full"
            src={mp4.url}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            ref={videoRef}
            autoPlay
            loop
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-3">Loading...</div>
        )}
      </div>
      <div className="flex h-10 w-full items-center justify-between border-t border-gray-6 px-2">
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
          <IconButton size="sm" aria-label="Hide controls">
            <PanelLeftClose className="-rotate-90" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Mp4FeatureDetail;
