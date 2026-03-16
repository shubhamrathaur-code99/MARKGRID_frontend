"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, ChevronDown } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

interface GlobalUserControlsProps {
  email: string;
}

export function GlobalUserControls({ email }: GlobalUserControlsProps) {
  const [userOpen, setUserOpen] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-neutral-600 transition-colors hover:bg-[#0070ff]/10 hover:text-[#0070ff] dark:text-neutral-400 dark:hover:bg-[#0070ff]/20"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
      </motion.button>

      <motion.div
        className="shrink-0"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
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
                href="/settings"
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
    </>
  );
}

