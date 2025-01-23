'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import OnChainMusicFeatureDetailModal from './modal';
import blockie from 'ethereum-blockies-base64';
import { motion, type PanInfo, useAnimation } from 'framer-motion';
import {
  ChevronFirst,
  Copy,
  ExternalLink,
  Music,
  Pause,
  Play,
  Volume,
  Volume2,
} from 'lucide-react';
import { useSwitchChain } from 'wagmi';

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
  const { chains } = useSwitchChain();

  const audioRef = useRef<HTMLAudioElement>(null);

  // Play audio when the source changes.
  useEffect(() => {
    if (audioRef.current && audioSrc) {
      setPlaying(true);
      audioRef.current.play();
      setReplayable(true);
    }
  }, [audioSrc]);

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play();
      setPlaying(true);
      setReplayable(true);
    } else {
      audioRef.current?.pause();
      setPlaying(false);
    }
  };

  const resetAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      if (audioRef.current.paused) {
        setReplayable(false);
      }
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollTop = target.scrollTop;

    setScrollIsAtTop(scrollTop === 0);
  };

  // Default to `etherscan.io` for block explorer.
  const getBlockExplorer = (chainId: number) =>
    chains.find((chain) => chain.id === chainId)?.blockExplorers?.default.url ??
    'https://etherscan.io';

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
                  setAudioSrc(ON_CHAIN_SONGS[i].filePath);
                }}
                onKeyDown={(e) => {
                  // Adjust focus if left/right arrow keys are pressed.
                  if (e.key === 'ArrowUp' && i > 0) {
                    document.getElementById(`on-chain-music-feature-song-${i - 1}`)?.focus();
                    e.preventDefault();
                  } else if (e.key === 'ArrowDown') {
                    document.getElementById(`on-chain-music-feature-song-${i + 1}`)?.focus();
                    e.preventDefault();
                  } else if (e.key === ' ') {
                    // If the key pressed is a space, play the song if none is
                    // playing or toggle play/pause if the song is playing.
                    if (loaded === undefined) {
                      setLoaded(i);
                      setAudioSrc(ON_CHAIN_SONGS[i].filePath);
                    } else {
                      togglePlay();
                    }
                  } else if (e.key === 'Enter') {
                    // If the key pressed is enter, always set the song or
                    // replay it if it's already playing.
                    if (loaded !== i) {
                      setLoaded(i);
                      setAudioSrc(ON_CHAIN_SONGS[i].filePath);
                    } else {
                      resetAudio();
                      setPlaying(true);
                      setReplayable(true);
                      audioRef.current?.play();
                    }
                  }
                }}
                tabIndex={0}
              >
                <Table.Cell>
                  <div className="flex items-center gap-1">
                    {loaded !== i ? (
                      <Tooltip
                        content="Copy contract address"
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
          <Tooltip content="Reset" side="top" align="start" triggerProps={{ asChild: true }}>
            <IconButton size="sm" disabled={!replayable} onClick={resetAudio} aria-label="Reset">
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
              onClick={audioRef.current ? togglePlay : undefined}
              disabled={!audioSrc}
              aria-label={audioSrc && playing ? 'Pause' : 'Play'}
            >
              {audioSrc && playing ? (
                <Pause className="animate-in fade-in zoom-in" />
              ) : (
                <Play className="animate-in fade-in zoom-in" />
              )}
            </IconButton>
          </Tooltip>
        </ButtonGroup>
        <audio ref={audioRef} src={audioSrc} />
        <div className="flex h-6 grow items-center -space-x-px">
          {loaded !== undefined ? (
            <a
              className="blocky--button group flex size-6 min-w-6 items-center justify-center overflow-hidden rounded-l border border-gray-7 bg-gray-3 text-gray-12 transition-colors hover:z-30 hover:border-gray-8 focus:z-30 focus-visible:rounded-r-sm"
              href={`${getBlockExplorer(ON_CHAIN_SONGS[loaded].chainId)}/address/${ON_CHAIN_SONGS[loaded].address}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="peer transition-[filter] animate-in fade-in zoom-in group-focus-visible:blur group-[.blocky--button]:hover:blur"
                src={blockie(ON_CHAIN_SONGS[loaded].address)}
                alt={`Ethereum blocky identicon for ${ON_CHAIN_SONGS[loaded].address}`}
                width={24}
                height={24}
              />
              <ExternalLink className="pointer-events-none absolute size-3 opacity-0 transition-opacity group-focus-visible:opacity-100 peer-hover:opacity-100" />
            </a>
          ) : (
            <div className="flex size-6 min-w-6 items-center justify-center overflow-hidden rounded-l border border-gray-6 bg-gray-3 text-gray-11">
              <Music className="size-3 animate-in fade-in zoom-in" />
            </div>
          )}
          {loaded !== undefined ? (
            <OnChainMusicFeatureDetailProgressMeter
              data={ON_CHAIN_SONGS[loaded]}
              audioRef={audioRef}
              setReplayable={setReplayable}
              onAudioEnd={() => setPlaying(false)}
            />
          ) : (
            <div className="relative flex h-6 grow flex-col items-start overflow-hidden rounded-r border border-gray-6 bg-gray-3">
              {/* (24 - 2 - 3 - 12) / 2 = 3.5px */}
              <div className="absolute left-1.5 top-[3.5px] text-[10px] font-medium leading-3 text-gray-11">
                Double-click a song to play.
              </div>
              <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gray-5" />
            </div>
          )}
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
  const durationControls = useAnimation();

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
    durationControls,
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

  let timeElapsed = (progress / 100) * (audioRef.current?.duration ?? 0);
  if (Number.isNaN(timeElapsed)) timeElapsed = 0;

  return (
    <div className="flex h-6 grow overflow-hidden rounded-r border border-gray-7 transition-colors hover:border-gray-8">
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
          className="absolute left-1.5 z-20 text-xs font-medium leading-4 text-gray-12"
          animate={nameControls}
          /* (24 - 2 - 3 - 16) / 2 = 1.5px */
          initial={{ top: 1.5, mixBlendMode: 'normal' }}
        >
          {data.name}
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

export default OnChainMusicFeatureDetail;
