import { Fragment } from 'react';

import clsx from 'clsx';

// -----------------------------------------------------------------------------
// Main graphics
// -----------------------------------------------------------------------------

export const ANDGraphic: React.FC = () => {
  const A = ['0', '1', '0', '1'];
  const B = ['0', '0', '1', '1'];
  const C = ['0', '0', '0', '1'];

  return (
    <svg
      /* 6 columns: 24 * 6 - 5 */
      width="139"
      /* 4 rows and 8px padding for 16px caption: 24 * 4 - 3 + (8 + 16) */
      height="117"
      viewBox="0 0 139 117"
      xmlns="http://www.w3.org/2000/svg"
      role="figure"
    >
      <title>AND Example</title>
      <desc>Graphical illustration of AND.</desc>
      <defs>
        <marker id="arrow-head" orient="auto" markerWidth="5" markerHeight="4" refX="3" refY="2">
          <path className="fill-gray-11" d="M0,0v4L5,2LZ" />
        </marker>
        <marker
          id="arrow-head-highlight"
          orient="auto"
          markerWidth="5"
          markerHeight="4"
          refX="3"
          refY="2"
        >
          <path className="fill-orange-11" d="M0,0v4L5,2LZ" />
        </marker>
      </defs>
      {[...Array(4)].map((_, i) => {
        const highlight = i === 3;

        return (
          <Fragment key={i}>
            <Bit x={1 + i} y={0} highlight={highlight}>
              {A[i]}
            </Bit>
            <Bit x={1 + i} y={1} highlight={highlight}>
              {B[i]}
            </Bit>
            <Bit x={1 + i} y={3} highlight={highlight}>
              {C[i]}
            </Bit>
            <Arrow x1={1 + i} y1={1} s1="bottom" x2={1 + i} y2={3} s2="top" highlight={highlight} />
          </Fragment>
        );
      })}
      <text
        className="fill-gray-11 font-mono text-xs"
        dominantBaseline="middle"
        textAnchor="middle"
        x="50%"
        y="110"
        height="16"
      >
        0101 & 0011 = 0001
      </text>
    </svg>
  );
};

export const ORGraphic: React.FC = () => {
  const A = ['0', '1', '0', '1'];
  const B = ['0', '0', '1', '1'];
  const C = ['0', '1', '1', '1'];

  return (
    <svg
      /* 6 columns: 24 * 6 - 5 */
      width="139"
      /* 4 rows and 8px padding for 16px caption: 24 * 4 - 3 + (8 + 16) */
      height="117"
      viewBox="0 0 139 117"
      xmlns="http://www.w3.org/2000/svg"
      role="figure"
    >
      <title>OR Example</title>
      <desc>Graphical illustration of OR.</desc>
      <defs>
        <marker id="arrow-head" orient="auto" markerWidth="5" markerHeight="4" refX="3" refY="2">
          <path className="fill-gray-11" d="M0,0v4L5,2LZ" />
        </marker>
        <marker
          id="arrow-head-highlight"
          orient="auto"
          markerWidth="5"
          markerHeight="4"
          refX="3"
          refY="2"
        >
          <path className="fill-orange-11" d="M0,0v4L5,2LZ" />
        </marker>
      </defs>
      {[...Array(4)].map((_, i) => {
        const x = 1 + i;
        const highlight = i > 0;

        return (
          <Fragment key={i}>
            <Bit x={x} y={0} highlight={highlight}>
              {A[i]}
            </Bit>
            <Bit x={x} y={1} highlight={highlight}>
              {B[i]}
            </Bit>
            <Bit x={x} y={3} highlight={highlight}>
              {C[i]}
            </Bit>
            <Arrow x1={x} y1={1} s1="bottom" x2={x} y2={3} s2="top" highlight={highlight} />
          </Fragment>
        );
      })}
      <text
        className="fill-gray-11 font-mono text-xs"
        dominantBaseline="middle"
        textAnchor="middle"
        x="50%"
        y="110"
        height="16"
      >
        0101 | 0011 = 0111
      </text>
    </svg>
  );
};

export const SHLGraphic: React.FC = () => {
  const START = ['0', '0', '0', '1', '0', '1', '1', '1'];
  const END = ['0', '0', '1', '0', '1', '1', '1', '0'];

  return (
    <svg
      /* 10 columns: 24 * 10 - 9 */
      width="231"
      /* 3 rows and 8px padding for 16px caption: 24 * 3 - 2 + (8 + 16) */
      height="94"
      viewBox="0 0 231 94"
      xmlns="http://www.w3.org/2000/svg"
      role="figure"
    >
      <title>SHL Example</title>
      <desc>Graphical illustration of SHL.</desc>
      <defs>
        <marker id="arrow-head" orient="auto" markerWidth="5" markerHeight="4" refX="3" refY="2">
          <path className="fill-gray-11" d="M0,0v4L5,2LZ" />
        </marker>
        <marker
          id="arrow-head-highlight"
          orient="auto"
          markerWidth="5"
          markerHeight="4"
          refX="3"
          refY="2"
        >
          <path className="fill-orange-11" d="M0,0v4L5,2LZ" />
        </marker>
      </defs>
      <Bit x={9} y={2} highlight>
        0
      </Bit>
      {START.map((bit, i) => (
        <Bit key={i} x={i} y={0}>
          {bit}
        </Bit>
      ))}
      {END.map((bit, i) => (
        <Bit key={i} x={i} y={2} highlight={i === 7}>
          {bit}
        </Bit>
      ))}
      <Arrow x1={9} y1={2} s1="left" x2={7} y2={2} s2="right" highlight />
      {[...Array(7)].map((_, i) => (
        <Arrow key={i} x1={i + 1} y1={0} s1="bottom" x2={i} y2={2} s2="top" />
      ))}
      <text
        className="fill-gray-11 font-mono text-xs"
        dominantBaseline="middle"
        textAnchor="middle"
        x="50%"
        y="86"
        height="16"
      >
        00010111 &lt;&lt; 1 = 00101110
      </text>
    </svg>
  );
};

export const SHRGraphic: React.FC = () => {
  const START = ['0', '0', '0', '1', '0', '1', '1', '1'];
  const END = ['0', '0', '0', '0', '1', '0', '1', '1'];

  return (
    <svg
      /* 10 columns: 24 * 10 - 9 */
      width="231"
      /* 3 rows and 8px padding for 16px caption: 24 * 3 - 2 + (8 + 16) */
      height="94"
      viewBox="0 0 231 94"
      xmlns="http://www.w3.org/2000/svg"
      role="figure"
    >
      <title>SHR Example</title>
      <desc>Graphical illustration of SHR.</desc>
      <defs>
        <marker id="arrow-head" orient="auto" markerWidth="5" markerHeight="4" refX="3" refY="2">
          <path className="fill-gray-11" d="M0,0v4L5,2LZ" />
        </marker>
        <marker
          id="arrow-head-highlight"
          orient="auto"
          markerWidth="5"
          markerHeight="4"
          refX="3"
          refY="2"
        >
          <path className="fill-orange-11" d="M0,0v4L5,2LZ" />
        </marker>
      </defs>
      <Bit x={0} y={2} highlight>
        0
      </Bit>
      {START.map((bit, i) => (
        <Bit key={i} x={i + 2} y={0}>
          {bit}
        </Bit>
      ))}
      {/* We reverse it to get priority for the left-most bit. */}
      {END.reverse().map((bit, i) => (
        <Bit key={i} x={9 - i} y={2} highlight={i === 7}>
          {bit}
        </Bit>
      ))}
      <Arrow x1={0} y1={2} s1="right" x2={2} y2={2} s2="left" highlight />
      {[...Array(7)].map((_, i) => (
        <Arrow key={i} x1={i + 2} y1={0} s1="bottom" x2={i + 3} y2={2} s2="top" />
      ))}
      <text
        className="fill-gray-11 font-mono text-xs"
        dominantBaseline="middle"
        textAnchor="middle"
        x="50%"
        y="86"
        height="16"
      >
        00010111 &gt;&gt; 1 = 00001011
      </text>
    </svg>
  );
};

export const TicTacToeBoardGraphic: React.FC<{ value?: string }> = ({ value }) => {
  return (
    <svg
      /* 3 columns: 24 * 3 - 2 */
      width="70"
      /* 3 rows: 24 * 3 - 2 */
      height="70"
      viewBox="0 0 70 70"
      xmlns="http://www.w3.org/2000/svg"
      role="figure"
    >
      <title>Tic-tac-toe Board</title>
      <desc>Graphical illustration of a Tic-tac-toe board.</desc>
      <defs>
        <marker id="arrow-head" orient="auto" markerWidth="5" markerHeight="4" refX="3" refY="2">
          <path className="fill-gray-11" d="M0,0v4L5,2LZ" />
        </marker>
        <marker
          id="arrow-head-highlight"
          orient="auto"
          markerWidth="5"
          markerHeight="4"
          refX="3"
          refY="2"
        >
          <path className="fill-orange-11" d="M0,0v4L5,2LZ" />
        </marker>
      </defs>
      {[...Array(9)].map((_, i) => (
        <Bit key={i} x={i % 3} y={Math.floor(i / 3)}>
          {value?.at(i) || 8 - i}
        </Bit>
      ))}
    </svg>
  );
};

export const XORGraphic: React.FC = () => {
  const A = ['0', '1', '0', '1'];
  const B = ['0', '0', '1', '1'];
  const C = ['0', '1', '1', '0'];

  return (
    <svg
      /* 6 columns: 24 * 6 - 5 */
      width="139"
      /* 4 rows and 8px padding for 16px caption: 24 * 4 - 3 + (8 + 16) */
      height="117"
      viewBox="0 0 139 117"
      xmlns="http://www.w3.org/2000/svg"
      role="figure"
    >
      <title>XOR Example</title>
      <desc>Graphical illustration of XOR.</desc>
      <defs>
        <marker id="arrow-head" orient="auto" markerWidth="5" markerHeight="4" refX="3" refY="2">
          <path className="fill-gray-11" d="M0,0v4L5,2LZ" />
        </marker>
        <marker
          id="arrow-head-highlight"
          orient="auto"
          markerWidth="5"
          markerHeight="4"
          refX="3"
          refY="2"
        >
          <path className="fill-orange-11" d="M0,0v4L5,2LZ" />
        </marker>
      </defs>
      {/* First, draw the 3rd 0-indexed bit to get the correct layer priority. */}
      <Bit x={4} y={0}>
        {A[3]}
      </Bit>
      <Bit x={4} y={1}>
        {B[3]}
      </Bit>
      <Bit x={4} y={3}>
        {C[3]}
      </Bit>
      <Arrow x1={4} y1={1} s1="bottom" x2={4} y2={3} s2="top" />
      {/* Render the remaining bits. */}
      {[...Array(3)].map((_, i) => {
        const x = 1 + i;
        const highlight = i === 1 || i === 2;

        return (
          <Fragment key={i}>
            <Bit x={x} y={0} highlight={highlight}>
              {A[i]}
            </Bit>
            <Bit x={x} y={1} highlight={highlight}>
              {B[i]}
            </Bit>
            <Bit x={x} y={3} highlight={highlight}>
              {C[i]}
            </Bit>
            <Arrow x1={x} y1={1} s1="bottom" x2={x} y2={3} s2="top" highlight={highlight} />
          </Fragment>
        );
      })}
      <text
        className="fill-gray-11 font-mono text-xs"
        dominantBaseline="middle"
        textAnchor="middle"
        x="50%"
        y="110"
        height="16"
      >
        0101 ^ 0011 = 0110
      </text>
    </svg>
  );
};

// -----------------------------------------------------------------------------
// Helper
// -----------------------------------------------------------------------------

const Arrow: React.FC<{
  x1: number;
  y1: number;
  s1: 'top' | 'bottom' | 'left' | 'right';
  x2: number;
  y2: number;
  s2: 'top' | 'bottom' | 'left' | 'right';
  highlight?: boolean;
}> = ({ x1, y1, s1, x2, y2, s2, highlight = false }) => {
  const X_OFFSETS = { top: 12, bottom: 12, left: 0, right: 24 };
  const Y_OFFSETS = { top: 0, bottom: 24, left: 12, right: 12 };

  // Compute points of the arrow line before the `x` adjustment for the arrow
  // head.
  const p1x = X_OFFSETS[s1] + x1 * 23;
  const p1y = Y_OFFSETS[s1] + y1 * 23;
  const p2x = X_OFFSETS[s2] + x2 * 23;
  const p2y = Y_OFFSETS[s2] + y2 * 23;
  // Compute angle of the arrow line.
  const angle = Math.atan2(p2y - p1y, p2x - p1x);
  // Calculate adjustments to `p2x` and `p2y`.
  const dx = 2 * Math.cos(angle);
  const dy = 2 * Math.sin(angle);

  return (
    <path
      className={clsx('stroke fill-none', highlight ? 'stroke-orange-11' : 'stroke-gray-11')}
      markerEnd={highlight ? 'url(#arrow-head-highlight)' : 'url(#arrow-head)'}
      d={`M${p1x},${p1y}L${p2x - dx},${p2y - dy}`}
      strokeLinecap="round"
    />
  );
};

const Bit: React.FC<{ x: number; y: number; highlight?: boolean; children?: React.ReactNode }> = ({
  x,
  y,
  highlight = false,
  children,
}) => {
  return (
    <Fragment>
      <rect
        className={highlight ? 'fill-orange-3 stroke-orange-6' : 'fill-gray-3 stroke-gray-6'}
        x={0.5 + x * 23}
        y={0.5 + y * 23}
        width="23"
        height="23"
      />
      <text
        className={clsx('font-mono text-sm', highlight ? 'fill-orange-12' : 'fill-gray-12')}
        x={12 + x * 23}
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
