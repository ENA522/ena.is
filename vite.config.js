import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
    optimizeDeps: {
        include: ['ms']
    },
	server: {
            port: 3000 // Change this to your desired development port
        }
});
