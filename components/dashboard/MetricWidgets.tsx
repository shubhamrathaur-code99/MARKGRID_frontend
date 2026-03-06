"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import {
  MessageSquare,
  Smile,
  Megaphone,
  UserCheck,
  PieChart,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const widgets = [
  {
    id: "mentions",
    title: "Total Mentions",
    value: 12480,
    change: 12.4,
    trend: "up" as const,
    icon: MessageSquare,
    suffix: "",
    spark: [40, 55, 48, 72, 65, 80],
  },
  {
    id: "sentiment",
    title: "Positive Sentiment",
    value: 68,
    change: 3.2,
    trend: "up" as const,
    icon: Smile,
    suffix: "%",
    spark: [58, 62, 60, 65, 66, 68],
  },
  {
    id: "reach",
    title: "Campaign Reach",
    value: 2.4,
    change: -1.8,
    trend: "down" as const,
    icon: Megaphone,
    suffix: "M",
    spark: [100, 85, 90, 70, 75, 60],
  },
  {
    id: "influencer",
    title: "Influencer Impact",
    value: 8920,
    change: 18.1,
    trend: "up" as const,
    icon: UserCheck,
    suffix: "",
    spark: [50, 58, 62, 70, 78, 85],
  },
  {
    id: "sov",
    title: "Share of Voice",
    value: 34,
    change: 2.1,
    trend: "up" as const,
    icon: PieChart,
    suffix: "%",
    spark: [28, 30, 31, 32, 33, 34],
  },
];

function MiniSparkline({ values }: { values: number[] }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const w = 64;
  const h = 28;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0070ff" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#0070ff" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke="url(#sparkGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const step = value / 30;
    let current = 0;
    const isFloat = value % 1 !== 0;
    const id = setInterval(() => {
      current += step;
      if (current >= value) {
        setDisplay(value);
        clearInterval(id);
      } else {
        setDisplay(isFloat ? Math.round(current * 10) / 10 : Math.round(current));
      }
    }, 30);
    return () => clearInterval(id);
  }, [value]);
  const formatted = display >= 1000 ? (display / 1000).toFixed(1) + "K" : String(display);
  return <span>{formatted}{suffix}</span>;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function MetricWidgets() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
    >
      {widgets.map((w) => {
        const Icon = w.icon;
        return (
          <motion.div key={w.id} variants={item} className="h-full">
            <GlassCard className="h-full">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    {w.title}
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                    <AnimatedNumber value={w.value} suffix={w.suffix} />
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-sm">
                    {w.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        w.trend === "up"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {w.change > 0 ? "+" : ""}
                      {w.change}%
                    </span>
                  </div>
                  <div className="mt-3">
                    <MiniSparkline values={w.spark} />
                  </div>
                </div>
                <div className="rounded-xl bg-[#0070ff]/10 p-2.5 dark:bg-[#0070ff]/20">
                  <Icon className="h-6 w-6 text-[#0070ff]" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
