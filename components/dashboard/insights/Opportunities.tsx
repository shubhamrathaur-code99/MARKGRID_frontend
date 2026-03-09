"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../GlassCard";
import { TrendingUp } from "lucide-react";

interface OpportunitiesProps {
  opportunities: string[];
}

export function Opportunities({ opportunities }: OpportunitiesProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <GlassCard className="group">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 transition-colors duration-300 group-hover:bg-emerald-500/20 dark:bg-white/10 dark:group-hover:bg-emerald-500/20">
            <TrendingUp className="h-5 w-5 text-neutral-600 transition-colors duration-300 group-hover:text-emerald-600 dark:text-neutral-400 dark:group-hover:text-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Opportunities
            </h3>
            <ul className="space-y-2">
              {opportunities.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.15 + i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
