import { ArrowRight } from "lucide-react";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import StatCard from "../ui/StatCard";
import GraphPanel from "./GraphPanel";

const stats = [
  {
    value: "3",
    label: "Independent Nodes",
  },
  {
    value: "2",
    label: "Live WebSocket Links",
  },
  {
    value: "0",
    label: "Central Servers",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 lg:min-h-[calc(100vh-64px)] lg:py-28">
      {/* Background Glow */}

      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-[#3ECF8E]/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left */}

        <div>
          <Badge>Software Track • First Contact</Badge>

          <h1 className="mt-6 font-mono text-5xl font-bold leading-tight text-white md:text-6xl xl:text-7xl">
            Building a
            <span className="text-[#3ECF8E]"> Resilient </span>
            Mesh Network
            <br />
            without a
            <br />
            Central Server.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#94A3B8]">
            Pulse demonstrates peer-to-peer communication using three
            independent Spring Boot nodes connected through WebSockets.
            Messages automatically relay, queue, recover after failures,
            and verify authenticity using digital signatures.
          </p>

          {/* CTA */}

          <div className="mt-10 flex flex-wrap gap-4">
            <Button>
              Live Demo
              <ArrowRight className="ml-2 inline h-4 w-4" />
            </Button>

            <Button variant="secondary">
              View Architecture
            </Button>
          </div>

          {/* Features */}

          <div className="mt-12 flex flex-wrap gap-3">
            {[
              "WebSockets",
              "Spring Boot",
              "Store & Forward",
              "HMAC Signatures",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[#232B36] bg-[#10151D] px-4 py-2 text-sm text-[#94A3B8]"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Stats */}

          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {stats.map((item) => (
              <StatCard
                key={item.label}
                value={item.value}
                label={item.label}
              />
            ))}
          </div>
        </div>

        {/* Right */}

        <GraphPanel />
      </div>
    </section>
  );
}