"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { clone } from "three/addons/utils/SkeletonUtils.js";
import * as THREE from "three";

type Props = {
  mouse: React.RefObject<{ x: number; y: number }>;
  onHoverChange?: (hovered: boolean) => void;
  onModelClick?: () => void;
};

export default function SageModel({
  mouse,
  onHoverChange,
  onModelClick,
}: Props) {
  const { scene } = useGLTF("/models/sage/scene.gltf");

  const model = useMemo(() => {
    // Clone while preserving Sage's skeleton.
    const clonedScene = clone(scene);

    clonedScene.updateMatrixWorld(true);

    // Calculate the model's actual dimensions.
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    console.log("Sage dimensions:", size);
    console.log("Sage center:", center);

    // Normalize model size.
    const maxDimension = Math.max(size.x, size.y, size.z);

    if (maxDimension > 0) {
      const scale = 2.5 / maxDimension;

      clonedScene.scale.multiplyScalar(scale);
      clonedScene.position.addScaledVector(center, -scale);
    }

    return clonedScene;
  }, [scene]);

  const head = useRef<THREE.Bone | null>(null);
  const neck = useRef<THREE.Bone | null>(null);

  const originalHead = useRef(new THREE.Quaternion());
  const originalNeck = useRef(new THREE.Quaternion());
  const neutralHeadPosition = useRef(new THREE.Vector3());
  const neutralHeadReady = useRef(false);

  const idleGroup = useRef<THREE.Group>(null);

  useEffect(() => {
    const headBone = model.getObjectByName("Head_10");
    const neckBone = model.getObjectByName("Neck_8");

    neutralHeadReady.current = false;

    console.log("Head bone:", headBone);
    console.log("Neck bone:", neckBone);

    if (headBone instanceof THREE.Bone) {
      head.current = headBone;
      originalHead.current.copy(headBone.quaternion);
    }

    if (neckBone instanceof THREE.Bone) {
      neck.current = neckBone;
      originalNeck.current.copy(neckBone.quaternion);
    }
  }, [model]);

  useFrame((state, delta) => {
    const { camera, gl, clock } = state;

    // ========================================
    // IDLE ANIMATION
    // Based on the retro computer reference
    // ========================================

    const group = idleGroup.current;

    if (group) {
      const t = clock.elapsedTime;

      // Gentle horizontal rotation
      group.rotation.y = Math.sin(t * 0.6) * 0.3;

      // Gentle vertical tilt
      group.rotation.x = Math.sin(t * 0.46) * 0.06;
    }

    // ========================================
    // EXISTING HEAD TRACKING
    // ========================================

    if (!head.current || !neck.current) return;

    const rect = gl.domElement.getBoundingClientRect();

    if (rect.width === 0 || rect.height === 0) return;

    // Capture the neutral head position only once.
    if (!neutralHeadReady.current) {
      model.updateMatrixWorld(true);

      head.current.getWorldPosition(neutralHeadPosition.current);

      neutralHeadReady.current = true;
    }

    // Project Sage's neutral head position into screen space.
    const projectedHead = neutralHeadPosition.current.clone().project(camera);

    const headScreenX = rect.left + ((projectedHead.x + 1) / 2) * rect.width;

    const headScreenY = rect.top + ((1 - projectedHead.y) / 2) * rect.height;

    // Cursor offset relative to Sage's head.
    const relativeX = mouse.current.x - headScreenX;
    const relativeY = mouse.current.y - headScreenY;

    // Tracking sensitivity.
    const horizontalRadius = 250;
    const verticalRadius = 200;

    const x = THREE.MathUtils.clamp(relativeX / horizontalRadius, -1, 1);

    const y = THREE.MathUtils.clamp(relativeY / verticalRadius, -1, 1);

    // Horizontal rotation.
    const yaw = x * 0.55;

    // Looking down is stronger than looking up.
    const pitch = y > 0 ? y * 0.55 : y * 0.2;

    // Smooth movement.
    const smooth = 1 - Math.exp(-5 * delta);

    const rotateBone = (
      bone: THREE.Bone | null,
      original: THREE.Quaternion,
      influence: number,
    ) => {
      if (!bone) return;

      const offset = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(pitch * influence, yaw * influence, 0),
      );

      const target = original.clone().multiply(offset);

      bone.quaternion.slerp(target, smooth);
    };

    // Head receives most of the movement.
    rotateBone(head.current, originalHead.current, 0.8);

    // Neck follows slightly.
    rotateBone(neck.current, originalNeck.current, 0.2);
  });

  return (
    <group ref={idleGroup}>
      <primitive
        object={model}
        dispose={null}
        onPointerOver={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation();
          onHoverChange?.(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(event: ThreeEvent<PointerEvent>) => {
          event.stopPropagation();
          onHoverChange?.(false);
          document.body.style.cursor = "";
        }}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation();
          onModelClick?.();
        }}
      />
    </group>
  );
}

useGLTF.preload("/models/sage/scene.gltf");
