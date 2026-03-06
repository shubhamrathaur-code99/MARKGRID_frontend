"use client";

import brandData from "@/data/brands/dummy_neosapien.json";

function extractParagraphs(section: unknown): string[] {
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
        result.push(...extractParagraphs(parsed));
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
      result.push(...extractParagraphs(item));
    }
    return result;
  }

  if (section && typeof section === "object") {
    for (const value of Object.values(section)) {
      if (
        typeof value === "string" ||
        Array.isArray(value) ||
        (value && typeof value === "object")
      ) {
        result.push(...extractParagraphs(value));
      }
    }
  }

  return result;
}

export function BrandAnalysisArticle() {
  const analysis =
    ((brandData as unknown as { analysis?: Record<string, unknown> })
      .analysis as Record<string, unknown> | undefined) ?? {};

  const brandFoundation = analysis.brand_foundation ?? {};
  const brandPositioning = analysis.brand_positioning ?? {};
  const customerExperience1 = analysis.customer_experience_1 ?? {};
  const customerExperience2 = analysis.customer_experience_2 ?? {};
  const digitalAndSocialPresence = analysis.digital_and_social_presence ?? {};
  const growthAndSwot = analysis.growth_and_swot ?? {};
  const marketAndCategory = analysis.market_and_category ?? {};
  const productAndServices = analysis.product_and_services ?? {};
  const socialRelevance = analysis.social_relevence ?? {};
  const targetAudience = analysis.target_audience ?? {};
  const toneAndBrandPillars = analysis.tone_and_brand_pillars ?? {};

  const brandName =
    (brandFoundation as Record<string, string>).brand_name ||
    (brandPositioning as Record<string, string>).brand_name ||
    (brandData as { brand_name?: string }).brand_name ||
    "Brand";

  const sections: { id: string; title: string; paragraphs: string[] }[] = [
    { id: "brand_foundation", title: "Brand Foundation", paragraphs: extractParagraphs(brandFoundation) },
    { id: "brand_positioning", title: "Brand Positioning", paragraphs: extractParagraphs(brandPositioning) },
    {
      id: "customer_experience_1",
      title: "Customer Experience (Part 1)",
      paragraphs: extractParagraphs(customerExperience1),
    },
    {
      id: "customer_experience_2",
      title: "Customer Experience (Part 2)",
      paragraphs: extractParagraphs(customerExperience2),
    },
    {
      id: "digital_and_social_presence",
      title: "Digital and Social Presence",
      paragraphs: extractParagraphs(digitalAndSocialPresence),
    },
    { id: "growth_and_swot", title: "Growth and SWOT", paragraphs: extractParagraphs(growthAndSwot) },
    {
      id: "market_and_category",
      title: "Market and Category",
      paragraphs: extractParagraphs(marketAndCategory),
    },
    {
      id: "product_and_services",
      title: "Product and Services",
      paragraphs: extractParagraphs(productAndServices),
    },
    {
      id: "social_relevence",
      title: "Social Relevance",
      paragraphs: extractParagraphs(socialRelevance),
    },
    { id: "target_audience", title: "Target Audience", paragraphs: extractParagraphs(targetAudience) },
    {
      id: "tone_and_brand_pillars",
      title: "Tone and Brand Pillars",
      paragraphs: extractParagraphs(toneAndBrandPillars),
    },
  ];

  return (
    <article
      id="brand-analysis-content"
      className="max-w-4xl mx-auto px-8 py-12 space-y-10"
    >
      <header>
        <h1 className="text-4xl font-semibold mb-8">Brand Analysis</h1>
        <p className="leading-relaxed text-gray-600 mt-4 dark:text-gray-400">
          {brandName} Brand Intelligence Report
        </p>
      </header>

      {sections.map(({ id, title, paragraphs }) => (
        <section key={id} id={id}>
          <h2 className="text-2xl font-semibold mt-10">{title}</h2>
          {paragraphs.length > 0
            ? paragraphs.map((text, idx) => (
                <p
                  key={idx}
                  className="leading-relaxed text-gray-600 mt-4 dark:text-gray-400"
                >
                  {text}
                </p>
              ))
            : null}
        </section>
      ))}
    </article>
  );
}

