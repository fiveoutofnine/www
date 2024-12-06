'use client';

import { useEffect, useRef, useState } from 'react';

import { Shuffle } from 'lucide-react';

import { Button } from '@/components/ui';

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

export const PerlinNoiseGenerator: React.FC = () => {
  const [nonce, setNonce] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const perlinRef = useRef<Perlin>(new Perlin());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // -------------------------------------------------------------------------
    // Constants
    // -------------------------------------------------------------------------

    const GRID_SIZE = 4;
    const RESOLUTION = 128;
    const COLOR_SCALE = 250;
    canvas.width = 256;
    canvas.height = 256;
    const pixelSize = canvas.width / RESOLUTION;
    const numPixels = GRID_SIZE / RESOLUTION;

    // Refresh the Perlin generator.
    perlinRef.current.refresh();

    // Generate and render the noise.
    for (let y = 0; y < GRID_SIZE; y += numPixels) {
      for (let x = 0; x < GRID_SIZE; x += numPixels) {
        const v = Math.floor(perlinRef.current.get(x, y) * COLOR_SCALE);
        ctx.fillStyle = `hsl(${v},50%,50%)`;
        ctx.fillRect(
          (x / GRID_SIZE) * canvas.width,
          (y / GRID_SIZE) * canvas.width,
          pixelSize,
          pixelSize,
        );
      }
    }
    // Include `nonce` as a dependency to re-render the Perlin noise when the
    // "Randomize" button is clicked.
  }, [nonce]);

  return (
    <div className="-mx-4 flex flex-col items-center justify-center gap-2 border-y border-gray-6 bg-gray-2 py-8 md:mx-0 md:rounded-xl md:border-x">
      <div className="flex flex-col items-center gap-1">
        <div className="overflow-hidden rounded-lg border border-gray-6">
          {/* `rounded-lg` - (border width) = 8 - 2 = 6 */}
          <canvas className="rounded-[6px]" height={256} width={256} ref={canvasRef} />
        </div>
      </div>
      <Button rightIcon={<Shuffle />} onClick={() => setNonce((prev) => prev + 1)}>
        Randomize
      </Button>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Perlin logic
// -----------------------------------------------------------------------------

// Credits: https://github.com/joeiddon/perlin
class Perlin {
  private gradients: { [key: string]: { x: number; y: number } };
  private memory: { [key: string]: number };

  constructor() {
    this.gradients = {};
    this.memory = {};
  }

  private randomVector() {
    const theta = Math.random() * 2 * Math.PI;

    return { x: Math.cos(theta), y: Math.sin(theta) };
  }

  private dotProductGrid(x: number, y: number, vX: number, vY: number) {
    const key = `${vX},${vY}`;
    let gVect = this.gradients[key];

    if (!gVect) {
      gVect = this.randomVector();
      this.gradients[key] = gVect;
    }

    const dVect = { x: x - vX, y: y - vY };

    return dVect.x * gVect.x + dVect.y * gVect.y;
  }

  private smootherStep(x: number) {
    return 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3;
  }

  private interpolate(x: number, a: number, b: number) {
    return a + this.smootherStep(x) * (b - a);
  }

  refresh() {
    this.gradients = {};
    this.memory = {};
  }

  get(x: number, y: number) {
    const key = `${x},${y}`;
    if (this.memory[key] !== undefined) return this.memory[key];

    const xF = Math.floor(x);
    const yF = Math.floor(y);

    const tl = this.dotProductGrid(x, y, xF, yF);
    const tr = this.dotProductGrid(x, y, xF + 1, yF);
    const bl = this.dotProductGrid(x, y, xF, yF + 1);
    const br = this.dotProductGrid(x, y, xF + 1, yF + 1);
    const xt = this.interpolate(x - xF, tl, tr);
    const xb = this.interpolate(x - xF, bl, br);
    const v = this.interpolate(y - yF, xt, xb);
    this.memory[key] = v;

    return v;
  }
}
