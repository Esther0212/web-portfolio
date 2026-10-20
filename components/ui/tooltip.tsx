import type { ComponentPropsWithoutRef, ReactNode, CSSProperties } from "react";

export type TooltipProps = Omit<ComponentPropsWithoutRef<"div">, "content"> & {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  collapsedOnly?: boolean;
  disabled?: boolean;
};

const positions = {
  top: "tooltip-top",
  bottom: "tooltip-bottom",
  left: "tooltip-left",
  right: "tooltip-right",
} as const;

const collapsedPositions = {
  top: "is-drawer-close:tooltip-top",
  bottom: "is-drawer-close:tooltip-bottom",
  left: "is-drawer-close:tooltip-left",
  right: "is-drawer-close:tooltip-right",
} as const;

export default function Tooltip({
  children,
  content,
  position = "right",
  collapsedOnly = true,
  disabled = false,
  className = "",
  style,
  ...props
}: TooltipProps) {
  const tooltipClasses = disabled
    ? ""
    : collapsedOnly
      ? `is-drawer-close:tooltip ${collapsedPositions[position]}`
      : `tooltip ${positions[position]}`;

  const tooltipStyle = {
    ...style,

    // Use the custom colors from globals.css
    "--tooltip-color": "var(--foreground)",
    "--tooltip-text-color": "var(--background)",
  } as CSSProperties;

  return (
    <div
      {...props}
      data-tip={disabled ? undefined : content}
      style={tooltipStyle}
      className={`
        relative block! w-full min-w-0
        align-top leading-none

        ${tooltipClasses}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
