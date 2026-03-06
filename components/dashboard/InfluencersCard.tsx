"use client";

import type { ComponentType } from "react";
import { Share2, Image, Youtube, Linkedin, Video } from "lucide-react";

const platformIcons: Record<string, ComponentType<{ className?: string }>> = {
  Twitter: Share2,
  Instagram: Image,
  YouTube: Youtube,
  LinkedIn: Linkedin,
  TikTok: Video,
};

const influencers = [
  { name: "Alex Rivera", platform: "Twitter", followers: "245K", engagement: "4.2%" },
  { name: "Jordan Lee", platform: "Instagram", followers: "189K", engagement: "5.8%" },
  { name: "Sam Chen", platform: "YouTube", followers: "520K", engagement: "3.1%" },
  { name: "Morgan Taylor", platform: "LinkedIn", followers: "98K", engagement: "6.4%" },
  { name: "Casey Brooks", platform: "TikTok", followers: "312K", engagement: "7.2%" },
];

const glassCardClass =
  "flex h-full flex-col rounded-2xl border border-white/20 bg-white/70 shadow-xl backdrop-blur-xl transition-all duration-300 ease-out hover:scale-[1.01] hover:border-white/20 hover:shadow-xl dark:border-white/20 dark:bg-slate-900/40 dark:shadow-xl dark:hover:shadow-xl";

export function InfluencersCard() {
  return (
    <div className={glassCardClass}>
      <div className="flex flex-1 flex-col gap-6 p-7">
        <div>
          <h3 className="text-lg font-medium text-neutral-900 dark:text-white">
            Top Influencers
          </h3>
          <p className="mt-0.5 text-sm text-neutral-500 dark:text-gray-400">
            Influencers mentioning your brand
          </p>
        </div>
        <ul className="space-y-4">
          {influencers.map((inf, i) => {
            const PlatformIcon = platformIcons[inf.platform] ?? Share2;
            return (
              <li
                key={i}
                className="flex items-center justify-between gap-4 rounded-xl border border-black/5 p-4 transition-all duration-200 hover:bg-black/5 dark:border-white/5 dark:hover:bg-white/5"
              >
                {/* Left: Avatar + Name + Platform */}
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 font-semibold text-white">
                    {inf.name.slice(0, 1)}
                  </div>
                  <div className="flex min-w-0 flex-col">
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      {inf.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-gray-400">
                      <PlatformIcon className="h-3.5 w-3.5 shrink-0" />
                      {inf.platform}
                    </span>
                  </div>
                </div>
                {/* Center: Followers */}
                <div className="flex shrink-0 flex-col items-center">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                    {inf.followers}
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-gray-400">
                    followers
                  </span>
                </div>
                {/* Right: Engagement badge */}
                <div className="shrink-0">
                  <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {inf.engagement} eng.
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
