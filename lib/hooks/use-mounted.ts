import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Returns `true` on the client after hydration, `false` during SSR. Uses
 * `useSyncExternalStore` to avoid cascading renders from `useEffect` +
 * `useState` mount detection.
 */
const useMounted = () => {
  return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
}

export default useMounted;