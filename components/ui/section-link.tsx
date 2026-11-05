import Link from "next/link";
import type { ComponentProps } from "react";

type SectionLinkProps = Omit<
  ComponentProps<typeof Link>,
  "children"
> & {
  label: string;
};

export default function SectionLink({
  label,
  className = "",
  ...props
}: SectionLinkProps) {
  return (
    <Link
      {...props}
      className={`
        inline-flex shrink-0 items-center gap-2
        bg-transparent
        font-display text-base text-muted-foreground
        hover:text-secondary-foreground transition-colors
        focus-visible:outline-2
        focus-visible:outline-offset-4
        focus-visible:outline-ring
        ${className}
      `}
    >
      <span>{label}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}