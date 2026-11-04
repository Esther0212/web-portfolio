"use client";

import type { Icon } from "@phosphor-icons/react";

import SidebarButton from "./ui/sidebar-button";

export type NavigationItem = {
  label: string;
  href: string;
  icon: Icon;
  external?: boolean;
  active?: boolean;
};

export type SidebarNavigationProps = {
  items: NavigationItem[];
  onNavigate?: () => void;
  className?: string;
};

export default function SidebarNavigation({
  items,
  onNavigate,
  className = "",
}: SidebarNavigationProps) {
  return (
    <nav
      aria-label="Portfolio navigation"
      className={`
        relative min-h-0 min-w-0 flex-1
        overflow-visible px-2 pt-3
        ${className}
      `}
    >
      <ul
        className="
          flex flex-col
          w-full min-w-0
          p-0
          gap-1
        "
      >
        {items.map((item) => (
          <li
            key={`${item.href}-${item.label}`}
            className="
              block
              h-10
              relative shrink-0 list-none
            "
          >
            <SidebarButton
              href={item.href}
              icon={item.icon}
              label={item.label}
              external={item.external}
              active={item.active}
              onClick={(event) => {
                // Keep Ctrl/Cmd-click and new-tab behavior.
                if (
                  event.button !== 0 ||
                  event.ctrlKey ||
                  event.metaKey ||
                  event.shiftKey ||
                  event.altKey
                ) {
                  return;
                }

                const destination = new URL(item.href, window.location.href);

                if (
                  item.external ||
                  destination.origin !== window.location.origin ||
                  destination.pathname !== window.location.pathname ||
                  destination.search !== window.location.search ||
                  !destination.hash
                ) {
                  onNavigate?.();
                  return;
                }

                const section = document.getElementById(
                  decodeURIComponent(destination.hash.slice(1)),
                );

                if (!section) {
                  onNavigate?.();
                  return;
                }

                event.preventDefault();
                onNavigate?.();

                if (window.location.hash !== destination.hash) {
                  window.history.pushState(null, "", destination.href);
                }

                window.dispatchEvent(new Event("portfolio:navigate"));

                // Scroll on every click, including repeated clicks.
                section.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                  block: "start",
                });
              }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
