import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "../ui/SpotlightCard";

const features = [
  {
    title: "Instant Ideation",
    desc: "Skip the blank canvas and spark creativity instantly. Our AI generates high-quality, on-brand design concepts within seconds.",
    span: "md:col-span-2",
    glow: true,
  },
  {
    title: "Smart Adaptability",
    desc: "No two creators are the same, and neither are their styles. Our AI learns from your inputs and fine-tunes every design.",
    span: "md:col-span-3",
  },
  {
    title: "Multi-Format Export",
    desc: "Design once, export anywhere. High-res graphics for print, responsive visuals for the web, mobile-optimized assets.",
    span: "md:col-span-3",
  },
  {
    title: "Seamless Revisions",
    desc: "Say goodbye to repetitive tweaks and endless back-and-forths. With intuitive prompt-based editing.",
    span: "md:col-span-2",
    glow: true,
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-semibold md:text-5xl">
            Designed for Designers.
            <br />
            Powered by <span className="text-primary">AI</span>.
          </h2>
          <p className="mt-4 max-w-md text-sm text-muted">
            Unlock the full potential of your creativity with our AI-powered
            design assistant.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-5">
        {features.map((f, i) => (
          <Reveal
            key={f.title}
            delay={+(i * 0.1).toFixed(2)}
            className={f.span}
          >
            <SpotlightCard
              className={cn(
                "h-full",
                f.glow && "bg-gradient-to-br from-card via-card to-primary/30",
              )}
            >
              <div className="flex h-full flex-col justify-between p-6">
                <div className="flex items-start justify-between gap-4">
                  <p className="max-w-sm text-sm text-muted">{f.desc}</p>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-white transition group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
                <h3 className="mt-8 text-2xl font-medium">{f.title}</h3>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
