"use client";

import { GlassCard } from "./GlassCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", likes: 4200, shares: 1200, comments: 890 },
  { name: "Feb", likes: 5100, shares: 1500, comments: 1020 },
  { name: "Mar", likes: 4800, shares: 1400, comments: 950 },
  { name: "Apr", likes: 6200, shares: 1800, comments: 1100 },
  { name: "May", likes: 5900, shares: 1650, comments: 1050 },
];

export function EngagementChart() {
  return (
    <GlassCard className="p-6 shadow-xl">
      <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Engagement Metrics
      </h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-black/10 dark:stroke-white/10" />
            <XAxis
              dataKey="name"
              tick={{ fill: "currentColor", fontSize: 12 }}
              className="text-neutral-500 dark:text-neutral-400"
            />
            <YAxis
              tick={{ fill: "currentColor", fontSize: 12 }}
              className="text-neutral-500 dark:text-neutral-400"
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid var(--neutral-200)",
              }}
            />
            <Legend />
            <Bar dataKey="likes" fill="#0070ff" radius={[4, 4, 0, 0]} name="Likes" isAnimationActive animationDuration={800} />
            <Bar dataKey="shares" fill="#22c55e" radius={[4, 4, 0, 0]} name="Shares" isAnimationActive animationDuration={800} />
            <Bar dataKey="comments" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Comments" isAnimationActive animationDuration={800} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
