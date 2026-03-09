"use client";

import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface CompetitorRow {
  name: string;
  traffic: number;
}

interface CompetitorSeoComparisonProps {
  data: CompetitorRow[];
}

const cardClass = `${cardSurfaceClass} p-6`;

export function CompetitorSeoComparison({ data }: CompetitorSeoComparisonProps) {
  const maxTraffic = Math.max(...data.map((d) => d.traffic));

  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Competitor SEO Comparison
      </h2>
      <div className="space-y-3">
        {data.map((row) => {
          const widthPercent = (row.traffic / maxTraffic) * 100;
          return (
            <div key={row.name} className="flex items-center gap-3">
              <span className="w-28 text-sm font-medium text-neutral-800 dark:text-neutral-100">
                {row.name}
              </span>
              <div className="flex-1 rounded-full bg-black/5 dark:bg-white/5">
                <div
                  className="h-2 rounded-full bg-[#0070ff]"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              <span className="w-20 text-right text-xs text-neutral-500 dark:text-neutral-400">
                {row.traffic.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

