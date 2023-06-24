import { useEffect, useState } from 'react';

/**
 * React hook that returns a boolean value indicating whether the current
 * window matches the given media query string.
 * @param query Media query string to match.
 * @returns Boolean value indicating whether the current window matches the
 * given media query string `query`.
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      setMatches(media.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};
