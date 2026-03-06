"use client";

import brandData from "@/data/brands/dummy_neosapien.json";
import { GlassCard } from "../dashboard/GlassCard";
import { BrandHero } from "./BrandHero";

function parseJsonField(value: unknown): Record<string, unknown> | null {
  if (typeof value !== "string") return null;
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

function joinValues(obj: Record<string, unknown> | null): string[] {
  if (!obj) return [];
  return Object.values(obj)
    .filter((v): v is string => typeof v === "string")
    .map((v) => v);
}

export function BrandAnalysisReport() {
  const analysis = (brandData as any).analysis ?? {};
  const foundation = analysis.brand_foundation ?? {};
  const positioning = analysis.brand_positioning ?? {};

  const brandStoryParagraphs = joinValues(parseJsonField(foundation.brand_story));
  const uvpParagraphs = joinValues(parseJsonField(foundation.uvp));
  const visionParagraphs = joinValues(parseJsonField(foundation.vision));
  const positioningStatement = joinValues(
    parseJsonField(positioning.positioning_statement)
  );
  const functionalPositioning = joinValues(
    parseJsonField(positioning.functional_positioning)
  );
  const emotionalPositioning = joinValues(
    parseJsonField(positioning.emotional_positioning)
  );

  const primaryAssociations = joinValues(
    parseJsonField(positioning.primary_associations)
  );
  const growthOpportunities = joinValues(
    parseJsonField(analysis.growth_opportunities)
  );
  const risksChallenges = joinValues(parseJsonField(analysis.risks_challenges));
  const summary = joinValues(parseJsonField(analysis.summary));

  return (
    <div className="space-y-8">
      <BrandHero brand={{ name: foundation.brand_name, ...foundation }} />

      <GlassCard padding="large" noHover className="space-y-8">
        <section className="space-y-3">
          <h1 className="text-4xl font-semibold">Brand Analysis</h1>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-6">Company Overview</h2>
          {brandStoryParagraphs.map((text, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-6">Industry Position</h2>
          {visionParagraphs.map((text, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-6">Target Audience</h2>
          {positioningStatement.map((text, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-6">Brand Voice &amp; Messaging</h2>
          {emotionalPositioning.map((text, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-6">Products / Services</h2>
          {uvpParagraphs.map((text, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-6">Competitive Advantage</h2>
          {functionalPositioning.map((text, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-6">Market Presence</h2>
          {primaryAssociations.map((text, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-6">Growth Opportunities</h2>
          {growthOpportunities.map((text, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-6">Risks &amp; Challenges</h2>
          {risksChallenges.map((text, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold mt-6">Summary</h2>
          {summary.map((text, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">
              {text}
            </p>
          ))}
        </section>
      </GlassCard>
    </div>
  );
}

