export const architecture = [
  {
    node: "NODE A",
    port: ":8081",
    role: "Origin Node",
    description:
      "Creates signed packets and forwards them to the next available neighbour.",
  },
  {
    node: "NODE B",
    port: ":8082",
    role: "Relay Node",
    description:
      "Acts as the intermediary router while handling queueing and forwarding.",
  },
  {
    node: "NODE C",
    port: ":8083",
    role: "Destination",
    description:
      "Receives packets after signature verification and displays delivery status.",
  },
];