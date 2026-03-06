"use client";

import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Disable hover scale/glow for flat cards (e.g. tables) */
  noHover?: boolean;
}

export function Card({ children, className = "", noHover }: CardProps) {
  return (
    <div
      className={`rounded-2xl glass-card ${noHover ? "" : "glass-card-hover"} transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
