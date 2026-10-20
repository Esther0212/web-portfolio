"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { SidebarSimpleIcon } from "@phosphor-icons/react";

export type HeaderProps = ComponentPropsWithoutRef<"header"> & {
  children?: ReactNode;
  title?: ReactNode;
  actions?: ReactNode;
  drawerId?: string;
  sidebarExpanded?: boolean;
  onToggleSidebar?: () => void;
};

export default function Header({
  children,
  title,
  actions,
  drawerId,
  sidebarExpanded,
  onToggleSidebar,
  className = "",
  ...props
}: HeaderProps) {
  // Keep compatibility with the title prop passed by Drawer.
  void title;

  return (
    <header
      {...props}
      className={`
        flex
        min-h-16 w-full min-w-0
        px-4 py-3
        text-foreground
        bg-background
        border-b border-border
        shrink-0 items-center gap-3 ${className}
        sm:px-6
        lg:px-8
      `}
    >
      {drawerId && (
        <button
          type="button"
          onClick={onToggleSidebar}
          aria-label="Expand or collapse sidebar"
          aria-controls={`${drawerId}-panel`}
          aria-expanded={sidebarExpanded}
          className="
            flex
            p-0
            text-sidebar-foreground
            bg-transparent
            rounded-[var(--radius)] border-0
            transition-colors
            size-10 shrink-0 items-center justify-center duration-[var(--duration-normal)] ease-[var(--ease-standard)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-sidebar-ring
          "
        >
          <SidebarSimpleIcon
            size={20}
            aria-hidden="true"
            className="
              size-5 shrink-0
            "
          />
        </button>
      )}

      <div
        className="
          flex flex-1
          min-w-0
          items-center gap-3
        "
      >
        {children}
      </div>

      {actions && (
        <div
          className="
            flex
            shrink-0 items-center gap-2
          "
        >
          {actions}
        </div>
      )}
    </header>
  );
}
