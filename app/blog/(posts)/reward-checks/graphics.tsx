import { Fragment } from 'react';

import clsx from 'clsx';

export const PixelArtEncodingSimpleGraphic: React.FC = () => {
  return (
    <svg
      /* 4 columns: 24 * 4 - 3 */
      width="93"
      /* 4 rows: 24 * 4 - 3 */
      height="93"
      viewBox="0 0 93 93"
      xmlns="http://www.w3.org/2000/svg"
      role="figure"
    >
      <title>Simple pixel art encoding</title>
      <desc>Naive vs optimized simple pixel art encoding example.</desc>
      {/* Unfinished */}
      <Pixel x={0} y={0} type="gray" />
      <Pixel x={1} y={0} type="gray" />
      <Pixel x={2} y={0} type="gray" />
      <Pixel x={3} y={0} type="gray" />
      <Pixel x={0} y={1} type="gray" />
      <Pixel x={1} y={1} type="gray" />
      <Pixel x={2} y={1} type="gray" />
      <Pixel x={3} y={1} type="gray" />
      <Pixel x={0} y={2} type="gray" />
      <Pixel x={1} y={2} type="gray" />
      <Pixel x={2} y={2} type="gray" />
      <Pixel x={3} y={2} type="gray" />
      <Pixel x={0} y={3} type="gray" />
      <Pixel x={1} y={3} type="gray" />
      <Pixel x={2} y={3} type="gray" />
      <Pixel x={3} y={3} type="gray" />
      {/* Finished */}
      <Pixel x={0} y={0} type="green" text="0" />
      <Pixel x={1} y={0} type="green" text="0" />
      <Pixel x={2} y={0} type="green" text="0" />
      <Pixel x={0} y={1} type="green" text="0" />
      <Pixel x={1} y={1} type="green" text="0" />
      <Pixel x={2} y={1} type="green" text="0" />
      <Pixel x={0} y={2} type="green" text="0" />
      <Pixel x={1} y={2} type="green" text="0" />
      <Pixel x={2} y={2} type="green" text="0" />
      {/* Highlighted */}
      <Pixel x={0} y={0} type="blue" text="1" />
      <Pixel x={2} y={0} type="blue" text="1" />
      <Pixel x={1} y={1} type="blue" text="1" />
      <Pixel x={0} y={2} type="blue" text="1" />
      <Pixel x={2} y={2} type="blue" text="1" />
    </svg>
  );
};

const Pixel: React.FC<{
  x: number;
  y: number;
  width?: number;
  height?: number;
  type: 'green' | 'blue' | 'gray';
  text?: string;
}> = ({ x, y, width = 1, height = 1, type, text }) => {
  return (
    <Fragment>
      <rect
        className={
          type === 'green'
            ? 'fill-green-3 stroke-green-6'
            : type === 'blue'
              ? 'fill-blue-3 stroke-blue-6'
              : 'fill-gray-3 stroke-gray-6'
        }
        x={0.5 + x * 23}
        y={0.5 + y * 23}
        width={width * 23}
        height={height * 23}
      />
      {text ? (
        <text
          className={clsx(
            'font-mono text-xs',
            type === 'green' ? 'fill-green-11' : type === 'blue' ? 'fill-blue-11' : 'fill-gray-11',
          )}
          dominantBaseline="middle"
          textAnchor="middle"
          x={23 * x + width * 12}
          y={1 + 23 * y + height * 12}
        >
          {text}
        </text>
      ) : null}
    </Fragment>
  );
};
