export default function Packet({ packet, priority }) {
  if (!packet.visible) return null;

  return (
    <circle
      cx={packet.x}
      cy={packet.y}
      r={priority === "SOS" ? 6 : 5}
      fill={priority === "SOS" ? "#FFB020" : "#3ECF8E"}
    />
  );
}