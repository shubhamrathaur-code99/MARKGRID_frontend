"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../dashboard/GlassCard";
import { MessageCircle, ExternalLink } from "lucide-react";

interface MentionsFeedProps {
  mentions: any[];
}

export function MentionsFeed({ mentions }: MentionsFeedProps) {
  const items = Array.isArray(mentions) ? mentions : [];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="mt-12"
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
          Recent mentions & media coverage
        </h2>
      </div>
      <GlassCard noHover padding="none" className="overflow-hidden">
        <div className="border-b border-white/10 px-6 py-4 dark:border-white/10">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Latest conversations and articles about the brand.
          </p>
        </div>
        <div className="divide-y divide-white/10">
          {items.length === 0 && (
            <p className="px-6 py-5 text-sm text-neutral-500 dark:text-neutral-400">
              No recent mentions available.
            </p>
          )}
          {items.map((m, idx) => (
            <div
              key={(m?.id as string) ?? `${m?.source ?? "mention"}-${idx}`}
              className="flex gap-4 px-6 py-4 hover:bg-white/40 dark:hover:bg-white/10"
            >
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#0070ff]/10 text-[#0070ff] dark:bg-[#0070ff]/20">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                      {m?.title ?? m?.headline ?? "Brand mention"}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">
                      {m?.snippet ?? m?.summary ?? m?.text}
                    </p>
                  </div>
                  {m?.sentiment && (
                    <span
                      className={[
                        "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
                        m.sentiment === "positive"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : m.sentiment === "negative"
                          ? "bg-red-500/10 text-red-500"
                          : "bg-neutral-500/10 text-neutral-500",
                      ].join(" ")}
                    >
                      {m.sentiment}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                  {m?.source && <span>{m.source}</span>}
                  {m?.publishedAt && <span>• {new Date(m.publishedAt).toLocaleDateString()}</span>}
                  {m?.author && <span>• {m.author}</span>}
                  {m?.url && (
                    <a
                      href={m.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#0070ff] hover:underline"
                    >
                      View source
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.section>
  );
}

