// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static build for GitHub Pages / any static host:
//   STATIC_BUILD=1 BASE_PATH=/your-repo-name/ bun run build
// Output ends up in `dist/` (Nitro static preset publicDir).
const isStatic = process.env.STATIC_BUILD === "1";
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(isStatic
      ? {
          // Prerender the home page to static HTML at build time.
          pages: [{ path: "/", prerender: { enabled: true } }],
        }
      : {}),
  },
  vite: isStatic ? { base: basePath } : undefined,
  nitro: isStatic
    ? {
        preset: "static",
        output: { dir: "dist", publicDir: "dist" },
      }
    : undefined,
});
