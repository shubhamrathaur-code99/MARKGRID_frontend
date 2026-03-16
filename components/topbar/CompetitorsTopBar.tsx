"use client";

import { useState } from "react";
import { TopBarShell } from "./TopBarShell";
import { Dropdown } from "@/components/ui/Dropdown";

const inputClass =
  "h-10 rounded-xl border border-white/10 bg-white/10 px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-[#0070ff] focus:outline-none focus:ring-2 focus:ring-[#0070ff] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:placeholder:text-neutral-400";

const comparisonOptions = [
  { value: "overview", label: "Overview" },
  { value: "keywords", label: "Keywords" },
  { value: "traffic", label: "Traffic" },
];

const timeRangeOptions = [
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_28_days", label: "Last 28 days" },
  { value: "last_90_days", label: "Last 90 days" },
];

interface CompetitorsTopBarProps {
  email: string;
}

export function CompetitorsTopBar({ email }: CompetitorsTopBarProps) {
  const [domain, setDomain] = useState("");
  const [comparison, setComparison] = useState("overview");
  const [timeRange, setTimeRange] = useState("last_28_days");

  return (
    <TopBarShell email={email}>
      <div className="flex flex-1 flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Competitor domain..."
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className={`min-w-[180px] ${inputClass}`}
          aria-label="Competitor domain"
        />
        <Dropdown
          value={comparison}
          options={comparisonOptions}
          onChange={setComparison}
          ariaLabel="Comparison"
          size="small"
        />
        <Dropdown
          value={timeRange}
          options={timeRangeOptions}
          onChange={setTimeRange}
          ariaLabel="Time range"
          size="small"
        />
      </div>
    </TopBarShell>
  );
}
