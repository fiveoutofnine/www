'use client';

import { useEffect, useRef } from 'react';

const BlogViewCountTracker: React.FC<{ slug: string }> = ({ slug }) => {
  const loggedRef = useRef(false);

  useEffect(() => {
    if (!loggedRef.current) {
      fetch(`/api/blog/views?id=${encodeURIComponent(slug)}`).then((res) => res.json());
      loggedRef.current = true;
    }
  }, [slug]);

  return null;
};

export default BlogViewCountTracker;
