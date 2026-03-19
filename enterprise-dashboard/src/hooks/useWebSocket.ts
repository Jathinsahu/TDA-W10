import { useEffect, useState, useCallback, useRef } from 'react';

interface WebSocketOptions {
  onOpen?: () => void;
  onClose?: () => void;
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  reconnectInterval?: number;
  maxReconnectAttempts?: number;
}

export const useWebSocket = (url: string, options: WebSocketOptions = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    try {
      // Simulate WebSocket connection for demo purposes
      console.log('Connecting to WebSocket:', url);
      
      // Mock successful connection
      setTimeout(() => {
        setIsConnected(true);
        options.onOpen?.();
        
        // Simulate real-time data updates
        const interval = setInterval(() => {
          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            const mockData = {
              type: 'update',
              timestamp: new Date().toISOString(),
              value: Math.random() * 100,
            };
            wsRef.current.onmessage?.({ data: JSON.stringify(mockData) } as MessageEvent);
          }
        }, 5000);

        wsRef.current = {
          readyState: WebSocket.OPEN,
          send: (data: string) => console.log('Sending:', data),
          close: () => {
            clearInterval(interval);
            setIsConnected(false);
          },
        } as any;
      }, 1000);
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setIsConnected(false);
      options.onError?.(error as Event);
    }
  }, [url, options]);

  useEffect(() => {
    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  const send = useCallback((message: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket is not connected');
    }
  }, []);

  return { isConnected, send };
};
