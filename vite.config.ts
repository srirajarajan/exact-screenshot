// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { Plugin } from "vite";

/**
 * TanStack Devtools annotates JSX with `data-tsd-source` in development.
 * React Three Fiber interprets dashed props as nested Three.js properties and
 * crashes on that DOM-only annotation, so remove it from 3D scene modules
 * after the Devtools transform and before React compiles the JSX.
 */
function stripSourceTagsFromThreeScene(): Plugin {
  return {
    name: "strip-source-tags-from-three-scene",
    enforce: "pre",
    transform(code, id) {
      const file = id.split("?", 1)[0]?.replaceAll("\\", "/");
      if (!file?.includes("/src/components/studio/") || !file.endsWith(".tsx")) {
        return null;
      }

      const transformed = code.replace(/\sdata-tsd-source=(?:"[^"]*"|'[^']*')/g, "");
      return transformed === code ? null : { code: transformed, map: null };
    },
  };
}

export default defineConfig({
  plugins: [stripSourceTagsFromThreeScene()],
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
