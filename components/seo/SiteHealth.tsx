"use client";

import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface SiteHealthProps {
  siteHealth: {
    score: number;
    status: string;
    errors: number;
    warnings: number;
    notices: number;
  };
}

const cardClass = `${cardSurfaceClass} p-6`;

export function SiteHealth({ siteHealth }: SiteHealthProps) {
  const statusColor =
    siteHealth.status === "Good"
      ? "bg-emerald-500/15 text-emerald-500"
      : "bg-amber-500/15 text-amber-500";

  return (
    <section className={cardClass}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">
          Site Health
        </h2>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Score
            </p>
            <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
              {siteHealth.score}/100
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusColor}`}
          >
            {siteHealth.status}
          </span>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-white/10 bg-black/5 px-4 py-3 dark:bg-white/5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Errors
          </p>
          <p className="mt-1 text-lg font-semibold text-red-500">
            {siteHealth.errors}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/5 px-4 py-3 dark:bg-white/5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Warnings
          </p>
          <p className="mt-1 text-lg font-semibold text-amber-400">
            {siteHealth.warnings}
          </p>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/5 px-4 py-3 dark:bg-white/5">
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
            Notices
          </p>
          <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
            {siteHealth.notices}
          </p>
        </div>
      </div>
    </section>
  );
}

