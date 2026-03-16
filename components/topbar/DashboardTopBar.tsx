"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { TopBarShell } from "./TopBarShell";
import { getTabClasses } from "../shared/tabStyles";
import { Dropdown } from "@/components/ui/Dropdown";

const dashboardNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/mentions", label: "Mentions" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/insights", label: "Insights" },
];

const dateRangeOptions = [
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_28_days", label: "Last 28 days" },
  { value: "last_90_days", label: "Last 90 days" },
];

const inputClass =
  "h-10 rounded-xl border border-white/10 bg-white/10 px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-[#0070ff] focus:outline-none focus:ring-2 focus:ring-[#0070ff] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:placeholder:text-neutral-400";

export function DashboardTopBar({ email }: { email: string }) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState("last_7_days");

  return (
    <TopBarShell email={email}>
      {/* TopBar: flex, space-between, items-center */}
      <div className="flex w-full items-center justify-between">
        {/* LeftGroup: nav tabs — gap 16px, padding for click area */}
        <nav
          className="hidden shrink-0 items-center gap-4 md:flex"
          aria-label="Dashboard navigation"
        >
          {dashboardNav.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${getTabClasses(isActive)} !px-4 !py-2.5`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CenterGroup: date filter + search — gap 16px, vertically centered */}
        <div className="flex shrink-0 items-center gap-4">
          <Dropdown
            value={dateRange}
            options={dateRangeOptions}
            onChange={setDateRange}
            ariaLabel="Date range"
            size="small"
          />
          <div className="relative hidden shrink-0 lg:block lg:w-[240px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-9 pr-3 ${inputClass}`}
            />
          </div>
        </div>
      </div>
    </TopBarShell>
  );
}
