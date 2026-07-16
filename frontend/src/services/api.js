// Centralized REST calls to the Pulse backend.
// Keeping these separate from websocket.js — that file owns the live
// /ws/client/{nodeId} connection, this one owns plain request/response calls.

const BASE_URL = ""; // same-origin in dev via proxy; set to deployed backend URL in prod

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${options.method || "GET"} ${path} failed: ${res.status} ${body}`);
  }

  // toggle-connection etc. may return 204 No Content
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

/**
 * Send a new message. Used by ChatPanel's composer.
 * @param {{senderId: string, receiverId: string, payload: string, priority: "NORMAL"|"SOS"}} message
 */
export function sendMessage(message) {
  return request("/api/message/send", {
    method: "POST",
    body: JSON.stringify(message),
  });
}

/**
 * Fetch message history for a given node. Useful on initial mount,
 * before the WebSocket has pushed anything yet.
 * @param {string} nodeId
 */
export function getMessageLog(nodeId) {
  return request(`/api/message/log/${nodeId}`);
}

/**
 * Manually connect/disconnect a link between two nodes — used by the
 * NetworkGraph toggle buttons to simulate connection loss for the demo.
 * @param {string} nodeA
 * @param {string} nodeB
 * @param {boolean} connected
 */
export function toggleConnection(nodeA, nodeB, connected) {
  return request("/api/node/toggle-connection", {
    method: "POST",
    body: JSON.stringify({ nodeA, nodeB, connected }),
  });
}

/**
 * Fetch current status of all nodes and which links are up/down.
 * Used by NetworkGraph on initial mount to draw solid/dashed lines
 * before any toggle happens.
 */
export function getNodeStatus() {
  return request("/api/node/status");
}