import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type FooterProps = ComponentPropsWithoutRef<"footer"> & {
  children?: ReactNode;
};

export default function Footer({
  children,
  className = "",
  ...props
}: FooterProps) {
  return (
    <footer
      {...props}
      className={`
        flex flex-col
        w-full min-w-0
        px-4 py-5
        text-sm text-muted-foreground
        bg-background
        border-t border-border
        shrink-0 gap-3 ${className}
        sm:flex-row sm:px-6 sm:items-center sm:justify-between
        lg:px-8
      `}
    >
      {children ?? (
        <p>
          © {new Date().getFullYear()} Esther Eblacas. All rights reserved.
        </p>
      )}
    </footer>
  );
}
