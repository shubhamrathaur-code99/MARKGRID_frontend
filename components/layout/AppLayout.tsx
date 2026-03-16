"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { DashboardBackgroundLayer } from "../dashboard/DashboardBackgroundLayer";
import { FloatingSidebar } from "../dashboard/FloatingSidebar";

const mainVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
};

interface AppLayoutProps {
  email: string;
  topBar: ReactNode;
  children: ReactNode;
}

export function AppLayout({ email, topBar, children }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen">
      <DashboardBackgroundLayer />
      <div className="relative z-10">
        <FloatingSidebar />
        <div className="min-h-screen pl-4 pr-4 pt-[88px] pb-10 lg:pl-[272px] lg:pr-10 lg:pt-[88px]">
          <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
            {topBar}
            <motion.main
              variants={mainVariants}
              initial="hidden"
              animate="show"
              className="flex flex-col"
              role="main"
            >
              {children}
            </motion.main>
          </div>
        </div>
      </div>
    </div>
  );
}
