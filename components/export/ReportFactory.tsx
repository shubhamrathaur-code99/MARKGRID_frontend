"use client";

import type { ReactElement } from "react";
import { createBrandAnalysisDocument } from "@/features/brand-analysis/export/BrandAnalysisPDF";

export type ExportPage =
  | "brand-analysis"
  | "seo"
  | "competitors"
  | "reports"
  | "dashboard"
  | "keywords"
  | "influencers"
  | "ai-studio";

export type BaseReportProps = {
  companyName?: string;
  dateRange?: string;
  exportedAtIso: string;
  brandAnalysis?: {
    summary: any;
    sections: any[];
  };
  seoData?: any;
  competitorsData?: any;
};

export function createReportDocument(
  page: ExportPage,
  props: BaseReportProps,
): ReactElement {
  const exportedAt = props.exportedAtIso ?? new Date().toISOString();
  const dateRangeLabel = props.dateRange ?? "Last 28 days";

  switch (page) {
    case "brand-analysis":
      return createBrandAnalysisDocument({
        companyName: props.companyName ?? "Brand",
        exportDate: exportedAt,
        dateRangeLabel,
        summary: props.brandAnalysis?.summary ?? {
          brandScore: "-",
          sentimentScore: "-",
          mentionsCount: "-",
          overallInsights: "",
        },
        sections: props.brandAnalysis?.sections ?? [],
      });

    default:
      return createBrandAnalysisDocument({
        companyName: props.companyName ?? "MarkGrid",
        exportDate: exportedAt,
        dateRangeLabel,
        summary: {
          brandScore: "-",
          sentimentScore: "-",
          mentionsCount: "-",
          overallInsights: "No module-specific report implemented yet.",
        },
        sections: [],
      });
  }
}

