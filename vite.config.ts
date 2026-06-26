import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// Standard Vite config for Cloudflare Workers deployment
// @cloudflare/vite-plugin handles TanStack Start SSR for Cloudflare Workers
export default defineConfig({
  plugins: [
    cloudflare(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
  ],
  server: {
    port: 8080,
    host: "::",
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
