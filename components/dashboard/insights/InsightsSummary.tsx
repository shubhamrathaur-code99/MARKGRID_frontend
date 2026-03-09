"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../GlassCard";
import { FileText } from "lucide-react";

interface InsightsSummaryProps {
  summary: string;
}

export function InsightsSummary({ summary }: InsightsSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <GlassCard className="group">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 transition-colors duration-300 group-hover:bg-[#0070ff]/20 dark:bg-white/10 dark:group-hover:bg-[#0070ff]/20">
            <FileText className="h-5 w-5 text-neutral-600 transition-colors duration-300 group-hover:text-[#0070ff] dark:text-neutral-400 dark:group-hover:text-[#0070ff]" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-2 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Brand performance summary
            </h3>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              {summary}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
