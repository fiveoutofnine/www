'use client';

import { useEffect, useRef, useState } from 'react';

import { ImagePlus, RotateCw } from 'lucide-react';

import { Button, ButtonGroup, IconButton, Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

export const PerlinNoiseGenerator: React.FC = () => {
  const [nonce, setNonce] = useState<number>(0);
  // `resolution` should be enforced to be in the range `[0, 3]`.
  const [resolution, setResolution] = useState<number>(1);
  // `resolution` should be enforced to be in the range `[2, 12]`.
  const [nodes, setNodes] = useState<number>(6);
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

    canvas.width = 256;
    canvas.height = 256;
    // Convert `resolution` to `[32, 64, 128, 256]`.
    const pixelSize = canvas.width / (1 << (resolution + 5));
    const numPixels = nodes / (1 << (resolution + 5));

    // Refresh the Perlin generator.
    perlinRef.current.refresh();

    // Generate and render the noise.
    for (let y = 0; y < nodes; y += numPixels) {
      for (let x = 0; x < nodes; x += numPixels) {
        ctx.fillStyle = `rgba(255,255,255,${perlinRef.current.get(x, y) + 0.5})`;
        ctx.fillRect((x / nodes) * canvas.width, (y / nodes) * canvas.width, pixelSize, pixelSize);
      }
    }
    // Include `nonce` as a dependency to re-render the Perlin noise when the
    // "Randomize" button is clicked.
  }, [nodes, nonce, resolution]);

  return (
    <div className="-mx-4 flex flex-col items-center justify-center gap-2 border-y border-gray-6 bg-gray-2 py-8 md:mx-0 md:rounded-xl md:border-x">
      <div className="flex flex-col items-center gap-1">
        <span className="animate-bg-pulse font-mono text-xs font-normal text-gray-11">
          <span key={resolution.toString()} className="animate-bg-pulse">
            {/* Convert `resolution` to `[32, 64, 128, 256]`. */}
            resolution={1 << (resolution + 5)}
          </span>{' '}
          <span key={nodes.toString()} className="animate-bg-pulse">
            nodes={nodes}
          </span>
        </span>
        <div className="overflow-hidden rounded-lg border border-gray-6">
          {/* `rounded-lg` - (border width) = 8 - 2 = 6 */}
          <canvas className="rounded-[6px]" height={256} width={256} ref={canvasRef} />
        </div>
      </div>
      <div className="flex w-64 gap-1">
        <ButtonGroup>
          <Tooltip
            content="Decrease resolution"
            side="bottom"
            align="start"
            triggerProps={{ asChild: true }}
          >
            <IconButton
              variant="outline"
              onClick={() => setResolution((prev) => prev - 1)}
              disabled={resolution < 1}
            >
              <ImagePlus />
            </IconButton>
          </Tooltip>
          <Tooltip
            content="Increase resolution"
            side="bottom"
            align="center"
            triggerProps={{ asChild: true }}
          >
            <IconButton
              variant="outline"
              onClick={() => setResolution((prev) => prev + 1)}
              disabled={resolution > 2}
            >
              <ImagePlus />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
        <ButtonGroup>
          <Tooltip
            content="Decrease nodes"
            side="bottom"
            align="center"
            triggerProps={{ asChild: true }}
          >
            <IconButton
              variant="outline"
              onClick={() => setNodes((prev) => prev - 2)}
              disabled={nodes < 3}
            >
              <ImagePlus />
            </IconButton>
          </Tooltip>
          <Tooltip
            content="Increase nodes"
            side="bottom"
            align="end"
            triggerProps={{ asChild: true }}
          >
            <IconButton
              variant="outline"
              onClick={() => setNodes((prev) => prev + 2)}
              disabled={nodes > 10}
            >
              <ImagePlus />
            </IconButton>
          </Tooltip>
        </ButtonGroup>
        <Button
          className="w-full"
          rightIcon={<RotateCw />}
          onClick={() => setNonce((prev) => prev + 1)}
        >
          Refresh
        </Button>
      </div>
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

    const tL = this.dotProductGrid(x, y, xF, yF);
    const tR = this.dotProductGrid(x, y, xF + 1, yF);
    const bL = this.dotProductGrid(x, y, xF, yF + 1);
    const bR = this.dotProductGrid(x, y, xF + 1, yF + 1);
    const xT = this.interpolate(x - xF, tL, tR);
    const xB = this.interpolate(x - xF, bL, bR);
    const v = this.interpolate(y - yF, xT, xB);
    this.memory[key] = v;

    return v;
  }
}
