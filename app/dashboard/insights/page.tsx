import { redirect } from "next/navigation";
import { getAuthToken } from "@/lib/auth-server";
import { apiFetch } from "@/lib/api";
import { PremiumDashboardLayout } from "../../../components/dashboard/PremiumDashboardLayout";
import { DashboardTopBar } from "@/components/topbar/DashboardTopBar";
import { InsightsSummary } from "../../../components/dashboard/insights/InsightsSummary";
import { KeyInsights } from "../../../components/dashboard/insights/KeyInsights";
import { Opportunities } from "../../../components/dashboard/insights/Opportunities";
import { RisksAlerts } from "../../../components/dashboard/insights/RisksAlerts";
import { AudienceInsights } from "../../../components/dashboard/insights/AudienceInsights";
import { RecommendedActions } from "../../../components/dashboard/insights/RecommendedActions";
import insightsData from "../../../data/insights/dummy_neosapien_insights.json";
import { GlassCard } from "../../../components/dashboard/GlassCard";
import { Shield } from "lucide-react";

export default async function InsightsPage() {
  const token = await getAuthToken();
  if (!token) {
    redirect("/");
  }

  let username = "Account";
  try {
    const me = await apiFetch<{ username?: string }>("/api/me", { token });
    if (me && typeof me.username === "string" && me.username.trim() !== "") {
      username = me.username;
    }
  } catch {
    // keep fallback label
  }

  const data = insightsData as {
    summary: string;
    key_insights: string[];
    opportunities: string[];
    risks: string[];
    audience_insight: { industries: string[]; regions: string[] };
    recommended_actions: string[];
  };

  return (
    <PremiumDashboardLayout
      email={username}
      topBar={<DashboardTopBar email={username} />}
    >
      <section className="mt-0">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Insights
        </h1>
        <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          Private strategic intelligence derived from analytics and mentions data.
        </p>

        {/* Private Insights Notice */}
        <div className="mb-10">
          <GlassCard className="border-[#0070ff]/30 bg-[#0070ff]/5 dark:bg-[#0070ff]/10">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0070ff]/20">
                <Shield className="h-5 w-5 text-[#0070ff]" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="mb-1 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                  Private brand insights
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  These insights are generated exclusively for your company based on analytics and brand mentions data.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        <div className="space-y-8">
          <InsightsSummary summary={data.summary} />
          <KeyInsights insights={data.key_insights} />
          <Opportunities opportunities={data.opportunities} />
          <RisksAlerts risks={data.risks} />
          <AudienceInsights data={data.audience_insight} />
          <RecommendedActions actions={data.recommended_actions} />
        </div>
      </section>
    </PremiumDashboardLayout>
  );
}
