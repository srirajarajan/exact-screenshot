import { Suspense, useMemo, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { resolveConfig, type StudioConfig } from "@/lib/studio/config";
import { StageModule } from "./modules/StageModule";
import { BackdropModule } from "./modules/BackdropModule";
import { FloralModule } from "./modules/FloralModule";
import { SofaModule } from "./modules/SofaModule";
import { DecorModule } from "./modules/DecorModule";
import { LightingRig } from "./modules/LightingRig";
import { PALETTE } from "./modules/materials";

/** Deck heights per stage variant so seating always sits on the platform. */
const DECK_HEIGHT: Record<string, number> = {
  plinth: 0.3,
  riser: 0.6,
  circle: 0.3,
  mandap: 0.3,
  runway: 0.3,
  deck: 0.24,
};

export type StageSceneHandle = {
  reset: () => void;
};

export function StageScene({
  config,
  controlsRef,
}: {
  config: StudioConfig;
  controlsRef?: React.RefObject<OrbitControlsImpl | null>;
}) {
  const r = useMemo(() => resolveConfig(config), [config]);
  const baseY = DECK_HEIGHT[r.stage.variant] ?? 0.3;
  const fallbackRef = useRef<OrbitControlsImpl | null>(null);
  const ref = controlsRef ?? fallbackRef;

  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 3.2, 12], fov: 42 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#141312"]} />
      <fog attach="fog" args={["#141312", 16, 34]} />

      <Suspense fallback={null}>
        {/* Lighting module */}
        <LightingRig preset={r.lighting} />

        {/* Floor module */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color={PALETTE.obsidian} roughness={0.35} metalness={0.35} />
        </mesh>

        {/* Independently replaceable modules */}
        <StageModule variant={r.stage.variant} />
        <BackdropModule variant={r.backdrop.variant} />
        <FloralModule variant={r.floral.variant} baseY={baseY} />
        <SofaModule variant={r.sofa.variant} baseY={baseY} />
        {r.decor.map((d) => (
          <DecorModule key={d.id} variant={d.variant} baseY={baseY} />
        ))}

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.55}
          scale={30}
          blur={2.6}
          far={9}
        />
        <Environment preset="night" />
      </Suspense>

      <OrbitControls
        ref={ref}
        enablePan={false}
        minDistance={6}
        maxDistance={20}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI / 2.08}
        autoRotate={false}
        target={[0, 1.6, 0]}
        makeDefault
      />
    </Canvas>
  );
}
