import type { ComponentPropsWithoutRef, ReactNode } from "react";

type CardProps = Omit<ComponentPropsWithoutRef<"article">, "title"> & {
  title: string;
  icon?: ReactNode;
  image?: ReactNode;
};

export default function Card({
  title,
  icon,
  image,
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <article
      {...props}
      className={`
        min-w-0 overflow-hidden
        rounded-[var(--radius)] border border-border
        bg-card text-card-foreground
        ${className}
      `}
    >
      {image}

      <div className="p-6">
        {icon && (
          <div className="mb-6 text-primary" aria-hidden="true">
            {icon}
          </div>
        )}

        <h3 className="text-lg font-semibold tracking-normal">
          {title}
        </h3>

        {children}
      </div>
    </article>
  );
}