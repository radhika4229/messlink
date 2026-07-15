import { useState } from "react";
import NetworkGraph from "./components/NetworkGraph";

export default function TestHarness() {
  const [connections, setConnections] = useState({ a_b: true, b_c: true });
  const [activeMessage, setActiveMessage] = useState(null);

  const handleToggle = (nodeA, nodeB, connected) => {
    const key = nodeA === "NODE_A" ? "a_b" : "b_c";
    setConnections((prev) => ({ ...prev, [key]: connected }));
  };

  const sendMessage = (priority) => {
    setActiveMessage({ hopPath: ["NODE_A", "NODE_B", "NODE_C"], priority });
  };

  return (
    <div style={{ padding: 40, background: "#09090b", minHeight: "100vh" }}>
      <NetworkGraph
        connections={connections}
        onToggleConnection={handleToggle}
        activeMessage={activeMessage}
      />
      <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
        <button onClick={() => sendMessage("NORMAL")}>Send NORMAL A→C</button>
        <button onClick={() => sendMessage("SOS")}>Send SOS A→C</button>
      </div>
    </div>
  );
}