import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { PlusIcon } from "@phosphor-icons/react/ssr";

type ExpandableCardProps = Omit<
  ComponentPropsWithoutRef<"details">,
  "title" | "children"
> & {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  meta?: ReactNode;
  children: ReactNode;
  collapsible?: boolean;
};

export default function ExpandableCard({
  title,
  description,
  icon,
  meta,
  children,
  collapsible = true,
  open = true,
  className = "",
  ...props
}: ExpandableCardProps) {
  const heading = (
    <>
      <span className="expandable-card-heading">
        {icon && (
          <span className="expandable-card-icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <span className="expandable-card-label">
          <span className="expandable-card-title">{title}</span>

          {description && (
            <span className="expandable-card-description">
              {description}
            </span>
          )}
        </span>
      </span>

      {meta && (
        <span className="expandable-card-meta">{meta}</span>
      )}
    </>
  );

if (!collapsible) {
  return (
    <div className={`expandable-card expandable-card-static ${className}`}>
      <div className="expandable-card-summary">{heading}</div>
    </div>
  );
}

  return (
    <details
      {...props}
      open={open}
      className={`expandable-card ${className}`}
    >
      <summary className="expandable-card-summary">
        {heading}

        <span className="expandable-card-toggle" aria-hidden="true">
          <PlusIcon size={20} />
        </span>
      </summary>

      <div className="expandable-card-body">{children}</div>
    </details>
  );
}