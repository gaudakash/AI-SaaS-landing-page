import { Counter } from "@/components/ui/Counter";

const stats = [
  { label: "Clients", value: 120, suffix: "K+" },
  { label: "Projects", value: 150, suffix: "+" },
  { label: "5-Star Reviews", value: 32, suffix: "K+" },
];

export function Stats() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} className="py-12 text-center">
            <p className="text-sm text-primary">{s.label}</p>
            <p className="mt-2 text-4xl font-semibold">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}