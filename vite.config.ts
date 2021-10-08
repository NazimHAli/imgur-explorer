import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/styles/mixins';",
      },
    },
  },
  envPrefix: "PUBLIC_",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(".", "src"),
      "~styles": path.resolve(".", "src/styles/"),
    },
  },
});
