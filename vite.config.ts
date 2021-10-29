import replace from "@rollup/plugin-replace";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const dotenv = require("dotenv");
const env = dotenv.config().parsed;

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "PUBLIC_",
  plugins: [
    react(),
    replace({
      preventAssignment: true,
      "process.env.PUBLIC_IMGUR_CLIENT_ID": JSON.stringify(
        env?.PUBLIC_IMGUR_CLIENT_ID || process?.env?.PUBLIC_IMGUR_CLIENT_ID
      ),
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(".", "src"),
    },
  },
});
