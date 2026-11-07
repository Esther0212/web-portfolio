import type { ComponentPropsWithoutRef } from "react";

type ChipProps = ComponentPropsWithoutRef<"span">;

export default function Chip({
  children,
  className = "",
  ...props
}: ChipProps) {
  return (
    <span
      {...props}
      className={`surface-muted inline-flex items-center px-4 py-2 text-sm ${className}`}
    >
      {children}
    </span>
  );
}