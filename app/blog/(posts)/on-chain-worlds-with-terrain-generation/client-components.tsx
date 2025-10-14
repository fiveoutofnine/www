'use client';

import { useEffect, useRef, useState } from 'react';

import * as Accordion from '@radix-ui/react-accordion';
import clsx from 'clsx';
import { ChevronRight, Grid2x2Plus, Grid2x2X, ImageDown, ImageUp, RotateCw } from 'lucide-react';

import { Button, ButtonGroup, CodeBlock, IconButton, Tooltip } from '@/components/ui';

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
    const pixelSize = canvas.width / (32 << resolution);
    const numPixels = nodes / (32 << resolution);

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
            resolution={32 << resolution}
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
              aria-label="Decrease resolution"
            >
              <ImageDown />
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
              aria-label="Increase resolution"
            >
              <ImageUp />
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
              aria-label="Decrease nodes"
            >
              <Grid2x2X />
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
              aria-label="Increase nodes"
            >
              <Grid2x2Plus />
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

export const PerlinNoiseTestScriptAccordion: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="-mx-4 flex flex-col md:mx-0">
      <div
        className={clsx(
          // We need the following classes to override the default styles from
          // our `<Article />` MDX component.
          // Container
          '[&_[code-block-container]]:mx-0 [&_[code-block-container]]:rounded-b-none [&_[code-block-container]]:border-x-0',
          'md:[&_[code-block-container]]:mx-0 md:[&_[code-block-container]]:rounded-b-none md:[&_[code-block-container]]:border-x',
          // Pre
          '[&_[code-block-pre]]:rounded-b-none',
          'md:[&_[code-block-pre]]:rounded-b-none',
        )}
      >
        <CodeBlock
          language="sol"
          fileName="PerlinNoiseTest.s.sol snippet"
          highlightLines={[37, 38, 39]}
        >
          {PERLIN_NOISE_TEST_SOURCE}
        </CodeBlock>
      </div>
      <Accordion.Root className="-mt-px" type="single" collapsible>
        <Accordion.Item className="not-prose border-b-0" value="0">
          <Accordion.Trigger className="not-prose group z-10 flex h-10 w-full items-center space-x-2 border-x-0 border-y border-gray-6 bg-gray-3 px-4 text-sm font-medium text-gray-11 transition-colors hover:border-gray-7 hover:bg-gray-4 hover:text-gray-12 focus:outline-none focus-visible:rounded-none focus-visible:outline focus-visible:-outline-offset-[2px] focus-visible:outline-blue-9 focus-visible:ring-0 active:bg-gray-5 data-[state='open']:text-gray-12 md:border-x md:data-[state='closed']:rounded-b-xl">
            <span className="flex size-4 items-center justify-center">
              <ChevronRight className="transition-transform group-data-[state='open']:-rotate-90" />
            </span>
            <span>Sample output</span>
          </Accordion.Trigger>
          <Accordion.Content
            className={clsx(
              'not-prose overflow-hidden rounded-b-none border-x-0 border-b border-t-0 border-gray-6 bg-gray-3 p-0 md:rounded-b-xl md:border-x',
              // We need the following classes to override the default styles
              // from our `<Article />` MDX component.
              // Container
              '[&_[code-block-container]]:mx-0 [&_[code-block-container]]:rounded-none [&_[code-block-container]]:border-0',
              'md:[&_[code-block-container]]:mx-0 md:[&_[code-block-container]]:rounded-none md:[&_[code-block-container]]:border-x-0',
              // Pre
              '[&_[code-block-pre]]:rounded-none',
              'md:[&_[code-block-pre]]:rounded-b-[0.6875rem] md:[&_[code-block-pre]]:rounded-t-none',
            )}
          >
            {children}
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>
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

const PERLIN_NOISE_TEST_SOURCE = `// Select the tiles depending on \`perlin1\` and \`perlin2\` and generate
// the ASCII string.
string memory ascii_map = "";
for (uint256 row; row < HEIGHT; ++row) {
    string memory ascii_row = "";
    for (uint256 col; col < WIDTH; ++col) {
        // Normalize the Perlin noise values to the range [0, 59].
        uint256 temperature = 60 * (perlin1[col][row] - min1) / range1;
        uint256 rainfall = 60 * (perlin2[col][row] - min2) / range2;

        // Select the tile based on the temperature and rainfall.
        string memory tile = "";
        if (rainfall < 12) {
            tile = "@"; // Rainforest
        } else if (rainfall < 24) {
            if (temperature < 30) tile = "@"; // Rainforest
            else tile = "*"; // Wetland
        } else if (rainfall < 36) {
            if (temperature < 20) tile = "%"; // Temperate forest
            else if (temperature < 40) tile = "#"; // Boreal forest
            else tile = "+"; // Marsh
        } else if (rainfall < 48) {
            if (temperature < 30) tile = ":"; // Plains
            else tile = "="; // Grassland
        } else {
            if (temperature < 15) tile = "-"; // Desert
            else if (temperature < 30) tile = ":"; // Plains
            else if (temperature < 45) tile = "."; // Tundra
            else tile = "_"; // Snow
        }

        // Exclude the tile (i.e. print as \` \`) if it is not part of the
        // island's shape. We determine whether a tile at a given
        // \`(row, col)\` is part of the island via a bitmap, where a \`1\`
        // at the LSb position equal to \`12 * row + col\` indicates the
        // tile is part of the island.
        if ((0x1f81fc3fc3fe7fe3fffff3fffff3fffff3ff7fe3fe3fc1fc1f8 >> (12 * row + col)) & 1 == 0) {
            tile = " ";
        }
        ascii_row = string.concat(ascii_row, tile, "   ");
    }
    // Append the row to the map, prepended with a \`\` if the row is
    // odd-numbered.
    ascii_map = string.concat(ascii_map, row & 1 == 1 ? "  " : "", ascii_row, "\n");
}

// Log the map.
console.log(ascii_map);`;
