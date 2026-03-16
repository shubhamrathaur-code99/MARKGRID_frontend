"use client";

import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useId,
  type KeyboardEvent,
} from "react";
import { ChevronDown } from "lucide-react";

export interface DropdownOption<T = string> {
  value: T;
  label: string;
}

export type DropdownSize = "small" | "medium" | "large" | "xl";

const SIZE_WIDTH: Record<DropdownSize, string> = {
  small: "min-w-[140px] max-w-[140px] w-[140px]",
  medium: "min-w-[180px] max-w-[180px] w-[180px]",
  large: "min-w-[240px] max-w-[240px] w-[240px]",
  xl: "min-w-[300px] max-w-[300px] w-[300px]",
};

interface DropdownProps<T = string> {
  value: T;
  options: DropdownOption<T>[];
  onChange: (value: T) => void;
  ariaLabel: string;
  /** Optional trigger label override (defaults to selected option label) */
  triggerLabel?: string;
  /** Optional width variant; default medium. Prevents trigger from resizing with content. */
  size?: DropdownSize;
  /** Optional extra className for the trigger (e.g. overrides; avoid conflicting width) */
  triggerClassName?: string;
}

const triggerBaseClass =
  "flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 pl-3 pr-3 text-sm text-neutral-900 focus:border-[#0070ff] focus:outline-none focus:ring-2 focus:ring-[#0070ff] dark:border-white/10 dark:bg-white/10 dark:text-neutral-100";

/** Menu: always white background for visibility in light and dark mode */
const menuClass =
  "absolute left-0 top-full z-50 mt-1 min-w-full rounded-lg border border-neutral-200 bg-white py-1 text-neutral-900 shadow-lg dark:border-neutral-300 dark:bg-white dark:text-[#111]";

const optionClass =
  "flex w-full cursor-pointer items-center justify-center px-3.5 py-2.5 text-center text-sm text-[#111] transition-colors hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-none dark:text-[#111] dark:hover:bg-neutral-100 dark:focus:bg-neutral-100";

export function Dropdown<T = string>({
  value,
  options,
  onChange,
  ariaLabel,
  triggerLabel,
  size = "medium",
  triggerClassName = "",
}: DropdownProps<T>) {
  const sizeClass = SIZE_WIDTH[size];
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [triggerWidth, setTriggerWidth] = useState<number | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const optionId = (i: number) => `${listId}-option-${i}`;

  useLayoutEffect(() => {
    if (open && triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    } else {
      setTriggerWidth(undefined);
    }
  }, [open]);

  const selected = options.find((o) => o.value === value);
  const displayLabel = triggerLabel ?? selected?.label ?? String(value);

  useEffect(() => {
    if (!open) {
      setFocusedIndex(-1);
      return;
    }
    const idx = options.findIndex((o) => o.value === value);
    setFocusedIndex(idx >= 0 ? idx : 0);
  }, [open, options, value]);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      const el = e.target as Node;
      if (
        triggerRef.current?.contains(el) ||
        menuRef.current?.contains(el)
      ) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((i) => (i < options.length - 1 ? i + 1 : 0));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((i) => (i > 0 ? i - 1 : options.length - 1));
      return;
    }
    if (e.key === "Enter" && focusedIndex >= 0 && options[focusedIndex]) {
      e.preventDefault();
      onChange(options[focusedIndex].value);
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="relative inline-block">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        aria-labelledby={open ? listId : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={`${triggerBaseClass} ${sizeClass} ${triggerClassName}`}
      >
        <span className="min-w-0 shrink overflow-hidden text-ellipsis whitespace-nowrap text-center">
          {displayLabel}
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 text-neutral-500"
          aria-hidden
        />
      </button>
      {open && (
        <div
          ref={menuRef}
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className={menuClass}
          style={{ minWidth: triggerWidth ?? undefined, width: triggerWidth ?? undefined }}
        >
          {options.map((opt, i) => (
            <div
              key={String(opt.value)}
              role="option"
              id={optionId(i)}
              aria-selected={value === opt.value}
              tabIndex={-1}
              className={optionClass}
              onMouseEnter={() => setFocusedIndex(i)}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
