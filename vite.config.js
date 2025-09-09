import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      manifest: {
        name: "ChatGPT",
        short_name: "GPT",
        icons: [
          {
            src: "icons/gpt_icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "icons/gpt_icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "icons/gpt_icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#1a1a1a",
        theme_color: "#fff",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: "*",
            handler: "CacheFirst",
          },
        ],
      },
      registerType: "autoUpdate",
    }),
  ],
});
