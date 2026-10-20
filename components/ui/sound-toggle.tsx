"use client";

import { useState } from "react";
import { SpeakerHighIcon, SpeakerSlashIcon } from "@phosphor-icons/react";

import Tooltip from "./tooltip";

export type SoundToggleProps = {
  defaultEnabled?: boolean;
  onChange?: (enabled: boolean) => void;
  className?: string;
};

export default function SoundToggle({
  defaultEnabled = true,
  onChange,
  className = "",
}: SoundToggleProps) {
  const [enabled, setEnabled] = useState(defaultEnabled);

  function toggleSound() {
    const next = !enabled;
    setEnabled(next);
    onChange?.(next);
  }

  return (
    <Tooltip
      content={enabled ? "Mute sound" : "Enable sound"}
      collapsedOnly
      position="right"
      className="
        hover:z-50 focus-within:z-50
      "
    >
      <button
        type="button"
        onClick={toggleSound}
        aria-label="Sound"
        aria-pressed={enabled}
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
          {enabled ? (
            <SpeakerHighIcon
              size={20}
              aria-hidden="true"
              className="
                size-5 shrink-0
              "
            />
          ) : (
            <SpeakerSlashIcon
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
            {enabled ? "Sound on" : "Sound off"}
          </span>
        </span>
      </button>
    </Tooltip>
  );
}
