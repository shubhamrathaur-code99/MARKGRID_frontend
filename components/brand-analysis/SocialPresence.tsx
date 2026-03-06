"use client";

import { motion } from "framer-motion";
import { GlassCard } from "../dashboard/GlassCard";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

interface SocialPresenceProps {
  social: any;
}

const socialCards = [
  { key: "twitterFollowers", label: "Twitter followers", icon: Twitter },
  { key: "instagramFollowers", label: "Instagram followers", icon: Instagram },
  { key: "linkedinFollowers", label: "LinkedIn followers", icon: Linkedin },
  { key: "youtubeSubscribers", label: "YouTube subscribers", icon: Youtube },
];

export function SocialPresence({ social }: SocialPresenceProps) {
  const data = social ?? {};

  const formatCount = (v: any) =>
    typeof v === "number"
      ? v >= 1_000_000
        ? `${(v / 1_000_000).toFixed(1)}M`
        : v >= 1_000
          ? `${(v / 1_000).toFixed(1)}K`
          : v.toLocaleString()
      : v ?? "—";

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.05 }}
      className="mt-12"
    >
      <h2 className="mb-6 text-xl font-medium text-neutral-900 dark:text-neutral-100">
        Social presence
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {socialCards.map(({ key, label, icon: Icon }) => (
          <GlassCard key={key}>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  {label}
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                  {formatCount((data as any)[key])}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-neutral-700 dark:bg-white/10 dark:text-neutral-200">
                <Icon className="h-5 w-5" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </motion.section>
  );
}

