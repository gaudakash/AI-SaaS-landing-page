"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(!localStorage.getItem("cookie-consent"));
  }, []); // hydration-safe

  const choose = (v: "accepted" | "declined") => {
    localStorage.setItem("cookie-consent", v);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 z-50 rounded-xl border border-border bg-card p-4 text-sm shadow-xl md:bottom-4 md:left-auto md:max-w-sm"
        >
          <p className="text-muted">
            We use cookies for analytics to improve the product. No ads, ever.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => choose("accepted")}
              className="rounded-md bg-primary px-4 py-2 text-white"
            >
              Accept
            </button>
            <button
              onClick={() => choose("declined")}
              className="rounded-md border border-border px-4 py-2"
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
