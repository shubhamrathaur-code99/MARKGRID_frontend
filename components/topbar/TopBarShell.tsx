"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { GlobalUserControls } from "../global/GlobalUserControls";

const barClassName =
  "fixed top-6 left-4 right-4 z-40 lg:left-[272px] lg:right-10";

/** Top bar: flex, 64px height, 24px horizontal padding */
const innerClassName =
  "mx-auto flex h-16 max-w-[1131px] flex-nowrap items-center justify-between rounded-2xl border border-white/10 bg-white/65 px-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:bg-white/[0.08] dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)]";

interface TopBarShellProps {
  email: string;
  children: ReactNode;
}

export function TopBarShell({ email, children }: TopBarShellProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={barClassName}
    >
      <div className={innerClassName}>
        <div className="min-w-0 flex-1 flex items-center">{children}</div>
        {/* RightGroup: notifications, theme, profile — 16px gap, right padding */}
        <div className="flex shrink-0 items-center gap-4 pl-4 pr-1">
          <GlobalUserControls email={email} />
        </div>
      </div>
    </motion.header>
  );
}
