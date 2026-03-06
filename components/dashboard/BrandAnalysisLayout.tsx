"use client";

import { DashboardBackgroundLayer } from "./DashboardBackgroundLayer";
import { FloatingSidebar } from "./FloatingSidebar";
import { BrandAnalysisNavbar } from "./BrandAnalysisNavbar";
import { BrandAnalysisArticle } from "../brand-analysis/BrandAnalysisArticle";

export function BrandAnalysisLayout({ email }: { email: string }) {
  return (
    <div className="relative min-h-screen">
      <DashboardBackgroundLayer />
      <div className="relative z-10">
        <FloatingSidebar />
        <BrandAnalysisNavbar email={email} />
        <div className="pl-4 pr-4 pt-[88px] pb-10 lg:pl-[272px] lg:pr-10 lg:pt-[88px]">
          <div
            className="h-[calc(100vh-5.5rem)] overflow-y-auto"
            role="main"
          >
            <BrandAnalysisArticle />
          </div>
        </div>
      </div>
    </div>
  );
}
