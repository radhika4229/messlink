import { FaGithub, FaLinkedin } from "react-icons/fa";

import Badge from "../ui/Badge";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

import { team } from "../../data/team";

function TeamCard({
  name,
  role,
  description,
  github,
  linkedin,
}) {
  return (
    <Card className="group text-center transition-all duration-300 hover:-translate-y-2">

      {/* Avatar */}

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#3ECF8E] to-[#1F8A70] text-3xl font-bold text-[#0A0E14]">
        {name.charAt(0)}
      </div>

      <h3 className="mt-6 font-mono text-2xl font-bold text-white">
        {name}
      </h3>

      <Badge className="mt-4">
        {role}
      </Badge>

      <p className="mt-6 leading-7 text-[#94A3B8]">
        {description}
      </p>

      <div className="mt-8 flex justify-center gap-4">

        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-[#232B36] p-3 transition hover:border-[#3ECF8E] hover:text-[#3ECF8E]"
        >
          <FaGithub size={20} />
        </a>

        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-[#232B36] p-3 transition hover:border-[#3ECF8E] hover:text-[#3ECF8E]"
        >
          <FaLinkedin size={20} />
        </a>

      </div>

    </Card>
  );
}

export default function Team() {
  return (
    <section
      id="team"
      className="py-24"
    >
      <SectionTitle
        badge="Our Team"
        title="Meet the developers behind Pulse."
        description="A collaborative effort combining frontend engineering, backend systems, networking concepts, and distributed communication."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {team.map((member) => (
          <TeamCard
            key={member.name}
            {...member}
          />
        ))}

      </div>

      {/* Footer Note */}

      <div className="mt-16 rounded-2xl border border-[#232B36] bg-[#10151D] p-8 text-center">

        <h3 className="font-mono text-2xl font-bold text-white">
          Built for Software Track
        </h3>

        <p className="mx-auto mt-4 max-w-3xl leading-8 text-[#94A3B8]">
          Pulse demonstrates how decentralized communication can remain
          reliable even during network failures by combining distributed
          routing, message queueing, WebSockets, and secure message
          verification into a single interactive system.
        </p>

      </div>
    </section>
  );
}