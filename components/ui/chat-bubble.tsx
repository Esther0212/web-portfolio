"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type ChatBubbleProps = {
  visible: boolean;
  message: string;
  className?: string;
  onTypingComplete?: () => void;
  finishImmediately?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const links: Record<string, string> = {
  "Sage | Valorant":
    "https://sketchfab.com/3d-models/sage-valorant-17612cddefbc4f92acddc5fe76625bc2",

  ILilMitch: "https://sketchfab.com/ILilMitch",

  "CC BY 4.0": "http://creativecommons.org/licenses/by/4.0/",
};

const linkPattern = /(Sage \| Valorant|ILilMitch|CC BY 4\.0)/g;

function renderTypedText(text: string) {
  return text.split(linkPattern).map((part, index) => {
    const href = links[part];

    if (!href) {
      return <span key={index}>{part}</span>;
    }

    return (
      <a
        key={index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => event.stopPropagation()}
        className="
          underline underline-offset-2 hover:opacity-70
        "
      >
        {part}
      </a>
    );
  });
}

export default function ChatBubble({
  visible,
  message,
  className = "",
  onTypingComplete,
  finishImmediately = false,
  onMouseEnter,
  onMouseLeave,
}: ChatBubbleProps) {
  const [displayedText, setDisplayedText] = useState("");
  const reducedMotion = useReducedMotion();

  const onTypingCompleteRef = useRef(onTypingComplete);

  useEffect(() => {
    onTypingCompleteRef.current = onTypingComplete;
  }, [onTypingComplete]);

  useEffect(() => {
    if (!visible) {
      setDisplayedText("");
      return;
    }

    if (reducedMotion || finishImmediately) {
      setDisplayedText(message);
      onTypingCompleteRef.current?.();
      return;
    }

    setDisplayedText("");

    let index = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      index++;

      setDisplayedText(message.slice(0, index));

      if (index >= message.length) {
        onTypingCompleteRef.current?.();
        return;
      }

      const character = message[index - 1];

      let delay = 25 + Math.random() * 35;

      if (/[.!?]/.test(character)) {
        delay += 250;
      } else if (/[,;]/.test(character)) {
        delay += 120;
      } else if (character === " ") {
        delay = 20;
      }

      timeout = setTimeout(type, delay);
    };

    timeout = setTimeout(type, 250);

    return () => clearTimeout(timeout);
  }, [visible, message, reducedMotion, finishImmediately]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 12,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 6,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
          }}
          className={`
            z-30
            w-[250px] max-w-[calc(100vw-3rem)]
            pointer-events-auto
            absolute bottom-[90%] left-1/2 -translate-x-1/2 origin-bottom ${className}
            lg:w-[180px] lg:bottom-auto lg:top-[20%] lg:left-[85.5%] lg:origin-left
          `}
        >
          <div
            className="
              px-3 py-2
              text-[var(--tooltip-text-color)]
              bg-[var(--tooltip-color)]
              rounded-md
              shadow-md
              relative
            "
          >
            <p
              className="
                font-body text-[length:var(--text-caption-size)] leading-normal whitespace-pre-wrap
              "
            >
              {renderTypedText(reducedMotion ? message : displayedText)}

              {!reducedMotion && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                  }}
                  aria-hidden="true"
                  className="
                    inline-block
                    h-3 w-[2px]
                    ml-0.5
                    align-middle
                    bg-[var(--tooltip-text-color)]
                  "
                />
              )}
            </p>

            {/* Tooltip-style tail */}
            <div
              aria-hidden="true"
              className="
                h-[6px] w-[12px]
                bg-[var(--tooltip-color)]
                absolute -bottom-[5px] left-1/2 -translate-x-1/2 [clip-path:polygon(0_0,100%_0,50%_100%)]
                lg:h-[12px] lg:w-[6px] lg:bottom-auto lg:-left-[5px] lg:top-3 lg:translate-x-0 lg:[clip-path:polygon(100%_0,100%_100%,0_50%)]
              "
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
