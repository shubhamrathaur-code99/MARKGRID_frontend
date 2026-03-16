"use client";

import { GlassCard } from "./GlassCard";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export type CompetitorRow = {
  brand: string;
  mentions: number;
  sentiment: number;
  engagement: string;
  trend: "up" | "down" | "neutral";
  trendValue: number;
};

const defaultRows: CompetitorRow[] = [
  { brand: "Your Brand", mentions: 12480, sentiment: 72, engagement: "2.4M", trend: "up", trendValue: 12 },
  { brand: "Competitor A", mentions: 9820, sentiment: 65, engagement: "1.8M", trend: "down", trendValue: 3 },
  { brand: "Competitor B", mentions: 7560, sentiment: 58, engagement: "1.2M", trend: "up", trendValue: 8 },
  { brand: "Competitor C", mentions: 5420, sentiment: 61, engagement: "980K", trend: "neutral", trendValue: 0 },
];

interface CompetitorTableProps {
  rows?: CompetitorRow[];
}

export function CompetitorTable({ rows = defaultRows }: CompetitorTableProps) {
  return (
    <GlassCard noHover className="overflow-hidden p-0">
      <div className="border-b border-black/10 px-5 py-4 dark:border-white/10">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Competitor Comparison
        </h3>
        <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
          Brand vs competitors — mentions, sentiment, engagement
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="border-b border-black/10 bg-white/10 dark:border-white/10 dark:bg-white/5">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Brand
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Mentions
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Sentiment Score
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Engagement
              </th>
              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-black/5 transition-colors duration-300 dark:border-white/5 ${
                  row.brand === "Your Brand"
                    ? "bg-[#0070ff]/10 dark:bg-[#0070ff]/15"
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <td className="px-5 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                  {row.brand}
                </td>
                <td className="px-5 py-3 text-right text-sm text-neutral-700 dark:text-neutral-300">
                  {row.mentions.toLocaleString()}
                </td>
                <td className="px-5 py-3 text-right text-sm text-neutral-700 dark:text-neutral-300">
                  {row.sentiment}
                </td>
                <td className="px-5 py-3 text-right text-sm text-neutral-700 dark:text-neutral-300">
                  {row.engagement}
                </td>
                <td className="px-5 py-3 text-right">
                  {row.trend === "up" && (
                    <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                      <TrendingUp className="h-4 w-4" /> +{row.trendValue}%
                    </span>
                  )}
                  {row.trend === "down" && (
                    <span className="inline-flex items-center gap-0.5 text-red-600 dark:text-red-400">
                      <TrendingDown className="h-4 w-4" /> -{row.trendValue}%
                    </span>
                  )}
                  {row.trend === "neutral" && (
                    <span className="inline-flex items-center gap-0.5 text-neutral-500 dark:text-neutral-400">
                      <Minus className="h-4 w-4" /> —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
