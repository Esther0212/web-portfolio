"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import ChatBubble from "@/components/ui/chat-bubble";

const SageScene = dynamic(() => import("./sage-scene"), {
  ssr: false,
});

export default function SagePortrait() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [bubbleClicked, setBubbleClicked] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bubbleHoveredRef = useRef(false);
  const hoverLeaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const clearTimer = () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = () => {
    clearTimer();

    setClicked(true);
    setDismissed(false);
  };

  const handleTypingComplete = () => {
    if (!clicked) return;

    clearTimer();

    timeoutRef.current = setTimeout(() => {
      setClicked(false);

      if (!bubbleHoveredRef.current) {
        setDismissed(true);
      }

      timeoutRef.current = null;
    }, 6000);
  };

  const showBubble = clicked || bubbleClicked || (hovered && !dismissed);

  const cancelHoverLeave = () => {
    if (hoverLeaveTimeoutRef.current !== null) {
      clearTimeout(hoverLeaveTimeoutRef.current);
      hoverLeaveTimeoutRef.current = null;
    }
  };

  const handleBubbleEnter = () => {
    cancelHoverLeave();
    bubbleHoveredRef.current = true;

    setHovered(true);
    setDismissed(false);
  };

  const handleBubbleClick = () => {
    clearTimer();
    setBubbleClicked(true);
    setDismissed(false);
  };

  const handleBubbleLeave = () => {
    bubbleHoveredRef.current = false;
    setBubbleClicked(false);

    if (!clicked) {
      setHovered(false);
    }
  };

  const handleSageEnter = () => {
    cancelHoverLeave();

    setHovered(true);
    setDismissed(false);
  };

  const handleSageLeave = () => {
    cancelHoverLeave();

    hoverLeaveTimeoutRef.current = setTimeout(() => {
      if (!bubbleHoveredRef.current && !clicked) {
        setHovered(false);
      }

      hoverLeaveTimeoutRef.current = null;
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (hoverLeaveTimeoutRef.current !== null) {
        clearTimeout(hoverLeaveTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative isolate h-full w-full overflow-visible">
      {/* Sage and ambient lighting move together */}
      <div className="absolute inset-0">
        {/* Main ambient glow */}
        <div
          aria-hidden="true"
          className="
          pointer-events-none
          absolute left-1/2 top-1/2 z-0
          h-[75%] w-[85%]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_70%)]
          opacity-55 blur-[65px]
        "
        />

        {/* Secondary ambient glow */}
        <div
          aria-hidden="true"
          className="
          pointer-events-none
          absolute left-1/2 top-1/2 z-0
          h-[55%] w-[65%]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-[radial-gradient(ellipse_at_center,var(--primary)_0%,transparent_75%)]
          opacity-50 blur-[90px]
        "
        />

        {/* Sage 3D model */}
        <div className="relative z-10 h-full w-full">
          <SageScene
            onHoverChange={(isHovered) => {
              if (isHovered) {
                handleSageEnter();
              } else {
                handleSageLeave();
              }
            }}
            onModelClick={handleClick}
          />
        </div>
      </div>

      {/* Chat bubble remains positioned relative to portrait */}
      <ChatBubble
        visible={showBubble}
        finishImmediately={clicked || bubbleClicked}
        onTypingComplete={handleTypingComplete}
        onMouseEnter={handleBubbleEnter}
        onMouseLeave={handleBubbleLeave}
        onClick={handleBubbleClick}
        message={
          "Hey! I'm Sage. ✨\n\n" +
          "My 3D model was created by ILilMitch " +
          "and is based on Sage | Valorant.\n\n" +
          "Licensed under CC BY 4.0. " +
          "Adapted with interactive head tracking."
        }
      />
    </div>
  );
}
