"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Wand2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const prompts = [
  "A minimal poster for a jazz festival, orange & black",
  "Instagram carousel for a coffee brand launch",
  "Hero illustration for a fintech dashboard",
];

const styles = ["Minimal", "Bold", "Retro", "Editorial", "3D"];

const tiles = [
  { bg: "from-primary to-orange-300", text: "text-black" },
  { bg: "from-zinc-800 to-zinc-600", text: "text-white" },
  { bg: "from-orange-600 to-rose-500", text: "text-white" },
  { bg: "from-zinc-900 to-primary/70", text: "text-white" },
];

const logLines = [
  "Analyzing prompt",
  "Applying brand palette",
  "Composing 4 layouts",
  "Upscaling exports",
];

type Phase = "typing" | "generating" | "done";

export function HeroMock() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [logStep, setLogStep] = useState(0);

  // typing → generating → done → next prompt
  useEffect(() => {
    const full = prompts[i];
    let t: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      t =
        text.length < full.length
          ? setTimeout(() => setText(full.slice(0, text.length + 1)), 35)
          : setTimeout(() => setPhase("generating"), 500);
    } else if (phase === "generating") {
      t = setTimeout(() => setPhase("done"), 1800);
    } else {
      t = setTimeout(() => {
        setText("");
        setLogStep(0);
        setPhase("typing");
        setI((n) => (n + 1) % prompts.length);
      }, 3400);
    }
    return () => clearTimeout(t);
  }, [text, phase, i]);

  // step the log while generating
  useEffect(() => {
    if (phase !== "generating") return;
    const id = setInterval(
      () => setLogStep((s) => Math.min(s + 1, logLines.length)),
      420,
    );
    return () => clearInterval(id);
  }, [phase]);

  const activeStyle = i % styles.length;

  return (
    <div className="relative mx-auto mt-16 w-full max-w-3xl text-left">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/20 blur-3xl" />

      <div className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-2xl backdrop-blur">
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-muted">designly.ai / studio</span>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_1fr]">
          {/* ── left: prompt column ── */}
          <div className="flex flex-col">
            <p className="text-xs text-muted">Prompt</p>
            <div className="mt-2 flex min-h-[72px] items-start gap-2 rounded-lg border border-border bg-background p-3 text-sm">
              <Wand2 size={16} className="mt-0.5 shrink-0 text-primary" />
              <span>
                {text}
                <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-primary align-middle" />
              </span>
            </div>

            {/* style chips */}
            <p className="mt-4 text-xs text-muted">Style</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {styles.map((s, n) => (
                <span
                  key={s}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs transition",
                    n === activeStyle
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border text-muted",
                  )}
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-xs font-medium text-white">
                <Sparkles size={14} /> Generate
              </span>
              <span className="text-xs text-muted">
                {phase === "typing" && "Ready"}
                {phase === "generating" && "Generating…"}
                {phase === "done" && "4 variations · 1.8s"}
              </span>
            </div>

            <div className="mt-3 h-1 overflow-hidden rounded bg-border">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: phase === "typing" ? "0%" : "100%" }}
                transition={{
                  duration: phase === "generating" ? 1.8 : 0.2,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* generation log fills the remaining height */}
            <ul className="mt-4 space-y-1.5 font-mono text-[11px] text-muted">
              {logLines.map((l, n) => {
                const done = phase === "done" || logStep > n;
                const active = phase === "generating" && logStep === n;
                return (
                  <li
                    key={l}
                    className={cn(
                      "flex items-center gap-2 transition-opacity",
                      !done && !active && "opacity-30",
                    )}
                  >
                    {done ? (
                      <Check size={12} className="text-primary" />
                    ) : (
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          active ? "animate-pulse bg-primary" : "bg-border",
                        )}
                      />
                    )}
                    {l}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ── right: results ── */}
          <div className="grid grid-cols-2 gap-3">
            {tiles.map((t, n) => (
              <motion.div
                key={`${i}-${n}`}
                initial={{ opacity: 0.15, scale: 0.92 }}
                animate={{
                  opacity: phase === "done" ? 1 : 0.15,
                  scale: phase === "done" ? 1 : 0.92,
                }}
                transition={{
                  delay: phase === "done" ? n * 0.12 : 0,
                  duration: 0.4,
                }}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br p-3",
                  t.bg,
                  t.text,
                )}
              >
                {/* fake poster content */}
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="h-2 w-8 rounded bg-current opacity-70" />
                    <span className="h-3 w-3 rounded-full border border-current opacity-70" />
                  </div>
                  <div>
                    <div className="text-lg font-bold leading-none">JAZZ</div>
                    <div className="text-lg font-bold leading-none opacity-80">
                      FEST
                    </div>
                    <div className="mt-1.5 flex gap-1">
                      <span className="h-1 w-6 rounded bg-current opacity-60" />
                      <span className="h-1 w-3 rounded bg-current opacity-40" />
                    </div>
                  </div>
                </div>
                {/* shimmer while generating */}
                {phase === "generating" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
