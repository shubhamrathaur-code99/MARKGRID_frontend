"use client";

import { getTabClasses } from "../shared/tabStyles";

export const SECTION_IDS = [
  "brand_foundation",
  "brand_positioning",
  "customer_experience_1",
  "customer_experience_2",
  "digital_and_social_presence",
  "growth_and_swot",
  "market_and_category",
  "product_and_services",
  "social_relevence",
  "target_audience",
  "tone_and_brand_pillars",
] as const;

export const SECTION_LABELS: Record<(typeof SECTION_IDS)[number], string> = {
  brand_foundation: "Brand Foundation",
  brand_positioning: "Brand Positioning",
  customer_experience_1: "Customer Experience (Part 1)",
  customer_experience_2: "Customer Experience (Part 2)",
  digital_and_social_presence: "Digital and Social Presence",
  growth_and_swot: "Growth and SWOT",
  market_and_category: "Market and Category",
  product_and_services: "Product and Services",
  social_relevence: "Social Relevance",
  target_audience: "Target Audience",
  tone_and_brand_pillars: "Tone and Brand Pillars",
};

export type BrandAnalysisSectionId = (typeof SECTION_IDS)[number];

interface BrandAnalysisNavProps {
  activeSection: BrandAnalysisSectionId;
  onSectionChange: (id: BrandAnalysisSectionId) => void;
}

export function BrandAnalysisNav({
  activeSection,
  onSectionChange,
}: BrandAnalysisNavProps) {
  return (
    <div className="flex items-center gap-1 py-0.5 md:gap-2">
      {SECTION_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onSectionChange(id)}
          className={getTabClasses(activeSection === id)}
        >
          {SECTION_LABELS[id]}
        </button>
      ))}
    </div>
  );
}
