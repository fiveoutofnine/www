import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};
const getSnapshot = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const getServerSnapshot = () => false;

/**
 * Returns `true` on touch screen devices (client-side only). Returns `false`
 * during SSR. Uses `useSyncExternalStore` to avoid cascading renders from
 * `useEffect` + `useState` mount detection.
 */
const useIsTouchScreen = () => {
  return useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
}

export default useIsTouchScreen;