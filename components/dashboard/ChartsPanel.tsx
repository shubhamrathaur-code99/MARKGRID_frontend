"use client";

import { motion } from "framer-motion";
import { BentoAnalyticsGrid } from "./BentoAnalyticsGrid";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ChartsPanel() {
  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      animate="show"
    >
      <h2 className="mb-4 text-xl font-medium text-neutral-900 dark:text-neutral-100">
        Analytics
      </h2>
      <BentoAnalyticsGrid />
    </motion.section>
  );
}
