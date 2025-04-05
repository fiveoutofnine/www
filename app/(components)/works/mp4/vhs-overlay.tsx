'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type VHSOverlayProps = {
  trackingQuality: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const VHSOverlay: React.FC<VHSOverlayProps> = ({ trackingQuality }) => {
  const [showTrackingLines, setShowTrackingLines] = useState<boolean>(true);

  // Randomly flicker tracking lines based on tracking quality.
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTrackingLines(Math.random() > trackingQuality);
    }, 250);

    return () => clearInterval(interval);
  }, [trackingQuality]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10" aria-hidden={true}>
      {/* Chromatic aberration effect. */}
      <div className="absolute inset-0 opacity-10 mix-blend-screen">
        <div className="absolute inset-0 translate-x-[1px] transform bg-[#f00]" />
        <div className="absolute inset-0 -translate-x-[1px] transform bg-[#00f]" />
      </div>

      {/* Horizontal scan lines. */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.25) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* Tracking lines. */}
      {/* showTrackingLines && (
        <>
          <motion.div
            initial={{ bottom: '-5%' }}
            animate={{ bottom: '105%' }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 4.5,
            }}
            className="absolute inset-x-0 h-2 bg-white/5 backdrop-blur-sm"
          />
          <motion.div
            initial={{ bottom: '-5%' }}
            animate={{ bottom: '105%' }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: 'loop',
              repeatDelay: 4.5,
              delay: 2.5,
            }}
            className="absolute inset-x-0 h-1.5 bg-white/5 backdrop-blur-sm"
          />
        </>
      ) */}

      {/* VHS label. */}
      <div className="absolute bottom-2 left-2 font-mono text-xs text-white/70">VHS</div>
    </div>
  );
};

export default VHSOverlay;
