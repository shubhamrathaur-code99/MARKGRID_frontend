"use client";

import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface SeoOverviewProps {
  seoOverview: {
    organic_traffic: number;
    ranking_keywords: number;
    domain_authority: number;
    backlinks: number;
    referring_domains: number;
  };
}

const cardClass = `${cardSurfaceClass} p-6`;

export function SeoOverview({ seoOverview }: SeoOverviewProps) {
  const items = [
    { label: "Organic Traffic", value: seoOverview.organic_traffic.toLocaleString() },
    { label: "Ranking Keywords", value: seoOverview.ranking_keywords.toLocaleString() },
    { label: "Domain Authority", value: seoOverview.domain_authority },
    { label: "Backlinks", value: seoOverview.backlinks.toLocaleString() },
    { label: "Referring Domains", value: seoOverview.referring_domains.toLocaleString() },
  ];

  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        SEO Overview
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-white/10 bg-black/5 px-4 py-3 dark:bg-white/5"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {item.label}
            </p>
            <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

