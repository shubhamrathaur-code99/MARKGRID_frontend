"use client";

import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface SeoRecommendationsProps {
  recommendations: string[];
}

const cardClass = `${cardSurfaceClass} p-6`;

export function SeoRecommendations({ recommendations }: SeoRecommendationsProps) {
  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        SEO Recommendations
      </h2>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-neutral-800 dark:text-neutral-100">
        {recommendations.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ol>
    </section>
  );
}

