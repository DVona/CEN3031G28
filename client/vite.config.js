import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      'process.env': {
        VITE_API_URL: JSON.stringify(process.env.VITE_API_URL ?? "http://localhost:5050")
      }
    },  
  };
});
