"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import {
  motion,
  useReducedMotion,
  type TargetAndTransition,
} from "motion/react";

import MusicPlayer from "./music-player";
import { homeSceneHitAreas } from "@/lib/home-scene-hit-areas";

type DesktopArrangement = "scattered" | "tidy";

type SceneObject = {
  file: string;
  width: string;
  zIndex: number;
  scattered: TargetAndTransition;
  tidy: TargetAndTransition;
  compact: TargetAndTransition;
};

const deviceQuery =
  "(max-width: 1023px), (max-width: 1366px) and (pointer: coarse)";

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia(query);

      mediaQuery.addEventListener("change", callback);

      return () => {
        mediaQuery.removeEventListener("change", callback);
      };
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const compactGroup = {
  width: "500px",
  left: "50%",
  top: "50%",
};

const objects: SceneObject[] = [
  {
    file: "laptop.png",
    width: "510px",
    zIndex: 1,
    scattered: {
      left: "-15%",
      top: "-40%",
      rotate: -30,
    },
    tidy: {
      left: "28%",
      top: "-45%",
      rotate: 0,
    },
    compact: {
      left: "-60%",
      top: "-40%",
      rotate: -20,
      zIndex: 0,
    },
  },
  {
    file: "mouse.png",
    width: "180px",
    zIndex: 2,
    scattered: {
      left: "30%",
      top: "85%",
      rotate: -40,
    },
    tidy: {
      left: "65%",
      top: "-3%",
      rotate: 0,
    },
    compact: {
      left: "30%",
      top: "-15%",
      rotate: -30,
    },
  },
  {
    file: "plant.png",
    width: "260px",
    zIndex: 4,
    scattered: {
      left: "25%",
      top: "-30%",
      rotate: 10,
    },
    tidy: {
      left: "-7%",
      top: "-14%",
      rotate: 0,
    },
    compact: {
      left: "60%",
      top: "70%",
      rotate: 10,
    },
  },
  {
    file: "torn-paper.png",
    width: "200px",
    zIndex: 1,
    scattered: {
      left: "75%",
      top: "25%",
      rotate: -6,
    },
    tidy: {
      left: "80%",
      top: "40%",
      rotate: 0,
    },
    compact: {
      left: "65%",
      top: "0%",
      rotate: 0,
    },
  },
  {
    file: "phone.png",
    width: "250px",
    zIndex: 3,
    scattered: {
      left: "50%",
      top: "-20%",
      rotate: 40,
    },
    tidy: {
      left: "10%",
      top: "-15%",
      rotate: 0,
    },
    compact: {
      left: "60%",
      top: "-30%",
      rotate: 90,
    },
  },
  {
    file: "coffee.png",
    width: "200px",
    zIndex: 2,
    scattered: {
      left: "70%",
      top: "80%",
      rotate: -20,
    },
    tidy: {
      left: "85%",
      top: "75%",
      rotate: 0,
    },
    compact: {
      left: "80%",
      top: "30%",
      rotate: -20,
    },
  },
  {
    file: "notebook.png",
    width: "400px",
    zIndex: 1,
    scattered: {
      left: "75%",
      top: "-20%",
      rotate: -8,
    },
    tidy: {
      left: "0%",
      top: "50%",
      rotate: 0,
    },
    compact: {
      /*
       * The notebook fills the group.
       * Move compactGroup above to move everything together.
       */
      left: "0%",
      top: "0%",
      rotate: 0,
    },
  },
  {
    file: "pen.png",
    width: "200px",
    zIndex: 2,
    scattered: {
      left: "10%",
      top: "75%",
      rotate: 15,
    },
    tidy: {
      left: "25%",
      top: "65%",
      rotate: -35,
    },
    compact: {
      left: "50%",
      top: "60%",
      rotate: 5,
    },
  },
  {
    file: "lamp.png",
    width: "300px",
    zIndex: 3,
    scattered: {
      left: "90%",
      top: "61%",
      rotate: 25,
      scaleX: -1,
    },
    tidy: {
      left: "-13%",
      top: "50%",
      rotate: 20,
      scaleX: 1,
    },
    compact: {
      // Centered above the torn paper's image box.
      left: "-10%",
      top: "75%",
      x: "-50%",
      y: "-100%",
      rotate: 5,
      scaleX: 1,
      zIndex: 1,
    },
  },
];

const musicPositions: Record<
  DesktopArrangement | "compact",
  TargetAndTransition
> = {
  scattered: {
    left: "-3%",
    top: "50%",
    rotate: 30,
    zIndex: 10,
  },
  tidy: {
    left: "86.3%",
    top: "0%",
    rotate: -12,
    zIndex: 10,
  },
  compact: {
    // Relative to the same notebook group.
    left: "10%",
    top: "70%",
    rotate: 78,
    zIndex: 1,
  },
};

type SceneImageProps = {
  object: SceneObject;
  position: TargetAndTransition;
  reduceMotion: boolean;
  imageWidth?: string;
};

function SceneImage({
  object,
  position,
  reduceMotion,
  imageWidth,
}: SceneImageProps) {
  const width = imageWidth ?? object.width;
  const hidden = position.opacity === 0;

  return (
    <motion.div
      initial={false}
      animate={{
        x: 0,
        y: 0,
        rotate: 0,
        scaleX: 1,
        opacity: 1,
        width,
        zIndex: object.zIndex,
        ...position,
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 100,
              damping: 22,
            }
      }
      style={{ width }}
      className="pointer-events-none absolute aspect-square"
    >
      <motion.div
        whileHover={
          reduceMotion || hidden
            ? undefined
            : {
                scale: 1.08,
                rotate: 5,
              }
        }
        className="relative h-full w-full"
      >
        <span
          style={{
            clipPath: homeSceneHitAreas[object.file],
          }}
          className={`
            absolute inset-0
            ${
              hidden
                ? "pointer-events-none"
                : "pointer-events-auto"
            }
          `}
        />

        <Image
          src={`/interactive-images/${object.file}`}
          alt=""
          fill
          sizes={width}
          loading={
            object.file === "notebook.png" ? "eager" : "lazy"
          }
          draggable={false}
          className="
            pointer-events-none select-none
            object-contain drop-shadow-lg
          "
        />
      </motion.div>
    </motion.div>
  );
}

export default function HomeScene() {
  const [arrangement, setArrangement] =
    useState<DesktopArrangement>("scattered");

  const isPhoneOrTablet = useMediaQuery(deviceQuery);
  const reduceMotion = Boolean(useReducedMotion());

  const activeArrangement = isPhoneOrTablet
    ? "compact"
    : arrangement;

  return (
    <div className="home-scene relative isolate w-full">
      {/*
       * Desktop: this frame fills Home.
       *
       * Compact: this frame becomes the centered notebook group.
       * Every image and the music player share this same frame.
       */}
      <div
        className="pointer-events-none absolute z-0"
        style={
          isPhoneOrTablet
            ? {
                left: compactGroup.left,
                top: compactGroup.top,
                width: compactGroup.width,
                height: compactGroup.width,
                transform: "translate(-50%, -50%)",
              }
            : {
                inset: 0,
              }
        }
      >
        {/* Decorative images */}
        {objects.map((object) => (
          <SceneImage
            key={object.file}
            object={object}
            position={object[activeArrangement]}
            reduceMotion={reduceMotion}
            imageWidth={
              isPhoneOrTablet &&
              object.file === "notebook.png"
                ? compactGroup.width
                : undefined
            }
          />
        ))}

        {/* Music player also belongs to the shared frame */}
        <motion.div
          initial={false}
          animate={{
            x: 0,
            y: 0,
            ...musicPositions[activeArrangement],
          }}
          whileHover={reduceMotion ? undefined : { rotate: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  type: "spring",
                  stiffness: 100,
                  damping: 22,
                }
          }
          style={{
            width: "clamp(175px, 17vw, 195px)",
          }}
          className="pointer-events-auto absolute origin-center"
        >
          <MusicPlayer />
        </motion.div>
      </div>

      {/* Introduction */}
      <div
        className="
          home-intro
          pointer-events-none
          relative z-10
          flex h-full flex-col
          items-center justify-center
          px-6
          text-center
        "
      >
        <div className="home-intro-content">
          <motion.p
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            className="
              home-intro-welcome
              pointer-events-auto
              cursor-text select-text
              text-sm text-muted-foreground
            "
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            className="
              home-intro-name
              pointer-events-auto
              mt-3
              cursor-text select-text
              font-heading text-4xl font-bold
              sm:text-5xl
            "
          >
            <span className="home-intro-line">
              Esther Beuthel
            </span>{" "}
            <span className="home-intro-line">
              Eblacas
            </span>
          </motion.h1>

          <motion.p
            whileHover={reduceMotion ? undefined : { scale: 1.1 }}
            className="
              home-intro-description
              pointer-events-auto
              mx-auto mt-4 max-w-md
              cursor-text select-text
              text-muted-foreground
            "
          >
            <span className="home-intro-line">
              I build thoughtful web experiences
            </span>{" "}
            <span className="home-intro-line">
              through design and code.
            </span>
          </motion.p>
        </div>
      </div>

      {/* Desktop controls */}
      <div
        role="group"
        aria-label="Picture arrangement"
        className={`
          ${isPhoneOrTablet ? "hidden" : "flex"}
          absolute bottom-6 left-1/2 z-40
          -translate-x-1/2 gap-2
          rounded-full border border-border
          bg-background/90 p-2
        `}
      >
        {(["scattered", "tidy"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={arrangement === option}
            onClick={() => setArrangement(option)}
            className={`
              rounded-full px-4 py-2
              text-sm capitalize transition-colors
              ${
                arrangement === option
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-muted"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}