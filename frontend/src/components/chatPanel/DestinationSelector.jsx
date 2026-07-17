import { useState } from "react";
import "./chatpanel.css";

function DestinationSelector() {
    const nodes = ["Node A", "Node B", "Node C"];
    const [node, setNode] = useState("Select the Node");

    const handleNode = (e) => {
        setNode(e.target.value);
    };

    return (
        <div className="node">
            <h2 className="destination-node">Destination Node:</h2>

            <select onChange={handleNode} className="selector-dropdown">
                <option value="Select a node" className="select-node">
                    --select a Node--
                </option>

                {nodes.map((node) => (
                    <option key={node}>{node}</option>
                ))}
            </select>
        </div>
    );
}

export default DestinationSelector;