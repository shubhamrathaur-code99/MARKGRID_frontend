"use client";

import { BulletList } from "./BulletList";

interface HighlightBlockProps {
  items: string[];
}

export function HighlightBlock({ items }: HighlightBlockProps) {
  return <BulletList label="Highlights" items={items} />;
}
