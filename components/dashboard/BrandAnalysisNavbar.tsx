 "use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  BrandAnalysisNav,
  type BrandAnalysisSectionId,
} from "../brand-analysis/BrandAnalysisNav";
import { GlobalUserControls } from "../global/GlobalUserControls";

interface BrandAnalysisNavbarProps {
  email: string;
  activeSection: BrandAnalysisSectionId;
  onSectionChange: (id: BrandAnalysisSectionId) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
}

export function BrandAnalysisNavbar({
  email,
  activeSection,
  onSectionChange,
  searchQuery,
  onSearchQueryChange,
}: BrandAnalysisNavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-6 left-4 right-4 z-40 lg:left-[272px] lg:right-10"
    >
      <div className="mx-auto flex max-w-[1131px] flex-nowrap items-center justify-between gap-0 rounded-2xl border border-white/10 bg-white/65 px-6 py-2 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:bg-white/[0.08] dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)] lg:px-8">
        {/* Center: tab navigation */}
        <nav
          className="scrollbar-hide min-w-0 flex-1 overflow-x-auto overflow-y-hidden md:flex"
          aria-label="Report sections"
        >
          <BrandAnalysisNav
            activeSection={activeSection}
            onSectionChange={onSectionChange}
          />
        </nav>

        {/* Right: Search + global user controls — stable, no scroll */}
        <div className="flex min-w-fit shrink-0 items-center gap-4">
          <div className="relative hidden w-[150px] shrink-0 lg:block lg:w-[180px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 transition-all duration-200 focus:border-[#0070ff] focus:outline-none focus:ring-2 focus:ring-[#0070ff] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:placeholder:text-neutral-400"
            />
          </div>
          <GlobalUserControls email={email} />
        </div>
      </div>
    </motion.header>
  );
}
