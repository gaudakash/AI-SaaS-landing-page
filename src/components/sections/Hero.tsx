"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import { HeroMock } from "../ui/HeroMock";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24">
      {/* background glow */}
      <div className="glow pointer-events-none absolute inset-0" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]"
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
        {/* social proof pill */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-border bg-card/60 px-4 py-2 backdrop-blur"
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <Image
                key={i}
                src={`/avatars/${i}.jpg`}
                alt=""
                width={28}
                height={28}
                className="rounded-full border-2 border-background"
              />
            ))}
          </div>
          <div className="text-left text-xs">
            <div className="flex text-primary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>
            <span className="text-muted">115+ happy clients</span>
          </div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl font-semibold leading-tight md:text-7xl"
        >
          Automate <span className="text-primary">Intelligence</span>.
          <br /> Accelerate Growth.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-muted md:text-lg"
        >
          Our AI-powered SaaS platform empowers businesses to streamline
          operations, automate repetitive tasks, and make smarter, data-driven
          decisions—all from one intuitive dashboard.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex justify-center gap-4"
        >
          <Link
            href="#pricing"
            className="rounded-md bg-primary px-6 py-3 font-medium text-white shadow-[0_0_30px_rgba(255,90,31,.4)] transition hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="#features"
            className="rounded-md border border-border px-6 py-3 font-medium transition hover:bg-card"
          >
            See Details
          </Link>
        </motion.div>
        <motion.div variants={fadeUp}>
          <HeroMock />
        </motion.div>
      </motion.div>
    </section>
  );
}
