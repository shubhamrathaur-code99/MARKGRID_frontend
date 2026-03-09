"use client";

import { StructuredSectionContent } from "./StructuredSectionContent";
import { SECTION_LABELS } from "./BrandAnalysisNav";

interface TargetAudienceProps {
  sectionData: unknown;
  searchQuery?: string;
}

export function TargetAudience({
  sectionData,
  searchQuery,
}: TargetAudienceProps) {
  return (
    <StructuredSectionContent
      pageTitle={SECTION_LABELS.target_audience}
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
