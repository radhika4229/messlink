import { useState } from "react";
import "./chatpanel.css";

function PrioritySelector() {

    const [priority, setPriority] = useState("NORMAL");

    return (
        <div className="priority-container">

            <label className="priority-label">
                Priority
            </label>

            <div className="priority-buttons">

                <button
                    className={`priority-btn ${
                        priority === "NORMAL" ? "active-normal" : ""
                    }`}
                    onClick={() => setPriority("NORMAL")}
                >
                    📩 NORMAL
                </button>

                <button
                    className={`priority-btn ${
                        priority === "SOS" ? "active-sos" : ""
                    }`}
                    onClick={() => setPriority("SOS")}
                >
                    🚨 SOS
                </button>

            </div>

        </div>
    );
}

export default PrioritySelector;