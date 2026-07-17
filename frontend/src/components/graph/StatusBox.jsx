import Card from "../ui/Card";

export default function StatusBox({
  status,
}) {
  return (
    <Card className="mt-5">

      <h3 className="mb-3 font-mono text-sm text-white">
        Live Status
      </h3>

      <p className="font-mono text-sm text-[#7C8798]">
        {status}
      </p>

    </Card>
  );
}