'use client';

import { useEffect, useRef, useState } from 'react';

import { AUDIO_PROCESSOR_CODE, AUDIO_PROCESSOR_NAME } from './audio-processor';
import BytebeatFeatureCombobox from './combobox';
import clsx from 'clsx';
import { Check, ChevronFirst, Copy, Pause, Play } from 'lucide-react';

import { BYTEBEAT_SONGS } from '@/lib/constants/bytebeat';

import { Code } from '@/components/mdx';
import { ButtonGroup, CodeBlock, IconButton, Input, toast, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const AUDIO_CONTEXT_SAMPLE_RATE = 8000;
const MAX_AUTOMATIC_RECOVERY_ATTEMPTS = 3;
const PROCESSOR_HEALTH_CHECK_INTERVAL_MS = 2000;
const PROCESSOR_HEALTH_MISSES_BEFORE_RECOVERY = 2;
const PROCESSOR_RECOVERY_BACKOFF_MS = 250;
const PROCESSOR_RECOVERY_RESET_MS = 5000;
const PROCESSOR_REPORTS_PER_SECOND = 15;
const PROCESSOR_STALL_TIMEOUT_MS = 3000;
const SOURCE_UPDATE_DELAY_MS = 150;
const VISUALIZATION_FRAMES_PER_SECOND = 30;

// eslint-disable-next-line @typescript-eslint/no-require-imports
const radixColors = require('@radix-ui/colors');

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type BytebeatProcessorMessage = {
  byteSample?: number;
  error?: {
    message?: string;
  };
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const BytebeatFeatureDetail: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [source, setSource] = useState<string>(BYTEBEAT_SONGS[0].source);
  const [song, setSong] = useState<(typeof BYTEBEAT_SONGS)[0] | null>(BYTEBEAT_SONGS[0]);
  const [sampleRate, setSampleRate] = useState<string>(String(BYTEBEAT_SONGS[0].sampleRate));
  const [playing, setPlaying] = useState<boolean>(false);
  const [transitioningPlayback, setTransitioningPlayback] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [errorCopied, setErrorCopied] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 110,
  });
  const [scrollTop, setScrollTop] = useState<number>(0);
  const codeBlockRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodeRef = useRef<AudioWorkletNode | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const initializeAudioRef = useRef<() => Promise<boolean>>(async () => false);
  const initializationPromiseRef = useRef<Promise<boolean> | null>(null);
  const audioGenerationRef = useRef<number>(0);
  const disposedRef = useRef<boolean>(false);
  const sourceRef = useRef<string>(BYTEBEAT_SONGS[0].source);
  const sampleRateRef = useRef<number>(BYTEBEAT_SONGS[0].sampleRate);
  const playingRef = useRef<boolean>(false);
  const timeRef = useRef<number>(0);
  const hasStartedRef = useRef<boolean>(false);
  const lastProcessorMessageRef = useRef<number>(0);
  const processorHealthMissesRef = useRef<number>(0);
  const automaticRecoveryAttemptsRef = useRef<number>(0);
  const lastAutomaticRecoveryRef = useRef<number>(0);
  const automaticRecoveryTimeoutRef = useRef<number | null>(null);
  const playbackTransitionRef = useRef<boolean>(false);
  const sourceUpdateTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timeElementRef = useRef<HTMLSpanElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastVisualizationFrameRef = useRef<number>(0);
  const waveformDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);

  useEffect(() => setMounted(true), []);

  const isTouchScreen = mounted ? /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) : false;

  // ---------------------------------------------------------------------------
  // Code editor
  // ---------------------------------------------------------------------------

  const handleTextAreaScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;

    setScrollTop(target.scrollTop);
  };

  // Set the scroll amount on the code block to keep it synced w/ the
  // `textarea`.
  useEffect(() => {
    if (codeBlockRef.current) {
      codeBlockRef.current.scrollTo(0, scrollTop);
    }
  }, [scrollTop]);

  // ---------------------------------------------------------------------------
  // Audio processor
  // ---------------------------------------------------------------------------

  useEffect(() => {
    disposedRef.current = false;

    const closeAudioGraph = async (
      context: AudioContext | null,
      node: AudioWorkletNode | null,
      analyzer: AnalyserNode | null,
    ) => {
      if (node) {
        node.onprocessorerror = null;
        node.port.onmessage = null;
        try {
          node.port.close();
        } catch {
          // Closing an already-detached worklet port is harmless.
        }
        try {
          node.disconnect();
        } catch {
          // The node may already have been disconnected by the browser.
        }
      }
      if (analyzer) {
        try {
          analyzer.disconnect();
        } catch {
          // The analyzer may already have been disconnected with its context.
        }
      }
      if (context) {
        context.onstatechange = null;
        if (context.state !== 'closed') {
          await context.close().catch(() => undefined);
        }
      }
    };

    const queueAutomaticRecovery = (message: string) => {
      if (disposedRef.current || automaticRecoveryTimeoutRef.current !== null) return;

      const recoveryAttempt = ++automaticRecoveryAttemptsRef.current;
      lastAutomaticRecoveryRef.current = performance.now();
      processorHealthMissesRef.current = 0;
      stopVisualization();
      setInitialized(false);

      if (recoveryAttempt > MAX_AUTOMATIC_RECOVERY_ATTEMPTS) {
        const context = audioContextRef.current;
        const node = nodeRef.current;
        const analyzer = analyzerRef.current;
        audioContextRef.current = null;
        nodeRef.current = null;
        analyzerRef.current = null;
        playingRef.current = false;
        setPlaying(false);
        setError('The audio processor stopped repeatedly. Tap Play to reconnect.');
        void closeAudioGraph(context, node, analyzer);
        return;
      }

      setError(message);
      automaticRecoveryTimeoutRef.current = window.setTimeout(
        () => {
          automaticRecoveryTimeoutRef.current = null;
          if (disposedRef.current) return;
          if (document.hidden) {
            const context = audioContextRef.current;
            const node = nodeRef.current;
            const analyzer = analyzerRef.current;
            audioContextRef.current = null;
            nodeRef.current = null;
            analyzerRef.current = null;
            playingRef.current = false;
            setPlaying(false);
            setError('Audio paused while this page was hidden. Tap Play to reconnect.');
            void closeAudioGraph(context, node, analyzer);
            return;
          }
          void initializeAudioRef.current();
        },
        PROCESSOR_RECOVERY_BACKOFF_MS * 2 ** (recoveryAttempt - 1),
      );
    };

    const initializeAudio = (): Promise<boolean> => {
      if (disposedRef.current) return Promise.resolve(false);
      if (initializationPromiseRef.current) return initializationPromiseRef.current;

      const initializationPromise = (async () => {
        const generation = ++audioGenerationRef.current;
        const previousContext = audioContextRef.current;
        const previousNode = nodeRef.current;
        const previousAnalyzer = analyzerRef.current;

        audioContextRef.current = null;
        nodeRef.current = null;
        analyzerRef.current = null;
        setInitialized(false);
        stopVisualization();
        await closeAudioGraph(previousContext, previousNode, previousAnalyzer);

        if (disposedRef.current || generation !== audioGenerationRef.current) return false;

        let context: AudioContext | null = null;
        let node: AudioWorkletNode | null = null;
        let analyzer: AnalyserNode | null = null;
        let moduleUrl: string | null = null;
        let ready = false;

        try {
          try {
            context = new AudioContext({
              latencyHint: 'balanced',
              sampleRate: AUDIO_CONTEXT_SAMPLE_RATE,
            });
          } catch {
            // Some mobile browsers reject non-hardware sample rates.
            context = new AudioContext({ latencyHint: 'balanced' });
          }

          const blob = new Blob([AUDIO_PROCESSOR_CODE], { type: 'application/javascript' });
          moduleUrl = URL.createObjectURL(blob);
          await context.audioWorklet.addModule(moduleUrl);

          if (disposedRef.current || generation !== audioGenerationRef.current) return false;

          analyzer = context.createAnalyser();
          analyzer.fftSize = 2048;
          analyzer.smoothingTimeConstant = 0;
          node = new window.AudioWorkletNode(context, AUDIO_PROCESSOR_NAME, {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [1],
          });

          node.port.onmessage = (event: MessageEvent<BytebeatProcessorMessage>) => {
            if (disposedRef.current || nodeRef.current !== node) return;
            const messageTime = performance.now();
            lastProcessorMessageRef.current = messageTime;
            processorHealthMissesRef.current = 0;
            if (
              automaticRecoveryAttemptsRef.current > 0 &&
              messageTime - lastAutomaticRecoveryRef.current >= PROCESSOR_RECOVERY_RESET_MS
            ) {
              automaticRecoveryAttemptsRef.current = 0;
            }

            if (typeof event.data.byteSample === 'number') {
              const nextTime = Math.trunc(event.data.byteSample);
              timeRef.current = nextTime;
              if (timeElementRef.current) timeElementRef.current.textContent = String(nextTime);

              const nextHasStarted = nextTime !== 0;
              if (hasStartedRef.current !== nextHasStarted) {
                hasStartedRef.current = nextHasStarted;
                setHasStarted(nextHasStarted);
              }
            }
            if (event.data.error) {
              setError(event.data.error.message ?? '');
            }
          };
          node.onprocessorerror = () => {
            if (disposedRef.current || nodeRef.current !== node) return;

            queueAutomaticRecovery('The audio processor stopped unexpectedly. Reconnecting…');
          };
          context.onstatechange = () => {
            if (disposedRef.current || audioContextRef.current !== context) return;

            if (context?.state === 'running' && playingRef.current) {
              startVisualization();
            } else {
              stopVisualization();
            }
            if (context?.state === 'closed') {
              queueAutomaticRecovery('The audio context closed unexpectedly. Reconnecting…');
            }
          };

          node.connect(analyzer);
          analyzer.connect(context.destination);
          audioContextRef.current = context;
          nodeRef.current = node;
          analyzerRef.current = analyzer;

          if (sourceUpdateTimeoutRef.current) {
            clearTimeout(sourceUpdateTimeoutRef.current);
            sourceUpdateTimeoutRef.current = null;
          }
          node.port.postMessage({
            setFunction: sourceRef.current,
            sampleRatio: sampleRateRef.current / context.sampleRate,
            reportInterval: Math.max(
              128,
              Math.round(context.sampleRate / PROCESSOR_REPORTS_PER_SECOND),
            ),
            byteSample: timeRef.current,
            isPlaying: playingRef.current,
          });
          lastProcessorMessageRef.current = performance.now();

          setInitialized(true);

          if (playingRef.current) {
            try {
              if (context.state !== 'running') await context.resume();
            } catch {
              // A fresh context can require another user gesture on mobile.
            }

            if (context.state === 'running') {
              startVisualization();
            } else {
              playingRef.current = false;
              setPlaying(false);
              node.port.postMessage({ isPlaying: false });
            }
          }

          ready = true;
          return true;
        } catch (initializationError) {
          if (!disposedRef.current && generation === audioGenerationRef.current) {
            audioContextRef.current = null;
            nodeRef.current = null;
            analyzerRef.current = null;
            playingRef.current = false;
            setPlaying(false);
            setInitialized(false);
            setError('The audio processor could not start. Tap Play to try again.');
          }
          if (process.env.NODE_ENV !== 'production') {
            console.error('Error initializing `AudioWorklet`:', initializationError);
          }
          return false;
        } finally {
          if (moduleUrl) URL.revokeObjectURL(moduleUrl);
          if (!ready) await closeAudioGraph(context, node, analyzer);
        }
      })();

      initializationPromiseRef.current = initializationPromise;
      const clearInitializationPromise = () => {
        if (initializationPromiseRef.current === initializationPromise) {
          initializationPromiseRef.current = null;
        }
      };
      void initializationPromise.then(clearInitializationPromise, clearInitializationPromise);

      return initializationPromise;
    };

    initializeAudioRef.current = initializeAudio;
    void initializeAudio();

    const resumeAfterInterruption = async () => {
      if (disposedRef.current || document.hidden || !playingRef.current) return;

      const context = audioContextRef.current;
      if (!context || context.state === 'closed') {
        void initializeAudioRef.current();
        return;
      }

      try {
        if (context.state !== 'running') await context.resume();
      } catch {
        queueAutomaticRecovery('Audio could not resume after an interruption. Reconnecting…');
        return;
      }

      if (audioContextRef.current === context && context.state === 'running') {
        nodeRef.current?.port.postMessage({ isPlaying: true });
        lastProcessorMessageRef.current = performance.now();
        processorHealthMissesRef.current = 0;
        startVisualization();
      } else if (audioContextRef.current === context) {
        queueAutomaticRecovery('Audio remained interrupted. Reconnecting…');
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopVisualization();
      } else {
        void resumeAfterInterruption();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', resumeAfterInterruption);
    const healthCheckInterval = window.setInterval(() => {
      const context = audioContextRef.current;
      if (
        disposedRef.current ||
        document.hidden ||
        !playingRef.current ||
        context?.state !== 'running'
      ) {
        return;
      }
      if (performance.now() - lastProcessorMessageRef.current > PROCESSOR_STALL_TIMEOUT_MS) {
        ++processorHealthMissesRef.current;
        if (processorHealthMissesRef.current >= PROCESSOR_HEALTH_MISSES_BEFORE_RECOVERY) {
          queueAutomaticRecovery('The audio processor stopped responding. Reconnecting…');
        }
      } else {
        processorHealthMissesRef.current = 0;
      }
    }, PROCESSOR_HEALTH_CHECK_INTERVAL_MS);

    return () => {
      disposedRef.current = true;
      // eslint-disable-next-line react-hooks/exhaustive-deps -- Invalidate pending async setup.
      ++audioGenerationRef.current;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', resumeAfterInterruption);
      window.clearInterval(healthCheckInterval);
      if (automaticRecoveryTimeoutRef.current !== null) {
        window.clearTimeout(automaticRecoveryTimeoutRef.current);
        automaticRecoveryTimeoutRef.current = null;
      }
      if (sourceUpdateTimeoutRef.current) clearTimeout(sourceUpdateTimeoutRef.current);
      sourceUpdateTimeoutRef.current = null;
      initializationPromiseRef.current = null;
      initializeAudioRef.current = async () => false;
      stopVisualization();

      const context = audioContextRef.current;
      const node = nodeRef.current;
      const analyzer = analyzerRef.current;
      audioContextRef.current = null;
      nodeRef.current = null;
      analyzerRef.current = null;
      void closeAudioGraph(context, node, analyzer);
    };
  }, []);

  // ---------------------------------------------------------------------------
  // Audio processor message posting
  // ---------------------------------------------------------------------------

  const handlePlay = async () => {
    if (playbackTransitionRef.current) return;

    playbackTransitionRef.current = true;
    setTransitioningPlayback(true);
    let context = audioContextRef.current;

    try {
      if (automaticRecoveryTimeoutRef.current !== null) {
        window.clearTimeout(automaticRecoveryTimeoutRef.current);
        automaticRecoveryTimeoutRef.current = null;
        playingRef.current = false;
        setPlaying(false);
        await initializeAudioRef.current();
        context = audioContextRef.current;
      }
      automaticRecoveryAttemptsRef.current = 0;
      processorHealthMissesRef.current = 0;

      let node = nodeRef.current;
      if (!context || !node || context.state === 'closed') {
        if (!(await initializeAudioRef.current())) return;
        context = audioContextRef.current;
        node = nodeRef.current;
      }
      if (!context || !node) return;

      const isInterrupted = playingRef.current && context.state !== 'running';
      const nextPlaying = isInterrupted || !playingRef.current;

      if (nextPlaying) {
        playingRef.current = true;
        if (context.state !== 'running') await context.resume();

        if (context.state !== 'running') {
          playingRef.current = false;
          if (!(await initializeAudioRef.current())) return;
          context = audioContextRef.current;
          node = nodeRef.current;
          if (!context || !node) return;
          playingRef.current = true;
          if (context.state !== 'running') await context.resume();
        }
        if (context.state !== 'running') throw new Error('Audio context did not resume.');

        node.port.postMessage({ isPlaying: true });
        lastProcessorMessageRef.current = performance.now();
        setPlaying(true);
        startVisualization();
      } else {
        playingRef.current = false;
        node.port.postMessage({ isPlaying: false });
        setPlaying(false);
        stopVisualization();
        if (context.state === 'running') await context.suspend();
      }
    } catch (playbackError) {
      playingRef.current = false;
      setPlaying(false);
      stopVisualization();
      await initializeAudioRef.current();
      setError('Audio playback was interrupted. Tap Play to reconnect.');
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error during playback:', playbackError);
      }
    } finally {
      playbackTransitionRef.current = false;
      if (!disposedRef.current) setTransitioningPlayback(false);
    }
  };

  const resetPlay = () => {
    timeRef.current = 0;
    if (timeElementRef.current) timeElementRef.current.textContent = '0';
    if (hasStartedRef.current) {
      hasStartedRef.current = false;
      setHasStarted(false);
    }
    clearVisualization();

    try {
      nodeRef.current?.port.postMessage({ resetTime: true });
    } catch (playbackError) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error during playback:', playbackError);
      }
    }
  };

  const handleSourceChange = (newSource: string, nullifySong?: boolean) => {
    sourceRef.current = newSource;
    setSource(newSource);
    if (nullifySong) setSong(null);

    if (sourceUpdateTimeoutRef.current) clearTimeout(sourceUpdateTimeoutRef.current);
    sourceUpdateTimeoutRef.current = null;

    const postSource = () => {
      sourceUpdateTimeoutRef.current = null;
      nodeRef.current?.port.postMessage({ setFunction: sourceRef.current });
    };

    if (nullifySong) {
      sourceUpdateTimeoutRef.current = setTimeout(postSource, SOURCE_UPDATE_DELAY_MS);
    } else {
      postSource();
    }
  };

  const handleSampleRateChange = (newSampleRate: string, nullifySong?: boolean) => {
    setSampleRate(newSampleRate);
    if (nullifySong) setSong(null);

    let nextSampleRate = Number(newSampleRate);
    if (!Number.isFinite(nextSampleRate) || nextSampleRate <= 0) nextSampleRate = 8000;
    sampleRateRef.current = nextSampleRate;

    const context = audioContextRef.current;
    if (context && nodeRef.current) {
      nodeRef.current.port.postMessage({ sampleRatio: nextSampleRate / context.sampleRate });
    }
  };

  const handleSongChange = (song: (typeof BYTEBEAT_SONGS)[0]) => {
    // Update sample rate.
    handleSampleRateChange(String(song.sampleRate));
    // Update source.
    handleSourceChange(song.source);
    // Reset play.
    resetPlay();
    // Update song.
    setSong(song);
  };

  // ---------------------------------------------------------------------------
  // Canvas/visualization
  // ---------------------------------------------------------------------------

  // Keep canvas size updated.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateCanvasSize = () => {
      setCanvasSize({ width: container.offsetWidth, height: 110 });
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const clearVisualization = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  const stopVisualization = () => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    lastVisualizationFrameRef.current = 0;
  };

  const startVisualization = () => {
    if (animationFrameRef.current !== null || !playingRef.current || document.hidden) return;

    const draw = (frameTime: number) => {
      if (!playingRef.current || document.hidden) {
        animationFrameRef.current = null;
        return;
      }

      animationFrameRef.current = requestAnimationFrame(draw);
      if (frameTime - lastVisualizationFrameRef.current < 1000 / VISUALIZATION_FRAMES_PER_SECOND) {
        return;
      }
      lastVisualizationFrameRef.current = frameTime;

      const analyzer = analyzerRef.current;
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!analyzer || !canvas || !context || canvas.width === 0) return;

      if (!waveformDataRef.current || waveformDataRef.current.length !== analyzer.fftSize) {
        waveformDataRef.current = new Uint8Array(analyzer.fftSize);
      }
      analyzer.getByteTimeDomainData(waveformDataRef.current);

      context.fillStyle = 'black';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.strokeStyle = radixColors.blueDark.blue9;
      context.lineWidth = 1;

      const pointCount = Math.min(canvas.width, waveformDataRef.current.length);
      const sampleStep = waveformDataRef.current.length / pointCount;
      const pointSpan = Math.max(pointCount - 1, 1);
      for (let x = 0; x < pointCount; ++x) {
        const value = waveformDataRef.current[Math.floor(x * sampleStep)] / 255;
        const y = value * canvas.height;
        if (x === 0) context.moveTo(0, y);
        else context.lineTo((x / pointSpan) * canvas.width, y);
      }
      context.stroke();
    };

    animationFrameRef.current = requestAnimationFrame(draw);
  };

  // ---------------------------------------------------------------------------
  // Miscellaneous
  // ---------------------------------------------------------------------------

  const copyErrorToClipboard = () => {
    if (!errorCopied) {
      setErrorCopied(true);
      setTimeout(() => setErrorCopied(false), 2000);
    }
    navigator.clipboard.writeText(error);
    toast({ title: 'Copied error to clipboard!', intent: 'success', hasCloseButton: true });
  };

  return (
    <div className="flex h-full max-h-[11.375rem]">
      <div className="relative h-full w-1/2 border-r border-gray-6 bg-gray-3">
        <CodeBlock
          className="h-full border-y-0 [&_[code-block-header]]:pl-2 [&_[code-block-line-number]]:mr-2 [&_[code-block-line]]:px-2 [&_[code-block-pre]]:py-2"
          language="js"
          fileName="Source"
          containerized={false}
          breakLines
          containerProps={{ ref: codeBlockRef }}
        >
          {source}
        </CodeBlock>
        <textarea
          className="hide-scrollbar absolute inset-0 h-full grow resize-none overflow-y-scroll whitespace-break-spaces break-all bg-transparent p-2 pl-8 pt-12 font-mono text-xs leading-5 text-transparent caret-gray-12 focus:outline-none"
          value={source}
          onChange={(e) => handleSourceChange(e.target.value, true)}
          onScroll={handleTextAreaScroll}
          autoCapitalize=""
          autoComplete=""
          spellCheck={false}
          aria-label="Source code"
        />
      </div>
      <div className="flex w-1/2 flex-col">
        <div className="flex h-10 w-full items-center gap-1 border-b border-gray-6 px-2">
          <ButtonGroup>
            <Tooltip content="Reset" side="bottom" align="start" triggerProps={{ asChild: true }}>
              <IconButton
                size="sm"
                onClick={resetPlay}
                disabled={!initialized || !nodeRef.current || !hasStarted}
                aria-label="Reset"
              >
                <ChevronFirst />
              </IconButton>
            </Tooltip>
            <Tooltip
              content={playing ? 'Pause' : 'Play'}
              side="bottom"
              triggerProps={{ asChild: true }}
            >
              <IconButton
                size="sm"
                onClick={handlePlay}
                disabled={!mounted || transitioningPlayback}
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? (
                  <Pause className="animate-in fade-in zoom-in" />
                ) : (
                  <Play className="animate-in fade-in zoom-in" />
                )}
              </IconButton>
            </Tooltip>
          </ButtonGroup>
          <Input
            className="px-1.5"
            containerProps={{
              className:
                'max-w-[4.5rem] h-6 [&_[input-input]]:h-6 [&_[input-right-container]]:h-6 [&_[input-right-container]]:px-0 [&_[input-right-container]]:min-w-6 [&_[input-right-container]]:w-6',
            }}
            size="sm"
            suffix="Hz"
            pattern="[0-9]+"
            value={sampleRate}
            onChange={(e) => handleSampleRateChange(e.target.value, true)}
            placeholder="8000"
            disabled={!initialized}
            aria-label="Sample rate"
          />
          <BytebeatFeatureCombobox value={song} onSelect={handleSongChange} />
        </div>
        <div className="flex w-full grow flex-col">
          <div className="w-full grow bg-black" ref={containerRef}>
            <canvas
              className="bg-black"
              height={canvasSize.height}
              width={canvasSize.width}
              ref={canvasRef}
            />
          </div>
          <div className="flex h-8 w-full items-center border-t border-gray-6 pr-2 text-sm">
            <div
              className={clsx(
                'hide-scrollbar group relative flex h-full grow items-center overflow-x-scroll',
                isTouchScreen && error.length > 0 ? 'pl-7' : undefined,
              )}
            >
              <div
                className={clsx(
                  'hide-scrollbar flex h-full w-full grow items-center overflow-y-hidden overflow-x-scroll text-nowrap pr-2',
                  isTouchScreen && error.length > 0 ? 'pl-1' : 'pl-2',
                )}
                style={{
                  WebkitMaskImage:
                    'linear-gradient(to right, transparent, black 0.5rem, black calc(100% - 0.5rem), transparent)',
                  maskImage:
                    'linear-gradient(to right, transparent, black 0.5rem, black calc(100% - 0.5rem), transparent)',
                }}
              >
                {error.length > 0 ? (
                  <span className="font-mono text-xs text-red-11">{error}</span>
                ) : !initialized || !nodeRef.current ? (
                  <span className="animate-pulse font-mono text-xs text-green-11">
                    Initializing processor...
                  </span>
                ) : (
                  <span className="font-mono text-xs text-gray-12 animate-in fade-in">
                    <span>t</span>
                    <span className="text-gray-11">=</span>
                    <span ref={timeElementRef}>{timeRef.current}</span>
                  </span>
                )}
              </div>
              {error.length > 0 ? (
                <IconButton
                  className={clsx(
                    'absolute left-1 z-[20] backdrop-blur',
                    isTouchScreen ? 'flex' : 'hidden animate-in fade-in group-hover:flex',
                  )}
                  variant="outline"
                  title="Copy error to clipboard"
                  size="sm"
                  type="button"
                  aria-label="Copy error to clipboard"
                  onClick={copyErrorToClipboard}
                >
                  {errorCopied ? (
                    <Check className="duration-300 animate-in fade-in zoom-in" />
                  ) : (
                    <Copy className="duration-300 animate-in fade-in" />
                  )}
                </IconButton>
              ) : null}
            </div>
            <Code title={`${new TextEncoder().encode(source).length.toLocaleString()} bytes`}>
              {source?.length ?? 0}c
            </Code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BytebeatFeatureDetail;
