 "use client";

import { useState, useMemo } from "react";
import { DashboardBackgroundLayer } from "./DashboardBackgroundLayer";
import { FloatingSidebar } from "./FloatingSidebar";
import { BrandAnalysisTopBar } from "@/components/topbar/BrandAnalysisTopBar";
import {
  SECTION_IDS,
  SECTION_LABELS,
  type BrandAnalysisSectionId,
} from "../brand-analysis/BrandAnalysisNav";
import { BrandFoundation } from "../brand-analysis/BrandFoundation";
import { BrandPositioning } from "../brand-analysis/BrandPositioning";
import { CustomerExperience1 } from "../brand-analysis/CustomerExperience1";
import { CustomerExperience2 } from "../brand-analysis/CustomerExperience2";
import { DigitalSocialPresence } from "../brand-analysis/DigitalSocialPresence";
import { GrowthSWOT } from "../brand-analysis/GrowthSWOT";
import { MarketCategory } from "../brand-analysis/MarketCategory";
import { ProductServices } from "../brand-analysis/ProductServices";
import { SocialRelevance } from "../brand-analysis/SocialRelevance";
import { TargetAudience } from "../brand-analysis/TargetAudience";
import { ToneBrandPillars } from "../brand-analysis/ToneBrandPillars";
import brandData from "@/data/brands/dummy_neosapien.json";
import type { DateRangeKey } from "@/components/export/ExportService";
import { PDFDownloadHandler } from "@/components/export/PDFDownloadHandler";
import { BrandAnalysisReport } from "@/features/brand-analysis/export/BrandAnalysisReport";
import { motion, AnimatePresence } from "framer-motion";

interface SectionComponentProps {
  sectionData: unknown;
  searchQuery?: string;
}

const SECTION_COMPONENTS: Record<
  BrandAnalysisSectionId,
  React.ComponentType<SectionComponentProps>
> = {
  brand_foundation: BrandFoundation,
  brand_positioning: BrandPositioning,
  customer_experience_1: CustomerExperience1,
  customer_experience_2: CustomerExperience2,
  digital_and_social_presence: DigitalSocialPresence,
  growth_and_swot: GrowthSWOT,
  market_and_category: MarketCategory,
  product_and_services: ProductServices,
  social_relevence: SocialRelevance,
  target_audience: TargetAudience,
  tone_and_brand_pillars: ToneBrandPillars,
};

export function BrandAnalysisLayout({ email }: { email: string }) {
  const [activeSection, setActiveSection] =
    useState<BrandAnalysisSectionId>("brand_foundation");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange] = useState<DateRangeKey>("last_28_days");

  const analysis = useMemo(() => {
    const data = brandData as { analysis?: Record<string, unknown> };
    return data.analysis ?? {};
  }, []);

  const companyName = useMemo(() => {
    const data = brandData as {
      analysis?: { brand_foundation?: { brand_name?: string } };
    };
    return data.analysis?.brand_foundation?.brand_name ?? "Brand";
  }, []);

  const sectionData = analysis[activeSection] ?? {};
  const ActiveComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className="relative min-h-screen">
      <DashboardBackgroundLayer />
      <div className="relative z-10">
        <FloatingSidebar />
        <BrandAnalysisTopBar
          email={email}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          exportControl={
            <PDFDownloadHandler
              document={
                <BrandAnalysisReport
                  companyName={companyName}
                  dateRange={dateRange}
                  exportedAtIso={new Date().toISOString()}
                  analysis={analysis}
                  chartsBySection={{}}
                />
              }
              fileName={`brand-analysis-report-${dateRange}.pdf`}
              label="Export PDF"
            />
          }
        />
        <div
          id="brand-analysis-content"
          className="pl-4 pr-4 pt-[88px] pb-10 lg:pl-[272px] lg:pr-10 lg:pt-[88px]"
        >
          <div
            className="h-[calc(100vh-5.5rem)] overflow-y-auto"
            role="main"
          >
            <div className="mx-auto max-w-5xl px-4 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {ActiveComponent ? (
                    <ActiveComponent
                      sectionData={sectionData}
                      searchQuery={searchQuery}
                    />
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
