const DEFAULT_EXCLUDE_KEYS = [
  "brand_name",
  "archtype",
  "created_at",
  "id",
  "job_id",
];

export type ExtractParagraphsOptions = {
  excludeKeys?: string[];
};

/**
 * Recursively extract readable paragraphs from a section (string, array, or object).
 * When section is an object, keys in options.excludeKeys (default: brand_name, archtype, created_at, id, job_id) are skipped.
 */
export function extractParagraphs(
  section: unknown,
  options?: ExtractParagraphsOptions
): string[] {
  const excludeKeys = new Set(
    options?.excludeKeys ?? DEFAULT_EXCLUDE_KEYS
  );
  const result: string[] = [];

  const addString = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (
      (trimmed.startsWith("{") || trimmed.startsWith("[")) &&
      trimmed.includes("{")
    ) {
      try {
        const parsed = JSON.parse(trimmed);
        result.push(...extractParagraphs(parsed, options));
        return;
      } catch {
        // fall through
      }
    }

    result.push(trimmed);
  };

  if (typeof section === "string") {
    addString(section);
    return result;
  }

  if (Array.isArray(section)) {
    for (const item of section) {
      result.push(...extractParagraphs(item, options));
    }
    return result;
  }

  if (section && typeof section === "object") {
    for (const [key, value] of Object.entries(section)) {
      if (excludeKeys.has(key)) continue;
      if (
        typeof value === "string" ||
        Array.isArray(value) ||
        (value && typeof value === "object")
      ) {
        result.push(...extractParagraphs(value, options));
      }
    }
  }

  return result;
}

/**
 * Deduplicate paragraphs by normalized text (trim + collapse whitespace).
 * Keeps first occurrence of each unique content.
 */
export function dedupeParagraphs(paragraphs: string[]): string[] {
  const seen = new Set<string>();
  return paragraphs.filter((p) => {
    const normalized = p.trim().replace(/\s+/g, " ");
    if (seen.has(normalized)) return false;
    seen.add(normalized);
    return true;
  });
}

const MAX_WORDS_SUMMARY_SENTENCES = 40; // 1–2 sentences, no hard cap on chars
const MAX_KEY_POINTS = 7;
const MAX_HIGHLIGHTS_ITEMS = 5;
const MAX_BULLETS_PER_SUBSECTION = 7;
const MAX_WORDS_PER_MERGED_BULLET = 40; // for "More" subsection: merge small bullets into fewer points

function wordCount(text: string): number {
  return text.trim().replace(/\s+/g, " ").split(" ").filter(Boolean).length;
}

/**
 * Get first 1–2 sentences from text (exact wording). Used for section summary.
 */
function getFirstSentences(text: string, maxSentences = 2): string {
  const normalized = text.trim().replace(/\s+/g, " ");
  if (!normalized) return "";
  const sentences = normalized.split(/(?<=\.)\s+/).filter(Boolean);
  const taken = sentences.slice(0, maxSentences);
  const joined = taken.join(" ").trim();
  return joined.endsWith(".") ? joined : `${joined}.`;
}

/**
 * Split a long sentence at comma/semicolon boundaries into chunks ≤ maxWords.
 * Preserves exact wording; each chunk is grammatically complete (ends with , ; or .).
 */
function splitLongSentenceAtClauses(sentence: string, maxWords: number): string[] {
  const trimmed = sentence.trim().replace(/\s+/g, " ");
  if (!trimmed) return [];
  if (wordCount(trimmed) <= maxWords) {
    const withPeriod = trimmed.endsWith(".") ? trimmed : `${trimmed}.`;
    return [withPeriod];
  }
  // Split at comma or semicolon, keeping delimiter with preceding part
  const parts: string[] = [];
  const re = /[^,;]+(?:[,;])?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(trimmed)) !== null) {
    const part = m[0].trim();
    if (part) parts.push(part);
  }
  if (parts.length === 0) return [trimmed.endsWith(".") ? trimmed : `${trimmed}.`];

  // Group consecutive parts into bullets ≤ maxWords
  const bullets: string[] = [];
  let current = "";
  for (const p of parts) {
    const withComma = current ? `${current} ${p}` : p;
    if (wordCount(withComma) <= maxWords) {
      current = withComma;
    } else {
      if (current) bullets.push(current.trim());
      current = p;
    }
  }
  if (current) {
    const last = current.endsWith(".") ? current : `${current}.`;
    bullets.push(last);
  }
  return bullets;
}

/**
 * Split paragraphs into bullets: one full sentence per bullet.
 * No comma-splitting; each bullet is a standalone sentence so points don't read as continuations.
 */
function splitIntoCompleteBullets(paragraphs: string[]): string[] {
  const result: string[] = [];
  for (const p of paragraphs) {
    const normalized = p.trim().replace(/\s+/g, " ");
    if (!normalized) continue;
    const sentences = normalized.split(/(?<=\.)\s+/).filter(Boolean);
    for (let i = 0; i < sentences.length; i++) {
      let s = sentences[i].trim();
      if (!s) continue;
      if (!s.endsWith(".")) s = `${s}.`;
      result.push(s);
    }
  }
  return result;
}

/** Extract stat-like phrases (numbers, $, %, milestones) from text. */
function extractStats(text: string): string[] {
  const stats: string[] = [];
  const normalized = text.replace(/\s+/g, " ");
  const patterns = [
    /\$[\d.]+\s*[MK]?\s*(?:seed|funding)?/gi,
    /\d+%\s*(?:growth|Q-o-Q|quarter)/gi,
    /\d+\+\s*languages?/gi,
    /(?:raised|secured)\s+\$?[\d.]+\s*[MK]?/gi,
    /Best\s+[^.]+(?:Year|Award)/gi,
    /\d{4}\b/g,
  ];
  for (const re of patterns) {
    const matches = normalized.match(re);
    if (matches) {
      for (const m of matches.slice(0, 3)) {
        const clean = m.trim();
        if (clean.length > 6 && clean.length < 80) stats.push(clean);
      }
    }
  }
  return Array.from(new Set(stats)).slice(0, 6);
}

/**
 * UX content architect section: structured for cards, accordions, stat badges.
 */
export type UISection = {
  section_title: string;
  section_summary: string;
  key_points: string[];
  highlights: string[];
  stats: string[];
  subsections: Array<{ title: string; bullets: string[] }>;
};

/** Return true if text contains query (case-insensitive). */
function textMatchesQuery(text: string, query: string): boolean {
  return text.trim().toLowerCase().includes(query.trim().toLowerCase());
}

/**
 * Filter a UISection to only include items that contain the search query (case-insensitive).
 * If query is empty, returns section unchanged.
 */
export function filterSectionByQuery(
  section: UISection,
  query: string
): UISection {
  const q = query.trim();
  if (!q) return section;
  const summaryIncluded = textMatchesQuery(section.section_summary, q);
  return {
    section_title: section.section_title,
    section_summary: summaryIncluded ? section.section_summary : "",
    key_points: section.key_points.filter((s) => textMatchesQuery(s, q)),
    highlights: section.highlights.filter((s) => textMatchesQuery(s, q)),
    stats: section.stats.filter((s) => textMatchesQuery(s, q)),
    subsections: section.subsections
      .map((sub) => ({
        title: sub.title,
        bullets: sub.bullets.filter((s) => textMatchesQuery(s, q)),
      }))
      .filter((sub) => sub.bullets.length > 0),
  };
}

/**
 * Normalize whitespace only (trim + collapse spaces). Does not truncate or change wording.
 */
function normalizeWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

/** Ensure bullet starts with uppercase for display as a standalone point. */
function capitalizeFirst(text: string): string {
  const t = text.trim();
  if (!t) return t;
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Merge consecutive bullets into fewer points, each up to maxWordsPerBullet words.
 * Preserves exact wording; no truncation. Used for "More" subsection to reduce list density.
 */
function mergeBullets(bullets: string[], maxWordsPerBullet: number): string[] {
  if (bullets.length === 0) return [];
  const result: string[] = [];
  let current = bullets[0].trim();
  for (let i = 1; i < bullets.length; i++) {
    const next = bullets[i].trim();
    const combined = `${current} ${next}`;
    if (wordCount(combined) <= maxWordsPerBullet) {
      current = combined;
    } else {
      result.push(current);
      current = next;
    }
  }
  result.push(current);
  return result;
}

/**
 * Convert paragraphs into structured UI section: summary (1–2 sentences), key points,
 * highlights, stats, subsections. Content is split into grammatically complete bullets
 * (~18 words max) at sentence/clause boundaries; no wording is changed or removed.
 */
export function formatSectionAsUISection(
  sectionTitle: string,
  paragraphs: string[]
): UISection {
  if (paragraphs.length === 0) {
    return {
      section_title: sectionTitle,
      section_summary: "",
      key_points: [],
      highlights: [],
      stats: [],
      subsections: [],
    };
  }
  const normalized = paragraphs.map(normalizeWhitespace).filter((p) => p.length > 0);
  if (normalized.length === 0) {
    return {
      section_title: sectionTitle,
      section_summary: "",
      key_points: [],
      highlights: [],
      stats: [],
      subsections: [],
    };
  }
  const fullText = normalized.join(" ");
  const stats = extractStats(fullText);
  const section_summary = getFirstSentences(normalized[0], 2);
  const allBullets = splitIntoCompleteBullets(normalized);
  const deduped = allBullets.filter(
    (b, i) => allBullets.indexOf(b) === i && b.length > 5
  );
  const capped = (arr: string[]) => arr.map(capitalizeFirst);
  const key_points = capped(deduped.slice(0, MAX_KEY_POINTS));
  const highlights = capped(deduped.slice(MAX_KEY_POINTS, MAX_KEY_POINTS + MAX_HIGHLIGHTS_ITEMS));
  const rest = deduped.slice(MAX_KEY_POINTS + MAX_HIGHLIGHTS_ITEMS);
  const subsections: Array<{ title: string; bullets: string[] }> = [];
  if (rest.length > 0) {
    subsections.push({
      title: "Details",
      bullets: capped(rest.slice(0, MAX_BULLETS_PER_SUBSECTION)),
    });
    if (rest.length > MAX_BULLETS_PER_SUBSECTION) {
      const moreRaw = rest.slice(MAX_BULLETS_PER_SUBSECTION);
      const moreMerged = mergeBullets(moreRaw, MAX_WORDS_PER_MERGED_BULLET);
      subsections.push({
        title: "More",
        bullets: capped(moreMerged),
      });
    }
  }
  return {
    section_title: sectionTitle,
    section_summary,
    key_points,
    highlights,
    stats,
    subsections,
  };
}
