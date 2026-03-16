"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { DashboardBackgroundLayer } from "./DashboardBackgroundLayer";
import { FloatingSidebar } from "./FloatingSidebar";
import { CommandNavbar } from "./CommandNavbar";
import { HeroSection } from "./HeroSection";
import { MetricWidgets } from "./MetricWidgets";
import { BentoAnalyticsGrid } from "./BentoAnalyticsGrid";
import { MentionsActivity } from "./MentionsActivity";
import { InfluencersCard } from "./InfluencersCard";
import { CompetitorInsights } from "./CompetitorInsights";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const mainVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

export function PremiumDashboardLayout({
  email,
  topBar,
  children,
}: {
  email: string;
  topBar?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      <DashboardBackgroundLayer />
      <div className="relative z-10">
        <FloatingSidebar />
        <div className="min-h-screen pl-4 pr-4 pt-[88px] pb-10 lg:pl-[272px] lg:pr-10 lg:pt-[88px]">
          <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
            {topBar ?? <CommandNavbar email={email} />}
            <motion.main
              variants={mainVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col"
              role="main"
            >
              {children != null ? (
                children
              ) : (
                <>
                  <motion.section variants={sectionVariants} className="mt-0">
                    <HeroSection />
                  </motion.section>
                  <motion.section variants={sectionVariants} className="mt-12">
                    <h2 className="mb-6 text-xl font-medium text-neutral-900 dark:text-neutral-100">
                      Key metrics
                    </h2>
                    <MetricWidgets />
                  </motion.section>
                  <motion.section variants={sectionVariants} className="mt-12">
                    <h2 className="mb-6 text-xl font-medium text-neutral-900 dark:text-neutral-100">
                      Analytics
                    </h2>
                    <BentoAnalyticsGrid />
                  </motion.section>
                  <motion.section variants={sectionVariants} className="mt-12">
                    <h2 className="mb-6 text-xl font-medium text-neutral-900 dark:text-neutral-100">
                      Live mentions
                    </h2>
                    <MentionsActivity />
                  </motion.section>
                  <motion.section variants={sectionVariants} className="mt-12">
                    <div className="mb-6 flex items-center justify-between">
                      <h2 className="text-xl font-medium text-neutral-900 dark:text-neutral-100">
                        Influencers & competitors
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[420px_1fr] xl:items-stretch">
                      <div className="h-full min-h-0">
                        <InfluencersCard />
                      </div>
                      <div className="h-full min-h-0">
                        <CompetitorInsights />
                      </div>
                    </div>
                  </motion.section>
                </>
              )}
            </motion.main>
          </div>
        </div>
      </div>
    </div>
  );
}
