import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// Standard Vite config with explicit plugins array.
// Wrangler's TanStack Start setup wizard will auto-inject cloudflare()
// at the top of the plugins array and then run the build + deploy.
export default defineConfig({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    port: 8080,
    host: "::",
    strictPort: true,
  },
  build: {
    target: "esnext",
  },
});
