import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import graphql from "@rollup/plugin-graphql";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), graphql()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
