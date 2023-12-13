import { RefObject, useEffect } from 'react';

export default function useOnLeaveElement(ref: RefObject<HTMLElement>, callback: () => void) {
  useEffect(() => {
    function listener(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    window.addEventListener('mousedown', listener);
    return () => {
      window.removeEventListener('mousedown', listener);
    };
  }, [ref, callback]);
}
