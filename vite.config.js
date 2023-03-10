// vite.config.js
import { defineConfig } from "vite";
import fs from 'fs-extra';
import babel from 'rollup-plugin-babel';

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
      plugins: [
        babel({
          exclude: ['node_modules/**','src/**'],
          presets: ['@babel/preset-env']
        })
      ],
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