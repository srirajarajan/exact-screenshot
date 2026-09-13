import * as THREE from "three";

/**
 * The dev/preview tooling injects a `data-tsd-source` attribute onto every JSX
 * element. React Three Fiber treats dashed props as nested property paths
 * (`data` -> `tsd` -> `source`) and throws when the target has no `data`
 * object. We give three.js objects a harmless `data` bag so those injected
 * attributes land somewhere instead of crashing the scene.
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

addDataBag(THREE.Object3D.prototype);
addDataBag(THREE.Material.prototype);
addDataBag(THREE.BufferGeometry.prototype);

export {};
