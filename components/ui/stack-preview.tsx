"use client";

import { useEffect, useRef, useState } from "react";

import Chip from "./chip";

type StackPreviewProps = {
  items: string[];
};

type PreviewLayout = {
  count: number;
  height: number;
  moreTop: number;
};

export default function StackPreview({ items }: StackPreviewProps) {
  const measureRef = useRef<HTMLUListElement>(null);
  const moreRef = useRef<HTMLSpanElement>(null);
  const [layout, setLayout] = useState<PreviewLayout | null>(null);

  useEffect(() => {
    const list = measureRef.current;
    const more = moreRef.current;

    if (!list || !more) return;

    let disposed = false;
    let frame = 0;

    function measure() {
      if (disposed || !list || !more || list.clientWidth === 0) {
        return;
      }

      const chips = Array.from(list.children) as HTMLLIElement[];

      if (chips.length === 0) return;

      const rowTops = [...new Set(chips.map((chip) => chip.offsetTop))];
      const secondRowTop = rowTops[1] ?? rowTops[0];

      let count = chips.filter(
        (chip) => chip.offsetTop <= secondRowTop,
      ).length;

      const hasMore = count < chips.length;
      const gap = parseFloat(getComputedStyle(list).columnGap) || 0;

      if (hasMore) {
        const availableRight =
          list.clientWidth - more.offsetWidth - gap;

        // Remove chips from the end of row two until "+ more" fits.
        while (count > 0) {
          const last = chips[count - 1];

          if (
            last.offsetTop < secondRowTop ||
            last.offsetLeft + last.offsetWidth <= availableRight
          ) {
            break;
          }

          count -= 1;
        }
      }

      const secondRow = chips.filter(
        (chip) => chip.offsetTop === secondRowTop,
      );

      const height = hasMore
        ? secondRowTop +
          Math.max(
            more.offsetHeight,
            ...secondRow.map((chip) => chip.offsetHeight),
          )
        : Math.max(
            ...chips.map((chip) => chip.offsetTop + chip.offsetHeight),
          );

      const nextLayout = {
        count,
        height,
        moreTop: secondRowTop,
      };

      setLayout((previous) =>
        previous?.count === nextLayout.count &&
        previous.height === nextLayout.height &&
        previous.moreTop === nextLayout.moreTop
          ? previous
          : nextLayout,
      );
    }

    function scheduleMeasure() {
      if (disposed) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    }

    const observer = new ResizeObserver(scheduleMeasure);

    observer.observe(list);
    observer.observe(more);

    for (const chip of Array.from(list.children)) {
      observer.observe(chip);
    }

    scheduleMeasure();
    void document.fonts.ready.then(scheduleMeasure);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [items]);

  if (items.length === 0) return null;

  const hiddenCount = layout ? items.length - layout.count : 0;

  return (
    <div
      className="stack-preview"
      style={{ minHeight: layout?.height ?? "6rem" }}
    >
      {/* Measurement copies are hidden visually and from screen readers. */}
      <ul
        ref={measureRef}
        aria-hidden="true"
        className="stack-chip-list stack-preview-measure"
      >
        {items.map((item) => (
          <li key={item}>
            <Chip>{item}</Chip>
          </li>
        ))}
      </ul>

      <Chip
        ref={moreRef}
        aria-hidden="true"
        className="stack-more stack-preview-more-measure"
      >
        + more
      </Chip>

      {layout && (
  <ul aria-label="Stack preview" className="stack-chip-list">
    {items.slice(0, layout.count).map((item) => (
      <li key={item}>
        <Chip>{item}</Chip>
      </li>
    ))}

    {hiddenCount > 0 && (
      <li>
        <Chip
          className="stack-more"
          aria-label={`${hiddenCount} more technologies. Use All Stack to view them.`}
        >
          + more
        </Chip>
      </li>
    )}
  </ul>
)}
    </div>
  );
}