import { AUDIO_PROCESSOR_CODE, AUDIO_PROCESSOR_NAME } from './audio-processor';
import assert from 'node:assert/strict';
import test from 'node:test';
import vm from 'node:vm';

type WorkletProcessor = {
  byteSample: number;
  phase: number;
  port: {
    // eslint-disable-next-line no-unused-vars
    dispatch: (data: unknown) => void;
    messages: Record<string, unknown>[];
    throwOnPost: boolean;
  };
  // eslint-disable-next-line no-unused-vars
  process: (inputs: unknown[], outputs: Float32Array[][]) => boolean;
};

const createProcessor = () => {
  const context = vm.createContext({});
  vm.runInContext(
    `
      class MockAudioWorkletProcessor {
        constructor() {
          const listeners = [];
          this.port = {
            messages: [],
            throwOnPost: false,
            addEventListener(type, listener) {
              if (type === 'message') listeners.push(listener);
            },
            start() {},
            postMessage(data) {
              if (this.throwOnPost) throw new Error('closed port');
              this.messages.push(data);
            },
            dispatch(data) {
              for (const listener of listeners) listener({ data });
            },
          };
        }
      }
      globalThis.AudioWorkletProcessor = MockAudioWorkletProcessor;
      globalThis.registerProcessor = (name, Processor) => {
        globalThis.registeredName = name;
        globalThis.RegisteredProcessor = Processor;
      };
    `,
    context,
  );
  vm.runInContext(AUDIO_PROCESSOR_CODE, context);

  const registeredName = context.registeredName as string;
  const Processor = context.RegisteredProcessor as new () => WorkletProcessor;
  const processor = new Processor();

  return { processor, registeredName };
};

const send = (processor: WorkletProcessor, data: Record<string, unknown>) => {
  processor.port.dispatch(data);
};

const render = (processor: WorkletProcessor, length: number) => {
  const channel = new Float32Array(length);
  assert.equal(processor.process([], [[channel]]), true);
  return channel;
};

const decodeByte = (sample: number) => Math.round((sample + 1) * 127.5);

test('registers the bytebeat processor and safely ignores missing output', () => {
  const { processor, registeredName } = createProcessor();

  assert.equal(registeredName, AUDIO_PROCESSOR_NAME);
  assert.equal(processor.process([], []), true);
  assert.equal(processor.process([], [[]]), true);
});

test('renders mono bytebeat values and mixes array results down to mono', () => {
  const { processor } = createProcessor();
  send(processor, { setFunction: 't' });
  send(processor, { isPlaying: true });

  assert.deepEqual(Array.from(render(processor, 4), decodeByte), [0, 1, 2, 3]);

  send(processor, { setFunction: '[200, 18]' });
  assert.equal(decodeByte(render(processor, 1)[0]), 109);

  send(processor, { setFunction: '[255, 257]' });
  assert.equal(decodeByte(render(processor, 1)[0]), 128);
});

test('advances integer bytebeat time from a fractional positive sample ratio', () => {
  const { processor } = createProcessor();
  send(processor, { setFunction: 't' });
  send(processor, { sampleRatio: 0.5, reportInterval: 4, isPlaying: true });

  assert.deepEqual(Array.from(render(processor, 4), decodeByte), [0, 0, 1, 1]);
  assert.equal(processor.phase, 2);
  assert.equal(processor.byteSample, 2);
  assert.equal(processor.port.messages.at(-1)?.byteSample, 2);

  send(processor, { sampleRatio: 0 });
  assert.deepEqual(Array.from(render(processor, 2), decodeByte), [2, 2]);
});

test('rate-limits progress reports and never creates draw buffers', () => {
  const { processor } = createProcessor();
  send(processor, { setFunction: 't' });
  send(processor, { reportInterval: 256, isPlaying: true });
  processor.port.messages.length = 0;

  render(processor, 128);
  assert.equal(processor.port.messages.length, 0);
  render(processor, 128);
  assert.equal(processor.port.messages.length, 1);
  assert.equal(processor.port.messages[0].byteSample, 256);
  assert.equal('drawBuffer' in processor.port.messages[0], false);

  send(processor, { sampleRatio: 0.0001, reportInterval: 128 });
  processor.port.messages.length = 0;
  render(processor, 128);
  render(processor, 128);
  assert.deepEqual(
    Array.from(processor.port.messages, (message) => message.byteSample),
    [256, 256],
  );
});

test('resets deterministically and survives compile, runtime, coercion, and port errors', () => {
  const { processor } = createProcessor();
  send(processor, { setFunction: 't === 1 ? (() => { throw new Error("boom") })() : t' });
  send(processor, { isPlaying: true });
  processor.port.messages.length = 0;

  assert.deepEqual(Array.from(render(processor, 3), decodeByte), [0, 0, 2]);
  assert.match(
    String(
      processor.port.messages[0].error &&
        (processor.port.messages[0].error as { message: string }).message,
    ),
    /t=1 error: boom/,
  );
  assert.equal((processor.port.messages[0].error as { isRuntime: boolean }).isRuntime, true);

  send(processor, { setFunction: '(' });
  assert.equal(
    (processor.port.messages.at(-1)?.error as { isCompiled: boolean }).isCompiled,
    false,
  );
  assert.equal(decodeByte(render(processor, 1)[0]), 3);

  send(processor, { setFunction: 'Symbol()' });
  processor.port.messages.length = 0;
  assert.doesNotThrow(() => render(processor, 1));
  assert.equal((processor.port.messages[0].error as { isRuntime: boolean }).isRuntime, true);

  processor.port.throwOnPost = true;
  assert.doesNotThrow(() => send(processor, { resetTime: true }));
  assert.equal(processor.phase, 0);
  assert.equal(processor.byteSample, 0);
  assert.equal(processor.process([], []), true);
});
