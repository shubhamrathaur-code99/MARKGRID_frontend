"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "./SidebarContext";
import {
  LayoutDashboard,
  Radio,
  MessageCircle,
  Megaphone,
  BarChart3,
  Share2,
  Users,
  UserCheck,
  FileText,
  Swords,
  PieChart,
  TrendingUp,
  Zap,
  Bell,
  Webhook,
  Plug,
  Building2,
  Newspaper,
  FileCheck,
  Settings,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";

const sections = [
  {
    title: "Dashboard",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
      { href: "/brand-analysis", label: "Brand Analysis", icon: Radio },
      { href: "/dashboard/sentiment", label: "Sentiment Analysis", icon: MessageCircle },
      { href: "/dashboard/campaigns", label: "Campaign Monitoring", icon: Megaphone },
    ],
  },
  {
    title: "Analytics",
    items: [
      { href: "/dashboard/brand", label: "Brand Mentions", icon: BarChart3 },
      { href: "/dashboard/engagement", label: "Social Engagement", icon: Share2 },
      { href: "/dashboard/audience", label: "Audience Insights", icon: Users },
      { href: "/seo", label: "SEO", icon: UserCheck },
      { href: "/dashboard/content", label: "Content Performance", icon: FileText },
    ],
  },
  {
    title: "Competitive Intelligence",
    items: [
      { href: "/dashboard/competitors", label: "Competitor Tracking", icon: Swords },
      { href: "/dashboard/sov", label: "Share of Voice", icon: PieChart },
      { href: "/dashboard/trends", label: "Industry Trends", icon: TrendingUp },
    ],
  },
  {
    title: "Automation",
    items: [
      { href: "/dashboard/alerts", label: "Alerts", icon: Bell },
      { href: "/dashboard/webhooks", label: "Webhooks", icon: Webhook },
      { href: "/dashboard/integrations", label: "Integrations", icon: Plug },
    ],
  },
  {
    title: "Company",
    items: [
      { href: "/dashboard/about", label: "About Markgrid", icon: Building2 },
      { href: "/dashboard/news", label: "News", icon: Newspaper },
      { href: "/dashboard/policy", label: "User Policy", icon: FileCheck },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
      { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
      { href: "/dashboard/logout", label: "Logout", icon: LogOut },
    ],
  },
];

function NavItem({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-xl py-2.5 pr-3 text-sm font-medium transition-all duration-300 ${
        isActive ? "pl-4" : "px-3"
      } ${
        isActive
          ? "bg-[#0070ff]/10 text-[#0070ff] dark:bg-[#0070ff]/20"
          : "text-neutral-600 hover:bg-black/5 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-100"
      }`}
    >
      {isActive && (
        <span
          className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#0070ff]"
          aria-hidden
        />
      )}
      <Icon
        className={`h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${
          isActive ? "text-[#0070ff]" : ""
        }`}
      />
      <span>{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="fixed left-4 top-4 z-[60] flex h-10 w-10 items-center justify-center rounded-2xl glass-sidebar shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-all duration-300 hover:scale-105 dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      </button>

      <aside
        className={`glass-sidebar fixed left-0 top-0 z-50 flex h-full flex-col shadow-[0_20px_60px_rgba(0,0,0,0.25)] transition-[width] duration-300 dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] ${
          collapsed ? "w-[72px]" : "w-64"
        } lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-black/10 px-3 dark:border-white/10">
          {!collapsed && (
            <Link
              href="/dashboard"
              className="bg-gradient-to-r from-[#0070ff] to-[#00a0ff] bg-clip-text text-lg font-bold text-transparent drop-shadow-sm transition-opacity hover:opacity-90"
            >
              MarkGrid
            </Link>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden shrink-0 rounded-xl p-2 text-neutral-500 transition-all duration-200 hover:scale-110 hover:bg-white/50 hover:text-[#0070ff] dark:hover:bg-white/10 lg:flex"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              {!collapsed && (
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  {section.title}
                </p>
              )}
              <ul className="space-y-0.5 px-2">
                {section.items.map((item) => {
                  const isActive =
                    item.href === "/dashboard"
                      ? pathname === "/dashboard" || pathname.startsWith("/dashboard/")
                      : item.href === "/seo"
                      ? pathname === "/seo" || pathname.startsWith("/seo")
                      : pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <li key={item.href}>
                      <NavItem href={item.href} label={item.label} icon={item.icon} isActive={isActive} />
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
      {mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
          aria-label="Close sidebar"
        />
      )}
    </>
  );
}