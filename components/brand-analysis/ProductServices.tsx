"use client";

import { StructuredSectionContent } from "./StructuredSectionContent";
import { SECTION_LABELS } from "./BrandAnalysisNav";

interface ProductServicesProps {
  sectionData: unknown;
  searchQuery?: string;
}

export function ProductServices({
  sectionData,
  searchQuery,
}: ProductServicesProps) {
  return (
    <StructuredSectionContent
      pageTitle={SECTION_LABELS.product_and_services}
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
