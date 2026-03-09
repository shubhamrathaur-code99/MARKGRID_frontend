"use client";

import { StructuredSectionContent } from "./StructuredSectionContent";
import { SECTION_LABELS } from "./BrandAnalysisNav";

interface CustomerExperience2Props {
  sectionData: unknown;
  searchQuery?: string;
}

export function CustomerExperience2({
  sectionData,
  searchQuery,
}: CustomerExperience2Props) {
  return (
    <StructuredSectionContent
      pageTitle={SECTION_LABELS.customer_experience_2}
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
