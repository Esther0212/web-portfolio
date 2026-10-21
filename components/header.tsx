"use client";

import {
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";

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
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);

  void title;

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? current;

    if (current === previous) return;

    setHidden(current > previous && current > 150);
  });

  return (
    <motion.div
      className="portfolio-scroll-header"
      initial={false}
      animate={{
        y: hidden ? "-100%" : "0%",
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.25,
        ease: "easeInOut",
      }}
      style={{
        pointerEvents: hidden ? "none" : "auto",
      }}
      onFocusCapture={() => setHidden(false)}
    >
      <div className="portfolio-header-surface">
        <header
          {...props}
          className={`
            flex
            min-h-16 w-full min-w-0
            px-4 py-3
            text-foreground
            bg-background
            border-b border-border
            shrink-0 items-center gap-3
            sm:px-6
            lg:px-8
            ${className}
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
                size-10 shrink-0 items-center justify-center
                p-0
                text-sidebar-foreground
                bg-transparent
                rounded-[var(--radius)] border-0
                transition-colors
                duration-[var(--duration-normal)]
                ease-[var(--ease-standard)]
                hover:bg-sidebar-accent
                hover:text-sidebar-accent-foreground
                focus-visible:outline-2
                focus-visible:outline-sidebar-ring
              "
            >
              <SidebarSimpleIcon
                size={20}
                aria-hidden="true"
                className="size-5 shrink-0"
              />
            </button>
          )}

          <div className="flex min-w-0 flex-1 items-center gap-3">
            {children}
          </div>

          {actions && (
            <div className="flex shrink-0 items-center gap-2">
              {actions}
            </div>
          )}
        </header>
      </div>
    </motion.div>
  );
}