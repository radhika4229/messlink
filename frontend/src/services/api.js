const NODE_URL_MAP = {
  NODE_A: "https://messlink-node-a.onrender.com",
  NODE_B: "https://messlink-node-b.onrender.com",
  NODE_C: "https://messlink-node-c.onrender.com",
};

async function request(nodeId, path, options = {}) {
  const base = NODE_URL_MAP[nodeId];

  if (!base) {
    throw new Error(`Unknown nodeId "${nodeId}" — no backend URL mapped`);
  }

  const res = await fetch(`${base}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
        `${options.method || "GET"} ${path} failed: ${res.status} ${body}`
    );
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export function sendMessage(message) {
  return request(message.senderId, "/api/message/send", {
    method: "POST",
    body: JSON.stringify(message),
  });
}

export function getMessageLog(nodeId) {
  return request(nodeId, `/api/message/log/${nodeId}`);
}

export function toggleConnection(nodeId, nodeA, nodeB, connected) {
  return request(nodeId, "/api/node/toggle-connection", {
    method: "POST",
    body: JSON.stringify({ nodeA, nodeB, connected }),
  });
}

export function getNodeStatus(nodeId) {
  return request(nodeId, "/api/node/status");
}