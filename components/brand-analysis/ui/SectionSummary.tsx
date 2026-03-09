"use client";

interface SectionSummaryProps {
  text: string;
}

const paragraphClass =
  "leading-relaxed text-neutral-600 dark:text-neutral-400";

export function SectionSummary({ text }: SectionSummaryProps) {
  return <p className={`mb-4 ${paragraphClass}`}>{text}</p>;
}
