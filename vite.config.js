// vite.config.js
import { defineConfig } from "vite";
import fs from 'fs-extra';

export default defineConfig({
  root: './src',
  build: {
    outDir:'../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: 'styles/[name].[ext]',
      },
      manualChunks(id) {
        if(id.endsWith("index.html")) {
          fs.copySync("src/assets", './dist/assets');
        }
      }
    }
  },
  server: {
    port: 3000,
  }
})