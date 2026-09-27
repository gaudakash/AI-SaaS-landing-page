import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-12 text-center md:p-20">
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary/30 blur-[100px]" />
          <h2 className="relative text-4xl font-semibold md:text-5xl">Ready to Design Smarter?</h2>
          <p className="relative mx-auto mt-4 max-w-md text-sm text-muted">
            Whether you're a freelancer, a team, or a growing agency—our tools adapt to your workflow. Design faster. Deliver better.
          </p>
          <Link href="#pricing" className="relative mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 font-medium text-white">
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}