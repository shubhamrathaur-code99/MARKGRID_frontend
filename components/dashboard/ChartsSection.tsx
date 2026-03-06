"use client";

import { MentionsChart } from "./MentionsChart";
import { SentimentChart } from "./SentimentChart";
import { EngagementChart } from "./EngagementChart";
import { CampaignChart } from "./CampaignChart";

export function ChartsSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <MentionsChart />
      <SentimentChart />
      <EngagementChart />
      <CampaignChart />
    </section>
  );
}
