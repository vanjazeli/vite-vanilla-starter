// vite.config.js
import { defineConfig } from "vite"

export default defineConfig({
  root: './src',
  build: {
    outDir:'../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: 'css/[name].[ext]',
      },
    }
  },
  server: {
    port: 3000,
  }
})