"use client";

import { SidebarProvider, useSidebar } from "./SidebarContext";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { AnalyticsCards } from "./AnalyticsCards";
import { ChartsSection } from "./ChartsSection";
import { LiveMentionsFeed } from "./LiveMentionsFeed";
import { InfluencersCard } from "./InfluencersCard";
import { CompetitorTable } from "./CompetitorTable";

function DashboardContent({ email }: { email: string }) {
  const { collapsed } = useSidebar();
  return (
    <>
      <Sidebar />
      <div className={`min-h-screen ${collapsed ? "lg:pl-[72px]" : "lg:pl-64"}`}>
        <TopNavbar email={email} />
        <main className="dashboard-gradient-mask p-4 lg:p-6" role="main">
          <section className="mb-8">
            <AnalyticsCards />
          </section>
          <section className="mb-8">
            <ChartsSection />
          </section>
          <section className="mb-8">
            <LiveMentionsFeed />
          </section>
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CompetitorTable />
            </div>
            <div>
              <InfluencersCard />
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export function DashboardLayout({ email }: { email: string }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <DashboardContent email={email} />
      </div>
    </SidebarProvider>
  );
}
