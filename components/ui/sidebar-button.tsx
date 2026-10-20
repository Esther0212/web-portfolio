"use client";

import Link from "next/link";

import type { Icon } from "@phosphor-icons/react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import Tooltip from "./tooltip";

export type SidebarButtonProps = Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "children"
> & {
  icon: Icon;
  label: string;
  children?: ReactNode;
  external?: boolean;
  active?: boolean;
};

export default function SidebarButton({
  icon: IconComponent,
  label,
  children,
  external = false,
  active = false,
  className = "",
  target,
  rel,
  ...props
}: SidebarButtonProps) {
  return (
    <Tooltip
      content={label}
      position="right"
      collapsedOnly
      className="
        hover:z-50 focus-within:z-50
      "
    >
      <Link
        {...props}
        target={target ?? (external ? "_blank" : undefined)}
        rel={rel ?? (external ? "noopener noreferrer" : undefined)}
        aria-label={label}
        aria-current={active ? "location" : undefined}
        className={`
          block overflow-hidden
          h-10 w-full min-w-0
          text-sidebar-foreground
          rounded-[var(--radius)]
          transition-colors
          relative shrink-0 duration-[var(--duration-normal)] ease-[var(--ease-standard)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-sidebar-ring
          ${active ? "bg-sidebar-accent font-semibold" : ""}
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
          <IconComponent
            size={20}
            aria-hidden="true"
            className="
              size-5 shrink-0
            "
          />
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
            {children ?? label}
          </span>
        </span>
      </Link>
    </Tooltip>
  );
}
