'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import OnChainMusicFeatureDetailModal from './modal';
import blockie from 'ethereum-blockies-base64';
import { motion, type PanInfo, useAnimation } from 'framer-motion';
import { ChevronFirst, Copy, Music, Pause, Play, Volume, Volume2 } from 'lucide-react';

import { ON_CHAIN_SONGS } from '@/lib/constants/on-chain-music';

import { ButtonGroup, IconButton, Table, toast, Tooltip } from '@/components/ui';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const radixColors = require('@radix-ui/colors');

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const OnChainMusicFeatureDetail: React.FC = () => {
  const [selected, setSelected] = useState<number>();
  const [loaded, setLoaded] = useState<number>();
  const [audioSrc, setAudioSrc] = useState<string>();
  const [playing, setPlaying] = useState<boolean>(false);
  const [replayable, setReplayable] = useState<boolean>(false);
  const [scrollIsAtTop, setScrollIsAtTop] = useState<boolean>(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Play audio when the source changes.
  useEffect(() => {
    if (audioRef.current && audioSrc) {
      setPlaying(true);
      audioRef.current.play();
      setReplayable(true);
    }
  }, [audioSrc]);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollTop = target.scrollTop;

    setScrollIsAtTop(scrollTop === 0);
  };

  return (
    <div className="relative flex h-[8.875rem] flex-col bg-gray-3">
      {/* Songs */}
      <Table.Root
        className="border-y-0"
        containerProps={{
          className: 'hide-scrollbar grow relative overflow-y-scroll',
          onScroll: handleScroll,
        }}
      >
        <Table.Header className="[&_[table-head-separator]]:bg-gray-6 [&_th:first-child]:pl-[1.625rem] [&_th:last-child]:pr-1.5 [&_th]:px-1">
          <Table.Row className="[&_th]:sticky [&_th]:top-0 [&_th]:h-6 [&_th]:font-normal">
            <Table.Head>Song</Table.Head>
            <Table.Head>Time</Table.Head>
            <Table.Head>Chain</Table.Head>
            <Table.Head className="text-right">Composition</Table.Head>
          </Table.Row>
          {!scrollIsAtTop ? (
            <Table.Row role="separator">
              <Table.Head
                className="sticky top-[1.4375rem] h-[2px] animate-in fade-in"
                table-head-separator=""
                colSpan={4}
              />
            </Table.Row>
          ) : null}
        </Table.Header>
        <Table.Body className="text-xs [&_td:first-child]:pl-1.5 [&_td:last-child]:pr-1.5 [&_td]:h-6 [&_td]:px-1 [&_td]:py-0">
          {ON_CHAIN_SONGS.map(({ address, chainId, name, metadata }, i) => {
            const length = metadata.samples / metadata.sampleRate;

            return (
              <Table.Row
                key={i}
                id={`on-chain-music-feature-song-${i}`}
                className="group text-gray-12 hover:bg-gray-4 focus:outline-none data-[state=selected]:bg-blue-5 data-[state=selected]:text-blue-12"
                data-state={selected === i ? 'selected' : undefined}
                onClick={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onDoubleClick={() => {
                  setSelected(i);
                  setLoaded(i);

                  // We set the audio source and trigger it via a `useEffect`.
                  setAudioSrc(ON_CHAIN_SONGS[i].filePath);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowUp' && i > 0) {
                    document.getElementById(`on-chain-music-feature-song-${i - 1}`)?.focus();
                  }
                  if (e.key === 'ArrowDown') {
                    document.getElementById(`on-chain-music-feature-song-${i + 1}`)?.focus();
                  }
                }}
                tabIndex={1}
              >
                <Table.Cell>
                  <div className="flex items-center gap-1">
                    {loaded !== i ? (
                      <Tooltip
                        content="Contract"
                        side="top"
                        align="start"
                        triggerProps={{ className: 'rounded-sm', asChild: true }}
                      >
                        <button
                          className="blocky--button group flex size-4 min-w-4 items-center justify-center overflow-hidden rounded-sm border border-gray-7 transition-colors animate-in fade-in zoom-in hover:border-gray-8 group-data-[state=selected]:border-blue-7 group-data-[state=selected]:hover:border-blue-8"
                          onClick={() => {
                            navigator.clipboard.writeText(address);
                            toast({
                              intent: 'success',
                              title: 'Copied contract address to clipboard!',
                              description: address,
                              hasCloseButton: true,
                            });
                          }}
                        >
                          <Image
                            className="peer transition-[filter] group-[.blocky--button]:hover:blur"
                            src={blockie(address)}
                            alt={`Ethereum blocky identicon for ${address}`}
                            width={16}
                            height={16}
                          />
                          <Copy className="pointer-events-none absolute size-2.5 opacity-0 transition-opacity peer-hover:opacity-100" />
                        </button>
                      </Tooltip>
                    ) : (
                      <span className="flex size-4 min-w-4 items-center justify-center text-blue-12 animate-in fade-in zoom-in">
                        {playing ? <Volume2 className="size-4" /> : <Volume className="size-4" />}
                      </span>
                    )}
                    <div className="leading-4">{name}</div>
                  </div>
                </Table.Cell>
                <Table.Cell className="font-mono">
                  {Math.floor(Math.round(length) / 60)}
                  <span className="text-gray-11 group-data-[state=selected]:text-blue-11">:</span>
                  {(Math.round(length) % 60).toString().padStart(2, '0')}
                </Table.Cell>
                <Table.Cell className="font-mono">{chainId}</Table.Cell>
                <Table.Cell className="text-right">
                  <OnChainMusicFeatureDetailModal data={ON_CHAIN_SONGS[i]} />
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>

      {/* Player */}
      <div className="flex min-h-8 w-full items-center gap-1 border-t border-gray-6 px-1.5">
        <ButtonGroup>
          <Tooltip content="Replay" side="top" align="start" triggerProps={{ asChild: true }}>
            <IconButton
              size="sm"
              disabled={!replayable}
              onClick={() => {
                // Reset audio player.
                if (audioRef.current) {
                  audioRef.current.currentTime = 0;
                  if (audioRef.current.paused) {
                    setReplayable(false);
                  }
                }
              }}
            >
              <ChevronFirst />
            </IconButton>
          </Tooltip>
          <Tooltip
            content={audioSrc && playing ? 'Pause' : 'Play'}
            side="top"
            triggerProps={{ asChild: true }}
          >
            <IconButton
              size="sm"
              onClick={
                audioRef.current
                  ? () => {
                      if (audioRef.current?.paused) {
                        audioRef.current.play();
                        setPlaying(true);
                        setReplayable(true);
                      } else {
                        audioRef.current?.pause();
                        setPlaying(false);
                      }
                    }
                  : undefined
              }
              disabled={!audioSrc}
            >
              {audioSrc && playing ? <Pause /> : <Play />}
            </IconButton>
          </Tooltip>
        </ButtonGroup>
        <audio ref={audioRef} src={audioSrc} />
        <div className="flex h-6 grow items-center overflow-hidden rounded border border-gray-6">
          <div className="flex size-6 min-w-6 items-center justify-center overflow-hidden border-r border-gray-6 bg-gray-3 text-gray-11">
            {loaded !== undefined ? (
              <Image
                className="animate-in fade-in zoom-in"
                src={blockie(ON_CHAIN_SONGS[loaded].address)}
                alt={`Ethereum blocky identicon for ${ON_CHAIN_SONGS[loaded].address}`}
                width={24}
                height={24}
              />
            ) : (
              <Music className="size-3 animate-in fade-in zoom-in" />
            )}
          </div>
          {loaded !== undefined ? (
            <OnChainMusicFeatureDetailProgressMeter
              data={ON_CHAIN_SONGS[loaded]}
              audioRef={audioRef}
              setReplayable={setReplayable}
              onAudioEnd={() => setPlaying(false)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Progress meter
// -----------------------------------------------------------------------------

const OnChainMusicFeatureDetailProgressMeter: React.FC<{
  data: (typeof ON_CHAIN_SONGS)[number];
  audioRef: React.RefObject<HTMLAudioElement>;
  setReplayable?: React.Dispatch<React.SetStateAction<boolean>>;
  onAudioEnd?: () => void;
}> = ({ data, audioRef, setReplayable, onAudioEnd }) => {
  const [progress, setProgress] = useState<number>(0);
  const [expanded, setExpanded] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressControls = useAnimation();
  const progressBackgroundControls = useAnimation();
  const nameControls = useAnimation();

  // Animate progress bar as audio plays when the user isn't adjusting it.
  useEffect(() => {
    if (expanded) return;

    const interval = setInterval(() => {
      if (audioRef.current) {
        const { currentTime: time, duration } = audioRef.current;
        setProgress(Math.min(100 * (time / duration), 100));
        if (time >= duration) onAudioEnd?.();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [audioRef, expanded, onAudioEnd]);

  // Handle resetting the progress bar's visual and set value on pointer up.
  useEffect(() => {
    const handlePointerUp = () => {
      if (window && expanded) {
        // Reset the progress bar visual.
        setExpanded(false);
        progressControls.start({
          height: 4,
          background: radixColors.grayDark.gray9,
          transition: { type: 'spring', stiffness: 400, damping: 30 },
        });
        progressBackgroundControls.start({
          height: 4,
          background: radixColors.grayDark.gray5,
          transition: { type: 'spring', stiffness: 400, damping: 30 },
        });
        nameControls.start({
          top: 2,
          mixBlendMode: 'normal',
          transition: { type: 'spring', stiffness: 400, damping: 30 },
        });

        // Set the audio value.
        if (audioRef.current) {
          audioRef.current.currentTime = (progress / 100) * audioRef.current.duration;
          if (progress > 0) setReplayable?.(true);
        }
      }
    };

    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [
    audioRef,
    expanded,
    nameControls,
    progress,
    progressBackgroundControls,
    progressControls,
    setReplayable,
  ]);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = info.point.x - rect.left;
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
      top: 4,
      mixBlendMode: 'difference',
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    });
  };

  return (
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
        className="absolute left-1.5 top-1 z-20 text-xs font-medium leading-4 text-gray-12"
        animate={nameControls}
        initial={{ top: 2, mixBlendMode: 'normal' }}
      >
        {data.name}
      </motion.div>
      <motion.div
        className="absolute bottom-0 left-0 z-10 w-full"
        animate={progressControls}
        initial={{ height: 4, background: radixColors.grayDark.gray9 }}
        style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
      />
      <motion.div
        className="absolute bottom-0 left-0 z-[9] w-full"
        animate={progressBackgroundControls}
        initial={{ height: 4, background: radixColors.grayDark.gray5 }}
      />
    </motion.div>
  );
};

export default OnChainMusicFeatureDetail;
