'use client';

import { useEffect, useRef, useState } from 'react';

import BytebeatFeatureCombobox from './combobox';
import clsx from 'clsx';
import { Check, ChevronFirst, Copy, Pause, Play } from 'lucide-react';

import { BYTEBEAT_SONGS } from '@/lib/constants/bytebeat';

import { Code } from '@/components/templates/mdx';
import { ButtonGroup, CodeBlock, IconButton, Input, toast, Tooltip } from '@/components/ui';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const radixColors = require('@radix-ui/colors');

// -----------------------------------------------------------------------------
// Audio processor code
// -----------------------------------------------------------------------------

const AUDIO_PROCESSOR_CODE = `// Modified from https://github.com/SthephanShinkufag/bytebeat-composer
class BytebeatFeatureAudioProcessor extends AudioWorkletProcessor {
  constructor(...args) {
    super(...args);
    this.audioSample = 0;
    this.byteSample = 0;
    this.errorDisplayed = true;
    this.func = null;
    this.getValues = (funcValue, ch) => (this.lastByteValue[ch] = funcValue & 255) / 127.5 - 1;
    this.isPlaying = false;
    this.playbackSpeed = 1;
    this.lastByteValue = [null, null];
    this.lastFuncValue = [null, null];
    this.lastTime = -1;
    this.outValue = [0, 0];
    this.sampleRate = 8000;
    this.sampleRatio = 1;
    Object.seal(this);
    BytebeatFeatureAudioProcessor.deleteGlobals();
    BytebeatFeatureAudioProcessor.freezeGlobals();
    this.port.addEventListener('message', (e) => this.receiveData(e.data));
    this.port.start();
  }

  static deleteGlobals() {
    for (let i = 0; i < 26; ++i) {
      delete globalThis[String.fromCharCode(65 + i)];
      delete globalThis[String.fromCharCode(97 + i)];
    }
    for (const name in globalThis) {
      if (Object.prototype.hasOwnProperty.call(globalThis, name)) {
        delete globalThis[name];
      }
    }
  }

  static freezeGlobals() {
    Object.getOwnPropertyNames(globalThis).forEach((name) => {
      const prop = globalThis[name];
      const type = typeof prop;
      if ((type === 'object' || type === 'function') && name !== 'globalThis') {
        Object.freeze(prop);
      }
      if (type === 'function' && Object.prototype.hasOwnProperty.call(prop, 'prototype')) {
        Object.freeze(prop.prototype);
      }
      Object.defineProperty(globalThis, name, { writable: false, configurable: false });
    });
  }

  static getErrorMessage(err, time) {
    const when = time === null ? 'compilation' : 't=' + time;
    if (!(err instanceof Error)) {
      return \`\${when} thrown: \${typeof err === 'string' ? err : JSON.stringify(err)}\`;
    }
    const { message, lineNumber, columnNumber } = err;
    return \`\${when} error: \${typeof message === 'string' ? message : JSON.stringify(message)}\${
      typeof lineNumber === 'number' && typeof columnNumber === 'number'
        ? \` (at line \${lineNumber - 3}, character \${+columnNumber})\`
        : ''
    }\`;
  }

  process(inputs, [chData]) {
    const chDataLength = chData[0].length;
    if (!chDataLength || !this.isPlaying) return true;

    let time = this.sampleRatio * this.audioSample;
    let { byteSample } = this;
    const drawBuffer = [];
    const isDiagram = true;
    for (let i = 0; i < chDataLength; ++i) {
      time += this.sampleRatio;
      const currentTime = Math.floor(time);
      if (this.lastTime !== currentTime) {
        let funcValue;
        const currentSample = Math.floor(byteSample);
        try {
          funcValue = this.func(currentSample);
        } catch (err) {
          if (this.errorDisplayed) {
            this.errorDisplayed = false;
            this.sendData({
              error: {
                message: BytebeatFeatureAudioProcessor.getErrorMessage(err, currentSample),
                isRuntime: true,
              }
            });
          }
          funcValue = NaN;
        }
        funcValue = Array.isArray(funcValue)
          ? [funcValue[0], funcValue[1]]
          : [funcValue, funcValue];
        let hasValue = false;
        let ch = 2;
        while (ch--) {
          try {
            funcValue[ch] = +funcValue[ch];
          } catch (err) {
            funcValue[ch] = NaN;
          }
          if (isDiagram) {
            if (!isNaN(funcValue[ch])) {
              this.outValue[ch] = this.getValues(funcValue[ch], ch);
            } else {
              this.lastByteValue[ch] = NaN;
            }
            hasValue = true;
            continue;
          }
          if (funcValue[ch] === this.lastFuncValue[ch]) {
            continue;
          } else if (!isNaN(funcValue[ch])) {
            this.outValue[ch] = this.getValues(funcValue[ch], ch);
            hasValue = true;
          } else if (!isNaN(this.lastFuncValue[ch])) {
            this.lastByteValue[ch] = NaN;
            hasValue = true;
          }
        }
        if (hasValue) {
          drawBuffer.push({ t: currentSample, value: [...this.lastByteValue] });
        }
        byteSample += currentTime - this.lastTime;
        this.lastFuncValue = funcValue;
        this.lastTime = currentTime;
      }
      chData[0][i] = this.outValue[0];
      chData[1][i] = this.outValue[1];
    }
    if (Math.abs(byteSample) > Number.MAX_SAFE_INTEGER) {
      this.resetTime();
      return true;
    }
    this.audioSample += chDataLength;
    let isSend = false;
    const data = {};
    if (byteSample !== this.byteSample) {
      isSend = true;
      data.byteSample = this.byteSample = byteSample;
    }
    if (drawBuffer.length) {
      isSend = true;
      data.drawBuffer = drawBuffer;
    }
    if (isSend) {
      this.sendData(data);
    }
    return true;
  }

  receiveData(data) {
    if (data.function === 'setFunction') {
      this.setFunction(data.codeText ?? '');
    }
    if (data.function === 'resetTime') {
      this.resetTime();
    }
    if (data.byteSample !== undefined) {
      this.byteSample = +data.byteSample || 0;
      this.resetValues();
    }
    if (data.errorDisplayed === true) {
      this.errorDisplayed = true;
    }
    if (data.isPlaying !== undefined) {
      this.isPlaying = data.isPlaying;
    }
    if (data.playbackSpeed !== undefined) {
      const sampleRatio = this.sampleRatio / this.playbackSpeed;
      this.playbackSpeed = data.playbackSpeed;
      this.setSampleRatio(sampleRatio);
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
      switch (data.mode) {
        case 'Bytebeat':
          this.getValues = (funcValue, ch) => (this.lastByteValue[ch] = funcValue & 255) / 127.5 - 1;
          break;
        default:
          this.getValues = (funcValue, ch) => (this.lastByteValue[ch] = NaN);
      }
    }
    if (data.setFunction !== undefined) {
      this.setFunction(data.setFunction);
    }
    if (data.resetTime === true) {
      this.resetTime();
    }
    if (data.sampleRate !== undefined) {
      this.sampleRate = data.sampleRate;
    }
    if (data.sampleRatio !== undefined) {
      this.setSampleRatio(data.sampleRatio);
    }
  }

  sendData(data) {
    this.port.postMessage(data);
  }

  resetTime() {
    this.byteSample = 0;
    this.resetValues();
    this.sendData({ byteSample: 0 });
  }

  resetValues() {
    this.audioSample = 0;
    this.lastByteValue = this.lastFuncValue = [null, null];
    this.lastTime = -1;
    this.outValue = [0, 0];
  }

  setFunction(codeText) {
    const params = Object.getOwnPropertyNames(Math);
    const values = params.map((k) => Math[k]);
    params.push('int', 'window');
    values.push(Math.floor, globalThis);
    BytebeatFeatureAudioProcessor.deleteGlobals();
    let isCompiled = false;
    const oldFunc = this.func;
    try {
      codeText = codeText
        .trim()
        .replace(
          /^eval\\(unescape\\(escape(?:\`|\\('|\\("|\\(\`)(.*?)(?:\`|'\\)|"\\)|\`\\)).replace\\(\\/u\\(\\.\\.\\)\\/g,["'\`]\\$1%["'\`]\\)\\)\\)$/,
          (match, m1) => unescape(escape(m1).replace(/u(..)/g, '$1%')),
        );
      this.func = new Function(...params, 't', \`return 0,\n\${codeText || 0};\`).bind(
        globalThis,
        ...values,
      );
      isCompiled = true;
      this.func(0);
    } catch (err) {
      if (!isCompiled) {
        this.func = oldFunc;
      }
      this.errorDisplayed = false;
      this.sendData({
        error: {
          message: BytebeatFeatureAudioProcessor.getErrorMessage(err, isCompiled ? 0 : null),
          isCompiled,
        },
        updateUrl: isCompiled,
      });
      return;
    }
    this.errorDisplayed = false;
    this.sendData({ error: { message: '', isCompiled }, updateUrl: true });
  }

  setSampleRatio(sampleRatio) {
    const timeOffset = Math.floor(this.sampleRatio * this.audioSample) - this.lastTime;
    this.sampleRatio = sampleRatio * this.playbackSpeed;
    this.lastTime = Math.floor(this.sampleRatio * this.audioSample) - timeOffset;
  }
}

registerProcessor('bytebeat-feature-processor', BytebeatFeatureAudioProcessor);`;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const BytebeatFeatureDetail: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [source, setSource] = useState<string>(BYTEBEAT_SONGS[0].source);
  const [song, setSong] = useState<(typeof BYTEBEAT_SONGS)[0] | null>(BYTEBEAT_SONGS[0]);
  const [sampleRate, setSampleRate] = useState<string>(String(BYTEBEAT_SONGS[0].sampleRate));
  const [playing, setPlaying] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [errorCopied, setErrorCopied] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 110,
  });
  const [, setDrawBuffer] = useState([]);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [scrollIsAtLeft, setScrollIsAtLeft] = useState<boolean>(true);
  const [scrollIsAtRight, setScrollIsAtRight] = useState<boolean>(false);
  const codeBlockRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const nodeRef = useRef<AudioWorkletNode | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef(null);
  const waveformDataRef = useRef([]);

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
    const initialize = async () => {
      try {
        // Create a `AudioContext`.
        audioContextRef.current = new AudioContext({ sampleRate: 8000 });
        analyzerRef.current = audioContextRef.current.createAnalyser();
        analyzerRef.current.fftSize = 2048;

        // Create a URL blob containing the audio processor code to create a
        // `AudioWorkletNode` w/.
        const blob = new Blob([AUDIO_PROCESSOR_CODE], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        await audioContextRef.current.audioWorklet.addModule(url);
        nodeRef.current = new window.AudioWorkletNode(
          audioContextRef.current,
          'bytebeat-feature-processor',
          {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [2],
          },
        );

        nodeRef.current.port.onmessage = (event) => {
          if (event.data.byteSample !== undefined) {
            setTime(event.data.byteSample);
          }
          if (event.data.error && event.data.error.isCompiled) {
            setError(event.data.error.message ?? '');
          }
          if (event.data.drawBuffer) {
            // Store up to 4096 samples for the visualization's draw buffer.
            setDrawBuffer((prevBuffer) => {
              const newBuffer = prevBuffer.concat(event.data.drawBuffer).slice(-4096);
              waveformDataRef.current = newBuffer;

              return newBuffer;
            });
          }
        };

        nodeRef.current.connect(analyzerRef.current);
        analyzerRef.current.connect(audioContextRef.current.destination);

        URL.revokeObjectURL(url);
        setInitialized(true);
        startVisualization();
      } catch (error) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('Error initializing `AudioWorklet`:', error);
        }
      }
    };

    // Initialize the audio context, worklet, and processor.
    initialize();

    return () => {
      if (nodeRef.current) nodeRef.current.disconnect();
      if (audioContextRef.current) audioContextRef.current.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Call `initializeProcessor` after the node is created and connected.
  useEffect(() => {
    const initializeProcessor = () => {
      if (!nodeRef.current) return;

      // First set the initial function
      nodeRef.current.port.postMessage({
        function: 'setFunction',
        codeText: source,
      });

      // Then set up other parameters
      nodeRef.current.port.postMessage({
        sampleRate: 8000,
        playbackSpeed: 1,
      });
    };

    if (initialized && nodeRef.current) initializeProcessor();
  }, [initialized, source]);

  // ---------------------------------------------------------------------------
  // Audio processor message posting
  // ---------------------------------------------------------------------------

  const handlePlay = async () => {
    if (!initialized || !nodeRef.current) return;

    try {
      // Resume audio context if needed.
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Toggle playback state.
      nodeRef.current.port.postMessage({ isPlaying: !playing });
      setPlaying(!playing);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error during playback:', error);
      }
    }
  };

  const resetPlay = () => {
    if (!initialized || !nodeRef.current) return;

    try {
      // Toggle playback state.
      nodeRef.current.port.postMessage({ function: 'resetTime' });
      setTime(0);
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error during playback:', error);
      }
    }
  };

  const handleSourceChange = (newSource: string, nullifySong?: boolean) => {
    // Always apply the changes locally first.
    setSource(newSource);
    if (!initialized || !nodeRef.current) return;

    // Post the new function to the audio processor.
    nodeRef.current.port.postMessage({
      function: 'setFunction',
      codeText: newSource,
    });

    // Nullify song if `nullifySong`.
    if (nullifySong) setSong(null);
  };

  const handleSampleRateChange = (newSampleRate: string, nullifySong?: boolean) => {
    // Always apply the changes locally first.
    setSampleRate(newSampleRate);
    if (!initialized || !nodeRef.current) return;

    // Parse the sample rate.
    let sampleRate = Number(newSampleRate);
    if (Number.isNaN(sampleRate) || sampleRate < 0) sampleRate = 8000;

    // Post the new sample rate to the audio processor.
    nodeRef.current.port.postMessage({
      sampleRate,
      sampleRatio: sampleRate / (audioContextRef.current?.sampleRate ?? 1),
    });

    // Nullify song if `nullifySong`.
    if (nullifySong) setSong(null);
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
    const updateCanvasSize = () => {
      if (containerRef.current) {
        setCanvasSize({ width: containerRef.current.offsetWidth, height: 110 });
      }
    };

    updateCanvasSize();

    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  const startVisualization = () => {
    if (!canvasRef.current || !analyzerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // @ts-expect-error We're just requesting an animation frame for the
      // sound visualization here.
      animationFrameRef.current = requestAnimationFrame(draw);

      // Clear canvas.
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const currentBuffer = waveformDataRef.current as { t: number; value: [number, number] }[];

      if (currentBuffer && currentBuffer.length > 0) {
        ctx.beginPath();
        ctx.strokeStyle = radixColors.blueDark.blue9;
        ctx.lineWidth = 1;

        // Draw the waveform.
        for (let i = 0; i < currentBuffer.length; ++i) {
          // Get the time value to draw left to right.
          const t = currentBuffer[i].t % 4096;
          const x = (t / 4096) * canvas.width;
          const sample = currentBuffer[i] as { t: number; value: [number, number] };

          if (sample && sample.value && !isNaN(sample.value[0]) && !isNaN(sample.value[1])) {
            // Average the 2 channels' values.
            const value = (sample.value[0] + sample.value[1]) / 2;
            const y = canvas.height * (1 - value / 255);
            // End the stroke if we've reached the end.
            if (t === 0) {
              ctx.stroke();
              ctx.beginPath();
              ctx.strokeStyle = radixColors.blueDark.blue9;
              ctx.lineWidth = 1;
            } else {
              ctx.lineTo(x, y);
            }
          }
        }

        ctx.stroke();

        // Draw scanning cursor.
        const cursorT = currentBuffer[currentBuffer.length - 1].t % 4096;
        const cursorX = (cursorT / 4096) * canvas.width;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cursorX, 0);
        ctx.lineTo(cursorX, canvas.height);
        ctx.stroke();
      }
    };

    draw();
  };

  // ---------------------------------------------------------------------------
  // Miscellaneous
  // ---------------------------------------------------------------------------

  const handleStatusScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const scrollLeft = target.scrollLeft;
    const scrollWidth = target.scrollWidth;
    const clientWidth = target.clientWidth;

    setScrollIsAtLeft(scrollLeft === 0);
    setScrollIsAtRight(scrollWidth - scrollLeft === clientWidth);
  };

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
                disabled={!initialized || !nodeRef.current || time === 0}
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
                disabled={!initialized || !nodeRef.current}
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
            disabled={!initialized || !nodeRef.current}
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
                onScroll={handleStatusScroll}
              >
                {!initialized || !nodeRef.current ? (
                  <span className="animate-pulse font-mono text-xs text-green-11">
                    Initializing processor...
                  </span>
                ) : error.length > 0 ? (
                  <span className="font-mono text-xs text-red-11">{error}</span>
                ) : (
                  <span className="font-mono text-xs text-gray-12 animate-in fade-in">
                    <span>t</span>
                    <span className="text-gray-11">=</span>
                    <span>{time}</span>
                  </span>
                )}
              </div>
              {/* Left gradient to hide overflow */}
              <div
                className={clsx(
                  'pointer-events-none absolute bottom-0 z-[10] h-8 w-4 bg-gradient-to-r from-gray-2 transition-opacity',
                  scrollIsAtLeft ? 'opacity-0' : 'opacity-100',
                  isTouchScreen ? 'left-7' : 'left-0',
                )}
                aria-hidden={true}
              />
              {/* Right gradient to hide overflow */}
              <div
                className={clsx(
                  'pointer-events-none absolute bottom-0 right-0 z-[10] h-8 w-4 bg-gradient-to-l from-gray-2 transition-opacity',
                  scrollIsAtRight ? 'opacity-0' : 'opacity-100',
                )}
                aria-hidden={true}
              />
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
            <Code title={`${new TextEncoder().encode(source).length} bytes`}>
              {source?.length ?? 0}c
            </Code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BytebeatFeatureDetail;
