"use client";

import {
  extractParagraphs,
  dedupeParagraphs,
  formatSectionAsUISection,
  filterSectionByQuery,
} from "./utils";
import { UISectionBlock } from "./ui";

const BRAND_FOUNDATION_KEYS: Array<{ key: string; label: string }> = [
  { key: "brand_promise", label: "Brand Promise" },
  { key: "brand_story", label: "Brand Story" },
  { key: "mission", label: "Mission" },
  { key: "personality", label: "Personality" },
  { key: "purpose", label: "Purpose" },
  { key: "uvp", label: "Unique Value Proposition" },
  { key: "values", label: "Values" },
  { key: "vision", label: "Vision" },
];

interface BrandFoundationContentProps {
  sectionData: unknown;
  searchQuery?: string;
}

export function BrandFoundationContent({
  sectionData,
  searchQuery,
}: BrandFoundationContentProps) {
  const data =
    sectionData && typeof sectionData === "object" ? sectionData : {};

  const sections = BRAND_FOUNDATION_KEYS.map(({ key, label }) => {
    const value = (data as Record<string, unknown>)[key];
    const rawParagraphs = extractParagraphs(value);
    const paragraphs = dedupeParagraphs(rawParagraphs);
    if (paragraphs.length === 0) return null;
    let section = formatSectionAsUISection(label, paragraphs);
    if (searchQuery?.trim()) {
      section = filterSectionByQuery(section, searchQuery);
    }
    const hasContent =
      section.section_summary ||
      section.key_points.length > 0 ||
      section.highlights.length > 0 ||
      section.stats.length > 0 ||
      section.subsections.length > 0;
    if (!hasContent) return null;
    return <UISectionBlock key={key} section={section} />;
  }).filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Brand Foundation
      </h2>
      {sections.length > 0 ? (
        <div className="space-y-10">{sections}</div>
      ) : searchQuery?.trim() ? (
        <p className="text-neutral-500 dark:text-neutral-400">
          No results for &quot;{searchQuery.trim()}&quot; in this section.
        </p>
      ) : (
        <p className="text-neutral-500 dark:text-neutral-400">
          No content available for this section.
        </p>
      )}
    </div>
  );
}
