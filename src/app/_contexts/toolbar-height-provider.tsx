'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';

interface HeightContextProps {
  ref: React.RefObject<HTMLElement>;
  height: number;
}

const HeightContext = createContext<HeightContextProps | undefined>(undefined);

export const HeightProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <HeightContext.Provider value={{ ref, height }}>
      {children}
    </HeightContext.Provider>
  );
};

export const useHeightContext = () => {
  const context = useContext(HeightContext);
  if (!context) {
    throw new Error('useHeightContext must be used within a HeightProvider');
  }
  return context;
};

