"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../GlassCard";
import { AlertTriangle } from "lucide-react";

interface RisksAlertsProps {
  risks: string[];
}

export function RisksAlerts({ risks }: RisksAlertsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    >
      <GlassCard className="group">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 transition-colors duration-300 group-hover:bg-red-500/20 dark:bg-white/10 dark:group-hover:bg-red-500/20">
            <AlertTriangle className="h-5 w-5 text-neutral-600 transition-colors duration-300 group-hover:text-red-600 dark:text-neutral-400 dark:group-hover:text-red-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
              Risks & alerts
            </h3>
            <ul className="space-y-2">
              {risks.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: 0.2 + i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
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
