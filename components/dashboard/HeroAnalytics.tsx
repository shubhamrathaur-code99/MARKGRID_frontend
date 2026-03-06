"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const sentimentData = [
  { t: 0, v: 72 },
  { t: 1, v: 75 },
  { t: 2, v: 74 },
  { t: 3, v: 78 },
  { t: 4, v: 80 },
  { t: 5, v: 82 },
];
const mentionsData = [
  { t: 0, v: 8 },
  { t: 1, v: 9.2 },
  { t: 2, v: 10.1 },
  { t: 3, v: 11.5 },
  { t: 4, v: 12.2 },
  { t: 5, v: 12.5 },
];
const engagementData = [
  { t: 0, v: 60 },
  { t: 1, v: 68 },
  { t: 2, v: 72 },
  { t: 3, v: 78 },
  { t: 4, v: 82 },
  { t: 5, v: 85 },
];

function AnimatedScore({ target }: { target: number }) {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const step = target / steps;
    let current = 0;
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setScore(target);
        clearInterval(id);
      } else {
        setScore(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(id);
  }, [target]);
  return <span>{score}</span>;
}

export function HeroAnalytics() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GlassCard noHover padding="large" className="overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Brand Health Score
            </h2>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                <AnimatedScore target={82} />
              </span>
              <span className="text-2xl font-medium text-neutral-400">/ 100</span>
            </p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Strong performance across sentiment and reach
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Sentiment trend
            </p>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sentimentData}>
                  <defs>
                    <linearGradient id="sentimentHero" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0070ff" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#0070ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="#0070ff"
                    strokeWidth={2}
                    fill="url(#sentimentHero)"
                    isAnimationActive
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Mentions growth
            </p>
            <div className="h-16 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mentionsData}>
                  <Line
                    type="monotone"
                    dataKey="v"
                    stroke="#0070ff"
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive
                    animationDuration={1000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="mt-4 border-t border-white/10 pt-4 dark:border-white/10">
          <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            Engagement trend
          </p>
          <div className="h-12 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={engagementData}>
                <defs>
                  <linearGradient id="engageHero" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#22c55e"
                  strokeWidth={1.5}
                  fill="url(#engageHero)"
                  isAnimationActive
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
