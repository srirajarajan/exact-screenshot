import { memo } from "react";
import { PALETTE } from "./materials";

/** A single decor element. Rendered only when the user toggles it on. */
export const DecorModule = memo(function DecorModule({
  variant,
  baseY,
}: {
  variant: string;
  baseY: number;
}) {
  switch (variant) {
    case "chandelier":
      return (
        <group position={[0, 0, -0.6]}>
          {[-2.2, 0, 2.2].map((x, i) => (
            <group key={x} position={[x, 4.6 - (i === 1 ? 0.4 : 0), 0]}>
              <mesh>
                <cylinderGeometry args={[0.01, 0.01, 1.2, 6]} />
                <meshStandardMaterial color={PALETTE.brass} />
              </mesh>
              <mesh position={[0, -0.9, 0]}>
                <coneGeometry args={[0.45, 0.8, 16]} />
                <meshStandardMaterial
                  color={PALETTE.glass}
                  emissive="#ffe6bd"
                  emissiveIntensity={0.7}
                  metalness={0.6}
                  roughness={0.1}
                />
              </mesh>
              <pointLight position={[0, -1, 0]} intensity={6} distance={7} color="#ffdca8" />
            </group>
          ))}
        </group>
      );
    case "hangingFloral":
      return (
        <group position={[0, 4.4, -0.4]}>
          {[-3, -1.5, 1.5, 3].map((x, i) => (
            <mesh key={x} position={[x, -0.6 - (i % 2) * 0.4, 0]} castShadow>
              <sphereGeometry args={[0.4, 12, 12]} />
              <meshStandardMaterial color={PALETTE.bloomWhite} roughness={0.9} />
            </mesh>
          ))}
        </group>
      );
    case "pillars":
      return (
        <group>
          {[-4.2, 4.2].map((x) => (
            <group key={x} position={[x, 0, -0.6]}>
              <mesh position={[0, 1.5, 0]} castShadow>
                <cylinderGeometry args={[0.28, 0.34, 3, 20]} />
                <meshStandardMaterial color={PALETTE.ivory} roughness={0.85} />
              </mesh>
              <mesh position={[0, 3.1, 0]}>
                <boxGeometry args={[0.9, 0.2, 0.9]} />
                <meshStandardMaterial color={PALETTE.champagne} metalness={0.8} roughness={0.25} />
              </mesh>
            </group>
          ))}
        </group>
      );
    case "led":
      return (
        <group>
          {[-4.6, 4.6].map((x) => (
            <mesh key={x} position={[x, 2.4, -1.4]} rotation={[0, x > 0 ? -0.5 : 0.5, 0]}>
              <boxGeometry args={[2, 3.4, 0.12]} />
              <meshStandardMaterial
                color="#22384d"
                emissive="#3f7fa5"
                emissiveIntensity={0.9}
              />
            </mesh>
          ))}
        </group>
      );
    case "candles":
      return (
        <group>
          {Array.from({ length: 18 }).map((_, i) => {
            const x = -4.4 + i * 0.52;
            return (
              <group key={i} position={[x, baseY - 0.3, 2.6]}>
                <mesh position={[0, 0.2, 0]}>
                  <cylinderGeometry args={[0.06, 0.07, 0.4, 10]} />
                  <meshStandardMaterial color={PALETTE.ivory} />
                </mesh>
                <mesh position={[0, 0.45, 0]}>
                  <sphereGeometry args={[0.05, 8, 8]} />
                  <meshStandardMaterial
                    color="#ffd9a1"
                    emissive="#ffb347"
                    emissiveIntensity={2.4}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      );
    case "sign":
      return (
        <group position={[4.8, 0, 2.6]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[1.4, 2.4, 0.12]} />
            <meshStandardMaterial
              color={PALETTE.bone}
              emissive="#ffe6bd"
              emissiveIntensity={0.25}
            />
          </mesh>
        </group>
      );
    case "panels":
      return (
        <group>
          {[-4.9, 4.9].map((x) => (
            <mesh key={x} position={[x, 2.2, -2]} castShadow>
              <boxGeometry args={[1.6, 4, 0.14]} />
              <meshStandardMaterial color={PALETTE.velvet} roughness={0.85} />
            </mesh>
          ))}
        </group>
      );
    case "aisle":
      return (
        <group>
          <mesh position={[0, 0.005, 6]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[2.4, 8]} />
            <meshStandardMaterial color={PALETTE.ivory} roughness={0.95} />
          </mesh>
          {Array.from({ length: 8 }).map((_, i) => (
            <group key={i}>
              {[-1.5, 1.5].map((x) => (
                <mesh key={x} position={[x, 0.35, 3.2 + i * 1.1]} castShadow>
                  <sphereGeometry args={[0.28, 10, 10]} />
                  <meshStandardMaterial color={PALETTE.bloomWhite} roughness={0.9} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      );
    case "ceiling":
      return (
        <group position={[0, 5.4, 0]}>
          {Array.from({ length: 10 }).map((_, i) => (
            <mesh key={i} position={[-4.5 + i, -0.2, 0]} rotation={[0, 0, 0.1]}>
              <cylinderGeometry args={[0.4, 0.4, 8, 8, 1, true]} />
              <meshStandardMaterial color={PALETTE.ivory} side={2} roughness={0.95} />
            </mesh>
          ))}
        </group>
      );
    case "booth":
      return (
        <group position={[-5.2, 0, 3]} rotation={[0, 0.6, 0]}>
          <mesh position={[0, 1.5, 0]} castShadow>
            <boxGeometry args={[2.4, 3, 0.14]} />
            <meshStandardMaterial color={PALETTE.velvet} roughness={0.85} />
          </mesh>
          <mesh position={[0, 1.8, 0.12]}>
            <torusGeometry args={[0.8, 0.06, 10, 40]} />
            <meshStandardMaterial
              color={PALETTE.champagne}
              emissive="#ffdca8"
              emissiveIntensity={0.9}
              metalness={0.8}
            />
          </mesh>
        </group>
      );
    case "entrance":
      return (
        <group position={[0, 0, 8]}>
          {Array.from({ length: 26 }).map((_, i) => {
            const t = i / 25;
            const angle = Math.PI * t;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * 2.4, Math.sin(angle) * 3, 0]}
                castShadow
              >
                <sphereGeometry args={[0.25, 10, 10]} />
                <meshStandardMaterial
                  color={i % 3 ? PALETTE.bloomWhite : PALETTE.bloomBlush}
                  roughness={0.9}
                />
              </mesh>
            );
          })}
        </group>
      );
    default:
      return null;
  }
});
