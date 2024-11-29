import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFile, mkdir } from "fs/promises";
import path, { join } from "path";

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
        const files = ["pyodide-lock.json", "pyodide.asm.js", "pyodide.asm.wasm", "python_stdlib.zip"];
        const modulePath = path.resolve("node_modules/pyodide");
        console.log("Resolved module path:", modulePath); // Debugowanie ścieżki
        for (const file of files) {
          const src = join(modulePath, file);
          const dest = join(assetsDir, file);
          console.log(`Copying ${src} to ${dest}`);
          await copyFile(src, dest);
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
  }
});