"use client";

import { StructuredSectionContent } from "./StructuredSectionContent";
import { SECTION_LABELS } from "./BrandAnalysisNav";

interface GrowthSWOTProps {
  sectionData: unknown;
  searchQuery?: string;
}

export function GrowthSWOT({
  sectionData,
  searchQuery,
}: GrowthSWOTProps) {
  return (
    <StructuredSectionContent
      pageTitle={SECTION_LABELS.growth_and_swot}
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
