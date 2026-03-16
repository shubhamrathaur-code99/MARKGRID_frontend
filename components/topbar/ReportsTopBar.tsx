"use client";

import { useState } from "react";
import { TopBarShell } from "./TopBarShell";
import { Dropdown } from "@/components/ui/Dropdown";
import { PDFDownloadHandler } from "@/components/export/PDFDownloadHandler";
import { GenericReport } from "@/features/reports/export/GenericReport";

const reportTypeOptions = [
  { value: "overview", label: "Overview" },
  { value: "brand", label: "Brand" },
  { value: "seo", label: "SEO" },
  { value: "mentions", label: "Mentions" },
];

const dateRangeOptions = [
  { value: "last_7_days", label: "Last 7 days" },
  { value: "last_28_days", label: "Last 28 days" },
  { value: "last_90_days", label: "Last 90 days" },
];

interface ReportsTopBarProps {
  email: string;
}

export function ReportsTopBar({ email }: ReportsTopBarProps) {
  const [reportType, setReportType] = useState("overview");
  const [dateRange, setDateRange] = useState("last_28_days");

  return (
    <TopBarShell email={email}>
      <div className="flex flex-1 flex-wrap items-center gap-4">
        <Dropdown
          value={reportType}
          options={reportTypeOptions}
          onChange={setReportType}
          ariaLabel="Report type"
          size="small"
        />
        <Dropdown
          value={dateRange}
          options={dateRangeOptions}
          onChange={setDateRange}
          ariaLabel="Date range"
          size="small"
        />
        <PDFDownloadHandler
          document={
            <GenericReport
              userName={email}
              reportType={reportType}
              dateRange={dateRange}
              exportedAtIso={new Date().toISOString()}
            />
          }
          fileName={`reports-${reportType}-${dateRange}.pdf`}
          label="Export PDF"
        />
      </div>
    </TopBarShell>
  );
}
