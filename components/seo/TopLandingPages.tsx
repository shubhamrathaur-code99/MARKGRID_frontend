"use client";

import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface LandingPage {
  url: string;
  title: string;
  organic_visits: number;
  top_keyword: string;
}

interface TopLandingPagesProps {
  pages: LandingPage[];
}

const cardClass = `${cardSurfaceClass} p-6`;

export function TopLandingPages({ pages }: TopLandingPagesProps) {
  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Top Landing Pages
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              <th className="py-2 pr-4">Page</th>
              <th className="py-2 pr-4">Organic Visits</th>
              <th className="py-2">Top Keyword</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr
                key={page.url}
                className="border-b border-white/5 last:border-b-0 hover:bg-black/5 dark:hover:bg-white/5"
              >
                <td className="py-2 pr-4">
                  <div className="flex flex-col">
                    <span className="text-neutral-900 dark:text-neutral-50">
                      {page.title}
                    </span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {page.url}
                    </span>
                  </div>
                </td>
                <td className="py-2 pr-4 text-neutral-800 dark:text-neutral-100">
                  {page.organic_visits.toLocaleString()}
                </td>
                <td className="py-2 text-neutral-800 dark:text-neutral-100">
                  {page.top_keyword}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

