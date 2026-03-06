"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  /** Framer Motion variant / layoutId for animations */
  noHover?: boolean;
}

export function GlassPanel({ children, className = "", noHover }: GlassPanelProps) {
  const Wrapper = motion.div;
  return (
    <Wrapper
      className={[
        "rounded-2xl border border-white/10 bg-white/70 backdrop-blur-xl shadow-[0_25px_70px_rgba(0,0,0,0.15)] dark:bg-white/[0.08] dark:shadow-[0_25px_70px_rgba(0,0,0,0.35)]",
        noHover
          ? ""
          : "transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(0,112,255,0.25)] dark:hover:shadow-[0_15px_40px_rgba(0,112,255,0.15)]",
        className,
      ].join(" ")}
      whileHover={noHover ? undefined : { y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Wrapper>
  );
}
