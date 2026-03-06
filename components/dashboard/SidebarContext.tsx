"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SidebarContextValue = { collapsed: boolean; setCollapsed: (v: boolean) => void };

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  return ctx ?? { collapsed: false, setCollapsed: () => {} };
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}
