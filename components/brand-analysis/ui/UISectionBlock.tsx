"use client";

import type { UISection } from "../utils";
import { SectionContainer } from "./SectionContainer";
import { SectionSummary } from "./SectionSummary";
import { BulletList } from "./BulletList";
import { HighlightBlock } from "./HighlightBlock";
import { StatsRow } from "./StatsRow";
import { SubsectionCard } from "./SubsectionCard";

interface UISectionBlockProps {
  section: UISection;
  /** When set, do not render the section title (h3) if it equals this string (e.g. main page heading). */
  hideTitleWhenSameAs?: string;
}

const sectionTitleClass =
  "mb-3 text-lg font-bold text-neutral-800 dark:text-neutral-200";

export function UISectionBlock({
  section,
  hideTitleWhenSameAs,
}: UISectionBlockProps) {
  const hasContent =
    section.section_summary ||
    section.key_points.length > 0 ||
    section.highlights.length > 0 ||
    section.stats.length > 0 ||
    section.subsections.length > 0;

  if (!hasContent) return null;

  const showTitle =
    !hideTitleWhenSameAs || section.section_title !== hideTitleWhenSameAs;

  return (
    <SectionContainer>
      {showTitle ? (
        <h3 className={sectionTitleClass}>{section.section_title}</h3>
      ) : null}
      {section.section_summary ? (
        <SectionSummary text={section.section_summary} />
      ) : null}
      <StatsRow stats={section.stats} />
      <BulletList label="Key points" items={section.key_points} />
      <HighlightBlock items={section.highlights} />
      {section.subsections.map((sub, subIdx) => (
        <SubsectionCard
          key={subIdx}
          title={sub.title}
          bullets={sub.bullets}
        />
      ))}
    </SectionContainer>
  );
}
