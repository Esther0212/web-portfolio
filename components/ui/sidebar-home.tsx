"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import Tooltip from "./tooltip";

export type SidebarHomeProps = {
  title?: ReactNode;
  brand?: ReactNode;
  className?: string;
  onNavigate?: () => void;
};

export default function SidebarHome({
  title = "Esther Eblacas",
  brand,
  className = "",
  onNavigate,
}: SidebarHomeProps) {
  return (
    <div
      className={`
        relative z-10 shrink-0 p-2 ${className}
      `}
    >
      <Tooltip
        content="Home"
        collapsedOnly
        position="right"
        className="
          hover:z-50 focus-within:z-50
        "
      >
        <Link
          href="/#home"
          onClick={(event) => {
            // Preserve opening the link in a new tab.
            if (
              event.button !== 0 ||
              event.ctrlKey ||
              event.metaKey ||
              event.shiftKey ||
              event.altKey
            ) {
              return;
            }

            onNavigate?.();

            if (window.location.pathname === "/") {
              event.preventDefault();

              window.history.replaceState(null, "", "/");

              window.scrollTo({
                top: 0,
                left: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              });
            }
          }}
          aria-label="Go to home"
          className="
            block overflow-hidden
            h-11 w-full min-w-0
            text-sidebar-foreground
            rounded-[var(--radius)]
            transition-colors
            relative duration-[var(--duration-normal)] ease-[var(--ease-standard)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-sidebar-ring
          "
        >
          <span
            className="
              flex
              w-10
              absolute inset-y-0 left-0 items-center justify-center
            "
          >
            <span
              className="
                flex
                relative size-5 items-center justify-center
              "
            >
              {brand ?? (
                <>
                  <Image
                    src="/images/light-logo.png"
                    alt=""
                    width={20}
                    height={20}
                    className="
                      block object-contain
                      size-5 dark:hidden
                    "
                  />

                  <Image
                    src="/images/dark-logo.png"
                    alt=""
                    width={20}
                    height={20}
                    className="
                      hidden object-contain
                      size-5 dark:block
                    "
                  />
                </>
              )}
            </span>
          </span>

          <span
            aria-hidden="true"
            className="
              flex overflow-hidden
              min-w-0
              whitespace-nowrap font-heading text-sm font-semibold leading-5
              pointer-events-none transition-opacity
              absolute inset-y-0 left-11 right-2 items-center duration-[var(--duration-normal)] ease-[var(--ease-standard)] is-drawer-close:opacity-0 is-drawer-close:delay-0 is-drawer-open:opacity-100 is-drawer-open:delay-100 motion-reduce:transition-none
            "
          >
            <span
              className="
                truncate
              "
            >
              {title}
            </span>
          </span>
        </Link>
      </Tooltip>
    </div>
  );
}
