"use client";

import { useState, useEffect } from "react";
import { GlassCard } from "./GlassCard";
import { ChartSkeleton } from "./ChartSkeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", mentions: 1200 },
  { day: "Tue", mentions: 1580 },
  { day: "Wed", mentions: 1420 },
  { day: "Thu", mentions: 1890 },
  { day: "Fri", mentions: 2100 },
  { day: "Sat", mentions: 1650 },
  { day: "Sun", mentions: 1340 },
  { day: "Mon", mentions: 1780 },
  { day: "Tue", mentions: 1920 },
  { day: "Wed", mentions: 2050 },
];

export function MentionsChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) return <ChartSkeleton />;

  return (
    <GlassCard className="p-6 shadow-xl">
      <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Mentions Trend
      </h3>
      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-black/10 dark:stroke-white/10" />
            <XAxis
              dataKey="day"
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
                border: "1px solid rgba(0,0,0,0.1)",
                backgroundColor: "rgba(255,255,255,0.95)",
              }}
              labelStyle={{ color: "inherit" }}
            />
            <Line
              type="monotone"
              dataKey="mentions"
              stroke="url(#mentionsGradient)"
              strokeWidth={2}
              dot={{ fill: "#0070ff", r: 4 }}
              activeDot={{ r: 6, fill: "#0070ff", stroke: "#00a0ff", strokeWidth: 2 }}
              isAnimationActive
              animationDuration={800}
            />
            <defs>
              <linearGradient id="mentionsGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0070ff" />
                <stop offset="100%" stopColor="#00a0ff" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
