"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Download, ChevronDown } from "lucide-react";
import { ExportButton } from "./ExportButton";
import { exportToCSV } from "./exportCSV";
import type { ExportPage, BaseReportProps } from "./ReportFactory";

interface ExportDropdownProps {
  page: ExportPage;
  pdfData: BaseReportProps;
  csvConfig?: {
    filename: string;
    headers: string[];
    rows: (string | number)[][];
  };
  className?: string;
}

export function ExportDropdown({
  page,
  pdfData,
  csvConfig,
  className = "",
}: ExportDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex h-10 items-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-[#0070ff]/10 hover:text-[#0070ff] dark:text-neutral-300 dark:hover:bg-[#0070ff]/20"
      >
        <Download className="h-4 w-4" />
        <span>Export</span>
        <ChevronDown className={`h-4 w-4 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-1 w-44 rounded-lg border border-neutral-200 bg-white py-1 text-sm text-neutral-900 shadow-lg dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-50">
          <div className="px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <ExportButton page={page} data={pdfData} className="w-full text-left">
              Export as PDF
            </ExportButton>
          </div>
          {csvConfig && (
            <button
              type="button"
              className="block w-full px-4 py-1.5 text-left hover:bg-neutral-100 dark:hover:bg-neutral-800"
              onClick={() =>
                exportToCSV(
                  csvConfig.headers,
                  csvConfig.rows,
                  csvConfig.filename,
                )
              }
            >
              Export as CSV
            </button>
          )}
        </div>
      )}
    </div>
  );
}

