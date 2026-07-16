import Card from "../ui/Card";
import Badge from "../ui/Badge";
import SectionTitle from "../ui/SectionTitle";

import { whyMesh } from "../../data/whyMesh";

export default function WhyMesh() {
  return (
    <section
      id="why"
      className="py-24"
    >
      <SectionTitle
        badge="Why Mesh?"
        title="Built for resilience instead of convenience."
        description="Traditional client-server systems stop working when the server fails. Messlink demonstrates how decentralized communication continues even when network links are interrupted."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {whyMesh.map((item) => (
          <Card key={item.title}>
            <Badge>{item.title}</Badge>

            <p className="mt-6 leading-8 text-[#94A3B8]">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}