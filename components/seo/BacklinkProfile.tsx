"use client";

import { cardSurfaceClass } from "@/components/shared/cardStyles";

interface BacklinkProfileProps {
  profile: {
    text_links: number;
    image_links: number;
    redirects: number;
    top_referring_domains: { domain: string; links: number }[];
  };
}

const cardClass = `${cardSurfaceClass} p-6`;

export function BacklinkProfile({ profile }: BacklinkProfileProps) {
  const totalLinks =
    profile.text_links + profile.image_links + profile.redirects || 1;

  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        Backlink Profile
      </h2>

      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Stat label="Text links" value={profile.text_links} />
        <Stat label="Image links" value={profile.image_links} />
        <Stat label="Redirects" value={profile.redirects} />
      </div>

      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        Top referring domains
      </p>
      <div className="space-y-2">
        {profile.top_referring_domains.map((row) => {
          const widthPercent = (row.links / totalLinks) * 100;
          return (
            <div key={row.domain} className="flex items-center gap-3">
              <span className="w-40 truncate text-sm font-medium text-neutral-800 dark:text-neutral-100">
                {row.domain}
              </span>
              <div className="flex-1 rounded-full bg-black/5 dark:bg-white/5">
                <div
                  className="h-2 rounded-full bg-[#0070ff]"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
              <span className="w-12 text-right text-xs text-neutral-500 dark:text-neutral-400">
                {row.links}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/5 px-4 py-3 dark:bg-white/5">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

