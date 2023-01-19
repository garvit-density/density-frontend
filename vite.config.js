import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import jsconfigPaths from "vite-jsconfig-paths";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  esbuild: {
    loader: "jsx"
  },
  server: {
    port: 3000,
    https: true
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx"
      }
    }
  },
  build: {
    outDir: "./build/", // This will be overrided to `dist` by qwikVite() setting
    sourcemap: false, // https://github.com/vitejs/vite/issues/2433
    rollupOptions: { cache: false }
  },
  plugins: [react(), svgr(), jsconfigPaths(), viteCommonjs(), mkcert()]
});
