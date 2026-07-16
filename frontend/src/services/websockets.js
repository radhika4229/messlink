import { useState, useEffect, useRef, useCallback } from "react";
import { sendMessage as apiSendMessage } from "./api";

// Maps each node to its backend WebSocket port (from the team guide's architecture)
const NODE_PORT_MAP = {
  NODE_A: 8081,
  NODE_B: 8082,
  NODE_C: 8083,
};

const RECONNECT_DELAY_MS = 2000;
const MAX_RECONNECT_DELAY_MS = 10000;

/**
 * usePulseSocket
 * Connects to /ws/client/{nodeId} for the currently "acting as" node.
 * Keeps a live message log (deduped + updated in place by messageId),
 * auto-reconnects on drop, and exposes onMessageUpdate for the
 * network-graph component to hook into for hop animation.
 *
 * @param {string} nodeId - "NODE_A" | "NODE_B" | "NODE_C"
 * @param {(message: object) => void} [onMessageUpdate] - fired on every
 *        create/update so a sibling component (e.g. NetworkGraph) can react
 */
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

    const port = NODE_PORT_MAP[nodeId];
    if (!port) {
      console.error(`usePulseSocket: unknown nodeId "${nodeId}"`);
      return;
    }

    setConnectionStatus("connecting");
    const socket = new WebSocket(`ws://localhost:${port}/ws/client/${nodeId}`);
    socketRef.current = socket;

    socket.onopen = () => {
      setConnectionStatus("connected");
      reconnectAttemptRef.current = 0; // reset backoff on success
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
    setMessages([]); // clear log when switching "acting as" node
    connect();

    return () => {
      shouldReconnectRef.current = false;
      clearTimeout(reconnectTimerRef.current);
      socketRef.current?.close();
    };
  }, [connect]);

  // POST a new message to the backend (composer calls this on Send)
  const sendMessage = useCallback(
    async ({ receiverId, payload, priority }) => {
      const message = await apiSendMessage({
        senderId: nodeId,
        receiverId,
        payload,
        priority, // "NORMAL" | "SOS"
      });
      upsertMessage(message); // optimistic add; WS will confirm/update status
      return message;
    },
    [nodeId, upsertMessage]
  );

  return { messages, connectionStatus, sendMessage };
}