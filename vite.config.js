// vite.config.js
import { defineConfig } from 'vite';
import fs from 'fs-extra';
import babel from 'rollup-plugin-babel';
import stylelint from 'vite-plugin-stylelint';

export default defineConfig({
  root: './src',
  logLevel: 'info',
  plugins: [
    stylelint({
      failOnError: true,
      cache: false,
    })
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: 'styles/[name].[ext]',
        manualChunks(id) {
          if (id.endsWith('index.html')) {
            fs.copySync('src/assets', './dist/assets');
          }
        },
      },
      plugins: [
        babel({
          exclude: ['node_modules/**'],
          presets: ['@babel/preset-env'],
        }),
        stylelint({
          failOnError: true,
          cache: false,
        })
      ],
    },
  },
  server: {
    port: 3000,
  },
});
