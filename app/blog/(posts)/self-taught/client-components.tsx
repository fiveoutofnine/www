'use client';

import { Fragment, useEffect, useRef, useState } from 'react';

import { CirclePause, CirclePlay, ExternalLink } from 'lucide-react';

import { Button, toast } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type AudioSampleProps = {
  audio: {
    name: string;
    artist: string;
    src: string;
    href?: string;
  };
  children: React.ReactNode;
};

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

// NOTE: It is typically highly advised to use the native `<button>` element,
// but we use `<span>` here because we want the children inlined. We also don't
// implement `disabled` because it's not needed. Correspondingly, there is no
// option to disable the audio sample in the component API.
export const AudioSample: React.FC<AudioSampleProps> = ({ audio, children, ...rest }) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [toastId, setToastId] = useState<string | number>();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        const { currentTime: time, duration } = audioRef.current;
        setProgress(Math.min(100 * (time / duration), 100));
        if (time >= duration) {
          if (audioRef.current) audioRef.current.currentTime = 0;
          setPlaying(false);
          setProgress(0);
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [audioRef]);

  let timeElapsed = (progress / 100) * (audioRef.current?.duration ?? 0);
  if (Number.isNaN(timeElapsed)) timeElapsed = 0;

  // Generate ID deterministically from `audio.src`.
  const id = audio.src.toLowerCase().replace(/\s+/g, '-');

  const onClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setPlaying(true);
        // Dismiss any existing toast with the same ID.
        toast.dismiss(id);
        setToastId(
          toast({
            id,
            intent: 'info',
            title: audio.name,
            description: audio.artist,
            duration: Number.POSITIVE_INFINITY,
            action: audio.href ? (
              <Button size="sm" intent="info" href={audio.href} rightIcon={<ExternalLink />} newTab>
                View
              </Button>
            ) : undefined,
          }),
        );
      } else {
        audioRef.current.pause();
        setPlaying(false);
        if (toastId) toast.dismiss(toastId);
        // Reset the audio if less than 3 seconds have elapsed.
        if (timeElapsed <= 3) {
          audioRef.current.currentTime = 0;
          setProgress(0);
        }
      }
    }
  };

  const onDoubleClick = () => {
    // Reset the audio double-click.
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <span
      className="h-5 cursor-pointer rounded-sm text-gray-11 underline decoration-dotted transition-colors hover:text-gray-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-9"
      aria-label={`${playing ? 'Pause' : 'Play'} ${audio.name} by ${audio.artist}.`}
      tabIndex={0}
      role="button"
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <span className="align-baseline">{children}</span>
      {/* We require a wrapper `<span>` with `select-none` so the text is
          selectable while ensuring that the gap between the text and the icon
          is visible. */}
      <span className="select-none"> </span>
      <svg
        className="relative top-[1.75px] inline size-4 select-none align-text-top animate-in fade-in zoom-in"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        {playing ? (
          <CirclePause className="animate-in fade-in" />
        ) : (
          <CirclePlay className="animate-in fade-in" />
        )}
        <circle
          className={playing ? 'stroke-gray-1' : 'stroke-none'}
          cx="12"
          cy="12"
          r="10"
          strokeWidth="4"
        />
        {/* Only start displaying the progress circle when the audio has been
            playing for at least 3 seconds. */}
        {timeElapsed > 3 || playing ? (
          <Fragment>
            <circle className="stroke-gray-5" cx="12" cy="12" r="10" strokeWidth="2" />
            <circle
              cx="12"
              cy="12"
              r="10"
              transform="rotate(-90 12 12)"
              stroke="currentColor"
              strokeDasharray={`${progress * Math.PI * 0.2} ${Math.PI * 20}`}
              strokeLinecap="round"
              strokeWidth="2"
            />
          </Fragment>
        ) : null}
      </svg>
      <audio ref={audioRef} src={audio.src} />
    </span>
  );
};
