import { useState } from 'react';
import './chatpanel.css';

function NodeSelector({ value, onChange }) {
  const nodes = [
    { id: "NODE_A", label: "Node A" },
    { id: "NODE_B", label: "Node B" },
    { id: "NODE_C", label: "Node C" },
  ];

  return (
    <div>
      <h4 className='active-node'>Active Node:</h4>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="selector-dropdown"
      >
        <option value="">--select a Node--</option>
        {nodes.map((n) => (
          <option key={n.id} value={n.id}>{n.label}</option>
        ))}
      </select>
    </div>
  );
}
export default NodeSelector;