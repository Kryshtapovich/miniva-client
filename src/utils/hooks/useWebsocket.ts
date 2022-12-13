import { useRef } from 'react';

export const useWebSocket = () => {
  const wsRef = useRef<WebSocket | null>(null);

  const connect = <T>(url: string, onMessage: (data: T) => void) => {
    wsRef.current = new WebSocket(url);

    wsRef.current.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      onMessage(message);
    };
  };

  const disconnect = () => {
    wsRef.current?.close();
  };

  const send = <T>(data: T) => {
    const message = JSON.stringify(data);
    wsRef.current?.send(message);
  };

  return { connect, disconnect, send };
};
