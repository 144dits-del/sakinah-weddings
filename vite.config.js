import { defineConfig } from "@lovable.dev/vite-tanstack-config";

let cloudflarePlugin = null;
try {
  // node:module registerHooks was added in Node 22.x (specifically v22.15.0 / v23.5.0)
  const { registerHooks } = await import("node:module");
  if (registerHooks) {
    const { cloudflare } = await import("@cloudflare/vite-plugin");
    cloudflarePlugin = cloudflare();
  }
} catch (e) {
  console.warn("Skipping @cloudflare/vite-plugin: registerHooks is not supported in this Node version.");
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  vite: {
    plugins: cloudflarePlugin ? [cloudflarePlugin] : [],
    server: {
      port: 8080,
      host: "::",
      strictPort: true,
    },
  },
});

