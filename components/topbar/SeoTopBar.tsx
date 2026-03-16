"use client";

import { useState } from "react";
import { TopBarShell } from "./TopBarShell";
import { Dropdown } from "@/components/ui/Dropdown";
import { PDFDownloadHandler } from "@/components/export/PDFDownloadHandler";
import { SeoReport } from "@/features/seo/export/SeoReport";

const dateRangeOptions = [
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_28_days", label: "Last 28 days" },
  { value: "last_90_days", label: "Last 90 days" },
];

const deviceOptions = [
  { value: "all", label: "All devices" },
  { value: "desktop", label: "Desktop" },
  { value: "mobile", label: "Mobile" },
];

const countryOptions = [
  { value: "all", label: "All countries" },
  { value: "in", label: "India" },
  { value: "us", label: "US" },
];

type SeoRangeKey = "last_7_days" | "last_28_days";

export type SeoTopBarProps = {
  email: string;
  range: SeoRangeKey;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seoData: any;
};

export function SeoTopBar({ email, range, seoData }: SeoTopBarProps) {
  const [dateRange, setDateRange] = useState("last_28_days");
  const [country, setCountry] = useState("all");
  const [device, setDevice] = useState("all");

  return (
    <TopBarShell email={email}>
      <div className="flex flex-1 flex-wrap items-center gap-4">
        <Dropdown
          value={dateRange}
          options={dateRangeOptions}
          onChange={setDateRange}
          ariaLabel="Date range"
          size="small"
        />
        <Dropdown
          value={device}
          options={deviceOptions}
          onChange={setDevice}
          ariaLabel="Device"
          size="small"
        />
        <Dropdown
          value={country}
          options={countryOptions}
          onChange={setCountry}
          ariaLabel="Country"
          size="small"
        />
        <PDFDownloadHandler
          document={
            <SeoReport
              companyName={email}
              dateRange={range}
              exportedAtIso={new Date().toISOString()}
              seoData={seoData}
            />
          }
          fileName={`seo-report-${range}.pdf`}
          label="Export PDF"
        />
      </div>
    </TopBarShell>
  );
}
