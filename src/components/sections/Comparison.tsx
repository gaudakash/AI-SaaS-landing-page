import { Check, Minus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

type Cell = boolean | string;
const rows: { feature: string; free: Cell; pro: Cell; team: Cell }[] = [
  {
    feature: "Design generations",
    free: "20 / mo",
    pro: "Unlimited",
    team: "Unlimited",
  },
  {
    feature: "Export resolution",
    free: "Low-res",
    pro: "4K",
    team: "4K + vector",
  },
  { feature: "Custom themes", free: false, pro: true, team: true },
  { feature: "Enigma AI model", free: false, pro: true, team: true },
  { feature: "Shared workspace", free: false, pro: false, team: true },
  { feature: "Team seats", free: "1", pro: "1", team: "Up to 10" },
  { feature: "Priority support", free: false, pro: false, team: true },
  { feature: "API access", free: false, pro: "Read", team: "Full" },
];

function Val({ v }: { v: Cell }) {
  if (v === true) return <Check size={18} className="mx-auto text-primary" />;
  if (v === false) return <Minus size={18} className="mx-auto text-muted/50" />;
  return <span className="text-sm">{v}</span>;
}

export function Comparison() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <Reveal>
        <h3 className="text-center text-2xl font-semibold">Compare plans</h3>
        <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[560px] text-center">
            <thead className="bg-card text-sm">
              <tr>
                <th className="p-4 text-left font-medium">Feature</th>
                <th className="p-4 font-medium">Free</th>
                <th className="p-4 font-medium text-primary">Pro</th>
                <th className="p-4 font-medium">Team</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.feature} className="hover:bg-card/60">
                  <td className="p-4 text-left text-sm">{r.feature}</td>
                  <td className="p-4">
                    <Val v={r.free} />
                  </td>
                  <td className="bg-primary/5 p-4">
                    <Val v={r.pro} />
                  </td>
                  <td className="p-4">
                    <Val v={r.team} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}
