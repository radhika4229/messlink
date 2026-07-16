import  { useState } from 'react';
import './chatpanel.css'
function NodeSelector () {
    let nodes = ["Node A" , "Node B", "Node C"]
    let [node, setNode] = useState("Select the Node")
    let handleNode = (e) => { setNode(e.target.value)}

    return (
        <div >
            <h4 className='active-node'>Active Node:</h4>
            <select onChange={handleNode}  className="selector-dropdown">
            <option value="Select a node" class="select-node">--select a Node--</option>
           {nodes.map(node => <option key={node} value={node}>{node}</option>)}
        </select>
        </div>
    )

}
export default NodeSelector;