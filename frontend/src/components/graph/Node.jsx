export default function Node({
  x,
  y,
  label,
  port,
}) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r="24"
        className="fill-[#10151D] stroke-[#232B36]"
        strokeWidth="2"
      />

      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        className="fill-white text-[12px] font-bold"
      >
        {label}
      </text>

      <text
        x={x}
        y={y + 42}
        textAnchor="middle"
        className="fill-[#7C8798] text-[10px]"
      >
        {port}
      </text>
    </g>
  );
}