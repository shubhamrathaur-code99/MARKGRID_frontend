"use client";

import { useEffect, useState } from "react";
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

const cards = [
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
    title: "Influencer Engagement",
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
  const w = 56;
  const h = 24;
  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 4) - 2;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg
      width={w}
      height={h}
      className="overflow-visible"
      aria-hidden
    >
      <polyline
        fill="none"
        stroke="#0070ff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
        className="opacity-80"
      />
    </svg>
  );
}

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const step = value / 40;
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
    }, 25);
    return () => clearInterval(id);
  }, [value]);

  const formatted = display >= 1000 ? (display / 1000).toFixed(1) + "K" : String(display);
  return <span>{formatted}{suffix}</span>;
}

export function AnalyticsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <GlassCard key={card.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium tracking-tight text-neutral-500 dark:text-neutral-400">
                  {card.title}
                </p>
                <p className="mt-1.5 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                  <AnimatedNumber value={card.value} suffix={card.suffix} />
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-sm">
                  {card.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                  <span
                    className={
                      card.trend === "up"
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }
                  >
                    {card.change > 0 ? "+" : ""}
                    {card.change}%
                  </span>
                  <span className="text-neutral-500 dark:text-neutral-400">vs last period</span>
                </div>
                <div className="mt-3">
                  <MiniSparkline values={card.spark} />
                </div>
              </div>
              <div className="relative shrink-0 rounded-xl bg-[#0070ff]/10 p-3 dark:bg-[#0070ff]/20">
                <span
                  className="absolute inset-0 rounded-xl bg-[#0070ff]/20 blur-md dark:bg-[#0070ff]/30"
                  aria-hidden
                />
                <Icon className="relative h-6 w-6 text-[#0070ff]" />
              </div>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
}
