"use client";

import { useState } from "react";
import { TopBarShell } from "./TopBarShell";
import { Dropdown } from "@/components/ui/Dropdown";

const categoryOptions = [
  { value: "all", label: "All categories" },
  { value: "tech", label: "Tech" },
  { value: "lifestyle", label: "Lifestyle" },
];

const platformOptions = [
  { value: "all", label: "All platforms" },
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "twitter", label: "Twitter" },
];

const followerOptions = [
  { value: "any", label: "Any followers" },
  { value: "1k-10k", label: "1K – 10K" },
  { value: "10k-100k", label: "10K – 100K" },
  { value: "100k+", label: "100K+" },
];

export function InfluencersTopBar({ email }: { email: string }) {
  const [category, setCategory] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [followerRange, setFollowerRange] = useState("any");

  return (
    <TopBarShell email={email}>
      <div className="flex flex-1 flex-wrap items-center gap-4">
        <Dropdown
          value={category}
          options={categoryOptions}
          onChange={setCategory}
          ariaLabel="Category"
          size="small"
        />
        <Dropdown
          value={platform}
          options={platformOptions}
          onChange={setPlatform}
          ariaLabel="Platform"
          size="small"
        />
        <Dropdown
          value={followerRange}
          options={followerOptions}
          onChange={setFollowerRange}
          ariaLabel="Follower range"
          size="small"
        />
      </div>
    </TopBarShell>
  );
}
