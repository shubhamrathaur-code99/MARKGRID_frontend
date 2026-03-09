"use client";

import { extractParagraphs, dedupeParagraphs } from "./utils";

interface SectionContentProps {
  title: string;
  sectionData: unknown;
}

/**
 * Renders a single brand analysis section with title and extracted paragraphs.
 * Used by all tab section components.
 */
export function SectionContent({ title, sectionData }: SectionContentProps) {
  const rawParagraphs = extractParagraphs(sectionData);
  const paragraphs = dedupeParagraphs(rawParagraphs);

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
      {paragraphs.length > 0 ? (
        paragraphs.length === 1 ? (
          <p className="leading-relaxed text-neutral-600 dark:text-neutral-400">
            {paragraphs[0]}
          </p>
        ) : (
          <ul className="list-disc space-y-2 pl-6">
            {paragraphs.map((text, idx) => (
              <li
                key={idx}
                className="leading-relaxed text-neutral-600 dark:text-neutral-400"
              >
                {text}
              </li>
            ))}
          </ul>
        )
      ) : (
        <p className="text-neutral-500 dark:text-neutral-400">
          No content available for this section.
        </p>
      )}
    </div>
  );
}
