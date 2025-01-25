// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from "url";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/color-mode"],

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
  },

  components: {
    global: true,
    dirs: ["~/components"],
  },

  vite: {
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@": fileURLToPath(new URL("./", import.meta.url)),
        assets: fileURLToPath(new URL("./assets", import.meta.url)),
        public: fileURLToPath(new URL("./public", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/base/font.scss" as *;
            @use "@/assets/scss/base/reset.scss" as *;
            @use "@/assets/scss/base/variables.scss" as *;
          `,
        },
      },
    },
  },
});
