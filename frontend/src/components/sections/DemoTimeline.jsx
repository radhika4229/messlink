import Badge from "../ui/Badge";
import Card from "../ui/Card";
import SectionTitle from "../ui/SectionTitle";

import { timeline } from "../../data/timeline";

function TimelineCard({
  step,
  title,
  description,
  isLast,
}) {
  return (
    <div className="relative flex gap-6">

      {/* Left */}

      <div className="flex flex-col items-center">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3ECF8E] font-mono text-lg font-bold text-[#0A0E14]">
          {step}
        </div>

        {!isLast && (
          <div className="mt-2 h-full w-[2px] bg-[#232B36]" />
        )}
      </div>

      {/* Right */}

      <Card className="mb-8 flex-1">

        <Badge>Step {step}</Badge>

        <h3 className="mt-5 font-mono text-2xl font-bold text-white">
          {title}
        </h3>

        <p className="mt-5 leading-8 text-[#94A3B8]">
          {description}
        </p>

      </Card>

    </div>
  );
}

export default function DemoTimeline() {
  return (
    <section
      id="demo"
      className="py-24"
    >
      <SectionTitle
        badge="Demo Walkthrough"
        title="Follow the journey of a packet."
        description="This demonstration highlights how Messlink continues to deliver messages even when network connections temporarily fail."
      />

      <div className="mx-auto mt-16 max-w-5xl">

        {timeline.map((item, index) => (
          <TimelineCard
            key={item.step}
            {...item}
            isLast={index === timeline.length - 1}
          />
        ))}

      </div>

      {/* Summary */}

      <Card className="mt-12">

        <Badge>Expected Outcome</Badge>

        <p className="mt-6 leading-8 text-[#94A3B8]">
          During the demonstration, you'll observe live routing, packet
          queueing, automatic recovery after reconnection, and successful
          message delivery without relying on any centralized server.
        </p>

      </Card>
    </section>
  );
}