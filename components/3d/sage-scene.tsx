"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import SageModel from "./sage-model";

type SageSceneProps = {
  onHoverChange?: (hovered: boolean) => void;
  onModelClick?: () => void;
};

export default function SageScene({
  onHoverChange,
  onModelClick,
}: SageSceneProps) {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{
          position: [0, 0, 5],
          fov: 40,
          near: 0.01,
          far: 1000,
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={2} />

        <directionalLight position={[3, 5, 5]} intensity={3} />

        <Suspense fallback={null}>
          <SageModel
            mouse={mouse}
            onHoverChange={onHoverChange}
            onModelClick={onModelClick}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
