export const messageContract = {
  messageId: "uuid",
  sourceNode: "NODE_A",
  destinationNode: "NODE_C",
  priority: "NORMAL | SOS",
  timestamp: "2026-07-16T12:00:00Z",
  payload: {
    message: "Hello from Pulse",
  },
  signature: "HMAC_SHA256_SIGNATURE",
};