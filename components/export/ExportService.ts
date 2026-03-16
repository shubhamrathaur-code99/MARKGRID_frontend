"use client";

import { downloadBlobAsFile } from "./PDFGenerator";

export type DateRangeKey = "last_7_days" | "last_28_days" | "last_90_days";

interface BrandAnalysisExportPayload {
  companyId: string;
  companyName: string;
  dateRange: DateRangeKey;
  exportedAtIso: string;
  /** Full HTML of the brand analysis content wrapper so backend can render it into a template. */
  sectionsHtml: string;
}

export async function exportBrandAnalysisReport(
  payload: BrandAnalysisExportPayload,
): Promise<void> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const res = await fetch(`${apiBase}/reports/brand-analysis`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      company_id: payload.companyId,
      company_name: payload.companyName,
      date_range: payload.dateRange,
      exported_at_iso: payload.exportedAtIso,
      sections_html: payload.sectionsHtml,
      report_type: "brand-analysis",
    }),
  });

  const fallbackFilename = `brand-analysis-report-${payload.dateRange}-${payload.exportedAtIso.slice(0, 10)}.pdf`;
  await downloadBlobAsFile(res, fallbackFilename);
}

