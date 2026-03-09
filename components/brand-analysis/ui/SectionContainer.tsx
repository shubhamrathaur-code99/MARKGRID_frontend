"use client";

import { type ReactNode } from "react";
import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

export function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <section
      className={`${cardSurfaceClass} p-6 ${className}`}
    >
      {children}
    </section>
  );
}
