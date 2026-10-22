"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";

import MusicPlayer from "./music-player";

// Narrow screens, plus touch devices up to 1366px wide.
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

const objects = [
  {
    file: "laptop.png",
    width: "510px",
    zIndex: 1,
    scattered: { left: "-15%", top: "-40%", rotate: -30 },
    tidy: { left: "28%", top: "-45%", rotate: 0 },

    // Edit these two layouts independently.
    portrait: { left: "calc(100% - 760px)", top: "-40%", rotate: -30 },
    landscape: { left: "calc(100% - 1200px)", top: "-40%", rotate: -30 },
  },
  {
    file: "mouse.png",
    width: "180px",
    zIndex: 2,
    scattered: { left: "30%", top: "85%", rotate: -40 },
    tidy: { left: "65%", top: "-3%", rotate: 0 },

    portrait: { left: "30%", top: "85%", rotate: -40 },
    landscape: { left: "calc(100% - 400px)", top: "85%", rotate: -40 },
  },
  {
    file: "plant.png",
    width: "260px",
    zIndex: 3,
    scattered: { left: "25%", top: "-30%", rotate: 10 },
    tidy: { left: "-7%", top: "-14%", rotate: 0 },

    portrait: { left: "calc(100% - 300px)", top: "-30%", rotate: 10 },
    landscape: { left: "calc(100% - 700px)", top: "-30%", rotate: 10 },
  },
  {
    file: "torn-paper.png",
    width: "200px",
    zIndex: 1,
    scattered: { left: "75%", top: "25%", rotate: -6 },
    tidy: { left: "80%", top: "40%", rotate: 0 },

    portrait: { left: "75%", top: "25%", rotate: -6 },
    landscape: { left: "calc(100% - 250px)", top: "15%", rotate: -6 },
  },
  {
    file: "phone.png",
    width: "250px",
    zIndex: 3,
    scattered: { left: "50%", top: "-20%", rotate: 40 },
    tidy: { left: "10%", top: "-15%", rotate: 0 },

    portrait: { left: "calc(100% - 170px)", top: "-20%", rotate: 20 },
    landscape: { left: "calc(100% - 500px)", top: "-20%", rotate: 40 },
  },
  {
    file: "coffee.png",
    width: "200px",
    zIndex: 2,
    scattered: { left: "70%", top: "80%", rotate: -20 },
    tidy: { left: "85%", top: "75%", rotate: 0 },

    portrait: { left: "70%", top: "80%", rotate: -20 },
    landscape: { left: "calc(100% - 250px)", top: "calc(100% - 130px)", rotate: -20 },
  },
  {
    file: "notebook.png",
    width: "400px",
    zIndex: 1,
    scattered: { left: "75%", top: "-20%", rotate: -8 },
    tidy: { left: "0%", top: "50%", rotate: 0 },

    portrait: { left: "75%", top: "-20%", rotate: -8 },
    landscape: { left: "calc(100% - 220px)", top: "-30%", rotate: -8 },
  },
  {
    file: "pen.png",
    width: "200px",
    zIndex: 2,
    scattered: { left: "10%", top: "75%", rotate: 15 },
    tidy: { left: "25%", top: "65%", rotate: -35 },

    portrait: { left: "-35%", top: "30%", rotate: 15 },
    landscape: { left: "calc(100% - 600px)", top: "75%", rotate: 15 },
  },
  {
    file: "lamp.png",
    width: "300px",
    zIndex: 3,
    scattered: { left: "90%", top: "61%", rotate: 25, scaleX: -1 },
    tidy: { left: "-13%", top: "50%", rotate: 5, scaleX: 1 },

    portrait: { left: "calc(100% - 100px)", top: "55%", rotate: 25, scaleX: -1 },
    landscape: { left: "calc(100% - 130px)", top: "61%", rotate: 25, scaleX: -1 },
  },
];

const musicPositions = {
  scattered: { left: "-3%", top: "50%", rotate: 30 },
  tidy: { left: "86.3%", top: "0%", rotate: -12 },

  // Edit the music player's two layouts here.
  portrait: { left: "-15%", top: "50%", rotate: 50 },
  landscape: { left: "-3%", top: "50%", rotate: 30 },
};

export default function HomeScene() {
  const [arrangement, setArrangement] = useState<"scattered" | "tidy">(
    "scattered",
  );

  const isPhoneOrTablet = useMediaQuery(deviceQuery);
  const isPortrait = useMediaQuery("(orientation: portrait)");

  const activeArrangement = isPhoneOrTablet
    ? isPortrait
      ? "portrait"
      : "landscape"
    : arrangement;

  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full home-scene relative isolate">
      {/* Other interactive images */}
      <div aria-hidden="true" className="z-0 absolute inset-0">
        {objects.map((object) => (
          <motion.div
            key={object.file}
            initial={false}
            animate={object[activeArrangement]}
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
              width: object.width,
              zIndex: object.zIndex,
            }}
            className="absolute aspect-square"
          >
            <motion.div
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.08,
                      rotate: 5,
                    }
              }
              className="h-full w-full relative"
            >
              <Image
                src={`/interactive-images/${object.file}`}
                alt=""
                fill
                sizes={object.width}
                loading={object.file === "notebook.png" ? "eager" : "lazy"}
                draggable={false}
                className="object-contain select-none drop-shadow-lg"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Music player */}
      <motion.div
        initial={false}
        animate={musicPositions[activeArrangement]}
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
        className="z-10 absolute origin-center"
      >
        <MusicPlayer />
      </motion.div>

      {/* Introduction */}
      <div
        className="
          pointer-events-none
          relative z-10
          flex h-full flex-col
          items-center justify-center
          px-6 pb-20
          text-center
        "
      >
        <motion.p
          whileHover={reduceMotion ? undefined : { scale: 1.20 }}
          className="
            pointer-events-auto
            select-text cursor-text
            text-sm text-muted-foreground
          "
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          whileHover={reduceMotion ? undefined : { scale: 1.20 }}
          className="
            pointer-events-auto
            mt-3
            select-text cursor-text
            font-heading text-4xl font-bold
            sm:text-5xl
          "
        >
          Esther Beuthel Eblacas
        </motion.h1>

        <motion.p
          whileHover={reduceMotion ? undefined : { scale: 1.20 }}
          className="
            pointer-events-auto
            mt-4 max-w-md
            select-text cursor-text
            text-muted-foreground
          "
        >
          I build thoughtful web experiences through design and code.
        </motion.p>
      </div>

      {/* Scattered / tidy controls: desktop only */}
      <div
        role="group"
        aria-label="Picture arrangement"
        className={`
          ${isPhoneOrTablet ? "hidden" : "flex"}
          z-40
          p-2
          bg-background/90
          rounded-full border border-border
          absolute bottom-6 left-1/2 -translate-x-1/2 gap-2
        `}
      >
        {(["scattered", "tidy"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={arrangement === option}
            onClick={() => setArrangement(option)}
            className={`
              px-4 py-2
              text-sm
              rounded-full
              transition-colors
              capitalize
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