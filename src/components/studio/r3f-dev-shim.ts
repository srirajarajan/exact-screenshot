import * as THREE from "three";
import { OrbitControls } from "three-stdlib";

/**
 * The dev/preview tooling injects a `data-tsd-source` attribute onto every JSX
 * element. React Three Fiber treats dashed props as nested property paths
 * (`data` -> `tsd` -> `source`) and throws when the target has no `data`
 * object. We give every object family used by this scene a harmless `data`
 * bag so those injected attributes land somewhere instead of crashing.
 */
function addDataBag(proto: object) {
  if (Object.prototype.hasOwnProperty.call(proto, "data")) return;
  Object.defineProperty(proto, "data", {
    configurable: true,
    get(this: Record<string, unknown>) {
      if (!this["__injectedAttrs"]) {
        Object.defineProperty(this, "__injectedAttrs", {
          value: { tsd: {} },
          writable: true,
          enumerable: false,
          configurable: true,
        });
      }
      return this["__injectedAttrs"];
    },
    set(this: Record<string, unknown>, value: unknown) {
      Object.defineProperty(this, "__injectedAttrs", {
        value,
        writable: true,
        enumerable: false,
        configurable: true,
      });
    },
  });
}

[
  THREE.EventDispatcher.prototype,
  THREE.Object3D.prototype,
  THREE.Material.prototype,
  THREE.BufferGeometry.prototype,
  THREE.Color.prototype,
  THREE.Fog.prototype,
  THREE.FogExp2.prototype,
  THREE.Texture.prototype,
  THREE.WebGLRenderTarget.prototype,
  OrbitControls.prototype,
].forEach(addDataBag);

export {};
