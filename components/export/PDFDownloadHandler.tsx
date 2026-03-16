"use client";

import type { ReactElement } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

interface PDFDownloadHandlerProps {
  document: ReactElement;
  fileName: string;
  label?: string;
}

export function PDFDownloadHandler({
  document,
  fileName,
  label = "Export",
}: PDFDownloadHandlerProps) {
  return (
    <PDFDownloadLink document={document} fileName={fileName}>
      {({ loading }) => (
        <button
          type="button"
          className="flex h-10 items-center gap-2 rounded-xl bg-white/10 px-3 text-sm font-medium text-neutral-700 transition-colors hover:bg-[#0070ff]/10 hover:text-[#0070ff] dark:text-neutral-300 dark:hover:bg-[#0070ff]/20 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Preparing PDF…" : label}
        </button>
      )}
    </PDFDownloadLink>
  );
}

