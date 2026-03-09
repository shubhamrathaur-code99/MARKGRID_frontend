"use client";

import { StructuredSectionContent } from "./StructuredSectionContent";
import { SECTION_LABELS } from "./BrandAnalysisNav";

interface BrandPositioningProps {
  sectionData: unknown;
  searchQuery?: string;
}

export function BrandPositioning({
  sectionData,
  searchQuery,
}: BrandPositioningProps) {
  return (
    <StructuredSectionContent
      pageTitle={SECTION_LABELS.brand_positioning}
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
