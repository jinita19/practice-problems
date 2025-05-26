import { useEffect, useState } from 'react';

//debounce
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer); // cleanup
  }, [value, delay]);

  return debouncedValue;
}

//useWindowResize
function getCurrentWidthAndHeight() {
    return [window.innerWidth, window.innerHeight];
  }
  
export function useWindowResize() {
    const [widthAndHeight, setWidthAndHeight] = useState(
        getCurrentWidthAndHeight()
    );

    function handler() {
        setWidthAndHeight(getCurrentWidthAndHeight());
    }

    useEffect(() => {
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    return widthAndHeight;
}

