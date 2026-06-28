"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

/**
 * Translates its children on the Y axis as the element scrolls through the
 * viewport, for a subtle depth/parallax effect. `speed` is the total travel
 * in pixels (positive = moves up as you scroll down).
 */
export function Parallax({
  children,
  speed = 60,
  className,
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
