import { Fragment } from 'react';

import clsx from 'clsx';

// -----------------------------------------------------------------------------
// Main graphics
// -----------------------------------------------------------------------------

export const DynamicBitmapGraphic: React.FC = () => {
  return (
    <svg
      /* 23 columns: 12 * 23 - 22 */
      width="254"
      /* 11 rows: 24 * 11 - 10 */
      height="254"
      viewBox="0 0 254 254"
      xmlns="http://www.w3.org/2000/svg"
      role="figure"
    >
      <title>Hyphen Guy Bitmap</title>
      <title>Graphical illustration of the Hyphen Guy bitmap.</title>
      {[...Array(253)].map((_, i) => {
        const [x, y] = [i % 23, Math.floor(i / 23)];

        return (
          <Bit key={i} x={x} y={y} intent="none">
            1
          </Bit>
        );
      })}
      {[...Array(15)].map((_, i) => {
        const [jx, jy] = [i % 5, Math.floor(i / 5)];
        const j = 101 + jx + jy * 23;
        const [x, y] = [j % 23, Math.floor(j / 23)];

        return i !== 7 && i !== 12 ? (
          <Bit key={i} x={x} y={y} intent="success">
            0
          </Bit>
        ) : null;
      })}
      <Bit x={11} y={3} intent="warning">
        𝔹
      </Bit>
      <Bit x={11} y={5} intent="warning">
        𝔹
      </Bit>
    </svg>
  );
};

// -----------------------------------------------------------------------------
// Helper
// -----------------------------------------------------------------------------

const Bit: React.FC<{
  x: number;
  y: number;
  intent?: 'none' | 'success' | 'warning';
  children?: React.ReactNode;
}> = ({ x, y, intent = 'none', children }) => {
  return (
    <Fragment>
      <rect
        className={
          intent === 'none'
            ? 'fill-gray-3 stroke-gray-6'
            : intent === 'success'
              ? 'fill-green-3 stroke-green-6'
              : intent === 'warning'
                ? 'fill-yellow-3 stroke-yellow-6'
                : // Default to intent `none`
                  'fill-gray-3 stroke-gray-6'
        }
        x={0.5 + x * 11}
        y={0.5 + y * 23}
        width="11"
        height="23"
      />
      <text
        className={clsx(
          'font-mono text-xs',
          intent === 'none'
            ? 'fill-gray-11'
            : intent === 'success'
              ? 'fill-green-12'
              : intent === 'warning'
                ? 'fill-yellow-12'
                : // Default to intent `none`
                  'fill-gray-11',
        )}
        x={6 + x * 11}
        y={13 + y * 23}
        dominantBaseline="middle"
        textAnchor="middle"
        height="14"
      >
        {children}
      </text>
    </Fragment>
  );
};
