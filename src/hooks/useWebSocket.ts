import { useCallback, useEffect, useRef } from 'react';

export const useWebSocket = () => {
  const url = process.env.WEB_SOCKET_URL ?? '';
  const socket = useRef<WebSocket | null>(null);

  const connectWebSocket = useCallback(() => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      return;
    }
    socket.current = new WebSocket(url);
  }, [url]);

  const disconnectWebSocket = useCallback(() => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.onmessage = null;
      socket.current.onopen = null;
      socket.current.onerror = null;
      socket.current.onclose = null;
      socket.current.close();
      socket.current = null;
    }
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      disconnectWebSocket();
    };
  }, [connectWebSocket, disconnectWebSocket]);

  return {
    socket,
  };
};
