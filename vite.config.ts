import { defineConfig } from 'vitest/config';
import windicss from 'vite-plugin-windicss';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [windicss(), svelte({ hot: !process.env.VITEST })],
	optimizeDeps: {
		include: ['joi', '@sendgrid/mail', 'cookie', 'debug', 'axios', '@prisma/client']
	},
	test: {
		include: ['src/**/*.test.ts'],
		environment: 'jsdom'
	}
});
