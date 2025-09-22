import io from 'socket.io-client';
import { createContext, useContext } from 'react';

export const socket = io('http://localhost:3001'); // Adjust this to your backend URL
export const SocketContext = createContext(socket);

export const useSocket = () => useContext(SocketContext);
