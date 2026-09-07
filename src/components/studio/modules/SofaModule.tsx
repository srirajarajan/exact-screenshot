import { memo } from "react";
import { PALETTE } from "./materials";

function Seat({
  color,
  backHeight,
  width,
  metalness = 0,
}: {
  color: string;
  backHeight: number;
  width: number;
  metalness?: number;
}) {
  return (
    <group>
      <mesh position={[0, 0.28, 0]} castShadow>
        <boxGeometry args={[width, 0.32, 0.95]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={metalness} />
      </mesh>
      <mesh position={[0, 0.28 + backHeight / 2, -0.42]} castShadow>
        <boxGeometry args={[width, backHeight, 0.18]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={metalness} />
      </mesh>
      {[-width / 2 + 0.09, width / 2 - 0.09].map((x) => (
        <mesh key={x} position={[x, 0.42, 0]} castShadow>
          <boxGeometry args={[0.18, 0.36, 0.95]} />
          <meshStandardMaterial color={color} roughness={0.85} metalness={metalness} />
        </mesh>
      ))}
      {[
        [-width / 2 + 0.14, 0.44],
        [width / 2 - 0.14, 0.44],
        [-width / 2 + 0.14, -0.44],
        [width / 2 - 0.14, -0.44],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.06, z]}>
          <cylinderGeometry args={[0.05, 0.05, 0.24, 10]} />
          <meshStandardMaterial color={PALETTE.brass} metalness={0.9} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

export const SofaModule = memo(function SofaModule({
  variant,
  baseY,
}: {
  variant: string;
  baseY: number;
}) {
  const config: Record<string, { color: string; back: number; width: number; metal?: number }> = {
    royal: { color: PALETTE.ivory, back: 1.5, width: 2.4 },
    classic: { color: PALETTE.bone, back: 0.85, width: 2.2 },
    contemporary: { color: PALETTE.stone, back: 0.55, width: 2.6 },
    velvet: { color: PALETTE.velvet, back: 0.95, width: 2.2, metal: 0.15 },
    traditional: { color: "#6b4f34", back: 1.1, width: 2.3 },
    lounge: { color: PALETTE.bone, back: 0.6, width: 1.3 },
  };
  const c = config[variant] ?? config.classic!;

  return (
    <group position={[0, baseY, -0.5]}>
      {variant === "lounge" ? (
        <>
          <group position={[-0.85, 0, 0]}>
            <Seat color={c.color} backHeight={c.back} width={c.width} />
          </group>
          <group position={[0.85, 0, 0]}>
            <Seat color={c.color} backHeight={c.back} width={c.width} />
          </group>
          <mesh position={[0, 0.24, 0.3]} castShadow>
            <cylinderGeometry args={[0.24, 0.24, 0.48, 20]} />
            <meshStandardMaterial color={PALETTE.brass} metalness={0.9} roughness={0.25} />
          </mesh>
        </>
      ) : (
        <>
          <Seat color={c.color} backHeight={c.back} width={c.width} metalness={c.metal} />
          {variant === "royal" ? (
            <mesh position={[0, 0.28 + c.back + 0.16, -0.42]} castShadow>
              <boxGeometry args={[c.width * 0.7, 0.28, 0.16]} />
              <meshStandardMaterial color={PALETTE.champagne} metalness={0.9} roughness={0.2} />
            </mesh>
          ) : null}
        </>
      )}
    </group>
  );
});
