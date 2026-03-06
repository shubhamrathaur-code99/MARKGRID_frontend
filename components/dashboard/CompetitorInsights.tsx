"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Markgrid", mentions: 12480, fill: "#0070ff" },
  { name: "Competitor A", mentions: 9820, fill: "#94a3b8" },
  { name: "Competitor B", mentions: 7560, fill: "#64748b" },
  { name: "Competitor C", mentions: 5420, fill: "#475569" },
];

const glassCardClass =
  "flex h-full flex-col rounded-2xl border border-white/20 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-300 ease-out hover:scale-[1.01] hover:border-white/20 hover:shadow-xl dark:border-white/20 dark:bg-slate-900/40 dark:shadow-xl dark:hover:shadow-xl";

const insights = [
  { label: "Brand Mentions", value: "12.4K", trend: "+18% growth" },
  { label: "Market Share", value: "41%" },
  { label: "Competitor Gap", value: "+3.2K mentions" },
];

function YAxisTick(props: {
  x?: string | number;
  y?: string | number;
  payload?: { value?: string } | { value?: string }[];
}) {
  const { x = 0, y = 0, payload } = props;
  const raw =
    Array.isArray(payload) && payload.length
      ? payload[0]?.value
      : payload && typeof payload === "object" && "value" in payload
        ? (payload as { value?: string }).value
        : "";
  const value = String(raw ?? "");
  return (
    <g transform={`translate(${Number(x)},${Number(y)})`}>
      <text
        x={0}
        y={0}
        dy={4}
        textAnchor="end"
        fill="currentColor"
        className="text-sm font-medium fill-neutral-600 dark:fill-neutral-300"
        style={{ fontSize: 14, whiteSpace: "nowrap" }}
      >
        {value}
      </text>
    </g>
  );
}

export function CompetitorInsights() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="h-full"
    >
      <div className={`${glassCardClass} h-full`}>
        <div className="flex h-full flex-col justify-between p-7">
          {/* 1. Header */}
          <div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
              Competitor Intelligence
            </h3>
            <p className="mt-0.5 text-sm text-neutral-500 dark:text-gray-400">
              Brand vs competitors — mention volume
            </p>
          </div>

          {/* 2. Chart + Insights + Legend */}
          <div className="flex flex-1 flex-col gap-6 min-h-0 mt-6">
            {/* Chart area: fixed height, centered vertically */}
            <div className="flex flex-1 min-h-[260px] items-center justify-center">
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 112, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-black/10 dark:stroke-white/10"
                    />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 12 }}
                      stroke="rgba(156, 163, 175, 0.8)"
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      width={100}
                      tick={YAxisTick}
                      tickLine={false}
                      axisLine={false}
                      stroke="rgba(156, 163, 175, 0.8)"
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.08)",
                        background: "#ffffff",
                        color: "#1f2937",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      }}
                      formatter={(value: number) => [
                        value.toLocaleString(),
                        "Mentions",
                      ]}
                    />
                    <Bar
                      dataKey="mentions"
                      name="Mentions"
                      radius={[0, 4, 4, 0]}
                      isAnimationActive
                      animationDuration={800}
                    >
                      {data.map((entry, index) => (
                        <Cell key={index} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 3. Analytics summary (Insights row) */}
            <div className="grid grid-cols-3 gap-6">
              {insights.map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-black/5 bg-black/5 p-4 dark:border-white/5 dark:bg-white/5"
                >
                  <p className="text-xs text-neutral-500 dark:text-gray-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-white">
                    {item.value}
                  </p>
                  {item.trend && (
                    <p className="mt-0.5 text-xs text-emerald-600 dark:text-emerald-400">
                      {item.trend}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* 4. Legend */}
            <div className="flex items-center justify-center gap-4 text-sm text-neutral-500 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-sm"
                  style={{ backgroundColor: "#0070ff" }}
                />
                Mentions
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
