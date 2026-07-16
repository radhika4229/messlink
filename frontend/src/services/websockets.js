import { useState, useEffect, useRef, useCallback } from "react";
import { sendMessage as apiSendMessage } from "./api";


const NODE_URL_MAP = {
  NODE_A: "messlink-node-a.onrender.com",
  NODE_B: "messlink-node-b.onrender.com",
  NODE_C: "messlink-node-c.onrender.com",
};

const RECONNECT_DELAY_MS = 2000;
const MAX_RECONNECT_DELAY_MS = 10000;


export function usePulseSocket(nodeId, onMessageUpdate) {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("disconnected"); // "connecting" | "connected" | "disconnected"

  const socketRef = useRef(null);
  const reconnectAttemptRef = useRef(0);
  const reconnectTimerRef = useRef(null);
  const shouldReconnectRef = useRef(true);
  const onMessageUpdateRef = useRef(onMessageUpdate);

  // keep the latest callback without retriggering the connect effect
  useEffect(() => {
    onMessageUpdateRef.current = onMessageUpdate;
  }, [onMessageUpdate]);

  const upsertMessage = useCallback((incoming) => {
    setMessages((prev) => {
      const idx = prev.findIndex((m) => m.messageId === incoming.messageId);
      if (idx === -1) {
        return [incoming, ...prev];
      }
      const next = [...prev];
      next[idx] = { ...next[idx], ...incoming };
      return next;
    });
    onMessageUpdateRef.current?.(incoming);
  }, []);

  const connect = useCallback(() => {
    if (!nodeId) return;
    const host = NODE_URL_MAP[nodeId];
    if (!host) {
      console.error(`usePulseSocket: unknown nodeId "${nodeId}"`);
      return;
    }

    setConnectionStatus("connecting");
    const socket = new WebSocket(`wss://${host}/ws/client/${nodeId}`);


    socket.onopen = () => {
      setConnectionStatus("connected");
      reconnectAttemptRef.current = 0;
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        upsertMessage(data);
      } catch (err) {
        console.error("usePulseSocket: failed to parse incoming message", err);
      }
    };

    socket.onerror = (err) => {
      console.error(`usePulseSocket: socket error on ${nodeId}`, err);
    };

    socket.onclose = () => {
      setConnectionStatus("disconnected");
      socketRef.current = null;
      if (shouldReconnectRef.current) {
        const delay = Math.min(
          RECONNECT_DELAY_MS * 2 ** reconnectAttemptRef.current,
          MAX_RECONNECT_DELAY_MS
        );
        reconnectAttemptRef.current += 1;
        reconnectTimerRef.current = setTimeout(connect, delay);
      }
    };
  }, [nodeId, upsertMessage]);

  useEffect(() => {
    shouldReconnectRef.current = true;
    setMessages([]);
    connect();

    return () => {
      shouldReconnectRef.current = false;
      clearTimeout(reconnectTimerRef.current);
      socketRef.current?.close();
    };
  }, [connect]);


  const sendMessage = useCallback(
    async ({ receiverId, payload, priority }) => {
      const message = await apiSendMessage({
        senderId: nodeId,
        receiverId,
        payload,
        priority,
      });
      upsertMessage(message);
      return message;
    },
    [nodeId, upsertMessage]
  );

  return { messages, connectionStatus, sendMessage };
}