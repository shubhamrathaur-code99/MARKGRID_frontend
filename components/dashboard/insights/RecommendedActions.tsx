"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../GlassCard";
import { CheckCircle2 } from "lucide-react";

interface RecommendedActionsProps {
  actions: string[];
}

export function RecommendedActions({ actions }: RecommendedActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
    >
      <GlassCard className="group">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 transition-colors duration-300 group-hover:bg-[#0070ff]/20 dark:bg-white/10 dark:group-hover:bg-[#0070ff]/20">
            <CheckCircle2 className="h-5 w-5 text-neutral-600 transition-colors duration-300 group-hover:text-[#0070ff] dark:text-neutral-400 dark:group-hover:text-[#0070ff]" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Recommended actions
            </h3>
            <ol className="space-y-3">
              {actions.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.3 + i * 0.05 }}
                  className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0070ff]/20 text-xs font-semibold text-[#0070ff]">
                    {i + 1}
                  </span>
                  {item}
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
