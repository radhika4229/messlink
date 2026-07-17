import { useState, useEffect, useRef } from "react";


const VIEWBOX_W = 800;
const VIEWBOX_H = 320;

const NODE_POS = {
  NODE_A: { x: 120, y: 160 },
  NODE_B: { x: 400, y: 160 },
  NODE_C: { x: 680, y: 160 },
};

const NODE_LABEL = {
  NODE_A: "Node A",
  NODE_B: "Node B",
  NODE_C: "Node C",
};

const NODE_RADIUS = 34;
const HOP_DURATION_MS = 1500;

function midpoint(p1, p2) {
  return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function NetworkGraph({ connections, onToggleConnection, activeMessage }) {
  const [dotPos, setDotPos] = useState(null); // {x, y} or null when idle
  const [dotPriority, setDotPriority] = useState("NORMAL");
  const rafRef = useRef(null);
  const lastHopPathRef = useRef(null);

  // --- animate the message dot whenever activeMessage changes ---
  useEffect(() => {
    // cancel any animation in flight
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!activeMessage || !activeMessage.hopPath || activeMessage.hopPath.length < 2) {
      setDotPos(null);
      return;
    }

    // avoid re-triggering on identical re-renders with the same path
    const pathKey = activeMessage.hopPath.join(">") + "|" + activeMessage.priority;
    if (lastHopPathRef.current === pathKey) return;
    lastHopPathRef.current = pathKey;

    setDotPriority(activeMessage.priority === "SOS" ? "SOS" : "NORMAL");

    const path = activeMessage.hopPath;
    let hopIndex = 0;
    let hopStart = null;

    const step = (timestamp) => {
      if (hopStart === null) hopStart = timestamp;
      const from = NODE_POS[path[hopIndex]];
      const to = NODE_POS[path[hopIndex + 1]];

      if (!from || !to) {
        setDotPos(null);
        return;
      }

      const elapsed = timestamp - hopStart;
      const t = Math.min(elapsed / HOP_DURATION_MS, 1);

      setDotPos({ x: lerp(from.x, to.x, t), y: lerp(from.y, to.y, t) });

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else if (hopIndex + 2 < path.length) {
        hopIndex += 1;
        hopStart = null;
        rafRef.current = requestAnimationFrame(step);
      } else {
        // finished — leave the dot resting on the final node briefly, then clear
        setTimeout(() => setDotPos(null), 300);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [activeMessage]);

  const links = [
    { key: "a_b", from: "NODE_A", to: "NODE_B", connected: !!connections?.a_b },
    { key: "b_c", from: "NODE_B", to: "NODE_C", connected: !!connections?.b_c },
  ];

  return (
    <div className="w-full bg-zinc-950 rounded-2xl border border-zinc-800 p-6">
      <div className="relative w-full" style={{ aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}` }}>
        <svg
          viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
          className="absolute inset-0 w-full h-full"
        >
          {/* connection lines */}
          {links.map((link) => {
            const from = NODE_POS[link.from];
            const to = NODE_POS[link.to];
            return (
              <line
                key={link.key}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={link.connected ? "#22c55e" : "#ef4444"}
                strokeWidth={3}
                strokeDasharray={link.connected ? "0" : "8 6"}
                strokeLinecap="round"
              />
            );
          })}

          {/* nodes */}
          {Object.entries(NODE_POS).map(([id, pos]) => (
            <g key={id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={NODE_RADIUS}
                fill="#18181b"
                stroke="#52525b"
                strokeWidth={2}
              />
              <text
                x={pos.x}
                y={pos.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-zinc-200 font-mono"
                fontSize={16}
                fontWeight={600}
              >
                {id.split("_")[1]}
              </text>
              <text
                x={pos.x}
                y={pos.y + NODE_RADIUS + 22}
                textAnchor="middle"
                className="fill-zinc-400 font-mono"
                fontSize={13}
              >
                {NODE_LABEL[id]}
              </text>
            </g>
          ))}

          {/* animated message dot */}
          {dotPos && (
            <circle
              cx={dotPos.x}
              cy={dotPos.y}
              r={dotPriority === "SOS" ? 10 : 7}
              fill={dotPriority === "SOS" ? "#ef4444" : "#3b82f6"}
              stroke={dotPriority === "SOS" ? "#fca5a5" : "#93c5fd"}
              strokeWidth={2}
            />
          )}
        </svg>

        {/* toggle buttons, positioned to match SVG coordinates via percentage */}
        {links.map((link) => {
          const mid = midpoint(NODE_POS[link.from], NODE_POS[link.to]);
          const leftPct = (mid.x / VIEWBOX_W) * 100;
          const topPct = (mid.y / VIEWBOX_H) * 100;
          return (
            <button
              key={link.key}
              onClick={() =>
                onToggleConnection && onToggleConnection(link.from, link.to, !link.connected)
              }
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                transform: "translate(-50%, -50%)",
              }}
              className={`absolute rounded-full px-3 py-1 text-xs font-mono border transition-colors
                ${
                  link.connected
                    ? "bg-green-950 border-green-700 text-green-400 hover:bg-green-900"
                    : "bg-red-950 border-red-700 text-red-400 hover:bg-red-900"
                }`}
            >
              {link.connected ? "connected" : "disconnected"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
