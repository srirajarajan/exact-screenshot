import { memo } from "react";
import { PALETTE } from "./materials";

export const BackdropModule = memo(function BackdropModule({
  variant,
}: {
  variant: string;
}) {
  switch (variant) {
    case "led":
      return (
        <group position={[0, 2.6, -2.1]}>
          <mesh>
            <boxGeometry args={[7, 4, 0.2]} />
            <meshStandardMaterial color="#0d1522" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, 0.12]}>
            <planeGeometry args={[6.6, 3.6]} />
            <meshStandardMaterial
              color="#2b4a63"
              emissive="#3f7fa5"
              emissiveIntensity={1.1}
              roughness={0.3}
            />
          </mesh>
        </group>
      );
    case "drape":
      return (
        <group position={[0, 2.6, -2.1]}>
          {Array.from({ length: 14 }).map((_, i) => (
            <mesh key={i} position={[-3.25 + i * 0.5, 0, Math.sin(i) * 0.08]} castShadow>
              <cylinderGeometry args={[0.24, 0.3, 4.4, 10, 1, true]} />
              <meshStandardMaterial color={PALETTE.ivory} roughness={0.95} side={2} />
            </mesh>
          ))}
        </group>
      );
    case "panels":
      return (
        <group position={[0, 2.6, -2.1]}>
          {Array.from({ length: 9 }).map((_, i) => (
            <mesh key={i} position={[-3.2 + i * 0.8, 0, 0]} castShadow>
              <boxGeometry args={[0.66, 4.4, 0.3]} />
              <meshStandardMaterial color={PALETTE.bone} roughness={0.8} />
            </mesh>
          ))}
        </group>
      );
    case "jali":
      return (
        <group position={[0, 2.6, -2.1]}>
          <mesh>
            <boxGeometry args={[7, 4.4, 0.16]} />
            <meshStandardMaterial color={PALETTE.velvet} roughness={0.85} />
          </mesh>
          {Array.from({ length: 6 }).map((_, r) =>
            Array.from({ length: 11 }).map((_, c) => (
              <mesh key={`${r}-${c}`} position={[-3 + c * 0.6, -1.6 + r * 0.66, 0.12]}>
                <torusGeometry args={[0.2, 0.035, 8, 20]} />
                <meshStandardMaterial color={PALETTE.champagne} metalness={0.8} roughness={0.3} />
              </mesh>
            )),
          )}
        </group>
      );
    case "mirror":
      return (
        <group position={[0, 2.6, -2.1]}>
          {Array.from({ length: 5 }).map((_, i) => (
            <group key={i} position={[-2.8 + i * 1.4, 0, 0]}>
              <mesh castShadow>
                <boxGeometry args={[1.24, 4.4, 0.2]} />
                <meshStandardMaterial color={PALETTE.champagne} metalness={0.95} roughness={0.12} />
              </mesh>
              <mesh position={[0, 0, 0.12]}>
                <planeGeometry args={[1, 4.1]} />
                <meshStandardMaterial color={PALETTE.glass} metalness={1} roughness={0.05} />
              </mesh>
            </group>
          ))}
        </group>
      );
    case "statement":
      return (
        <group position={[0, 2.6, -2.1]}>
          <mesh>
            <boxGeometry args={[7, 4.4, 0.14]} />
            <meshStandardMaterial color={PALETTE.obsidian} roughness={0.7} />
          </mesh>
          {Array.from({ length: 7 }).map((_, i) => (
            <mesh key={i} position={[0, -1.4 + i * 0.5, 0.2]}>
              <torusGeometry args={[0.6 + i * 0.22, 0.045, 10, 48]} />
              <meshStandardMaterial color={PALETTE.champagne} metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
        </group>
      );
    case "minimal":
      return (
        <mesh position={[0, 2.6, -2.1]} castShadow>
          <boxGeometry args={[6.4, 4.2, 0.16]} />
          <meshStandardMaterial color={PALETTE.ivory} roughness={0.9} />
        </mesh>
      );
    default:
      // Floral wall
      return (
        <group position={[0, 2.6, -2.1]}>
          <mesh>
            <boxGeometry args={[7, 4.4, 0.14]} />
            <meshStandardMaterial color={PALETTE.green} roughness={0.95} />
          </mesh>
          {Array.from({ length: 9 }).map((_, r) =>
            Array.from({ length: 17 }).map((_, c) => (
              <mesh
                key={`${r}-${c}`}
                position={[
                  -3.2 + c * 0.4 + (r % 2 ? 0.2 : 0),
                  -1.9 + r * 0.48,
                  0.16 + ((r + c) % 3) * 0.03,
                ]}
              >
                <sphereGeometry args={[0.21, 10, 10]} />
                <meshStandardMaterial
                  color={
                    (r + c) % 4 === 0
                      ? PALETTE.bloomBlush
                      : (r + c) % 7 === 0
                        ? PALETTE.bloomGold
                        : PALETTE.bloomWhite
                  }
                  roughness={0.9}
                />
              </mesh>
            )),
          )}
        </group>
      );
  }
});
