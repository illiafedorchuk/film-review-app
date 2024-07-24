/* eslint-disable @typescript-eslint/no-unused-vars */
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createProxyMiddleware } from "http-proxy-middleware";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
