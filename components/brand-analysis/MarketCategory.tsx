"use client";

import { StructuredSectionContent } from "./StructuredSectionContent";
import { SECTION_LABELS } from "./BrandAnalysisNav";

interface MarketCategoryProps {
  sectionData: unknown;
  searchQuery?: string;
}

export function MarketCategory({
  sectionData,
  searchQuery,
}: MarketCategoryProps) {
  return (
    <StructuredSectionContent
      pageTitle={SECTION_LABELS.market_and_category}
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
