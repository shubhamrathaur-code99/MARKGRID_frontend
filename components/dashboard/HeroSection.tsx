"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const mentionsTrendData = [
  { t: "Mon", v: 1200 },
  { t: "Tue", v: 1580 },
  { t: "Wed", v: 1420 },
  { t: "Thu", v: 1890 },
  { t: "Fri", v: 2100 },
  { t: "Sat", v: 1780 },
  { t: "Sun", v: 1950 },
];

const sentimentTrendData = [
  { t: 0, v: 68 },
  { t: 1, v: 72 },
  { t: 2, v: 70 },
  { t: 3, v: 75 },
  { t: 4, v: 78 },
  { t: 5, v: 82 },
];

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const step = target / steps;
    let current = 0;
    const id = setInterval(() => {
      current += step;
      if (current >= target) {
        setValue(target);
        clearInterval(id);
      } else {
        setValue(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(id);
  }, [target]);
  return (
    <span>
      {value >= 1000 ? (value / 1000).toFixed(1) + "K" : value}
      {suffix}
    </span>
  );
}

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/65 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:bg-white/[0.08] dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      style={{
        boxShadow:
          "0 30px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.1), 0 0 40px -10px rgba(0,112,255,0.15)",
      }}
    >
      <div className="grid grid-cols-1 gap-10 p-8 lg:grid-cols-2 lg:items-center">
        {/* Left: Headline + subtext */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 lg:text-5xl">
            Real-Time Brand Intelligence
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
            Track mentions, sentiment, and engagement across the internet. One platform for your brand’s
            voice—powered by AI and built for modern teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-6">
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Live mentions
              </p>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                <AnimatedNumber target={12480} />
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Positive sentiment
              </p>
              <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">
                <AnimatedNumber target={82} suffix="%" />
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Brand health
              </p>
              <p className="text-2xl font-semibold text-[#0070ff]">
                <AnimatedNumber target={88} suffix="/100" />
              </p>
            </div>
          </div>
        </div>

        {/* Right: Analytics preview */}
        <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/20 p-6 backdrop-blur-sm dark:bg-white/5 lg:p-8">
          <h3 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
            Live analytics preview
          </h3>
          <div className="h-40">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Mentions trend
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mentionsTrendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="heroMentions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0070ff" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#0070ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" tick={{ fontSize: 11 }} />
                <YAxis hide />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="#0070ff"
                  strokeWidth={2}
                  fill="url(#heroMentions)"
                  isAnimationActive
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/30 px-4 py-3 dark:bg-white/5">
            <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">
              Sentiment indicator
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                82% positive
              </span>
            </span>
          </div>
          <div className="h-24">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Sentiment trend
            </p>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sentimentTrendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <Line
                  type="monotone"
                  dataKey="v"
                  stroke="#22c55e"
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
    </motion.section>
  );
}
