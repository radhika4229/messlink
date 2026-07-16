import Card from "../ui/Card";
import Badge from "../ui/Badge";
import SectionTitle from "../ui/SectionTitle";

import { architecture } from "../../data/architecture";

function ArchitectureCard({
  node,
  port,
  role,
  description,
}) {
  return (
    <Card>

      <Badge>{node}</Badge>

      <h3 className="mt-5 font-mono text-2xl font-bold text-white">
        {port}
      </h3>

      <p className="mt-2 font-mono text-[#3ECF8E]">
        {role}
      </p>

      <p className="mt-5 leading-8 text-[#94A3B8]">
        {description}
      </p>

    </Card>
  );
}

export default function Architecture() {
  return (
    <section
      id="architecture"
      className="py-24"
    >
      <SectionTitle
        badge="Architecture"
        title="Three independent services working together."
        description="Each Spring Boot instance behaves as an independent node. Instead of communicating through a central server, nodes exchange messages directly using persistent WebSocket connections."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        {architecture.map((item) => (
          <ArchitectureCard
            key={item.node}
            {...item}
          />
        ))}
      </div>

      {/* Communication Flow */}

      <Card className="mt-12">

        <Badge>Packet Flow</Badge>

        <div className="mt-8 flex flex-col items-center gap-4 text-center md:flex-row md:justify-center">

          <div className="rounded-lg border border-[#232B36] px-5 py-3 font-mono text-white">
            NODE A
          </div>

          <span className="text-2xl text-[#3ECF8E]">→</span>

          <div className="rounded-lg border border-[#232B36] px-5 py-3 font-mono text-white">
            NODE B
          </div>

          <span className="text-2xl text-[#3ECF8E]">→</span>

          <div className="rounded-lg border border-[#232B36] px-5 py-3 font-mono text-white">
            NODE C
          </div>

        </div>

        <p className="mt-8 text-center leading-8 text-[#94A3B8]">
          Messages always travel through neighbouring nodes. If a link
          fails, packets are queued and automatically forwarded once the
          network is restored.
        </p>

      </Card>
    </section>
  );
}