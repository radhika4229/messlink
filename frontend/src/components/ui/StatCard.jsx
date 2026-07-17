import Card from "./Card";

export default function StatCard({
  value,
  label,
}) {
  return (
    <Card className="text-center">

      <h2 className="font-mono text-5xl font-bold text-[#3ECF8E]">
        {value}
      </h2>

      <p className="mt-3 text-[#7C8798]">
        {label}
      </p>

    </Card>
  );
}