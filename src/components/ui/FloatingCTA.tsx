"use client";
import { useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

export function FloatingCTA() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 600));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed inset-x-4 bottom-4 z-40 md:hidden"
        >
          <Link
            href="#pricing"
            className="block rounded-xl bg-primary py-3 text-center text-sm font-medium text-white shadow-[0_8px_30px_rgba(255,90,31,.45)]"
          >
            Get Started — it's free
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
