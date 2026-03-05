import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-neutral-700 dark:bg-neutral-950/95 dark:supports-[backdrop-filter]:dark:bg-neutral-950/80"
      role="banner"
    >
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-lg font-semibold text-primary transition-colors hover:text-primary-hover dark:text-primary dark:hover:text-primary-hover"
        >
          MarkGrid
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
