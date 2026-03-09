"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export type MentionItem = {
  platform: string;
  author: string;
  text: string;
  sentiment: "positive" | "neutral" | "negative";
  date: string;
  link: string;
};

type SentimentFilter = "all" | "positive" | "neutral" | "negative";

const sentimentStyles: Record<"positive" | "neutral" | "negative", string> = {
  positive:
    "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  neutral:
    "bg-neutral-500/20 text-neutral-700 dark:text-neutral-300 border-neutral-500/30",
  negative:
    "bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface MentionsListProps {
  mentions: MentionItem[];
}

export function MentionsList({ mentions }: MentionsListProps) {
  const [filter, setFilter] = useState<SentimentFilter>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return mentions;
    return mentions.filter((m) => m.sentiment === filter);
  }, [mentions, filter]);

  const filters: { value: SentimentFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "positive", label: "Positive" },
    { value: "neutral", label: "Neutral" },
    { value: "negative", label: "Negative" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.value
                ? "bg-[#0070ff]/20 text-[#0070ff] border border-[#0070ff]/40 dark:bg-[#0070ff]/15 dark:text-[#0070ff]"
                : "border border-slate-200 bg-white text-neutral-600 hover:bg-slate-50 hover:text-neutral-900 dark:border-white/10 dark:bg-white/5 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-100"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="space-y-0 divide-y divide-slate-100 dark:divide-white/10">
        {filtered.length === 0 ? (
          <li className="py-12 text-center text-sm text-neutral-500 dark:text-neutral-400">
            No mentions match this filter.
          </li>
        ) : (
          filtered.map((mention, i) => (
            <motion.li
              key={`${mention.platform}-${mention.author}-${i}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.04 }}
              className="py-6 first:pt-0"
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">
                      Platform:
                    </span>{" "}
                    {mention.platform}
                  </span>
                  <span>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">
                      Author:
                    </span>{" "}
                    {mention.author}
                  </span>
                  <span>
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">
                      Date:
                    </span>{" "}
                    {formatDate(mention.date)}
                  </span>
                </div>
                <blockquote className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm italic text-neutral-800 dark:border-white/10 dark:bg-white/5 dark:text-neutral-200">
                  &ldquo;{mention.text}&rdquo;
                </blockquote>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className={`inline-flex rounded-lg border px-2.5 py-0.5 text-xs font-medium capitalize ${sentimentStyles[mention.sentiment]}`}
                  >
                    Sentiment: {mention.sentiment}
                  </span>
                  <a
                    href={mention.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0070ff] transition-colors hover:underline"
                  >
                    View Source
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </motion.li>
          ))
        )}
      </ul>
    </div>
  );
}
