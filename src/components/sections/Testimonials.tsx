import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { AvatarStack } from "@/components/ui/AvatarStack";
import { Reveal } from "@/components/ui/Reveal";

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="w-[340px] shrink-0 rounded-2xl border border-border bg-card p-6">
      <div className="flex text-primary">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed">
        "{t.quote}"
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <AvatarStack count={1} size={36} />
        <div>
          <p className="text-sm font-medium">{t.name}</p>
          <p className="text-xs text-muted">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const row = [...testimonials, ...testimonials]; // duplicate for seamless loop

  return (
    <section id="testimonials" className="overflow-hidden py-24">
      <Reveal className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-semibold md:text-5xl">
          Loved by <span className="text-primary">creators</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm text-muted">
          Designers, founders and agencies ship faster with Designly.
        </p>
      </Reveal>

      <div className="marquee mt-14 space-y-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-4 animate-marquee">
          {row.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
        <div
          className="flex w-max gap-4 animate-marquee [animation-direction:reverse]"
          style={{ "--duration": "55s" } as React.CSSProperties}
        >
          {row.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
