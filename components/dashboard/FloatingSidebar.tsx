"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  LayoutDashboard,
  MessageSquare,
  UserCheck,
  Swords,
  FileBarChart,
  Megaphone,
  Settings,
  LogOut,
} from "lucide-react";

const mainNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/brand-analysis", label: "Brand Analysis", icon: MessageSquare },
  { href: "/seo", label: "SEO", icon: UserCheck },
  { href: "/dashboard/competitors", label: "Competitors", icon: Swords },
  { href: "/dashboard/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/dashboard/reports", label: "Reports", icon: FileBarChart },
];

const systemNav = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/logout", label: "Logout", icon: LogOut },
];

function NavItem({
  href,
  label,
  icon: Icon,
  isActive,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onNavigate?: () => void;
}) {
  return (
    <Link href={href} className="block" onClick={onNavigate}>
      <motion.span
        className={`relative flex items-center gap-3 rounded-xl py-3 px-4 text-sm font-medium transition-colors ${
          isActive
            ? "text-[#0070ff] bg-white/10 border border-[#0070ff]/40"
            : "text-neutral-600 dark:text-neutral-400"
        } ${!isActive ? "hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-white/5 dark:hover:bg-white/5" : ""}`}
        whileHover={{ scale: 1.02, x: 2 }}
        whileTap={{ scale: 0.98 }}
      >
        {isActive && (
          <span
            className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#0070ff] shadow-[0_0_12px_#0070ff]"
            aria-hidden
          />
        )}
        <motion.span whileHover={{ scale: 1.1 }} className="flex shrink-0">
          <Icon className="h-5 w-5" />
        </motion.span>
        <span>{label}</span>
      </motion.span>
    </Link>
  );
}

function Section({
  title,
  items,
  pathname,
  onNavigate,
}: {
  title: string;
  items: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {title}
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const active =
            item.href === "/dashboard"
              ? pathname === "/dashboard" || pathname.startsWith("/dashboard/")
              : item.href === "/seo"
              ? pathname === "/seo" || pathname.startsWith("/seo")
              : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.href}>
              <NavItem
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={active}
                onNavigate={onNavigate}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function FloatingSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setIsMobile(mq.matches);
    const f = () => setIsMobile(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/65 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:bg-white/[0.08] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      </button>
      <AnimatePresence>
        {mobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            aria-label="Close menu"
          />
        )}
      </AnimatePresence>
      <motion.aside
        initial={false}
        animate={{ x: isMobile && !mobileOpen ? "-100%" : 0 }}
        transition={{ type: "tween", duration: 0.25 }}
        className="fixed left-6 top-6 bottom-6 z-50 w-56 rounded-3xl border border-white/10 bg-white/65 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:bg-white/[0.08]"
      >
        <div className="flex h-full flex-col overflow-hidden rounded-3xl">
          <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-6 dark:border-white/10">
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0070ff] text-white">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <span className="text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
                MarkGrid
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg p-2 text-neutral-500 hover:bg-black/5 hover:text-neutral-700 dark:hover:bg-white/10 lg:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 py-4">
          <Section
            title="Main"
            items={mainNav}
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
          <Section
            title="System"
            items={systemNav}
            pathname={pathname}
            onNavigate={() => setMobileOpen(false)}
          />
        </nav>
      </div>
    </motion.aside>
    </>
  );
}


