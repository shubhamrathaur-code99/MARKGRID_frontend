"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../dashboard/GlassCard";
import { ArrowUpRight, Minus } from "lucide-react";

interface CompetitorSectionProps {
  competitors: any[];
}

export function CompetitorSection({ competitors }: CompetitorSectionProps) {
  const items = Array.isArray(competitors) ? competitors : [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="mt-12"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Competitor overview
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((c, idx) => {
          const name = c?.name ?? `Competitor ${idx + 1}`;
          const score = c?.brandScore ?? c?.score;
          const mentions = c?.mentions ?? c?.mentionsComparison ?? c?.mentionDelta;
          const positive = typeof mentions === "number" ? mentions >= 0 : false;

          return (
            <GlassCard key={name + idx}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                    {name}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Brand score
                  </p>
                  <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                    {score != null ? score : "—"}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={[
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
                      positive
                        ? "bg-emerald-500/10 text-emerald-500"
                        : "bg-neutral-500/10 text-neutral-500",
                    ].join(" ")}
                  >
                    {typeof mentions === "number" ? (
                      <>
                        {positive ? "+" : ""}
                        {mentions.toLocaleString()} mentions
                        <ArrowUpRight className="h-3 w-3" />
                      </>
                    ) : (
                      <>
                        <Minus className="h-3 w-3" /> N/A
                      </>
                    )}
                  </span>
                  {c?.positioning && (
                    <p className="max-w-[180px] text-right text-xs text-neutral-500 dark:text-neutral-400">
                      {c.positioning}
                    </p>
                  )}
                </div>
              </div>
            </GlassCard>
          );
        })}
        {items.length === 0 && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            No competitor data available.
          </p>
        )}
      </div>
    </motion.section>
  );
}

