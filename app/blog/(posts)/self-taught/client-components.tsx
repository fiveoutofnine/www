'use client';

import { useRef, useState } from 'react';

import { CirclePause, CirclePlay } from 'lucide-react';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type AudioSampleProps = {
  source?: {
    name: string;
    url: string;
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
export const AudioSample: React.FC<AudioSampleProps> = ({
  source = {
    name: 'Test',
    url: 'https://assets.fiveoutofnine.com/godowsky-chopin-study-5.mp3',
  },
  children,
  ...rest
}) => {
  const [playing, setPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const onClick = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setPlaying(true);
      } else {
        audioRef.current.pause();
        setPlaying(false);
      }
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
      aria-label="Play audio sample."
      tabIndex={0}
      role="button"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      <span className="align-baseline">{children}</span>
      {/* We require a wrapper `<span>` with `select-none` so the text is
          selectable while ensuring that the gap between the text and the icon
          is visible. */}
      <span className="select-none"> </span>
      {playing ? (
        <CirclePause className="relative top-[1.75px] inline size-4 align-text-top animate-in fade-in zoom-in" />
      ) : (
        <CirclePlay className="relative top-[1.75px] inline size-4 align-text-top animate-in fade-in zoom-in" />
      )}
      <audio ref={audioRef} src={source.url} />
    </span>
  );
};
