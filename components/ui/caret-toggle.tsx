import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import type { ComponentPropsWithoutRef } from "react";

type CaretToggleProps = Omit<
  ComponentPropsWithoutRef<"button">,
  "children" | "aria-expanded"
> & {
  expanded: boolean;
};

export default function CaretToggle({
  expanded,
  className = "",
  type = "button",
  ...props
}: CaretToggleProps) {
  const Icon = expanded ? CaretUpIcon : CaretDownIcon;

  return (
    <button
      {...props}
      type={type}
      aria-expanded={expanded}
      className={`
        surface-muted inline-flex shrink-0
        items-center justify-center
        px-4 py-2 text-sm
        cursor-pointer
        transition-colors
        hover:bg-accent hover:text-primary
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-ring
        motion-reduce:transition-none
        ${className}
      `}
    >
      <span className="inline-flex h-[1lh] items-center justify-center">
        <Icon size={18} aria-hidden="true" />
      </span>
    </button>
  );
}
