export const endpoints = [
  {
    method: "POST",
    endpoint: "/api/messages/send",
    description: "Creates and dispatches a message from the source node.",
  },
  {
    method: "GET",
    endpoint: "/api/messages/history",
    description: "Returns previously transmitted messages.",
  },
  {
    method: "GET",
    endpoint: "/api/network/topology",
    description: "Returns the current node and link status.",
  },
  {
    method: "POST",
    endpoint: "/api/network/link",
    description: "Enable or disable a network connection.",
  },
];