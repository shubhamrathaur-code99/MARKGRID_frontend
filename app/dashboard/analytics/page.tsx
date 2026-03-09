import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PremiumDashboardLayout } from "../../../components/dashboard/PremiumDashboardLayout";
import { AnalyticsOverview } from "../../../components/dashboard/analytics/AnalyticsOverview";
import { PlatformDistribution } from "../../../components/dashboard/analytics/PlatformDistribution";
import { MentionsTrend } from "../../../components/dashboard/analytics/MentionsTrend";
import analyticsData from "../../../data/analytics/dummy_neosapien_analytics.json";

export default function AnalyticsPage() {
  const authCookie = cookies().get("markgrid_auth");

  if (!authCookie) {
    redirect("/");
  }

  const email = authCookie.value;
  const { overview, platform_distribution, weekly_mentions } = analyticsData as {
    overview: {
      total_mentions: number;
      engagement_rate: string;
      sentiment_positive: number;
      sentiment_neutral: number;
      sentiment_negative: number;
    };
    platform_distribution: Array<{ platform: string; mentions: number }>;
    weekly_mentions: Array<{ date: string; count: number }>;
  };

  return (
    <PremiumDashboardLayout email={email}>
      <section className="mt-0">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Analytics
        </h1>
        <p className="mb-8 text-sm text-neutral-500 dark:text-neutral-400">
          Brand performance insights and metrics.
        </p>

        <div className="space-y-10">
          <div>
            <h2 className="mb-4 text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Overview
            </h2>
            <AnalyticsOverview data={overview} />
          </div>

          <div>
            <h2 className="mb-4 text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Mentions trend
            </h2>
            <MentionsTrend data={weekly_mentions} />
          </div>

          <div>
            <h2 className="mb-4 text-lg font-medium text-neutral-800 dark:text-neutral-200">
              Platform distribution
            </h2>
            <PlatformDistribution data={platform_distribution} />
          </div>
        </div>
      </section>
    </PremiumDashboardLayout>
  );
}
