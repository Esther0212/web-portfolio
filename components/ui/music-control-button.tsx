
"use client";

import type { ComponentPropsWithoutRef } from "react";
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "@phosphor-icons/react";

import Tooltip from "./tooltip";

export type MusicControlAction =
  | "previous"
  | "play"
  | "pause"
  | "next";

export type MusicControlButtonProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children"
> & {
  action: MusicControlAction;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
};

const labels: Record<MusicControlAction, string> = {
  previous: "Previous",
  play: "Play",
  pause: "Pause",
  next: "Next",
};

export default function MusicControlButton({
  action,
  tooltipPosition = "bottom",
  className = "",
  type = "button",
  ...props
}: MusicControlButtonProps) {
  const isPrimary = action === "play" || action === "pause";
  const label = labels[action];

  const buttonClasses = isPrimary
    ? `
        size-8
        bg-primary
        text-primary-foreground
        shadow-sm

        hover:scale-105
        active:scale-95
      `
    : `
        size-7
        text-muted-foreground

        hover:bg-muted
        hover:text-foreground
      `;

  const icon = (() => {
    switch (action) {
      case "previous":
        return <SkipBackIcon size={14} weight="fill" />;

      case "play":
        return <PlayIcon size={15} weight="fill" />;

      case "pause":
        return <PauseIcon size={15} weight="fill" />;

      case "next":
        return <SkipForwardIcon size={14} weight="fill" />;
    }
  })();

  return (
    <Tooltip
      content={label}
      position={tooltipPosition}
      collapsedOnly={false}
      className="!w-auto shrink-0"
    >
      <button
        {...props}
        type={type}
        aria-label={props["aria-label"] ?? label}
        className={`
          relative flex shrink-0
          items-center justify-center
          rounded-full border-0

          transition-[background-color,color,transform]
          duration-[var(--duration-normal)]
          ease-[var(--ease-standard)]

          focus-visible:outline-2
          focus-visible:outline-offset-2
          focus-visible:outline-primary

          ${buttonClasses}
          ${className}
        `}
      >
        {icon}
      </button>
    </Tooltip>
  );
}
