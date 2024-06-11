'use client';

import { useEffect, useRef } from 'react';

import commaNumber from 'comma-number';
import useSWR, { type KeyedMutator } from 'swr';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type BlogViewCountProps = {
  id: string;
  fallbackData: number;
};

type BlogViewCountTrackerProps = {
  id: string;
  data?: number;
  mutate: KeyedMutator<number>;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const BlogViewCount: React.FC<BlogViewCountProps> = ({ id, fallbackData }) => {
  const { data, mutate } = useSWR<number>(
    `/api/blog/views?id=${id}`,
    (url: string) =>
      fetch(url)
        .then((res) => res.json())
        .then((res) => Number(res?.views)),
    // Refetch every 5 minutes.
    { fallbackData, refreshInterval: 300_000 },
  );

  return <BlogViewCountTracker data={data} id={id} mutate={mutate} />;
};

const BlogViewCountTracker: React.FC<BlogViewCountTrackerProps> = ({ id, data, mutate }) => {
  const loggedRef = useRef(false);

  useEffect(() => {
    if (!loggedRef.current) {
      fetch(`/api/blog/views?id=${id}&incr=1`)
        .then((res) => res.json())
        .then((res) => mutate(Number(res?.views)));
      loggedRef.current = true;
    }
  });

  // Format `data`.
  const views = data ? commaNumber(data.toString()) : '0';

  return (
    // We set `key={views}` so the animation is triggered each the time view
    // count changes.
    <span key={views} className="animate-bg-pulse">
      {views} views
    </span>
  );
};

export default BlogViewCount;
