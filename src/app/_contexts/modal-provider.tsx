'use client';
import React, { createContext, useContext, useState } from 'react';

// Create a context
const MyContext = createContext();

// Create a provider component
export const ModalProvider = ({ children }) => {
  const [modalStack, setModalStack] = useState([]);

  const openModal = (modalId) => {
    setModalStack((prevStack) => [...prevStack, modalId]); // Push new modal to the stack
  };

  const closeModal = () => {
    setModalStack((prevStack) => prevStack.slice(0, -1)); // Remove the top modal from the stack
  };

  const setModal = (modalId) => {
    setModalStack([modalId]); // Remove the top modal from the stack
  };

  return (
    <MyContext.Provider value={{ modalStack, openModal, closeModal, setModal }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook for consuming the context
export const useModal = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};

