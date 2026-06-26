// NOTE: @lovable.dev/vite-tanstack-config wraps TanStack Start + React + Tailwind + Nitro (cloudflare preset)
// @cloudflare/vite-plugin is added here so wrangler can detect it and skip its setup wizard
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  vite: {
    plugins: [cloudflare()],
    server: {
      port: 8080,
      host: "::",
      strictPort: true,
    },
  },
});
