"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DashboardBackgroundLayer } from "./DashboardBackgroundLayer";
import { FloatingSidebar } from "./FloatingSidebar";
import { SeoTopBar } from "@/components/topbar/SeoTopBar";
import { Dropdown } from "@/components/ui/Dropdown";
import seoData from "@/data/seo/dummy_neosapien_seo.json";
import { SeoOverview } from "@/components/seo/SeoOverview";
import { ImpressionsTrafficChart } from "@/components/seo/ImpressionsTrafficChart";
import { SiteHealth } from "@/components/seo/SiteHealth";
import { TrafficTrend } from "@/components/seo/TrafficTrend";
import { TopKeywords } from "@/components/seo/TopKeywords";
import { KeywordGroups } from "@/components/seo/KeywordGroups";
import { KeywordOpportunities } from "@/components/seo/KeywordOpportunities";
import { CompetitorSeoComparison } from "@/components/seo/CompetitorSeoComparison";
import { BacklinkProfile } from "@/components/seo/BacklinkProfile";
import { SeoInsights } from "@/components/seo/SeoInsights";
import { SeoRecommendations } from "@/components/seo/SeoRecommendations";

type SeoRangeKey = "last_7_days" | "last_28_days";
type SeoPrevRangeKey = "prev_7_days" | "prev_28_days";

export function SeoLayout({ email }: { email: string }) {
  const [range, setRange] = useState<SeoRangeKey>("last_28_days");
  const [compare, setCompare] = useState(false);

  const prevKey: SeoPrevRangeKey =
    range === "last_7_days" ? "prev_7_days" : "prev_28_days";

  const trafficCurrent =
    (seoData.traffic_trend_by_range &&
      seoData.traffic_trend_by_range[range]) ||
    [];
  const trafficPrev =
    compare && seoData.traffic_trend_by_range
      ? seoData.traffic_trend_by_range[prevKey] || []
      : [];

  const impressionsCurrent =
    (seoData.impressions_trend_by_range &&
      seoData.impressions_trend_by_range[range]) ||
    [];
  const impressionsPrev =
    compare && seoData.impressions_trend_by_range
      ? seoData.impressions_trend_by_range[prevKey] || []
      : [];

  return (
    <div className="relative min-h-screen">
      <DashboardBackgroundLayer />
      <div className="relative z-10">
        <FloatingSidebar />

        <SeoTopBar email={email} range={range} seoData={seoData} />

        <div className="pl-4 pr-4 pt-[88px] pb-10 lg:pl-[272px] lg:pr-10 lg:pt-[88px]">
          <div className="h-[calc(100vh-5.5rem)] overflow-y-auto" role="main">
            <div className="mx-auto max-w-6xl px-4 py-8 space-y-8">
              <header className="space-y-2">
                <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                  SEO Intelligence
                </h1>
                <p className="max-w-2xl text-sm text-neutral-600 dark:text-neutral-400">
                  Private SEO performance overview for Neosapien, including
                  traffic trends, ranking keywords, opportunities, competitor
                  comparison, and recommendations.
                </p>
              </header>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400">
                  <span className="font-medium">Date range:</span>
                  <Dropdown<SeoRangeKey>
                    value={range}
                    options={[
                      { value: "last_7_days", label: "Last 7 days" },
                      { value: "last_28_days", label: "Last 28 days" },
                    ]}
                    onChange={(v) => setRange(v)}
                    ariaLabel="Date range"
                    size="small"
                  />
                </div>
                <label className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <input
                    type="checkbox"
                    checked={compare}
                    onChange={(e) => setCompare(e.target.checked)}
                    className="h-3 w-3 rounded border-neutral-400 text-[#0070ff]"
                  />
                  Compare to previous period
                </label>
              </div>

              <SeoOverview seoOverview={seoData.seo_overview} />
              {impressionsCurrent.length > 0 && trafficCurrent.length > 0 && (
                <ImpressionsTrafficChart
                  current={impressionsCurrent.map((imp, idx) => ({
                    label: imp.label,
                    impressions: imp.impressions,
                    traffic: trafficCurrent[idx]?.traffic ?? 0,
                  }))}
                  previous={
                    compare && impressionsPrev.length > 0 && trafficPrev.length > 0
                      ? impressionsPrev.map((imp, idx) => ({
                          label: imp.label,
                          impressions: imp.impressions,
                          traffic: trafficPrev[idx]?.traffic ?? 0,
                        }))
                      : undefined
                  }
                />
              )}
              {seoData.site_health && (
                <SiteHealth siteHealth={seoData.site_health} />
              )}
              <TrafficTrend
                current={trafficCurrent}
                previous={compare ? trafficPrev : undefined}
              />
              <TopKeywords keywords={seoData.top_keywords} />
              {seoData.keyword_groups && seoData.keyword_groups.length > 0 && (
                <KeywordGroups groups={seoData.keyword_groups} />
              )}
              <KeywordOpportunities
                opportunities={seoData.keyword_opportunities}
              />
              <CompetitorSeoComparison data={seoData.competitor_comparison} />
              {seoData.backlink_profile && (
                <BacklinkProfile profile={seoData.backlink_profile} />
              )}
              <SeoInsights insights={seoData.seo_insights} />
              <SeoRecommendations
                recommendations={seoData.seo_recommendations}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

