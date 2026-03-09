"use client";

import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface KeywordOpportunitiesProps {
  opportunities: string[];
}

const cardClass = `${cardSurfaceClass} p-6`;

export function KeywordOpportunities({ opportunities }: KeywordOpportunitiesProps) {
  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Keyword Opportunities
      </h2>
      <ul className="flex flex-wrap gap-2">
        {opportunities.map((kw) => (
          <li
            key={kw}
            className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-neutral-800 dark:bg-white/10 dark:text-neutral-100"
          >
            {kw}
          </li>
        ))}
      </ul>
    </section>
  );
}

