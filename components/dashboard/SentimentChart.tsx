"use client";

import { GlassCard } from "./GlassCard";
import { PieChart as RechartsPie, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Positive", value: 68, color: "#22c55e" },
  { name: "Neutral", value: 24, color: "#94a3b8" },
  { name: "Negative", value: 8, color: "#ef4444" },
];

export function SentimentChart() {
  return (
    <GlassCard className="p-6 shadow-xl">
      <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Sentiment Distribution
      </h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPie>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              isAnimationActive
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`${value}%`, "Share"]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid var(--neutral-200)",
              }}
            />
            <Legend />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
