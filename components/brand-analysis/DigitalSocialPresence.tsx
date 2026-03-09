"use client";

import { StructuredSectionContent } from "./StructuredSectionContent";
import { SECTION_LABELS } from "./BrandAnalysisNav";

interface DigitalSocialPresenceProps {
  sectionData: unknown;
  searchQuery?: string;
}

export function DigitalSocialPresence({
  sectionData,
  searchQuery,
}: DigitalSocialPresenceProps) {
  return (
    <StructuredSectionContent
      pageTitle={SECTION_LABELS.digital_and_social_presence}
      sectionData={sectionData}
      searchQuery={searchQuery}
    />
  );
}
