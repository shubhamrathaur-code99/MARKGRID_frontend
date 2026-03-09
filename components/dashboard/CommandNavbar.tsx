 "use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { getTabClasses } from "../shared/tabStyles";
import { GlobalUserControls } from "../global/GlobalUserControls";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/mentions", label: "Mentions" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/insights", label: "Insights" },
];

export function CommandNavbar({ email }: { email: string }) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-6 left-4 right-4 z-40 lg:left-[272px] lg:right-10"
    >
      <div className="mx-auto flex max-w-[1131px] flex-nowrap items-center gap-8 rounded-2xl border border-white/10 bg-white/65 px-6 py-2 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:bg-white/[0.08] dark:shadow-[0_30px_80px_rgba(0,0,0,0.35)] lg:px-8">
        {/* Dashboard nav: 4 items with even spacing across the bar */}
        <nav
          className="hidden min-w-0 flex-1 flex-shrink items-center justify-evenly md:flex"
          aria-label="Dashboard navigation"
        >
          {navLinks.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.href ||
                  pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={getTabClasses(isActive)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search + global user controls */}
        <div className="flex min-w-fit shrink-0 items-center gap-4">
          <div className="relative hidden w-[150px] shrink-0 lg:block lg:w-[180px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full min-w-0 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-500 transition-all duration-200 focus:border-[#0070ff] focus:outline-none focus:ring-2 focus:ring-[#0070ff] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100 dark:placeholder:text-neutral-400"
            />
          </div>
          <GlobalUserControls email={email} />
        </div>
      </div>
    </motion.header>
  );
}

