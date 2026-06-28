"use client";

import { motion } from "framer-motion";

/**
 * Wraps page content so it fades + lifts in on every route change.
 * Header/Footer live in the layout, so they stay put while pages transition.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
