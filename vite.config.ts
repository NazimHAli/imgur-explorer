import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "PUBLIC_",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(".", "src"),
    },
  },
});
