"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithRef,
} from "react";

import CaretToggle from "./caret-toggle";

type ChipProps = ComponentPropsWithRef<"span">;

export default function Chip({
  children,
  className = "",
  ...props
}: ChipProps) {
  return (
    <span
      {...props}
      className={`
        surface-muted inline-flex items-center
        px-4 py-2 text-sm
        ${className}
      `}
    >
      {children}
    </span>
  );
}

type ChipGroupProps = {
  items: string[];
  label?: string;
  className?: string;
};

type RowLayout = {
  height: number;
  count: number;
  overflowing: boolean;
  toggleLeft: number;
  toggleTop: number;
};

export function ChipGroup({
  items,
  label = "Skills",
  className = "",
}: ChipGroupProps) {
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [layout, setLayout] = useState<RowLayout | null>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let disposed = false;
    let frame = 0;

    function measure() {
      if (disposed || !list) return;

      const chips = Array.from(list.children) as HTMLLIElement[];
      const first = chips[0];

      if (!first) {
        setLayout(null);
        return;
      }

      const firstTop = first.offsetTop;
      const firstRow = chips.filter(
        (chip) => Math.abs(chip.offsetTop - firstTop) <= 1,
      );

      const lastVisible = firstRow[firstRow.length - 1];

      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;

      const nextLayout: RowLayout = {
        height: Math.ceil(
          Math.max(
            ...firstRow.map((chip) => chip.offsetTop + chip.offsetHeight),
          ),
        ),
        count: firstRow.length,
        overflowing: firstRow.length < chips.length,
        toggleLeft:
          list.offsetLeft +
          lastVisible.offsetLeft +
          lastVisible.offsetWidth +
          gap,
        toggleTop: list.offsetTop + lastVisible.offsetTop,
      };

      setLayout((previous) => {
        if (
          previous?.height === nextLayout.height &&
          previous.count === nextLayout.count &&
          previous.overflowing === nextLayout.overflowing &&
          previous.toggleLeft === nextLayout.toggleLeft &&
          previous.toggleTop === nextLayout.toggleTop
        ) {
          return previous;
        }

        return nextLayout;
      });
    }

    function scheduleMeasure() {
      if (disposed) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    const observer = new ResizeObserver(scheduleMeasure);

    observer.observe(list);

    for (const chip of Array.from(list.children)) {
      observer.observe(chip);
    }

    scheduleMeasure();

    // Measure again once the actual fonts have loaded.
    void document.fonts.ready.then(scheduleMeasure);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [items, expanded]);

  if (items.length === 0) return null;

  return (
    <div className={`chip-group ${className}`}>
      <ul
        ref={listRef}
        id={listId}
        aria-label={label}
        className="chip-group-list"
        style={{
          maxHeight: expanded ? undefined : (layout?.height ?? 44),
        }}
      >
        {items.map((item, index) => (
          <li
            key={item}
            className="chip-group-item"
            aria-hidden={
              !expanded && layout !== null && index >= layout.count
                ? true
                : undefined
            }
          >
            <Chip className="max-w-full [overflow-wrap:anywhere]">{item}</Chip>
          </li>
        ))}
      </ul>

      {layout?.overflowing && (
        <CaretToggle
          expanded={expanded}
          aria-controls={listId}
          aria-label={`${expanded ? "Show fewer" : "Show all"} ${label}`}
          onClick={() => setExpanded((current) => !current)}
          className="chip-group-toggle"
          style={{
            left: layout.toggleLeft,
            top: layout.toggleTop,
          }}
        />
      )}
    </div>
  );
}
