import Card from "../ui/Card";

import usePacketAnimation from "../../hooks/usePacketAnimation";

import { NODES } from "../../data/graphData";

import Node from "../graph/Node";
import Edge from "../graph/Edge";
import Packet from "../graph/Packet";
import ControlPanel from "../graph/ControlPanel";
import StatusBox from "../graph/StatusBox";

export default function GraphPanel() {
const {
  packet,
  priority,
  setPriority,
  links,
  setLinks,
  sending,
  status,
  sendMessage,
  resumeDelivery,
} = usePacketAnimation();

  return (
    <Card className="p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[#7C8798]">
          Live Topology
        </h3>

        <span className="flex items-center gap-2 font-mono text-xs text-[#3ECF8E]">
          <span className="h-2 w-2 rounded-full bg-[#3ECF8E]" />
          Simulating
        </span>
      </div>

      {/* Graph */}

      <svg
        viewBox="0 0 400 160"
        className="w-full"
      >
        {/* Ghost */}

        <line
          x1={NODES.A.x}
          y1={NODES.A.y}
          x2={NODES.C.x}
          y2={NODES.C.y}
          stroke="#4A5361"
          strokeDasharray="4 4"
          opacity=".3"
        />

        {/* Active Links */}

        <Edge
          from={NODES.A}
          to={NODES.B}
          active={links.ab}
        />

        <Edge
          from={NODES.B}
          to={NODES.C}
          active={links.bc}
        />

        {/* Nodes */}

        <Node
          {...NODES.A}
          label="A"
        />

        <Node
          {...NODES.B}
          label="B"
        />

        <Node
          {...NODES.C}
          label="C"
        />

        {/* Packet */}

        <Packet
          packet={packet}
          priority={priority}
        />
      </svg>

      {/* Controls */}

<ControlPanel
  priority={priority}
  setPriority={setPriority}
  links={links}
  setLinks={setLinks}
  packet={packet}
  sending={sending}
  sendMessage={sendMessage}
  resumeDelivery={resumeDelivery}
/>

      {/* Status */}

      <StatusBox status={status} />
    </Card>
  );
}