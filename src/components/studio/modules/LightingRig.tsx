import { memo } from "react";
import type { LightingItem } from "@/lib/studio/catalog";

/** Lighting module — swaps the whole light rig for the selected preset. */
export const LightingRig = memo(function LightingRig({
  preset,
}: {
  preset: LightingItem;
}) {
  return (
    <group>
      <ambientLight intensity={preset.ambient} color={preset.fill} />
      <directionalLight
        position={[5, 9, 6]}
        intensity={preset.keyIntensity}
        color={preset.fill}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <spotLight
        position={[0, 7, 4]}
        angle={0.7}
        penumbra={0.9}
        intensity={preset.keyIntensity * 12}
        color={preset.fill}
        distance={26}
        castShadow
      />
      <pointLight position={[-6, 3, -2]} intensity={8} color={preset.rim} distance={16} />
      <pointLight position={[6, 3, -2]} intensity={8} color={preset.rim} distance={16} />
    </group>
  );
});
