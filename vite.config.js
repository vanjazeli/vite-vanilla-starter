// vite.config.js
import { defineConfig } from 'vite';
import fs from 'fs-extra';
import babel from 'rollup-plugin-babel';
import stylelint from 'vite-plugin-stylelint';
import eslint from 'vite-plugin-eslint';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	root: './src',
	logLevel: 'info',
	plugins: [
		stylelint({
			failOnError: true,
			cache: false,
		}),
		eslint({
			include: ['src/**/*.js'],
			exclude: ['node_modules/**', './*.config.js'],
			fix: false,
		}),
	],
	css: {
		postcss: {
			config: './postcss.config.js',
			plugins: [autoprefixer()],
		},
	},
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
				}),
				eslint({
					include: ['dist/**/*.js'],
					exclude: ['node_modules/**', './*.config.js'],
					fix: false,
				}),
			],
		},
	},
	server: {
		port: 3000,
	},
});
