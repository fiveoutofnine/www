'use client';

import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type VHSOverlayProps = {
  isPlaying: boolean;
  trackingQuality: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const VHSOverlay: React.FC<VHSOverlayProps> = ({ isPlaying, trackingQuality }) => {
  const [showTrackingLines, setShowTrackingLines] = useState<boolean>(true);

  // Randomly flicker tracking lines based on tracking quality.
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setShowTrackingLines(Math.random() > trackingQuality);
    }, 250);

    return () => clearInterval(interval);
  }, [isPlaying, trackingQuality]);

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
      {showTrackingLines && (
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
      )}

      {/* Random glitches. */}
      <AnimatedGlitch isActive={isPlaying && trackingQuality < 0.8} />

      {/* VHS label. */}
      <div className="absolute bottom-2 left-2 font-mono text-xs text-white/70">VHS</div>
    </div>
  );
};

const AnimatedGlitch: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [isGlitching, setIsGlitching] = useState<boolean>(false);

  useEffect(() => {
    if (!isActive) return;

    // Random glitch activation.
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 150 + Math.random() * 200);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isGlitching) return null;

  return (
    <motion.div
      className="absolute inset-0 bg-white mix-blend-difference"
      animate={{
        opacity: [0, 0.05, 0.1, 0.05, 0],
        x: [0, -5, 5, -2, 0],
      }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default VHSOverlay;
