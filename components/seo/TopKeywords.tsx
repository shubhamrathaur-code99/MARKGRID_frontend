"use client";

import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface KeywordRow {
  keyword: string;
  position: number;
  search_volume: number;
}

interface TopKeywordsProps {
  keywords: KeywordRow[];
}

const cardClass = `${cardSurfaceClass} p-6`;

export function TopKeywords({ keywords }: TopKeywordsProps) {
  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Top Ranking Keywords
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              <th className="py-2 pr-4">Keyword</th>
              <th className="py-2 pr-4">Position</th>
              <th className="py-2">Search Volume</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((row) => (
              <tr
                key={row.keyword}
                className="border-b border-white/5 last:border-b-0 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <td className="py-2 pr-4 text-neutral-900 dark:text-neutral-50">
                  {row.keyword}
                </td>
                <td className="py-2 pr-4 text-neutral-800 dark:text-neutral-100">
                  #{row.position}
                </td>
                <td className="py-2 text-neutral-800 dark:text-neutral-100">
                  {row.search_volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

