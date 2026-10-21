
"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const objects = [
  {
    file: "lamp.png",
    width: "clamp(80px, 14vw, 180px)",
    scattered: { left: "3%", top: "4%", rotate: -8 },
    tidy: { left: "5%", top: "5%", rotate: 0 },
  },
  {
    file: "notebook.png",
    width: "clamp(110px, 22vw, 280px)",
    scattered: { left: "-3%", top: "58%", rotate: -22 },
    tidy: { left: "4%", top: "62%", rotate: 0 },
  },
  {
    file: "coffee.png",
    width: "clamp(65px, 10vw, 125px)",
    scattered: { left: "26%", top: "3%", rotate: 15 },
    tidy: { left: "28%", top: "6%", rotate: 0 },
  },
  {
    file: "vinyl.png",
    width: "clamp(85px, 15vw, 190px)",
    scattered: { left: "77%", top: "8%", rotate: 18 },
    tidy: { left: "76%", top: "5%", rotate: 0 },
  },
  {
    file: "plant.png",
    width: "clamp(75px, 13vw, 160px)",
    scattered: { left: "79%", top: "60%", rotate: 12 },
    tidy: { left: "77%", top: "63%", rotate: 0 },
  },
  {
    file: "pen.png",
    width: "clamp(55px, 8vw, 100px)",
    scattered: { left: "57%", top: "70%", rotate: 32 },
    tidy: { left: "59%", top: "67%", rotate: 0 },
  },
];

export default function HomeScene() {
  const [arrangement, setArrangement] = useState<
    "scattered" | "tidy"
  >("scattered");

  const reduceMotion = useReducedMotion();

  return (
    <div className="home-scene relative isolate w-full">
      {/* Interactive images */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
      >
        {objects.map((object) => {
          const isNotebook = object.file === "notebook.png";

          return (
            <motion.div
              key={object.file}
              initial={false}
              animate={object[arrangement]}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 100,
                      damping: 22,
                    }
              }
              style={{ width: object.width }}
              className="absolute aspect-square"
            >
              <motion.div
                className="relative h-full w-full"
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.08,
                        rotate: 5,
                      }
                }
              >
                <Image
                  src={`/interactive-images/${object.file}`}
                  alt=""
                  fill
                  sizes={object.width}
                  loading={isNotebook ? "eager" : "lazy"}
                  draggable={false}
                  className="
                    select-none
                    object-contain
                    drop-shadow-lg
                  "
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Introduction */}
      <div
        className="
          pointer-events-none relative z-10
          flex h-full flex-col
          items-center justify-center
          px-6 pb-20 text-center
        "
      >
        <p className="text-sm text-muted-foreground">
          Welcome to my portfolio
        </p>

        <h1
          className="
            mt-3 font-heading
            text-4xl font-bold
            sm:text-5xl
          "
        >
          Esther Beuthel Eblacas
        </h1>

        <p className="mt-4 max-w-md text-muted-foreground">
          I build thoughtful web experiences through
          design and code.
        </p>
      </div>

      {/* Arrangement controls */}
      <div
        role="group"
        aria-label="Picture arrangement"
        className="
          absolute bottom-6 left-1/2 z-20
          flex -translate-x-1/2 gap-2
          rounded-full border border-border
          bg-background/90 p-2
        "
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
