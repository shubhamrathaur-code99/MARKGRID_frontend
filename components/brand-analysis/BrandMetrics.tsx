"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../dashboard/GlassCard";
import { TrendingUp, Activity, BarChart3, Target, Megaphone } from "lucide-react";

interface BrandMetricsProps {
  metrics: any;
}

const cards = [
  {
    key: "totalMentions",
    label: "Total Mentions",
    icon: BarChart3,
    format: (v: any) => (typeof v === "number" ? v.toLocaleString() : v ?? "—"),
  },
  {
    key: "sentimentScore",
    label: "Sentiment Score",
    icon: Activity,
    format: (v: any) => (v != null ? `${v}%` : "—"),
  },
  {
    key: "engagementRate",
    label: "Engagement Rate",
    icon: Target,
    format: (v: any) => (v != null ? `${v}%` : "—"),
  },
  {
    key: "socialReach",
    label: "Social Reach",
    icon: TrendingUp,
    format: (v: any) =>
      typeof v === "number"
        ? v >= 1_000_000
          ? `${(v / 1_000_000).toFixed(1)}M`
          : v >= 1_000
            ? `${(v / 1_000).toFixed(1)}K`
            : v.toLocaleString()
        : v ?? "—",
  },
  {
    key: "activeCampaigns",
    label: "Active Campaigns",
    icon: Megaphone,
    format: (v: any) => v ?? "—",
  },
];

export function BrandMetrics({ metrics }: BrandMetricsProps) {
  const data = metrics ?? {};

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mt-12"
    >
      <h2 className="mb-6 text-xl font-medium text-neutral-900 dark:text-neutral-100">
        Brand metrics
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ key, label, icon: Icon, format }) => (
          <GlassCard key={key}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                  {format((data as any)[key])}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0070ff]/10 text-[#0070ff] dark:bg-[#0070ff]/20">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.section>
  );
}

