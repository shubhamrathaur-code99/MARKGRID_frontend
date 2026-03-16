"use client";

import { TopBarShell } from "./TopBarShell";

export function AIStudioTopBar({ email }: { email: string }) {
  return (
    <TopBarShell email={email}>
      <p className="truncate text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        AI Studio
      </p>
    </TopBarShell>
  );
}
