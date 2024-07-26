import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
/*
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5050",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
*/

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const API_URL = `${env.VITE_API_URL ?? "http://localhost:5050"}`;

  return {
    plugins: [react()],
  };
});