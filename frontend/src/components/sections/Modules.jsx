import Badge from "../ui/Badge";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

import { modules } from "../../data/modules";

function ModuleCard({
  tag,
  title,
  description,
}) {
  return (
    <Card className="group">

      <Badge>{tag}</Badge>

      <h3 className="mt-6 font-mono text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#3ECF8E]">
        {title}
      </h3>

      <p className="mt-5 leading-8 text-[#94A3B8]">
        {description}
      </p>

    </Card>
  );
}

export default function Modules() {
  return (
    <section
      id="modules"
      className="py-24"
    >
      <SectionTitle
        badge="Backend Engine"
        title="Six independent modules powering Messlink."
        description="Each backend responsibility is isolated into its own module, making the routing engine easier to understand, maintain, and extend."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {modules.map((module) => (
          <ModuleCard
            key={module.title}
            {...module}
          />
        ))}

      </div>

      {/* Summary */}

      <Card className="mt-14">

        <Badge>Design Philosophy</Badge>

        <h3 className="mt-6 font-mono text-2xl font-bold text-white">
          Why separate every responsibility?
        </h3>

        <p className="mt-6 leading-8 text-[#94A3B8]">
          Routing, security, queue management, topology updates,
          deduplication, and priority handling are completely isolated.
          This modular design makes the application easier to debug,
          simpler to extend, and allows each feature to evolve
          independently without affecting the rest of the system.
        </p>

      </Card>
    </section>
  );
}