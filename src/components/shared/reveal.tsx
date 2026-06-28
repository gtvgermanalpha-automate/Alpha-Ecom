"use client";

import { motion, type Variants } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right" | "zoom" | "fade";

const offset: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 34 },
  down: { y: -34 },
  left: { x: 48 },
  right: { x: -48 },
  zoom: { scale: 0.9 },
  fade: {},
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Scroll-triggered reveal. Animates once when scrolled into view and honors
 * prefers-reduced-motion automatically (Framer Motion no-ops the transform).
 */
export function Reveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.65,
  amount = 0.2,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  /** index-based stagger; multiplied internally for a gentle cascade */
  delay?: number;
  duration?: number;
  amount?: number;
  as?: "div" | "li" | "span" | "section" | "article" | "ul";
}) {
  const o = offset[direction];
  const variants: Variants = {
    hidden: { opacity: 0, x: o.x ?? 0, y: o.y ?? 0, scale: o.scale ?? 1 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration, ease: EASE, delay: delay * 0.09 },
    },
  };
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers direct children into view. Wrap a list/grid; children use <RevealItem>.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  amount = 0.15,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  amount?: number;
  as?: "div" | "ul";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: Direction;
  as?: "div" | "li";
}) {
  const o = offset[direction];
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, x: o.x ?? 0, y: o.y ?? 0, scale: o.scale ?? 1 },
        visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}
