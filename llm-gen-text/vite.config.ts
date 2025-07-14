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
      "/jump": {
        target: "https://api.eu1.bfl.ai",
        secure: true,
        changeOrigin: true,
        rewrite: (path) => {
          return path.replace(/.*?jump\?url=https:\/\/api\.eu1\.bfl\.ai\//, "")
        }
      },
    },
  },
});
