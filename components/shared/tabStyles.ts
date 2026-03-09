const BASE =
  "shrink-0 whitespace-nowrap rounded-xl px-3 py-1.5 text-sm font-medium tracking-tight transition-all duration-200";

const ACTIVE =
  // Light mode: same pill shape, slightly darker grey background + soft shadow.
  // Dark mode: keep existing translucent pill styling.
  "border-b-2 border-[#0070ff] bg-slate-100 font-semibold text-neutral-900 shadow-[0_3px_8px_rgba(15,23,42,0.12)] " +
  "dark:border-b-2 dark:border-[#0070ff] dark:bg-white/20 dark:text-neutral-100 dark:shadow-none";

const INACTIVE =
  "text-neutral-600 hover:bg-slate-100 dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-100";

/**
 * Shared tab pill styles used by Brand Analysis nav and Dashboard nav.
 * Matches active/inactive and hover behavior.
 */
export function getTabClasses(isActive: boolean): string {
  return `${BASE} ${isActive ? ACTIVE : INACTIVE}`;
}
