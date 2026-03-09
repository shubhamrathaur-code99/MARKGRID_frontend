"use client";

import { BulletList } from "./BulletList";

interface SubsectionCardProps {
  title: string;
  bullets: string[];
}

const subsectionTitleClass =
  "mb-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300";

export function SubsectionCard({ title, bullets }: SubsectionCardProps) {
  if (bullets.length === 0) return null;
  return (
    <div className="mt-4">
      <h4 className={subsectionTitleClass}>{title}</h4>
      <BulletList items={bullets} />
    </div>
  );
}
