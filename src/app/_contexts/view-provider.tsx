'use client';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context
const MyContext = createContext();

// Create a provider component
export const ViewProvider = ({ children }) => {
  const [view, setView] = useState('grid');

  const setGrid = () => {
    setView('grid');
  };

  const setList = () => {
    setView('list');
  };

  const fullPathname = usePathname();

  useEffect(() => {
    setView('grid');
  }, [fullPathname]);

  return (
    <MyContext.Provider value={{ view, setList, setGrid }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook for consuming the context
export const useView = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

