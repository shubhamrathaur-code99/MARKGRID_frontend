"use client";

import { StructuredSectionContent } from "./StructuredSectionContent";
import { SECTION_LABELS } from "./BrandAnalysisNav";

interface CustomerExperience1Props {
  sectionData: unknown;
  searchQuery?: string;
}

export function CustomerExperience1({
  sectionData,
  searchQuery,
}: CustomerExperience1Props) {
  return (
    <StructuredSectionContent
      pageTitle={SECTION_LABELS.customer_experience_1}
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
