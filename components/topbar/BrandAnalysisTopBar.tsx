"use client";

import { Search, RefreshCw } from "lucide-react";
import { TopBarShell } from "./TopBarShell";
import { Dropdown } from "@/components/ui/Dropdown";
import type { ReactNode } from "react";
import {
  BrandAnalysisNav,
  type BrandAnalysisSectionId,
} from "../brand-analysis/BrandAnalysisNav";

const dateRangeOptions = [
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_28_days", label: "Last 28 days" },
  { value: "last_90_days", label: "Last 90 days" },
];

const inputClass =
  "h-10 rounded-xl border border-white/10 bg-white/10 px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-[#0070ff] focus:outline-none focus:ring-2 focus:ring-[#0070ff] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:placeholder:text-neutral-400";

const btnClass =
  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-neutral-600 transition-colors hover:bg-[#0070ff]/10 hover:text-[#0070ff] dark:text-neutral-400 dark:hover:bg-[#0070ff]/20 focus:outline-none focus:ring-2 focus:ring-[#0070ff]";

interface BrandAnalysisTopBarProps {
  email: string;
  activeSection: BrandAnalysisSectionId;
  onSectionChange: (id: BrandAnalysisSectionId) => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  exportControl?: ReactNode;
}

export function BrandAnalysisTopBar({
  email,
  activeSection,
  onSectionChange,
  searchQuery,
  onSearchQueryChange,
  exportControl,
}: BrandAnalysisTopBarProps) {
  return (
    <TopBarShell email={email}>
      <div className="flex w-full items-center justify-between gap-4">
        {/* Left: date range, refresh, export, search — gap 16px */}
        <div className="flex shrink-0 items-center gap-4">
          <Dropdown
            value={"last_28_days"}
            options={dateRangeOptions}
            onChange={() => {}}
            ariaLabel="Date range"
            size="small"
          />
          <button type="button" className={btnClass} aria-label="Refresh">
            <RefreshCw className="h-4 w-4" />
          </button>
          {exportControl}
          <div className="relative hidden w-[140px] shrink-0 lg:block lg:w-[160px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className={`w-full pl-9 pr-3 ${inputClass}`}
            />
          </div>
        </div>

        {/* Middle: scrollable tabs — flex-1 min-w-0 so it never overlaps right header */}
        <nav
          className="scrollbar-hide relative z-[1] min-w-0 flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap"
          style={{ WebkitOverflowScrolling: "touch" }}
          aria-label="Report sections"
        >
          <BrandAnalysisNav
            activeSection={activeSection}
            onSectionChange={onSectionChange}
          />
        </nav>

        {/* Right: spacer so middle section doesn't touch global header actions */}
        <div className="shrink-0 basis-0" aria-hidden />
      </div>
    </TopBarShell>
  );
}
