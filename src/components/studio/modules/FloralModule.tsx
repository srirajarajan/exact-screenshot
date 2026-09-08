import { memo, useMemo } from "react";
import { PALETTE } from "./materials";

function Bloom({
  position,
  scale = 1,
  tone = 0,
}: {
  position: [number, number, number];
  scale?: number;
  tone?: number;
}) {
  const color =
    tone % 3 === 0
      ? PALETTE.bloomWhite
      : tone % 3 === 1
        ? PALETTE.bloomBlush
        : PALETTE.bloomGold;
  return (
    <mesh position={position} scale={scale} castShadow>
      <sphereGeometry args={[0.22, 10, 10]} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  );
}

/** Floral arrangement module — each variant is a distinct physical design. */
export const FloralModule = memo(function FloralModule({
  variant,
  baseY,
}: {
  variant: string;
  baseY: number;
}) {
  const archBlooms = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => {
        const t = i / 39;
        const angle = Math.PI * t;
        return {
          p: [Math.cos(angle) * 3.1, Math.sin(angle) * 3.1, 0] as [
            number,
            number,
            number,
          ],
          tone: i,
        };
      }),
    [],
  );

  switch (variant) {
    case "arch":
      return (
        <group position={[0, baseY + 0.3, -1.6]}>
          {archBlooms.map((b, i) => (
            <Bloom key={i} position={b.p} tone={b.tone} scale={1.05} />
          ))}
        </group>
      );
    case "hanging":
      return (
        <group position={[0, baseY, -1.2]}>
          {Array.from({ length: 12 }).map((_, i) => {
            const x = -3 + (i % 6) * 1.2;
            const z = i < 6 ? 0 : -0.9;
            const drop = 3.4 - ((i * 7) % 5) * 0.3;
            return (
              <group key={i} position={[x, 0, z]}>
                <mesh position={[0, drop + 0.9, 0]}>
                  <cylinderGeometry args={[0.01, 0.01, 1.8, 6]} />
                  <meshStandardMaterial color={PALETTE.stone} />
                </mesh>
                <Bloom position={[0, drop, 0]} tone={i} scale={1.6} />
                <Bloom position={[0.15, drop - 0.3, 0.1]} tone={i + 1} />
              </group>
            );
          })}
        </group>
      );
    case "pillars":
      return (
        <group position={[0, baseY, -1.2]}>
          {[-2.9, 2.9].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh position={[0, 1.1, 0]} castShadow>
                <cylinderGeometry args={[0.16, 0.22, 2.2, 14]} />
                <meshStandardMaterial color={PALETTE.ivory} roughness={0.85} />
              </mesh>
              {Array.from({ length: 14 }).map((_, i) => (
                <Bloom
                  key={i}
                  position={[
                    Math.cos(i) * 0.42,
                    2.4 + (i % 5) * 0.16,
                    Math.sin(i) * 0.42,
                  ]}
                  tone={i}
                />
              ))}
            </group>
          ))}
        </group>
      );
    case "wall":
      return (
        <group position={[0, baseY + 1.6, -1.85]}>
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 15 }).map((_, c) => (
              <Bloom
                key={`${r}-${c}`}
                position={[-2.8 + c * 0.4, r * 0.44, (r % 2) * 0.05]}
                tone={r + c}
                scale={0.95}
              />
            )),
          )}
        </group>
      );
    case "minimal":
      return (
        <group position={[0, baseY, -1]}>
          {[-2.5, 2.5].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              <mesh position={[0, 0.35, 0]} castShadow>
                <cylinderGeometry args={[0.12, 0.18, 0.7, 16]} />
                <meshStandardMaterial color={PALETTE.bone} roughness={0.6} />
              </mesh>
              {Array.from({ length: 4 }).map((_, i) => (
                <group key={i}>
                  <mesh position={[i * 0.08 - 0.12, 1.1, 0]}>
                    <cylinderGeometry args={[0.012, 0.012, 1, 6]} />
                    <meshStandardMaterial color={PALETTE.green} />
                  </mesh>
                  <Bloom
                    position={[i * 0.08 - 0.12, 1.62, 0]}
                    tone={i}
                    scale={0.7}
                  />
                </group>
              ))}
            </group>
          ))}
        </group>
      );
    case "cascade":
      return (
        <group position={[0, baseY, -1.5]}>
          {[-2.7, 2.7].map((x, side) => (
            <group key={x}>
              {Array.from({ length: 22 }).map((_, i) => {
                const t = i / 21;
                return (
                  <Bloom
                    key={i}
                    position={[
                      x - side * 0 + Math.sin(t * 3) * 0.3 * (x > 0 ? -1 : 1),
                      3.6 - t * 3.4,
                      Math.cos(t * 3) * 0.25,
                    ]}
                    tone={i}
                    scale={1.1 - t * 0.35}
                  />
                );
              })}
            </group>
          ))}
        </group>
      );
    case "traditional":
      return (
        <group position={[0, baseY, -1.4]}>
          {Array.from({ length: 5 }).map((_, s) => (
            <group key={s}>
              {Array.from({ length: 26 }).map((_, i) => {
                const t = i / 25;
                return (
                  <mesh
                    key={i}
                    position={[
                      -3 + s * 1.5,
                      3.4 - Math.sin(t * Math.PI) * 0.9 - t * 0.2,
                      -0.1,
                    ]}
                  >
                    <sphereGeometry args={[0.11, 8, 8]} />
                    <meshStandardMaterial
                      color={i % 2 ? "#d9902f" : "#e8c65a"}
                      roughness={0.95}
                    />
                  </mesh>
                );
              })}
            </group>
          ))}
        </group>
      );
    default:
      // Symmetrical floral frame
      return (
        <group position={[0, baseY, -1.4]}>
          {[-2.6, 2.6].map((x) => (
            <group key={x} position={[x, 0, 0]}>
              {Array.from({ length: 18 }).map((_, i) => (
                <Bloom
                  key={i}
                  position={[
                    Math.sin(i * 1.3) * 0.28,
                    0.5 + i * 0.18,
                    Math.cos(i * 1.3) * 0.28,
                  ]}
                  tone={i}
                />
              ))}
            </group>
          ))}
        </group>
      );
  }
});
