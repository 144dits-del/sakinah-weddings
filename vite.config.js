import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    cloudflare({
      viteEnvironment: { name: "ssr" },
      config: {
        main: "src/server.ts",
      },
    }),
    tanstackStart(),
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
