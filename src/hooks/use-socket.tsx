"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { Socket } from "socket.io-client";
import { socketService } from "~/lib/socket";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  emit: <T>(event: string, data?: T) => void;
  on: <T>(event: string, callback: (data: T) => void) => () => void;
  off: (event: string) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initSocket = async () => {
      // Use the singleton service
      const socketInstance = await socketService.initialize();

      if (!socketInstance) {
        setSocket(null);
        setIsConnected(false);
        return;
      }

      setSocket(socketInstance);
      setIsConnected(socketInstance.connected);

      // Listen for connection changes
      const onConnect = () => setIsConnected(true);
      const onDisconnect = () => setIsConnected(false);

      socketInstance.on("connect", onConnect);
      socketInstance.on("disconnect", onDisconnect);

      return () => {
        socketInstance.off("connect", onConnect);
        socketInstance.off("disconnect", onDisconnect);
      };
    };

    initSocket();
  }, []);

  const emit = useCallback(<T,>(event: string, data?: T) => {
    const s = socketService.getSocket();
    if (s?.connected) {
      s.emit(event, data);
    } else {
      console.warn("Socket not connected, cannot emit:", event);
    }
  }, []);

  const on = useCallback(<T,>(event: string, callback: (data: T) => void) => {
    const s = socketService.getSocket();
    if (s) {
      s.on(event, callback);
    }
    return () => {
      const s = socketService.getSocket();
      if (s) {
        s.off(event, callback);
      }
    };
  }, []);

  const off = useCallback((event: string) => {
    const s = socketService.getSocket();
    if (s) {
      s.off(event);
    }
  }, []);

  return <SocketContext.Provider value={{ socket, isConnected, emit, on, off }}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}

/**
 * Hook to subscribe to a socket event
 * Automatically cleans up on unmount
 */
export function useSocketEvent<T>(event: string, callback: (data: T) => void) {
  const { on } = useSocket();

  useEffect(() => {
    const unsubscribe = on<T>(event, callback);
    return unsubscribe;
  }, [event, callback, on]);
}
