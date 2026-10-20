import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type MainProps = ComponentPropsWithoutRef<"main"> & {
  children: ReactNode;
  padded?: boolean;
};

export default function Main({
  children,
  padded = false,
  className = "",
  ...props
}: MainProps) {
  return (
    <main
      {...props}
      className={`
        flex-1
        w-full min-w-0
        text-foreground
        bg-background
        ${padded ? "px-4 py-6 sm:px-6 lg:px-8" : ""}
        ${className}
      `}
    >
      {children}
    </main>
  );
}
