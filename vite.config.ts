import replace from "@rollup/plugin-replace";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const dotenv = require("dotenv");
const env = dotenv.config().parsed;

// Get the first client ID value in order: 1 - .env file, 2 - env variable
const imgurClientID =
  env?.PUBLIC_IMGUR_CLIENT_ID || process?.env?.PUBLIC_IMGUR_CLIENT_ID;

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "PUBLIC_",
  plugins: [
    react(),
    imgurClientID &&
      replace({
        preventAssignment: true,
        "process.env.PUBLIC_IMGUR_CLIENT_ID": JSON.stringify(imgurClientID),
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(".", "src"),
    },
  },
});
