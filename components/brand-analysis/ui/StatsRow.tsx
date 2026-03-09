"use client";

interface StatsRowProps {
  stats: string[];
}

export function StatsRow({ stats }: StatsRowProps) {
  if (stats.length === 0) return null;
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {stats.map((stat, idx) => (
        <span
          key={idx}
          className="inline-flex rounded-lg border border-[#0070ff]/30 bg-[#0070ff]/10 px-3 py-1 text-sm font-medium text-[#0070ff] dark:bg-[#0070ff]/20"
        >
          {stat}
        </span>
      ))}
    </div>
  );
}
