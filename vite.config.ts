import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), dts({
    insertTypesEntry:true,
  })],
  build: {
    lib: {
      entry: "./mod.ts",
      name: "@gray-adeyi/korapay-vue",
      formats: ['es'],
      fileName: (format) => `korapay-vue.${format}.js`,
    },
    rollupOptions:{
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    },
  }
});
