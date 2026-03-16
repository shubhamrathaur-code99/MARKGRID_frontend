"use client";

import { ExportActions } from "./ExportActions";

interface AIResponsePanelProps {
  output: string | null;
  onCopy: () => void;
  onDownload: () => void;
  onExport?: () => void;
  emptyMessage?: string;
}

export function AIResponsePanel({
  output,
  onCopy,
  onDownload,
  onExport,
  emptyMessage = "Generated content will appear here.",
}: AIResponsePanelProps) {
  const isEmpty = !output || output.trim() === "";

  return (
    <div className="flex flex-1 flex-col min-h-0 rounded-xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800 overflow-hidden">
      <div className="flex items-center justify-between gap-2 border-b border-neutral-200 px-4 py-2 dark:border-neutral-700">
        <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
          Response
        </span>
        {!isEmpty && (
          <ExportActions
            onCopy={onCopy}
            onDownload={onDownload}
            onExport={onExport}
          />
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {isEmpty ? (
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {emptyMessage}
          </p>
        ) : (
          <pre className="whitespace-pre-wrap font-sans text-sm text-neutral-800 dark:text-neutral-200">
            {output}
          </pre>
        )}
      </div>
    </div>
  );
}
