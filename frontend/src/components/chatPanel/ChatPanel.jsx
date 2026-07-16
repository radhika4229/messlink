import { useState } from "react";
import { usePulseSocket } from "../../services/websockets";
import DestinationSelector from "./DestinationSelector";
import MessageComposer from "./MessageComposer";
import NodeSelector from "./NodeSelector";
import PrioritySelector from "./PrioritySelector";
import MessageList from "./MessageList";

// accept onMessageUpdate so a sibling NetworkGraph can animate hops
function ChatPanel({ onMessageUpdate }) {
  const [activeNode, setActiveNode] = useState("");
  const [destination, setDestination] = useState("");
  const [priority, setPriority] = useState("NORMAL");
  const [sendError, setSendError] = useState(null);

  // messages + connectionStatus now come live from the backend,
  // not local state — the hook resets the log whenever activeNode changes
  const { messages, connectionStatus, sendMessage } = usePulseSocket(
    activeNode,
    onMessageUpdate
  );

  // MessageComposer manages its own text input and hands us the
  // final string on send (it clears its own field after calling this)
  const handleSend = async (messageText) => {
    if (!messageText.trim() || !activeNode || !destination) {
      return;
    }

    setSendError(null);
    try {
      await sendMessage({
        receiverId: destination,
        payload: messageText,
        priority,
      });
    } catch (err) {
      console.error("Send failed:", err);
      setSendError("Message failed to send — check backend connection.");
    }
  };

  return (
    <div>
      <div className="chat-panel-header">
        <h3 className="chat-panel-title">Send Message</h3>
       
      </div>

      <div className="node-selection">
        <section className="nodeselector">
          <NodeSelector value={activeNode} onChange={setActiveNode} />
        </section>

        <section className="destinationselector">
          <DestinationSelector
            value={destination}
            onChange={setDestination}
            activeNode={activeNode}
          />
        </section>
      </div>

      <PrioritySelector priority={priority} onPriorityChange={setPriority} />

      <MessageComposer
        onSend={handleSend}
        disabled={connectionStatus !== "connected" || !activeNode || !destination}
      />

      {sendError && <p className="send-error">{sendError}</p>}

      <MessageList messages={messages} />
    </div>
  );
}

export default ChatPanel;