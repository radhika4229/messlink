import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

const navItems = [
  {
    label: "Architecture",
    href: "#architecture",
  },
  {
    label: "Modules",
    href: "#modules",
  },
  {
    label: "Message Contract",
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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1A2029] bg-[#0A0E14]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <a
          href="/"
          className="flex items-center gap-3"
        >
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-[#3ECF8E]" />
            <span className="h-2 w-2 rounded-full bg-[#3ECF8E]" />
            <span className="h-2 w-2 rounded-full bg-[#4A5361]" />
          </div>

          <span className="font-mono text-xl font-bold text-white">
            PULSE
          </span>
        </a>

        {/* Desktop */}

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-mono text-sm text-[#7C8798] transition hover:text-white"
            >
              {item.label}
            </a>
          ))}

          <Button>
            GitHub
          </Button>
        </nav>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="text-white lg:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <nav className="border-t border-[#232B36] bg-[#10151D] lg:hidden">

          <div className="space-y-6 p-6">

            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block font-mono text-sm text-[#7C8798]"
              >
                {item.label}
              </a>
            ))}

            <Button className="w-full">
              GitHub
            </Button>

          </div>

        </nav>
      )}
    </header>
  );
}