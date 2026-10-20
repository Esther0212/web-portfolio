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
              onClick={onNavigate}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
