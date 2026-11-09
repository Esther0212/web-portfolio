"use client";

import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useRef, type MouseEvent } from "react";
import { flushSync } from "react-dom";

import { useTheme } from "@/providers/theme-provider";
import Tooltip from "./tooltip";

export type ThemeToggleProps = {
  className?: string;
};

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const iconRef = useRef<HTMLSpanElement>(null);
  const transitioning = useRef(false);

  async function handleThemeChange(event: MouseEvent<HTMLButtonElement>) {
    if (transitioning.current) return;

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      toggleTheme();
      return;
    }

    const bounds = (
      iconRef.current ?? event.currentTarget
    ).getBoundingClientRect();

    // Mouse/touch clicks start at the clicked position.
    // Keyboard activation starts at the icon's center.
    const x =
      event.detail === 0 ? bounds.left + bounds.width / 2 : event.clientX;

    const y =
      event.detail === 0 ? bounds.top + bounds.height / 2 : event.clientY;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    const root = document.documentElement;
    transitioning.current = true;
    root.classList.add("theme-iris-transition");

    const transition = document.startViewTransition(() => {
      flushSync(() => toggleTheme());
    });

    try {
      await transition.ready;
      await root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      ).finished;
    } catch {
      // A skipped transition still applies the theme update.
    } finally {
      await transition.finished.catch(() => {});
      root.classList.remove("theme-iris-transition");
      transitioning.current = false;
    }
  }

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
        onClick={handleThemeChange}
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
          ref={iconRef}
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
