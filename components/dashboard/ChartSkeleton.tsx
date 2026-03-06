"use client";

import { GlassCard } from "./GlassCard";

export function ChartSkeleton() {
  return (
    <GlassCard className="p-6 shadow-xl">
      <div className="h-5 w-48 animate-pulse rounded-lg bg-black/10 dark:bg-white/10" />
      <div className="mt-4 flex h-72 items-end justify-between gap-2">
        {[40, 65, 45, 80, 55, 70, 50].map((h, i) => (
          <div
            key={i}
            className="flex-1 animate-pulse rounded-t-lg bg-black/10 transition-all duration-300 dark:bg-white/10"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </GlassCard>
  );
}
