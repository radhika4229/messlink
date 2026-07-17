export default function Edge({
  from,
  to,
  active,
}) {
  return (
    <line
      x1={from.x}
      y1={from.y}
      x2={to.x}
      y2={to.y}
      stroke={active ? "#3ECF8E" : "#FF5C5C"}
      strokeWidth="3"
      strokeDasharray={active ? "0" : "8 6"}
    />
  );
}