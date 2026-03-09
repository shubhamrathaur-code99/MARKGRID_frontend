"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { DashboardBackgroundLayer } from "./DashboardBackgroundLayer";
import { FloatingSidebar } from "./FloatingSidebar";
import { GlobalUserControls } from "../global/GlobalUserControls";
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
  const [search, setSearch] = useState("");
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

        {/* Top bar: title (left), SEO search + global user controls (right), no tabs */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 left-4 right-4 z-40 lg:left-[272px] lg:right-10"
        >
          <div className="mx-auto flex max-w-[1131px] items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/65 px-6 py-2 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:bg-white/[0.08] dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)] lg:px-8">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                SEO Intelligence
              </p>
            </div>
            <div className="flex min-w-fit shrink-0 items-center gap-4">
              <div className="relative hidden w-[150px] shrink-0 lg:block lg:w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="search"
                  placeholder="Search SEO..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full min-w-0 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 transition-all duration-200 focus:border-[#0070ff] focus:outline-none focus:ring-2 focus:ring-[#0070ff] dark:border-white/10 dark:bg:white/10 dark:text-neutral-100 dark:placeholder:text-neutral-400"
                />
              </div>
              <GlobalUserControls email={email} />
            </div>
          </div>
        </motion.header>

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

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  <label className="mr-2 font-medium" htmlFor="seo-range-select">
                    Date range:
                  </label>
                  <select
                    id="seo-range-select"
                    value={range}
                    onChange={(e) =>
                      setRange(e.target.value as SeoRangeKey)
                    }
                    className="rounded-lg border border-white/10 bg-white px-3 py-1 text-xs text-neutral-900 shadow-sm outline-none transition-colors focus:border-[#0070ff] focus:ring-2 focus:ring-[#0070ff] dark:border-white/30 dark:bg-white dark:text-neutral-900"
                  >
                    <option value="last_7_days">Last 7 days</option>
                    <option value="last_28_days">Last 28 days</option>
                  </select>
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

