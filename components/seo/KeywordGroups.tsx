"use client";

import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface KeywordGroup {
  name: string;
  keywords: number;
  traffic: number;
}

interface KeywordGroupsProps {
  groups: KeywordGroup[];
}

const cardClass = `${cardSurfaceClass} p-6`;

export function KeywordGroups({ groups }: KeywordGroupsProps) {
  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Keyword Groups
      </h2>
      <div className="space-y-2">
        {groups.map((group) => (
          <div
            key={group.name}
            className="flex items-center justify-between rounded-lg bg-black/5 px-4 py-3 text-sm dark:bg-white/5"
          >
            <div>
              <p className="font-medium text-neutral-900 dark:text-neutral-50">
                {group.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {group.keywords.toLocaleString()} keywords
              </p>
            </div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
              {group.traffic.toLocaleString()} visits
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

