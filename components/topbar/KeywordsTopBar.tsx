"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { TopBarShell } from "./TopBarShell";
import { Dropdown } from "@/components/ui/Dropdown";

const inputClass =
  "h-10 rounded-xl border border-white/10 bg-white/10 px-3 text-sm text-neutral-900 placeholder:text-neutral-500 focus:border-[#0070ff] focus:outline-none focus:ring-2 focus:ring-[#0070ff] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:placeholder:text-neutral-400";

const difficultyOptions = [
  { value: "any", label: "Any difficulty" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const volumeOptions = [
  { value: "any", label: "Any volume" },
  { value: "low", label: "Low" },
  { value: "mid", label: "Mid" },
  { value: "high", label: "High" },
];

export function KeywordsTopBar({ email }: { email: string }) {
  const [keyword, setKeyword] = useState("");
  const [difficulty, setDifficulty] = useState("any");
  const [volume, setVolume] = useState("any");

  return (
    <TopBarShell email={email}>
      <div className="flex flex-1 flex-wrap items-center gap-4">
        <div className="relative min-w-[200px] flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="search"
            placeholder="Keyword search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className={`w-full pl-9 pr-3 ${inputClass}`}
            aria-label="Keyword search"
          />
        </div>
        <Dropdown
          value={difficulty}
          options={difficultyOptions}
          onChange={setDifficulty}
          ariaLabel="Difficulty"
          size="small"
        />
        <Dropdown
          value={volume}
          options={volumeOptions}
          onChange={setVolume}
          ariaLabel="Volume"
          size="small"
        />
      </div>
    </TopBarShell>
  );
}
