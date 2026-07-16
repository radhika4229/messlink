import  { useState } from 'react';
import './chatpanel.css'
function NodeSelector () {
    let nodes = ["Node A" , "Node B", "Node C"]
    let [node, setNode] = useState("Select the Node")
    let handleNode = (e) => { setNode(e.target.node)}

    return (
        <div class = "node" >
            <h2>Active Node:</h2>
            <select onChange={handleNode}>
            <option value="Select a node" class="select-node">--select a Node--</option>
           {nodes.map(node => <option key={node}>{node}</option>)}
        </select>
        </div>
    )

}
export default NodeSelector;