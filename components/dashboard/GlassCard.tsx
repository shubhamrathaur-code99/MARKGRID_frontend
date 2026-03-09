"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Disable hover scale/lift for table-style cards */
  noHover?: boolean;
  /** Padding: default p-6, large p-8, none for tables */
  padding?: "default" | "large" | "none";
}

/**
 * Premium glass card: elevated, inner ring, hover scale + glow.
 * background: rgba(255,255,255,0.65) light / 0.08 dark
 * backdrop-blur-2xl, border-white/10, shadow depth, ring-white/10
 */
export function GlassCard({
  children,
  className = "",
  noHover,
  padding = "default",
}: GlassCardProps) {
  const Wrapper = motion.div;
  const paddingClass =
    padding === "large" ? "p-8" : padding === "none" ? "" : "p-6";
  return (
    <Wrapper
      className={[
        "rounded-2xl border border-black/5 bg-white/80",
        "backdrop-blur-md",
        "shadow-[0_4px_10px_rgba(15,23,42,0.05)]",
        "dark:border-white/10 dark:bg-white/[0.08] dark:ring-1 dark:ring-white/10",
        "dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)]",
        noHover
          ? ""
          : "transition-transform duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[0_12px_30px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_20px_60px_rgba(0,112,255,0.2)]",
        paddingClass,
        className,
      ].join(" ")}
      whileHover={noHover ? undefined : { y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Wrapper>
  );
}
