'use client';

import { Fragment, useMemo, useState } from 'react';

import Flags from 'country-flag-icons/react/1x1';
import { Shuffle } from 'lucide-react';

import { CAPITAL_CITIES } from '@/lib/constants/cities';

import { IconButton, Tooltip } from '@/components/ui';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type OverviewRandomGlobalPathProps = {
  totalDistance: number;
};

type PathLeg = {
  idx: number;
  dist: number;
};

type BuildPathResult = {
  path: PathLeg[];
  total: number;
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const OverviewRandomGlobalPath: React.FC<OverviewRandomGlobalPathProps> = ({ totalDistance }) => {
  // Precompute distances between cities.
  const [N, DISTANCES] = useMemo(() => {
    const N = CAPITAL_CITIES.length;
    const DISTANCES: number[][] = Array.from({ length: N }, () => Array<number>(N));
    for (let i = 0; i < N; ++i) {
      for (let j = i + 1; j < N; ++j) {
        const d = haversine(
          CAPITAL_CITIES[i].latitude,
          CAPITAL_CITIES[i].longitude,
          CAPITAL_CITIES[j].latitude,
          CAPITAL_CITIES[j].longitude,
        );
        DISTANCES[i][j] = DISTANCES[j][i] = d;
      }
    }

    return [N, DISTANCES];
  }, []);
  const [result, setResult] = useState<BuildPathResult>(() => buildPath());

  // ---------------------------------------------------------------------------
  // Algorithm.
  // ---------------------------------------------------------------------------

  function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius (km)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function buildPath(
    target: number = totalDistance / 1000,
    tolerance: number = 0.05,
    maxLegs: number = 30,
    maxAttempts: number = 1000,
  ): BuildPathResult {
    const lower = target * (1 - tolerance);
    const upper = target * (1 + tolerance);

    for (let attempt = 0; attempt < maxAttempts; ++attempt) {
      const visited: boolean[] = new Array(N).fill(false);
      const path: PathLeg[] = [];
      let total = 0;

      // Random start city.
      let current = Math.floor(Math.random() * N);
      visited[current] = true;
      path.push({ idx: current, dist: 0 });

      while (path.length) {
        if (total >= lower && total <= upper) {
          return { path: [...path], total };
        }
        // Restart if path is too long.
        if (path.length >= maxLegs) break;

        // Collect candidate next hops that do not overshoot upper bound.
        const candidates: PathLeg[] = [];
        for (let i = 0; i < N; ++i) {
          if (visited[i]) continue;
          const d = DISTANCES[current][i];
          if (total + d <= upper) candidates.push({ idx: i, dist: d });
        }

        if (candidates.length) {
          const { idx: next, dist } = candidates[Math.floor(Math.random() * candidates.length)];
          visited[next] = true;
          current = next;
          path.push({ idx: current, dist });
          total += dist;
        } else {
          // Backtrack one step.
          const last = path.pop()!; // '!' because path.length > 0 here.
          visited[last.idx] = false;
          if (!path.length) break; // Dead end — restart attempt.
          current = path[path.length - 1].idx;
          total -= last.dist;
        }
      }
    }

    throw new Error('Failed to find a path.');
  }

  // ---------------------------------------------------------------------------
  // Render.
  // ---------------------------------------------------------------------------

  const data = result.path.slice(1).map(({ idx, dist }, leg) => {
    return {
      from: CAPITAL_CITIES[result.path[leg].idx],
      to: CAPITAL_CITIES[idx],
      distance: dist.toFixed(2),
    };
  });

  return (
    <div className="relative flex">
      <div className="hide-scrollbar -m-0.5 grow overflow-y-scroll p-0.5">
        <span className="min-h-fit w-full max-w-full text-wrap">
          <span className="text-xs text-gray-11">That&apos;s roughly</span>
          <br />
          {data.map((d, i) => {
            const FromFlag = Flags[d.from.country.code as keyof typeof Flags];
            const ToFlag = Flags[d.to.country.code as keyof typeof Flags];

            return (
              <Fragment key={i}>
                {i === 0 ? (
                  <span className="inline-flex size-3 align-middle">
                    <Tooltip
                      content={d.from.country.name}
                      triggerProps={{ className: 'rounded-sm' }}
                    >
                      <FromFlag className="size-3 rounded-sm border border-gray-7 transition-colors hover:border-gray-8" />
                    </Tooltip>
                  </span>
                ) : null}
                {i === 0 ? <span> {d.from.name}</span> : null}
                <span className="text-nowrap text-gray-11"> -&gt; </span>
                <span className="inline-flex size-3 align-middle">
                  <Tooltip content={d.to.country.name} triggerProps={{ className: 'rounded-sm' }}>
                    <ToFlag className="size-3 rounded-sm border border-gray-7 transition-colors hover:border-gray-8" />
                  </Tooltip>
                </span>
                <span> {d.to.name}</span>
              </Fragment>
            );
          })}
        </span>
      </div>
      <Tooltip content="Randomize" side="left" triggerProps={{ asChild: true }}>
        <IconButton
          className="absolute bottom-0 right-0"
          size="sm"
          onClick={() => setResult(buildPath())}
        >
          <Shuffle />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default OverviewRandomGlobalPath;
