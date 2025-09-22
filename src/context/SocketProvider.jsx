import React from 'react';
import { SocketContext, socket } from '../hooks/useSocket';

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
