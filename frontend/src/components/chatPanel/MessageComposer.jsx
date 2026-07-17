import { useState } from "react";
import "./chatpanel.css";

function MessageComposer({ onSend, disabled = false }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;

    onSend(message);

    setMessage("");
  };

  const handleKeyDown = (e) => {
    // Enter to send, Shift+Enter for a new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-composer">
      <label className="composer-label">Message</label>

      <textarea
        className="message-input"
        placeholder={disabled ? "Waiting for connection..." : "Type your message..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      <button
        className="send-btn"
        onClick={handleSend}
        disabled={disabled || message.trim() === ""}
      >
        Send Message
      </button>
    </div>
  );
}

export default MessageComposer;