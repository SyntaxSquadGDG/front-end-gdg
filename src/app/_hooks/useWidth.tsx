import { useState, useEffect, useRef } from 'react';

const useElementWidth = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, width };
};

export default useElementWidth;

