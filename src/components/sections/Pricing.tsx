"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  monthly: number;
  yearly: number;
  desc: string;
  features: string[];
  popular?: boolean;
  prices?: { monthly?: string; yearly?: string };
};

const plans: Plan[] = [
  {
    name: "Free",
    monthly: 0,
    yearly: 0,
    desc: "Everything you need to supercharge your productivity.",
    features: [
      "20 design generations/month",
      "Low-res downloads",
      "Basic style presets",
      "Limited customization options",
    ],
  },
  {
    name: "Pro",
    monthly: 17,
    yearly: 14,
    popular: true,
    desc: "Unlock a new level of your personal productivity.",
    features: [
      "Everything in Free",
      "Enigma AI",
      "Unlimited design generations",
      "Custom Themes",
      "High-resolution exports",
      "Custom Extensions",
      "Developer Tools",
    ],
    prices: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_MONTHLY,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO_YEARLY,
    },
  },
  {
    name: "Team",
    monthly: 37,
    yearly: 30,
    desc: "Everything you need to supercharge your productivity.",
    features: [
      "Everything in Free",
      "Unlimited Shared Commands",
      "Unlimited Shared Quicklinks",
      "Priority support",
    ],
    prices: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_MONTHLY,
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRICE_TEAM_YEARLY,
    },
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  async function checkout(plan: Plan) {
    const priceId = plan.prices?.[yearly ? "yearly" : "monthly"];

    if (!priceId) {
      toast.info(
        plan.name === "Free"
          ? "Free plan — no checkout needed. Sign up to get started!"
          : "Checkout is disabled in this demo.",
      );
      return;
    }

    setLoading(plan.name);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else toast.error(data.error ?? "Checkout unavailable in demo");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(null);
    }
  }

  return (
    <section id="pricing" className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="glow pointer-events-none absolute inset-0" />

      {/* heading + toggle */}
      <div className="relative text-center">
        <h2 className="text-4xl font-semibold md:text-5xl">
          Choose the Plan
          <br />
          That&apos;s Right for You
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted">
          Giving you access to essential features and over 1,000 creative tools.
          Upgrade to Pro to unlock powerful AI capabilities.
        </p>

        <div className="mx-auto mt-8 flex w-fit rounded-full border border-border bg-card p-1 text-sm">
          {(["Monthly", "Yearly"] as const).map((label) => {
            const active = (label === "Yearly") === yearly;
            return (
              <button
                key={label}
                onClick={() => setYearly(label === "Yearly")}
                className={cn(
                  "relative rounded-full px-5 py-2 transition",
                  active ? "text-white" : "text-muted",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="pricing-toggle"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* cards */}
      <div className="relative mt-14 grid items-center gap-6 md:grid-cols-3">
        {plans.map((p) => {
          const price = yearly ? p.yearly : p.monthly;
          const isLoading = loading === p.name;

          return (
            <motion.div
              key={p.name}
              whileHover={{ y: -6 }}
              className={cn(
                "rounded-2xl border bg-card p-8",
                p.popular
                  ? "border-primary shadow-[0_0_60px_rgba(255,90,31,.25)] md:scale-105"
                  : "border-border",
              )}
            >
              <h3
                className={cn(
                  "text-xl font-medium",
                  p.popular && "text-primary",
                )}
              >
                {p.name}
              </h3>
              <p className="mt-2 text-sm text-muted">{p.desc}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <motion.span
                  key={price}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-semibold"
                >
                  ${price}
                </motion.span>
                <span className="text-sm text-muted">/ month</span>
                {yearly && price > 0 && (
                  <span className="rounded bg-primary px-1.5 py-0.5 text-xs text-white">
                    -20%
                  </span>
                )}
              </div>

              <div className="my-6 h-px bg-border" />
              <p className="text-sm text-muted">What&apos;s included</p>
              <ul className="mt-4 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span
                      className={cn(
                        "grid h-5 w-5 place-items-center rounded-full border",
                        p.popular
                          ? "border-primary bg-primary text-white"
                          : "border-muted",
                      )}
                    >
                      <Check size={12} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* the ONE subscribe button */}
              <button
                onClick={() => checkout(p)}
                disabled={isLoading}
                className={cn(
                  "mt-8 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition disabled:opacity-60",
                  p.popular
                    ? "bg-primary text-white hover:brightness-110"
                    : "border border-border hover:bg-background",
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Redirecting…
                  </>
                ) : (
                  <>
                    Subscribe <ChevronRight size={16} />
                  </>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
