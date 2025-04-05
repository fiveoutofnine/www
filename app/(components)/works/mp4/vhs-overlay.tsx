'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';

import { NUMBER_OF_VIDEOS } from '@/lib/utils/getRandomMp4Url';

const VHSOverlay: React.FC = () => {
  const [time, setTime] = useState<string>('');

  // Update the time every second.
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      const estTime = new Intl.DateTimeFormat('en-US', options).format(new Date());
      setTime(estTime);
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
      aria-hidden={true}
    >
      {/* Chromatic aberration effect. */}
      <div className="absolute inset-0 z-10 opacity-10 mix-blend-screen">
        <div className="absolute inset-0 translate-x-[1px] transform bg-[#f00]" />
        <div className="absolute inset-0 -translate-x-[1px] transform bg-[#00f]" />
      </div>

      {/* Horizontal scan lines. */}
      <motion.div
        className="absolute inset-0"
        animate={{
          // We shift the lines equivalent to 8 lines.
          backgroundPositionY: ['0px', '32px', '0px'],
        }}
        transition={{
          duration: 1 / 3, // 24fps (3 * 8 lines).
          repeat: Infinity,
          repeatType: 'loop',
        }}
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      <div className="absolute inset-0 z-30 flex select-none items-center justify-center font-mono text-xs uppercase leading-3 text-white">
        {/* Top-left label. */}
        <span className="absolute left-2 top-2 flex items-center gap-1">
          <span>Play</span>
          <span className="flex size-3 items-center justify-center">
            <Play />
          </span>
        </span>
        {/* Top-center label. */}
        <span className="absolute top-2 font-vhs-display">5/9</span>
        {/* Top-right label. */}
        <span className="absolute right-2 top-2">--:--</span>
        {/* Bottom-left label. */}
        <div className="absolute bottom-2 left-2 flex flex-col items-start gap-0.5">
          <span>The Internet</span>
          <span>{NUMBER_OF_VIDEOS} videos</span>
        </div>
        {/* Bottom-center label. */}
        <div className="absolute bottom-2 flex animate-pulse items-center gap-1">
          <span className="flex size-3 items-center justify-center">
            <ChevronDown />
          </span>
          <span>Insert</span>
          <span className="flex size-3 items-center justify-center">
            <ChevronDown />
          </span>
        </div>
        {/* Bottom-right label. */}
        <div className="absolute bottom-2 right-2 flex flex-col items-end gap-0.5">
          <span>New York, USA</span>
          <span>{time}</span>
        </div>
        {/* Center error label. */}
        <div className="flex flex-col items-start text-xl leading-7 mix-blend-screen">
          <span>No cassette</span>
          <span>Please insert</span>
        </div>
      </div>

      {/* Tracking lines. */}
      <motion.div
        className="absolute inset-x-0 z-40 h-1 bg-white/5 backdrop-blur-sm"
        initial={{ bottom: '-25%' }}
        animate={{ bottom: '125%' }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 9,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default VHSOverlay;
