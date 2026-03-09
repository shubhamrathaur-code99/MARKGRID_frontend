"use client";

import { StructuredSectionContent } from "./StructuredSectionContent";
import { SECTION_LABELS } from "./BrandAnalysisNav";

interface ToneBrandPillarsProps {
  sectionData: unknown;
  searchQuery?: string;
}

export function ToneBrandPillars({
  sectionData,
  searchQuery,
}: ToneBrandPillarsProps) {
  return (
    <StructuredSectionContent
      pageTitle={SECTION_LABELS.tone_and_brand_pillars}
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
