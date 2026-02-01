import { useCallback, useSyncExternalStore } from 'react';

/**
 * React hook that returns a boolean value indicating whether the current
 * window matches the given media query string.
 * @param query Media query string to match.
 * @returns Boolean value indicating whether the current window matches the
 * given media query string `query`.
 */
export const useMediaQuery = (query: string) => {
  const subscribe = useCallback(
    (callback: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', callback);
      return () => media.removeEventListener('change', callback);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
};
