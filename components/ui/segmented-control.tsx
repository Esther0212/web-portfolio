"use client";

type SegmentedControlProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export default function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className = "",
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`
        inline-flex flex-wrap gap-2
        rounded-[var(--radius)]
        border border-border
        bg-background/90 p-2
        ${className}
      `}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
          className={`
            rounded-md px-4 py-2
            text-sm capitalize transition-colors
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-ring
            ${
              value === option
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted"
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}