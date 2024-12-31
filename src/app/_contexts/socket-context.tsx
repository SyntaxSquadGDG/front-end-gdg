// _contexts/socket-context.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSocket, initSocket } from '../_lib/socket';

export const SocketContext = createContext(undefined);

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();

    if (socket) {
      // Handle socket closed event to update isConnected state
      socket.onclose(() => {
        console.log('Socket connection closed');
        setIsConnected(false);
      });
    } else {
      initSocket(9);
    }

    return () => {
      // Clean up: Stop socket connection on unmount
      if (socket && isConnected) {
        socket.stop();
      }
    };
  }, [isConnected]);

  const connectSocket = async (id) => {
    const socket = initSocket(id);

    if (socket && !isConnected) {
      try {
        // Start the connection if not already connected
        if (socket.state === 'Disconnected') {
          await socket.start(); // Start the connection
          console.log('Socket connected');
          setIsConnected(true);

          // Register the user ID (send to server)
          // socket.invoke('Register', id);
        } else {
          console.log('Socket is already connected or in another state');
        }
      } catch (err) {
        console.error('SignalR connection error:', err);
      }
    }
  };

  const disconnectSocket = () => {
    const socket = getSocket();
    if (socket) {
      console.log('??');
      socket.stop(); // Stop the connection
      setIsConnected(false);
      console.log('Socket disconnected');
    } else {
      console.log('NO');
    }
  };

  return (
    <SocketContext.Provider
      value={{
        connectSocket,
        disconnectSocket,
        socket: getSocket(),
        isConnected,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

