'use client';

import { useEffect, useRef } from 'react';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type VHSNoiseProps = {
  opacity?: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const VHSNoise: React.FC<VHSNoiseProps> = ({ opacity = 0.2 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Update canvas size.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth || 390;
        canvas.height = parent.offsetHeight || 142;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    updateCanvasSize();

    window.addEventListener('resize', updateCanvasSize);

    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Generate noise.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const generateNoise = () => {
      // Check for valid dimensions before drawing noise.
      if (canvas.width <= 0 || canvas.height <= 0) {
        animationId = requestAnimationFrame(generateNoise);
        return;
      }

      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;

        data[i] = value; // Red.
        data[i + 1] = value; // Green.
        data[i + 2] = value; // Blue.
        data[i + 3] = 255; // Alpha.
      }

      ctx.putImageData(imageData, 0, 0);

      animationId = requestAnimationFrame(generateNoise);
    };

    // Small delay to ensure canvas has dimensions.
    if (canvasRef.current && canvasRef.current.width > 0 && canvasRef.current.height > 0) {
      generateNoise();
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      style={{ opacity }}
      aria-hidden={true}
    />
  );
};

export default VHSNoise;
