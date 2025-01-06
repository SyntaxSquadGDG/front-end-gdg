'use client';
import { useEffect, useState, useRef } from 'react';

const usePermissionsData = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };

    const observer = new ResizeObserver(() => {
      updateHeight();
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

  return { ref, height };
};

export default useElementHeight;

