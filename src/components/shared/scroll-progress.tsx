"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin reading-progress bar fixed to the very top of the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-habanero via-aster to-habanero"
    />
  );
}
