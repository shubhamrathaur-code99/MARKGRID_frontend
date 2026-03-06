"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Legend,
} from "recharts";

const mentionsData = [
  { day: "Mon", mentions: 1200 },
  { day: "Tue", mentions: 1580 },
  { day: "Wed", mentions: 1420 },
  { day: "Thu", mentions: 1890 },
  { day: "Fri", mentions: 2100 },
  { day: "Sat", mentions: 1650 },
  { day: "Sun", mentions: 1780 },
];
const sentimentData = [
  { name: "Positive", value: 68, color: "#22c55e" },
  { name: "Neutral", value: 24, color: "#94a3b8" },
  { name: "Negative", value: 8, color: "#ef4444" },
];
const engagementData = [
  { name: "Jan", likes: 4200, shares: 1200 },
  { name: "Feb", likes: 5100, shares: 1500 },
  { name: "Mar", likes: 4800, shares: 1400 },
  { name: "Apr", likes: 6200, shares: 1800 },
];
const campaignData = [
  { week: "W1", reach: 420, engagement: 180 },
  { week: "W2", reach: 580, engagement: 240 },
  { week: "W3", reach: 720, engagement: 310 },
  { week: "W4", reach: 650, engagement: 290 },
  { week: "W5", reach: 890, engagement: 380 },
];

const bentoItem = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1 },
};

export function BentoAnalyticsGrid() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        show: { transition: { staggerChildren: 0.06 } },
      }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-12"
    >
      {/* Mentions Chart - col-span-8 */}
      <motion.div variants={bentoItem} className="h-full lg:col-span-8">
        <GlassCard padding="none" className="flex h-full min-h-[320px] flex-col p-6">
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Mentions Trend
          </h3>
          <div className="mt-4 flex-1 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mentionsData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-black/10 dark:stroke-white/10" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.9)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="mentions"
                  stroke="#0070ff"
                  strokeWidth={2}
                  dot={{ fill: "#0070ff", r: 3 }}
                  activeDot={{ r: 5 }}
                  isAnimationActive
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Sentiment Pie - col-span-4 */}
      <motion.div variants={bentoItem} className="h-full lg:col-span-4">
        <GlassCard padding="none" className="flex h-full min-h-[320px] flex-col p-6">
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Sentiment Distribution
          </h3>
          <div className="mt-4 flex-1 min-h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  isAnimationActive
                  animationDuration={800}
                >
                  {sentimentData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => [`${v}%`, "Share"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Engagement Bar - col-span-6 */}
      <motion.div variants={bentoItem} className="h-full lg:col-span-6">
        <GlassCard padding="none" className="flex h-full min-h-[260px] flex-col p-6">
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Engagement Metrics
          </h3>
          <div className="mt-4 flex-1 min-h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-black/10 dark:stroke-white/10" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="likes" fill="#0070ff" radius={[4, 4, 0, 0]} name="Likes" isAnimationActive animationDuration={800} />
                <Bar dataKey="shares" fill="#22c55e" radius={[4, 4, 0, 0]} name="Shares" isAnimationActive animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      {/* Campaign Performance - col-span-6 */}
      <motion.div variants={bentoItem} className="h-full lg:col-span-6">
        <GlassCard padding="none" className="flex h-full min-h-[260px] flex-col p-6">
          <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Campaign Performance
          </h3>
          <div className="mt-4 flex-1 min-h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={campaignData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="bentoReach" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0070ff" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#0070ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bentoEng" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-black/10 dark:stroke-white/10" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="reach" stroke="#0070ff" fill="url(#bentoReach)" name="Reach (K)" isAnimationActive animationDuration={800} />
                <Area type="monotone" dataKey="engagement" stroke="#22c55e" fill="url(#bentoEng)" name="Engagement (K)" isAnimationActive animationDuration={800} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

    </motion.div>
  );
}
