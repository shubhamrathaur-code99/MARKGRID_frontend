"use client";

import { useState } from "react";
import { TopBarShell } from "./TopBarShell";
import { getTabClasses } from "../shared/tabStyles";

const settingsTabs = [
  { id: "workspace", label: "Workspace" },
  { id: "team", label: "Team members" },
  { id: "api", label: "API keys" },
];

export function SettingsTopBar({ email }: { email: string }) {
  const [active, setActive] = useState("workspace");

  return (
    <TopBarShell email={email}>
      <nav className="flex gap-1" aria-label="Settings">
        {settingsTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={getTabClasses(active === tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </TopBarShell>
  );
}
