"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../GlassCard";
import { Users } from "lucide-react";

export type AudienceInsightData = {
  industries: string[];
  regions: string[];
};

interface AudienceInsightsProps {
  data: AudienceInsightData;
}

export function AudienceInsights({ data }: AudienceInsightsProps) {
  const { industries, regions } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <GlassCard className="group">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 transition-colors duration-300 group-hover:bg-[#0070ff]/20 dark:bg-white/10 dark:group-hover:bg-[#0070ff]/20">
            <Users className="h-5 w-5 text-neutral-600 transition-colors duration-300 group-hover:text-[#0070ff] dark:text-neutral-400 dark:group-hover:text-[#0070ff]" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Audience insights
            </h3>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Industries
                </p>
                <ul className="flex flex-wrap gap-2">
                  {industries.map((name, i) => (
                    <motion.li
                      key={name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.25 + i * 0.05 }}
                    >
                      <span className="inline-flex rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium text-neutral-800 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200">
                        {name}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Regions
                </p>
                <ul className="flex flex-wrap gap-2">
                  {regions.map((name, i) => (
                    <motion.li
                      key={name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.3 + i * 0.05 }}
                    >
                      <span className="inline-flex rounded-lg border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium text-neutral-800 dark:border-white/10 dark:bg-white/10 dark:text-neutral-200">
                        {name}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
