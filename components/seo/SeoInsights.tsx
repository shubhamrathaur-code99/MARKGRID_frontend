"use client";

import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface SeoInsightsProps {
  insights: string[];
}

const cardClass = `${cardSurfaceClass} p-6`;

export function SeoInsights({ insights }: SeoInsightsProps) {
  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        SEO Insights
      </h2>
      <ul className="list-disc space-y-2 pl-5 text-sm text-neutral-800 dark:text-neutral-100">
        {insights.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

