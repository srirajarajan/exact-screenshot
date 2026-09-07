import { memo } from "react";
import { PALETTE } from "./materials";

/**
 * Stage structure module.
 * Replaceable: drop a GLB here via `modelUrl` and render <primitive/> instead.
 */
export const StageModule = memo(function StageModule({
  variant,
}: {
  variant: string;
}) {
  const deck = (
    <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
      <boxGeometry args={[7, 0.3, 4.2]} />
      <meshStandardMaterial color={PALETTE.ivory} roughness={0.75} />
    </mesh>
  );

  switch (variant) {
    case "circle":
      return (
        <group>
          <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
            <cylinderGeometry args={[3.2, 3.4, 0.3, 64]} />
            <meshStandardMaterial color={PALETTE.ivory} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.32, 0]}>
            <torusGeometry args={[3.2, 0.05, 12, 64]} />
            <meshStandardMaterial color={PALETTE.champagne} metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
      );
    case "riser":
      return (
        <group>
          {deck}
          <mesh position={[0, 0.45, 0]} receiveShadow castShadow>
            <boxGeometry args={[5.4, 0.3, 3.2]} />
            <meshStandardMaterial color={PALETTE.bone} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.08, 2.4]} receiveShadow>
            <boxGeometry args={[4, 0.16, 0.8]} />
            <meshStandardMaterial color={PALETTE.bone} roughness={0.8} />
          </mesh>
        </group>
      );
    case "mandap":
      return (
        <group>
          {deck}
          {[
            [-2.6, -1.6],
            [2.6, -1.6],
            [-2.6, 1.6],
            [2.6, 1.6],
          ].map(([x, z]) => (
            <mesh key={`${x}-${z}`} position={[x, 1.8, z]} castShadow>
              <cylinderGeometry args={[0.14, 0.16, 3.2, 16]} />
              <meshStandardMaterial color={PALETTE.champagne} metalness={0.7} roughness={0.3} />
            </mesh>
          ))}
          <mesh position={[0, 3.45, 0]} castShadow>
            <boxGeometry args={[5.6, 0.12, 3.6]} />
            <meshStandardMaterial color={PALETTE.bone} roughness={0.6} />
          </mesh>
        </group>
      );
    case "runway":
      return (
        <group>
          <mesh position={[0, 0.15, 0]} receiveShadow castShadow>
            <boxGeometry args={[7.5, 0.3, 4.2]} />
            <meshStandardMaterial color={PALETTE.bone} metalness={0.6} roughness={0.15} />
          </mesh>
          <mesh position={[0, 0.08, 4.4]} receiveShadow>
            <boxGeometry args={[2.6, 0.16, 4.6]} />
            <meshStandardMaterial color={PALETTE.bone} metalness={0.6} roughness={0.15} />
          </mesh>
        </group>
      );
    case "deck":
      return (
        <group>
          <mesh position={[0, 0.12, 0]} receiveShadow castShadow>
            <boxGeometry args={[7.4, 0.24, 4.6]} />
            <meshStandardMaterial color={PALETTE.velvet} roughness={0.9} />
          </mesh>
          {Array.from({ length: 9 }).map((_, i) => (
            <mesh key={i} position={[-3.2 + i * 0.8, 0.25, 0]}>
              <boxGeometry args={[0.7, 0.02, 4.5]} />
              <meshStandardMaterial color={PALETTE.stone} roughness={0.95} />
            </mesh>
          ))}
        </group>
      );
    default:
      return (
        <group>
          {deck}
          <mesh position={[0, 0.04, 2.35]} receiveShadow>
            <boxGeometry args={[7, 0.08, 0.7]} />
            <meshStandardMaterial color={PALETTE.bone} roughness={0.8} />
          </mesh>
        </group>
      );
  }
});
