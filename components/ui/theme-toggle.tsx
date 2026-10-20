"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";

import { useTheme } from "@/providers/theme-provider";
import Tooltip from "./tooltip";

export type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Tooltip
      content={isDark ? "Switch to light mode" : "Switch to dark mode"}
      collapsedOnly
      position="right"
      className="
        hover:z-50 focus-within:z-50
      "
    >
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Dark mode"
        aria-pressed={isDark}
        className={`
          relative block h-10 w-full min-w-0
          shrink-0 overflow-hidden text-left
          rounded-[var(--radius)]
          text-sidebar-foreground
          transition-colors
          duration-[var(--duration-normal)]
          ease-[var(--ease-standard)]
          hover:bg-sidebar-accent
          hover:text-sidebar-accent-foreground
          focus-visible:outline-2
          focus-visible:outline-sidebar-ring
          ${className}
        `}
      >
        <span
          className="
            flex
            w-10
            absolute inset-y-0 left-0 items-center justify-center
          "
        >
          {isDark ? (
            <SunIcon
              size={20}
              aria-hidden="true"
              className="
                size-5 shrink-0
              "
            />
          ) : (
            <MoonIcon
              size={20}
              aria-hidden="true"
              className="
                size-5 shrink-0
              "
            />
          )}
        </span>

        <span
          aria-hidden="true"
          className="
            flex overflow-hidden
            min-w-0
            whitespace-nowrap font-body text-sm leading-5
            pointer-events-none transition-opacity
            absolute inset-y-0 left-11 right-2 items-center duration-[var(--duration-normal)] ease-[var(--ease-standard)] is-drawer-close:opacity-0 is-drawer-close:delay-0 is-drawer-open:opacity-100 is-drawer-open:delay-100 motion-reduce:transition-none
          "
        >
          <span
            className="
              truncate
            "
          >
            {isDark ? "Light mode" : "Dark mode"}
          </span>
        </span>
      </button>
    </Tooltip>
  );
}
