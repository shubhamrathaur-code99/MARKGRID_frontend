"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Bell, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

const sectionLinks = [
  { id: "brand_foundation", label: "Brand Foundation" },
  { id: "brand_positioning", label: "Brand Positioning" },
  { id: "customer_experience_1", label: "Customer Experience (Part 1)" },
  { id: "customer_experience_2", label: "Customer Experience (Part 2)" },
  { id: "digital_and_social_presence", label: "Digital and Social Presence" },
  { id: "growth_and_swot", label: "Growth and SWOT" },
  { id: "market_and_category", label: "Market and Category" },
  { id: "product_and_services", label: "Product and Services" },
  { id: "social_relevence", label: "Social Relevance" },
  { id: "target_audience", label: "Target Audience" },
  { id: "tone_and_brand_pillars", label: "Tone and Brand Pillars" },
];

export function BrandAnalysisNavbar({ email }: { email: string }) {
  const [search, setSearch] = useState("");
  const [userOpen, setUserOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-6 left-4 right-4 z-40 lg:left-[272px] lg:right-10"
    >
      <div className="mx-auto flex max-w-[1131px] flex-nowrap items-center justify-between gap-0 rounded-2xl border border-white/10 bg-white/65 px-6 py-2 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:bg-white/[0.08] dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)] lg:px-8">
        {/* Center: scrollable section anchors */}
        <nav
          className="scrollbar-hide min-w-0 flex-1 overflow-x-auto overflow-y-hidden md:flex"
          aria-label="Report sections"
        >
          <div className="flex items-center gap-4 py-0.5 md:gap-7">
            {sectionLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-sm font-medium tracking-tight text-neutral-600 transition-colors hover:bg-white/50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-100"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Right: Search + icons — stable, no scroll */}
        <div className="flex min-w-fit shrink-0 items-center gap-4">
          <div className="relative hidden w-[150px] shrink-0 lg:block lg:w-[180px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 transition-all duration-200 focus:border-[#0070ff] focus:outline-none focus:ring-2 focus:ring-[#0070ff] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:placeholder:text-neutral-400"
            />
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-neutral-600 transition-colors hover:bg-[#0070ff]/10 hover:text-[#0070ff] dark:text-neutral-400 dark:hover:bg-[#0070ff]/20"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </motion.button>
          <motion.div className="shrink-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <ThemeToggle />
          </motion.div>
          <div className="relative shrink-0">
            <motion.button
              type="button"
              onClick={() => setUserOpen((o) => !o)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-xl bg-white/10 px-2 py-2 transition-colors hover:bg-[#0070ff]/10 dark:bg-white/10 dark:hover:bg-[#0070ff]/20"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0070ff] text-sm font-semibold text-white">
                {email.slice(0, 1).toUpperCase()}
              </div>
              <ChevronDown className="h-4 w-4 text-neutral-500" />
            </motion.button>
            {userOpen && (
              <>
                <button
                  type="button"
                  onClick={() => setUserOpen(false)}
                  className="fixed inset-0 z-10"
                  aria-hidden
                />
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full z-20 mt-2 w-56 rounded-2xl border border-white/10 bg-white/65 py-2 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:bg-white/[0.08]"
                >
                  <p className="border-b border-white/10 px-4 py-2.5 text-sm text-neutral-600 dark:text-neutral-400">
                    {email}
                  </p>
                  <Link
                    href="/dashboard/settings"
                    className="block px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10"
                    onClick={() => setUserOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    href="/dashboard/logout"
                    className="block px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10"
                    onClick={() => setUserOpen(false)}
                  >
                    Log out
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}
