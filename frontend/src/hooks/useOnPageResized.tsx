import { useEffect } from 'react';

export default function useOnPageResized(callback: () => void) {
  useEffect(() => {
    function listener() {
      callback();
    }

    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [callback]);
}
