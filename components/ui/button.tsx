import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";

const baseStyles = `
  rounded-md border px-4 py-2
  text-sm
  transition-colors duration-200
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-ring
  disabled:cursor-not-allowed disabled:opacity-50
  disabled:pointer-events-none
`;

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    border-transparent
    bg-primary text-secondary
    hover:bg-primary/85
  `,
  secondary: `
    border-primary
    bg-chart-1/15 text-foreground
    hover:bg-chart-1/60
    dark:hover:bg-chart-1/25
  `,
};

/* Share these styles with links too. */
export function getButtonStyles(
  variant: ButtonVariant = "primary",
) {
  return `${baseStyles} ${variantStyles[variant]}`;
}

/* Preserve your existing secondary link styles. */
export const buttonStyles = getButtonStyles("secondary");

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`${getButtonStyles(variant)} ${className}`}
    >
      {children}
    </button>
  );
}