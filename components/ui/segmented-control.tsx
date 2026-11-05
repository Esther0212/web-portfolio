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
        inline-flex flex-wrap
        p-2
        bg-background/90
        rounded-[var(--radius)] border border-border
        gap-2 ${className}
      `}
    >
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={value === option}
          onClick={() => onChange(option)}
          className={`
            px-4 py-2
            text-sm
            rounded-md border
            transition-colors
            capitalize duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring
            ${
              value === option
                ? "border-primary bg-chart-1/25 text-foreground"
                : "border-transparent text-foreground hover:bg-muted"
            }
          `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
