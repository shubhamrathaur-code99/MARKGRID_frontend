"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "../GlassCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export type WeeklyMentionItem = { date: string; count: number };

interface MentionsTrendProps {
  data: WeeklyMentionItem[];
}

export function MentionsTrend({ data }: MentionsTrendProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  const chartData = data.map((d) => ({ day: d.date, mentions: d.count }));

  return (
    <GlassCard>
      <h3 className="mb-6 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Weekly mentions trend
      </h3>
      <div className="h-72">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-black/10 dark:stroke-white/10"
              />
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
                  border: "1px solid rgba(255,255,255,0.2)",
                  backgroundColor: "rgba(255,255,255,0.95)",
                }}
                labelStyle={{ color: "inherit" }}
                formatter={(value: number) => [value, "mentions"]}
                labelFormatter={(label) => `Day: ${label}`}
              />
              <Bar
                dataKey="mentions"
                fill="url(#analyticsBarGradient)"
                radius={[6, 6, 0, 0]}
                isAnimationActive
                animationDuration={600}
              />
              <defs>
                <linearGradient
                  id="analyticsBarGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#0070ff" />
                  <stop offset="100%" stopColor="#0070ff" stopOpacity={0.6} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-full items-center justify-center rounded-xl bg-white/80 dark:bg-white/5"
          >
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Loading chart…
            </span>
          </motion.div>
        )}
      </div>
    </GlassCard>
  );
}
