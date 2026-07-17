import { useState, useEffect } from "react";
import ChatPanel from "../components/chatPanel/ChatPanel";
import { NODE_CONFIG } from "../config/nodes";
import NetworkGraph from "../components/NetworkGraph";

const Dashboard = () => {
  const [connections, setConnections] = useState({ a_b: true, b_c: true });
  const [activeMessage, setActiveMessage] = useState(null);

  useEffect(() => {
    fetchMeshStatus().then(setConnections);
  }, []);

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

  async function fetchMeshStatus() {
    const urls = Object.values(NODE_CONFIG).map((n) => `${n.http}/api/node/status`);
    const responses = await Promise.all(
      urls.map((url) =>
        fetch(url).then((res) => res.json()).catch(() => null)
      ) 
    );
    let a_b = true, b_c = true;
    for (const res of responses) {
      if (!res) continue;
      if (res.nodeId === "NODE_A" && "NODE_B" in res.neighbors) a_b = res.neighbors.NODE_B;
      if (res.nodeId === "NODE_B" && "NODE_C" in res.neighbors) b_c = res.neighbors.NODE_C;
    }
    return { a_b, b_c };
  }

  return (
    <main>
      <section className="graph-section">
        <NetworkGraph
          connections={connections}
          onToggleConnection={handleToggle}
          activeMessage={activeMessage}
        />
      </section>
      <section className="chatPanel">
        <ChatPanel onMessageUpdate={setActiveMessage} />
      </section>
    </main>
  );
};

export default Dashboard;
