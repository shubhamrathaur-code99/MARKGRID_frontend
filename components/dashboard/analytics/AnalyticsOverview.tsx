"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../GlassCard";
import {
  MessageSquare,
  TrendingUp,
  Smile,
  Minus,
  Frown,
} from "lucide-react";

export type AnalyticsOverviewData = {
  total_mentions: number;
  engagement_rate: string;
  sentiment_positive: number;
  sentiment_neutral: number;
  sentiment_negative: number;
};

const metrics: Array<{
  key: keyof AnalyticsOverviewData;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  format: (v: number | string) => string;
  className?: string;
}> = [
  {
    key: "total_mentions",
    label: "Total Mentions",
    icon: MessageSquare,
    format: (v) => Number(v).toLocaleString(),
  },
  {
    key: "engagement_rate",
    label: "Engagement Rate",
    icon: TrendingUp,
    format: (v) => (typeof v === "string" ? v : `${v}%`),
  },
  {
    key: "sentiment_positive",
    label: "Positive Sentiment",
    icon: Smile,
    format: (v) => `${v}%`,
    className: "text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "sentiment_neutral",
    label: "Neutral Sentiment",
    icon: Minus,
    format: (v) => `${v}%`,
    className: "text-neutral-600 dark:text-neutral-400",
  },
  {
    key: "sentiment_negative",
    label: "Negative Sentiment",
    icon: Frown,
    format: (v) => `${v}%`,
    className: "text-red-600 dark:text-red-400",
  },
];

interface AnalyticsOverviewProps {
  data: AnalyticsOverviewData;
}

export function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        const value = data[m.key];
        const display = m.format(value as number | string);
        return (
          <motion.div
            key={m.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.05 }}
          >
            <GlassCard className="group h-full">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 transition-colors duration-300 group-hover:bg-[#0070ff]/20 dark:bg-white/10 dark:group-hover:bg-[#0070ff]/20">
                  <Icon className="h-5 w-5 text-neutral-600 transition-colors duration-300 group-hover:text-[#0070ff] dark:text-neutral-400 dark:group-hover:text-[#0070ff]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    {m.label}
                  </p>
                  <p
                    className={`mt-1 text-xl font-semibold tracking-tight transition-colors duration-300 ease-in-out ${m.className ?? "text-neutral-900 dark:text-neutral-100"} ${m.className ? "" : "group-hover:text-[#0070ff]"}`}
                  >
                    {display}
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
