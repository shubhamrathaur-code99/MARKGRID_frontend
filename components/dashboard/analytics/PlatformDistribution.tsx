"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../GlassCard";

export type PlatformItem = { platform: string; mentions: number };

interface PlatformDistributionProps {
  data: PlatformItem[];
}

const maxBarWidth = 100; // %

export function PlatformDistribution({ data }: PlatformDistributionProps) {
  const maxMentions = Math.max(...data.map((d) => d.mentions), 1);

  return (
    <GlassCard>
      <h3 className="mb-6 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Platform distribution
      </h3>
      <ul className="space-y-5">
        {data.map((item, i) => {
          const pct = (item.mentions / maxMentions) * maxBarWidth;
          return (
            <motion.li
              key={item.platform}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: i * 0.06 }}
              className="flex flex-col gap-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {item.platform}
                </span>
                <span className="tabular-nums text-neutral-600 dark:text-neutral-400">
                  {item.mentions.toLocaleString()} mentions
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10 dark:bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
                  className="h-full rounded-full bg-[#0070ff]/80"
                />
              </div>
            </motion.li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
