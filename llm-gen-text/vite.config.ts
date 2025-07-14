import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/bfl": {
        target: "https://api.bfl.ai",
        secure: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bfl/, ""),
      },
      "/eu1": {
        target: "https://api.eu1.bfl.ai",
        secure: true,
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/.*?eu1\?url=https:\/\/api\.eu1\.bfl\.ai\//, "");
        },
      },
      "/us1": {
        target: "https://api.us1.bfl.ai",
        secure: true,
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/.*?us1\?url=https:\/\/api\.us1\.bfl\.ai\//, "");
        },
      },
      "/eu": {
        target: "https://api.eu.bfl.ai",
        secure: true,
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/.*?eu\?url=https:\/\/api\.eu\.bfl\.ai\//, "");
        },
      },
      "/us": {
        target: "https://api.us.bfl.ai",
        secure: true,
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/.*?us\?url=https:\/\/api\.us\.bfl\.ai\//, "");
        },
      },
    },
  },
});
