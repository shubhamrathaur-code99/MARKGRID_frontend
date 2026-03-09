"use client";

interface BulletListProps {
  label?: string;
  items: string[];
}

const bulletListClass =
  "list-disc space-y-2 pl-6 leading-relaxed text-neutral-600 dark:text-neutral-400";
const labelClass =
  "mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400";

export function BulletList({ label, items }: BulletListProps) {
  if (items.length === 0) return null;
  return (
    <div className="mb-4">
      {label ? <h4 className={labelClass}>{label}</h4> : null}
      <ul className={bulletListClass}>
        {items.map((text, idx) => (
          <li key={idx}>{text}</li>
        ))}
      </ul>
    </div>
  );
}
