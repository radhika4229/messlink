export const modules = [
  {
    tag: "Routing",
    title: "Message Router",
    description:
      "Routes packets between neighboring nodes while determining the next hop toward the destination.",
  },
  {
    tag: "Deduplication",
    title: "Dedup Tracker",
    description:
      "Tracks processed message IDs to prevent routing loops and duplicate packet forwarding.",
  },
  {
    tag: "Resilience",
    title: "Store & Forward",
    description:
      "Temporarily stores packets whenever the next hop is unavailable and automatically retries delivery.",
  },
  {
    tag: "Topology",
    title: "Connection Manager",
    description:
      "Maintains active network links and allows live connect/disconnect simulations during the demo.",
  },
  {
    tag: "Security",
    title: "Signature Service",
    description:
      "Signs every outgoing packet and verifies incoming signatures before accepting or forwarding messages.",
  },
  {
    tag: "Priority",
    title: "SOS Handler",
    description:
      "Ensures emergency packets bypass normal traffic by giving them the highest delivery priority.",
  },
];