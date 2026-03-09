"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface ImpressionsTrafficPoint {
  label: string;
  impressions: number;
  traffic: number;
  impressionsPrev?: number;
  trafficPrev?: number;
}

interface ImpressionsTrafficChartProps {
  current: ImpressionsTrafficPoint[];
  previous?: ImpressionsTrafficPoint[];
}

const cardClass = `${cardSurfaceClass} p-6`;

export function ImpressionsTrafficChart({
  current,
  previous,
}: ImpressionsTrafficChartProps) {
  if (!current?.length) {
    return null;
  }

  const merged: ImpressionsTrafficPoint[] = current.map((point, idx) => ({
    label: point.label,
    impressions: point.impressions,
    traffic: point.traffic,
    impressionsPrev: previous?.[idx]?.impressions,
    trafficPrev: previous?.[idx]?.traffic,
  }));

  const last = merged[merged.length - 1];
  const lastImpressions = last?.impressions ?? 0;
  const lastTraffic = last?.traffic ?? 0;

  return (
    <section className={cardClass}>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            Impressions &amp; Traffic
          </h2>
          <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
            How often your pages appear in search results vs. organic visits
            over time.
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="rounded-lg border border-white/10 bg-black/5 px-3 py-2 text-right dark:bg-white/5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Latest impressions
            </p>
            <p className="mt-0.5 text-base font-semibold text-neutral-900 dark:text-neutral-50">
              {lastImpressions.toLocaleString()}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-black/5 px-3 py-2 text-right dark:bg-white/5">
            <p className="text-[11px] font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Latest traffic
            </p>
            <p className="mt-0.5 text-base font-semibold text-neutral-900 dark:text-neutral-50">
              {lastTraffic.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={merged}
            margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
          >
            <defs>
              <linearGradient id="seoImpressions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0070ff" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#0070ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="seoTraffic" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="seoImpressionsPrev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0070ff" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#0070ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="seoTrafficPrev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
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
                  impressions: "Impressions (current)",
                  traffic: "Traffic (current)",
                  impressionsPrev: "Impressions (previous)",
                  trafficPrev: "Traffic (previous)",
                };
                return [value.toLocaleString(), labelMap[name] ?? name];
              }}
            />
              <Legend
                verticalAlign="top"
                height={24}
                formatter={(value) => {
                  const labelMap: Record<string, string> = {
                    impressions: "Impressions (current)",
                    traffic: "Traffic (current)",
                    impressionsPrev: "Impressions (previous)",
                    trafficPrev: "Traffic (previous)",
                  };
                  return labelMap[value] ?? value;
                }}
              />
            <Area
              type="monotone"
              dataKey="impressions"
              stroke="#0070ff"
              strokeWidth={2}
              fill="url(#seoImpressions)"
              name="impressions"
            />
            <Area
              type="monotone"
              dataKey="traffic"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#seoTraffic)"
              name="traffic"
            />
              {previous && previous.length > 0 && (
                <>
                  <Area
                    type="monotone"
                    dataKey="impressionsPrev"
                    stroke="#0070ff"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="none"
                    name="impressionsPrev"
                  />
                  <Area
                    type="monotone"
                    dataKey="trafficPrev"
                    stroke="#22c55e"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="none"
                    name="trafficPrev"
                  />
                </>
              )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

