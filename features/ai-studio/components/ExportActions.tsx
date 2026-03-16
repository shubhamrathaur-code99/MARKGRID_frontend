"use client";

import { Copy, Download, FileDown } from "lucide-react";

const btnClass =
  "flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-[#0070ff]/10 hover:text-[#0070ff] dark:text-neutral-300 dark:hover:bg-[#0070ff]/20 focus:outline-none focus:ring-2 focus:ring-[#0070ff]";

interface ExportActionsProps {
  onCopy: () => void;
  onDownload: () => void;
  onExport?: () => void;
  copyLabel?: string;
}

export function ExportActions({
  onCopy,
  onDownload,
  onExport,
  copyLabel = "Copy",
}: ExportActionsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={onCopy} className={btnClass}>
        <Copy className="h-4 w-4" />
        {copyLabel}
      </button>
      <button type="button" onClick={onDownload} className={btnClass}>
        <Download className="h-4 w-4" />
        Download
      </button>
      {onExport && (
        <button type="button" onClick={onExport} className={btnClass}>
          <FileDown className="h-4 w-4" />
          Export
        </button>
      )}
    </div>
  );
}
