"use client";

import {
  extractParagraphs,
  dedupeParagraphs,
  formatSectionAsUISection,
  filterSectionByQuery,
} from "./utils";
import { UISectionBlock } from "./ui";

interface StructuredSectionContentProps {
  pageTitle: string;
  sectionData: unknown;
  searchQuery?: string;
}

/**
 * Renders a single tab’s content using the same structure as Brand Foundation:
 * section title, summary, key points, highlights, stats, subsections.
 * Used by all non–Brand Foundation tabs.
 */
export function StructuredSectionContent({
  pageTitle,
  sectionData,
  searchQuery,
}: StructuredSectionContentProps) {
  const rawParagraphs = extractParagraphs(sectionData);
  const paragraphs = dedupeParagraphs(rawParagraphs);
  let section = formatSectionAsUISection(pageTitle, paragraphs);
  if (searchQuery?.trim()) {
    section = filterSectionByQuery(section, searchQuery);
  }

  const hasContent =
    section.section_summary ||
    section.key_points.length > 0 ||
    section.highlights.length > 0 ||
    section.stats.length > 0 ||
    section.subsections.length > 0;

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h2 className="mb-8 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {pageTitle}
      </h2>
      {hasContent ? (
        <div className="space-y-10">
          <UISectionBlock
          section={section}
          hideTitleWhenSameAs={pageTitle}
        />
        </div>
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
