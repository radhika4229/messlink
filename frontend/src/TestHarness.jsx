import { useEffect, useState } from "react";
import NetworkGraph from "./components/NetworkGraph";
import { NODE_CONFIG } from "./config/nodes";

export default function TestHarness() {
  const [connections, setConnections] = useState({ a_b: true, b_c: true });
  const [activeMessage, setActiveMessage] = useState(null);

  const handleToggle = (nodeA, nodeB, connected) => {
    const base = NODE_CONFIG[nodeA].http;
    fetch(`${base}/api/node/toggle-connection`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ neighborId: nodeB, connected }),
    })
      .then(() => fetchMeshStatus())
      .then(setConnections)
      .catch((err) => console.error("Toggle failed:", err));
  };

  const sendMessage = (priority) => {
    setActiveMessage({ hopPath: ["NODE_A", "NODE_B", "NODE_C"], priority });
  };

  async function fetchMeshStatus() {
    const urls = Object.values(NODE_CONFIG).map(
      (n) => `${n.http}/api/node/status`,
    );

    const responses = await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((res) => res.json())
          .catch((err) => {
            console.error(`Failed to reach ${url}:`, err);
            return null; // one node being down shouldn't crash the whole fetch
          }),
      ),
    );

    // responses is an array of { nodeId, neighbors } from each node, or null if it failed
    let a_b = true;
    let b_c = true;

    for (const res of responses) {
      if (!res) continue;
      if (res.nodeId === "NODE_A" && "NODE_B" in res.neighbors) {
        a_b = res.neighbors.NODE_B;
      }
      if (res.nodeId === "NODE_B" && "NODE_C" in res.neighbors) {
        b_c = res.neighbors.NODE_C;
      }
    }

    return { a_b, b_c };
  }

  useEffect(() => {
    fetchMeshStatus().then(setConnections);
  }, []);

  return (
    <div style={{ padding: 40, background: "#09090b" }}>
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
