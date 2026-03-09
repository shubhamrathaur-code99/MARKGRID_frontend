"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface TrafficPoint {
  label: string;
  traffic: number;
}

interface TrafficTrendProps {
  current: TrafficPoint[];
  previous?: TrafficPoint[];
}

const cardClass = `${cardSurfaceClass} p-6`;

export function TrafficTrend({ current, previous }: TrafficTrendProps) {
  if (!current?.length) return null;

  const data = current.map((point, idx) => ({
    label: point.label,
    traffic: point.traffic,
    trafficPrev: previous?.[idx]?.traffic,
  }));

  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Organic Traffic Trend
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
          >
            <defs>
              <linearGradient id="seoTrafficTrend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0070ff" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#0070ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-black/10 dark:stroke-white/10"
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              className="text-neutral-500 dark:text-neutral-400"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              className="text-neutral-500 dark:text-neutral-400"
            />
            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.2)",
                backgroundColor: "rgba(255,255,255,0.95)",
              }}
              labelStyle={{ fontWeight: 600 }}
              formatter={(value: number, name: string) => {
                const labelMap: Record<string, string> = {
                  traffic: "Traffic (current)",
                  trafficPrev: "Traffic (previous)",
                };
                return [value.toLocaleString(), labelMap[name] ?? name];
              }}
            />
            <Area
              type="monotone"
              dataKey="traffic"
              stroke="#0070ff"
              strokeWidth={2}
              fill="url(#seoTrafficTrend)"
            />
            {previous && previous.length > 0 && (
              <Line
                type="monotone"
                dataKey="trafficPrev"
                stroke="#22c55e"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

