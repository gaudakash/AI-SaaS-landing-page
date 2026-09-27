import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { Counter } from "@/components/ui/Counter";
import { cn } from "@/lib/utils";

const milestones = [
  { value: 2014, label: "Year of establishment", sub: "More than 10 years in the field", raw: true },
  { value: 304, label: "Projects are launched", sub: "A lot of projects are done" },
  { value: 189, label: "Clients are satisfied", sub: "These people love us" },
  { value: 12, label: "Projects in work", sub: "What we do right now" },
];

export function Timeline() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      {/* intro */}
      <Reveal className="mb-20 flex max-w-3xl gap-8">
        <span className="pt-1 text-xs text-muted">2025</span>
        <p className="text-lg font-medium leading-relaxed md:text-xl">
          Whether you're designing for personal projects, creative teams, or large-scale
          campaigns, our AI-powered platform is built to bring your ideas to life—quickly,
          beautifully, and intelligently. And the results? The numbers speak for themselves:
        </p>
      </Reveal>

      {/* milestones */}
      <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
        {milestones.map((m, i) => (
          <Reveal key={m.label} delay={i * 0.1} className={cn(i % 2 === 1 && "md:mt-20")}>
            <p className="text-5xl font-semibold">
              {m.raw ? m.value : <Counter to={m.value} />}
            </p>
            <p className="mt-2 font-medium">{m.label}</p>
            <p className="text-xs text-muted">{m.sub}</p>

            <div className="mt-4 flex items-center gap-3">
              <AvatarStack count={3} />
              <span className="h-px flex-1 bg-border" />
              <span className="h-4 w-px bg-border" />
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <Reveal className="mt-16 flex items-center justify-center gap-6">
        <Link
          href="#pricing"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(255,90,31,.35)] transition hover:scale-105"
        >
          Get Started <ArrowRight size={16} />
        </Link>
        <span className="flex items-center gap-2 text-xs text-muted">
          Slots are available
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
        </span>
      </Reveal>
    </section>
  );
}