export const AUDIO_PROCESSOR_NAME = 'bytebeat-feature-processor';

export const AUDIO_PROCESSOR_CODE = `// Modified from https://github.com/SthephanShinkufag/bytebeat-composer
class BytebeatFeatureAudioProcessor extends AudioWorkletProcessor {
  constructor(...args) {
    super(...args);
    this.byteSample = 0;
    this.framesSinceReport = 0;
    this.func = null;
    this.isPlaying = false;
    this.lastSample = null;
    this.outValue = 0;
    this.phase = 0;
    this.reportInterval = 2048;
    this.runtimeErrorReported = false;
    this.sampleRatio = 1;
    Object.seal(this);
    BytebeatFeatureAudioProcessor.deleteGlobals();
    BytebeatFeatureAudioProcessor.freezeGlobals();
    this.port.addEventListener('message', (event) => this.receiveData(event.data));
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
      Object.defineProperty(globalThis, name, {
        value: prop,
        writable: false,
        configurable: false,
      });
    });
  }

  static getErrorMessage(err, time) {
    const when = time === null ? 'compilation' : 't=' + time;
    try {
      if (!(err instanceof Error)) {
        return when + ' thrown: ' + (typeof err === 'string' ? err : String(err));
      }
      const { message, lineNumber, columnNumber } = err;
      return when + ' error: ' + String(message) +
        (typeof lineNumber === 'number' && typeof columnNumber === 'number'
          ? ' (at line ' + (lineNumber - 3) + ', character ' + (+columnNumber) + ')'
          : '');
    } catch (_) {
      return when + ' error';
    }
  }

  process(inputs, outputs) {
    const output = outputs && outputs[0];
    const channel = output && output[0];
    if (!channel || !channel.length || !this.isPlaying || typeof this.func !== 'function') {
      return true;
    }

    let phase = this.phase;
    let lastSample = this.lastSample;
    let outValue = this.outValue;
    const sampleRatio = this.sampleRatio;

    for (let i = 0; i < channel.length; ++i) {
      const currentSample = Math.floor(phase);
      if (currentSample !== lastSample) {
        try {
          let funcValue = this.func(currentSample);
          let byteValue = NaN;
          if (Array.isArray(funcValue)) {
            let mixedValue = 0;
            for (let channelIndex = 0; channelIndex < funcValue.length; ++channelIndex) {
              const channelValue = +funcValue[channelIndex];
              if (Number.isNaN(channelValue)) {
                mixedValue = NaN;
                break;
              }
              mixedValue += channelValue & 255;
            }
            if (funcValue.length) byteValue = mixedValue / funcValue.length;
          } else {
            funcValue = +funcValue;
            if (!Number.isNaN(funcValue)) byteValue = funcValue & 255;
          }
          if (!Number.isNaN(byteValue)) {
            outValue = byteValue / 127.5 - 1;
          }
        } catch (err) {
          if (!this.runtimeErrorReported) {
            this.runtimeErrorReported = true;
            this.sendData({
              error: {
                message: BytebeatFeatureAudioProcessor.getErrorMessage(err, currentSample),
                isRuntime: true,
              },
            });
          }
        }
        lastSample = currentSample;
      }
      channel[i] = outValue;
      phase += sampleRatio;
    }

    this.phase = phase;
    this.byteSample = Math.floor(phase);
    this.lastSample = lastSample;
    this.outValue = outValue;

    if (Math.abs(phase) > Number.MAX_SAFE_INTEGER) {
      this.resetTime();
      return true;
    }

    this.framesSinceReport += channel.length;
    if (this.framesSinceReport >= this.reportInterval) {
      this.framesSinceReport %= this.reportInterval;
      this.sendData({ byteSample: this.byteSample });
    }
    return true;
  }

  receiveData(data) {
    if (!data || typeof data !== 'object') return;
    if (data.byteSample !== undefined) {
      let byteSample;
      try {
        byteSample = +data.byteSample;
      } catch (_) {
        byteSample = 0;
      }
      this.phase = Number.isFinite(byteSample) ? byteSample : 0;
      this.byteSample = Math.floor(this.phase);
      this.resetValues();
    }
    if (data.isPlaying !== undefined) {
      this.isPlaying = data.isPlaying === true;
    }
    if (data.setFunction !== undefined) {
      this.setFunction(data.setFunction);
    }
    if (data.resetTime === true) {
      this.resetTime();
    }
    if (data.sampleRatio !== undefined) {
      this.setSampleRatio(data.sampleRatio);
    }
    if (data.reportInterval !== undefined) {
      let reportInterval;
      try {
        reportInterval = Math.floor(+data.reportInterval);
      } catch (_) {
        reportInterval = 0;
      }
      if (Number.isFinite(reportInterval) && reportInterval > 0) {
        this.reportInterval = reportInterval;
        this.framesSinceReport = 0;
      }
    }
  }

  sendData(data) {
    try {
      this.port.postMessage(data);
    } catch (_) {
      // A detached port must not stop the audio render thread.
    }
  }

  resetTime() {
    this.phase = 0;
    this.byteSample = 0;
    this.resetValues();
    this.sendData({ byteSample: 0 });
  }

  resetValues() {
    this.framesSinceReport = 0;
    this.lastSample = null;
    this.outValue = 0;
  }

  setFunction(codeText) {
    const params = Object.getOwnPropertyNames(Math);
    const values = params.map((key) => Math[key]);
    params.push('int', 'window');
    values.push(Math.floor, globalThis);
    BytebeatFeatureAudioProcessor.deleteGlobals();
    let isCompiled = false;
    const oldFunc = this.func;
    try {
      codeText = String(codeText).trim();
      this.func = new Function(...params, 't', 'return 0,\\n' + (codeText || 0) + ';').bind(
        globalThis,
        ...values,
      );
      isCompiled = true;
      this.func(0);
    } catch (err) {
      if (!isCompiled) this.func = oldFunc;
      this.runtimeErrorReported = isCompiled;
      this.sendData({
        error: {
          message: BytebeatFeatureAudioProcessor.getErrorMessage(err, isCompiled ? 0 : null),
          isCompiled,
        },
        updateUrl: isCompiled,
      });
      return;
    }
    this.lastSample = null;
    this.runtimeErrorReported = false;
    this.sendData({ error: { message: '', isCompiled: true }, updateUrl: true });
  }

  setSampleRatio(sampleRatio) {
    let nextSampleRatio;
    try {
      nextSampleRatio = +sampleRatio;
    } catch (_) {
      nextSampleRatio = NaN;
    }
    if (!Number.isFinite(nextSampleRatio) || nextSampleRatio <= 0) return;
    this.sampleRatio = nextSampleRatio;
  }
}

registerProcessor('${AUDIO_PROCESSOR_NAME}', BytebeatFeatureAudioProcessor);`;
