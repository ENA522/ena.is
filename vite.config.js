import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		port: 3000
	},
	ssr: {
		noExternal: ['better-auth']
	},
	optimizeDeps: {
		exclude: ['better-auth']
	}
});