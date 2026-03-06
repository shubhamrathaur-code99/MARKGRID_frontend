"use client";

import { GlassCard } from "./GlassCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { week: "W1", reach: 420, engagement: 180 },
  { week: "W2", reach: 580, engagement: 240 },
  { week: "W3", reach: 720, engagement: 310 },
  { week: "W4", reach: 650, engagement: 290 },
  { week: "W5", reach: 890, engagement: 380 },
  { week: "W6", reach: 920, engagement: 410 },
];

export function CampaignChart() {
  return (
    <GlassCard className="p-6 shadow-xl">
      <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Campaign Performance
      </h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-black/10 dark:stroke-white/10" />
            <XAxis
              dataKey="week"
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
            <Area
              type="monotone"
              dataKey="reach"
              stackId="1"
              stroke="#0070ff"
              fill="#0070ff"
              fillOpacity={0.4}
              name="Reach (K)"
              isAnimationActive
              animationDuration={800}
            />
            <Area
              type="monotone"
              dataKey="engagement"
              stackId="2"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.4}
              name="Engagement (K)"
              isAnimationActive
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
