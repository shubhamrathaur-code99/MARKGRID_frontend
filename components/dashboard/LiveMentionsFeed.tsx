"use client";

import { GlassCard } from "./GlassCard";

type Sentiment = "positive" | "neutral" | "negative";

const mentions = [
  {
    platform: "Twitter",
    author: "@brandfan",
    text: "Just tried the new product launch — absolutely love it! Best experience so far.",
    sentiment: "positive" as Sentiment,
    engagement: "2.4K",
    time: "2m ago",
  },
  {
    platform: "Reddit",
    author: "u/tech_reviewer",
    text: "Mixed feelings. The UI is great but pricing could be better.",
    sentiment: "neutral" as Sentiment,
    engagement: "156",
    time: "5m ago",
  },
  {
    platform: "News",
    author: "TechDaily",
    text: "Company announces partnership with major retailers. Stock up 4%.",
    sentiment: "positive" as Sentiment,
    engagement: "890",
    time: "12m ago",
  },
  {
    platform: "Blog",
    author: "Sarah M.",
    text: "Disappointed with customer support response time. Hope they improve.",
    sentiment: "negative" as Sentiment,
    engagement: "42",
    time: "18m ago",
  },
  {
    platform: "Twitter",
    author: "@influencer_j",
    text: "Campaign went live today. Huge engagement from our audience!",
    sentiment: "positive" as Sentiment,
    engagement: "5.1K",
    time: "22m ago",
  },
];

const sentimentStyles: Record<Sentiment, string> = {
  positive: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  neutral: "bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300",
  negative: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
};

export function LiveMentionsFeed() {
  return (
    <GlassCard noHover className="overflow-hidden p-0">
      <div className="border-b border-black/10 px-5 py-4 dark:border-white/10">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Live Mentions Feed
        </h3>
        <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400">
          Latest brand mentions across platforms
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-black/10 bg-white/10 dark:border-white/10 dark:bg-white/5">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Platform
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Author
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Mention
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Sentiment
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Engagement
              </th>
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {mentions.map((row, i) => (
              <tr
                key={i}
                className="border-b border-black/5 transition-all duration-300 hover:bg-black/5 dark:border-white/5 dark:hover:bg-white/5"
              >
                <td className="px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {row.platform}
                </td>
                <td className="px-5 py-3 text-sm text-neutral-600 dark:text-neutral-400">
                  {row.author}
                </td>
                <td className="max-w-xs px-5 py-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="line-clamp-2">{row.text}</span>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex rounded-lg px-2.5 py-0.5 text-xs font-medium capitalize ${sentimentStyles[row.sentiment]}`}
                  >
                    {row.sentiment}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  {row.engagement}
                </td>
                <td className="px-5 py-3 text-sm text-neutral-500 dark:text-neutral-400">
                  {row.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
