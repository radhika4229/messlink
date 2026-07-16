export const timeline = [
  {
    step: "01",
    title: "Initialize Network",
    description:
      "Three independent Spring Boot nodes establish WebSocket connections and exchange topology information.",
  },
  {
    step: "02",
    title: "Send Packet",
    description:
      "NODE A creates a signed message and forwards it to NODE B with the selected priority.",
  },
  {
    step: "03",
    title: "Simulate Failure",
    description:
      "Disconnect the B → C link to demonstrate queueing and store-and-forward behavior.",
  },
  {
    step: "04",
    title: "Restore Connection",
    description:
      "Reconnect the failed link. Queued packets automatically resume delivery.",
  },
  {
    step: "05",
    title: "Verify Delivery",
    description:
      "NODE C verifies the signature, confirms integrity, and marks the packet as delivered.",
  },
];