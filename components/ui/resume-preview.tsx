"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowSquareOutIcon,
  DownloadSimpleIcon,
  EyeIcon,
  FilePdfIcon,
  XIcon,
} from "@phosphor-icons/react";

import { getButtonStyles } from "./button";
import Tooltip from "./tooltip";

type ResumePreviewProps = {
  href: string;
};

export default function ResumePreview({ href }: ResumePreviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;

    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const dialogRef = useRef<HTMLDialogElement>(null);

  const toolbarClass = `
  inline-flex size-10 shrink-0 items-center justify-center
  rounded-md text-muted-foreground
  transition-colors hover:bg-muted hover:text-foreground
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-ring
`;

  return (
    <>
      <Tooltip
        content="Preview résumé"
        position="bottom"
        collapsedOnly={false}
        className="!w-auto shrink-0"
      >
        {/* Mobile: open the PDF directly in another tab */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View résumé in a new tab"
          className={`
    ${getButtonStyles("primary")}
    inline-flex size-[calc(1.25rem+1rem+2px)]!
    shrink-0 items-center justify-center p-0!
    md:hidden
  `}
        >
          <EyeIcon size={20} aria-hidden="true" />
        </a>

        {/* Desktop: open the existing iframe preview */}
        <button
          type="button"
          aria-label="Preview résumé"
          aria-haspopup="dialog"
          onClick={() => {
            dialogRef.current?.showModal();
            setIsOpen(true);
          }}
          className={`
    ${getButtonStyles("primary")}
    hidden md:inline-flex
    size-[calc(1.25rem+1rem+2px)]!
    shrink-0 items-center justify-center p-0!
  `}
        >
          <EyeIcon size={20} aria-hidden="true" />
        </button>
      </Tooltip>

      <dialog
        ref={dialogRef}
        aria-labelledby="resume-preview-heading"
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;

          const bounds = event.currentTarget.getBoundingClientRect();

          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          ) {
            event.currentTarget.close();
          }
        }}
        onClose={() => setIsOpen(false)}
        className="
          fixed inset-0 m-auto
          h-[90dvh] max-h-[calc(100dvh-2rem)]
          w-[calc(100%-2rem)] max-w-6xl
          overflow-hidden rounded-lg
          bg-background text-foreground
          shadow-2xl backdrop:bg-black/75
        "
      >
        <div className="flex h-full min-h-0 flex-col">
          {/* Custom white toolbar */}
          <div className="relative z-10 flex shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-3 py-3 text-card-foreground sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <FilePdfIcon
                size={24}
                className="shrink-0 text-primary"
                aria-hidden="true"
              />

              <h2
                id="resume-preview-heading"
                className="m-0 truncate text-base font-normal text-card-foreground"
              >
                Résumé Preview
              </h2>
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <Tooltip
                content="Download résumé"
                position="bottom"
                collapsedOnly={false}
                className="!w-auto shrink-0"
              >
                <a
                  href={href}
                  download
                  aria-label="Download résumé"
                  className={toolbarClass}
                >
                  <DownloadSimpleIcon size={21} aria-hidden="true" />
                </a>
              </Tooltip>

              <Tooltip
                content="Open in new tab"
                position="bottom"
                collapsedOnly={false}
                className="!w-auto shrink-0"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open résumé in a new tab"
                  className={toolbarClass}
                >
                  <ArrowSquareOutIcon size={21} aria-hidden="true" />
                </a>
              </Tooltip>

              <Tooltip
                content="Close"
                position="bottom"
                collapsedOnly={false}
                className="!w-auto shrink-0"
              >
                <button
                  type="button"
                  autoFocus
                  aria-label="Close résumé preview"
                  onClick={() => dialogRef.current?.close()}
                  className={toolbarClass}
                >
                  <XIcon size={20} aria-hidden="true" />
                </button>
              </Tooltip>
            </div>
          </div>

          {/* Browser PDF viewer */}
          <iframe
            src={href}
            title="Esther Beuthel Eblacas résumé"
            className="min-h-0 w-full flex-1 border-0 bg-background"
          />
        </div>
      </dialog>
    </>
  );
}
