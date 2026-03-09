"use client";

import { StructuredSectionContent } from "./StructuredSectionContent";
import { SECTION_LABELS } from "./BrandAnalysisNav";

interface SocialRelevanceProps {
  sectionData: unknown;
  searchQuery?: string;
}

export function SocialRelevance({
  sectionData,
  searchQuery,
}: SocialRelevanceProps) {
  return (
    <StructuredSectionContent
      pageTitle={SECTION_LABELS.social_relevence}
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
