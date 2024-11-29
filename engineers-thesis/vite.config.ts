import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFile, mkdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: { exclude: ["pyodide"] },
  plugins: [
    react(),
    {
      name: "vite-plugin-pyodide",
      generateBundle: async () => {
        const assetsDir = "dist/assets";
        await mkdir(assetsDir, { recursive: true });
        const files = [
          "pyodide-lock.json",
          "pyodide.asm.js",
          "pyodide.asm.wasm",
          "python_stdlib.zip",
        ];
        const modulePath = join(dirname(fileURLToPath(import.meta.url)), 'node_modules/pyodide');
        for (const file of files) {
          await copyFile(
            join(dirname(modulePath), file),
            join(assetsDir, file),
          );
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        sourcemap: false,
      },
    },
  },
})