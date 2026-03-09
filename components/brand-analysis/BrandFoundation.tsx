"use client";

import { BrandFoundationContent } from "./BrandFoundationContent";

interface BrandFoundationProps {
  sectionData: unknown;
  searchQuery?: string;
}

export function BrandFoundation({
  sectionData,
  searchQuery,
}: BrandFoundationProps) {
  return (
    <BrandFoundationContent
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
