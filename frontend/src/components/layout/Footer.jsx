import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail, ArrowUp } from "lucide-react";

const quickLinks = [
  {
    label: "Architecture",
    href: "#architecture",
  },
  {
    label: "Modules",
    href: "#modules",
  },
  {
    label: "API Contract",
    href: "#contract",
  },
  {
    label: "Team",
    href: "#team",
  },
  {
    label: "Demo",
    href: "#demo",
  },
];

const technologies = [
  "React",
  "Vite",
  "Tailwind CSS",
  "Spring Boot",
  "WebSocket",
  "Java",
];

export default function Footer() {
  return (
    <footer className="border-t border-[#232B36] bg-[#0A0E14]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Brand */}

          <div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#3ECF8E]" />
                <span className="h-2 w-2 rounded-full bg-[#3ECF8E]" />
                <span className="h-2 w-2 rounded-full bg-[#4A5361]" />
              </div>

              <h2 className="font-mono text-2xl font-bold text-white">
                Messlink
              </h2>
            </div>

            <p className="mt-6 max-w-sm leading-8 text-[#94A3B8]">
              Messlink demonstrates resilient peer-to-peer communication
              using distributed Spring Boot services connected through
              WebSockets.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#232B36] p-3 transition hover:border-[#3ECF8E] hover:text-[#3ECF8E]"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-[#232B36] p-3 transition hover:border-[#3ECF8E] hover:text-[#3ECF8E]"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="mailto:example@email.com"
                className="rounded-lg border border-[#232B36] p-3 transition hover:border-[#3ECF8E] hover:text-[#3ECF8E]"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="font-mono text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="mt-6 space-y-4">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-[#94A3B8] transition hover:text-[#3ECF8E]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}

          <div>
            <h3 className="font-mono text-lg font-bold text-white">
              Tech Stack
            </h3>

            <div className="mt-6 flex flex-wrap gap-3">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#232B36] bg-[#10151D] px-4 py-2 text-sm text-[#94A3B8]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="mt-10 inline-flex items-center gap-2 rounded-lg bg-[#3ECF8E] px-5 py-3 font-mono font-semibold text-[#0A0E14] transition hover:scale-105"
            >
              Back to Top
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#232B36] pt-8 text-sm text-[#6B7280] md:flex-row">
          <p>© 2026 Messlink. All rights reserved.</p>

          <p>
            Built with ❤️ using React, Tailwind CSS & Spring Boot.
          </p>
        </div>
      </div>
    </footer>
  );
}