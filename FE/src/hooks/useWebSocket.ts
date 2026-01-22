import { useEffect, useRef } from "react";

export const useWebSocket = (
  handlers: Record<string, (payload: any) => void>,
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const handleRef = useRef(handlers);

  useEffect(() => {
    handleRef.current = handlers;
  }, [handlers]);

  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:3000");

    wsRef.current.onmessage = (e) => {
      const msg = JSON.parse(e.data);
      handlers[msg.type]?.(msg.payload);
    };

    return () => wsRef.current?.close();
  }, []);

  const send = (type: string, payload: any) =>
    wsRef.current?.readyState === WebSocket.OPEN &&
    wsRef.current.send(JSON.stringify({ type, payload }));

  return { send };
};
