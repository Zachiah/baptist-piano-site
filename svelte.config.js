import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import windicss from 'vite-plugin-windicss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		vite: {
			plugins: [windicss({})],
			optimizeDeps: {
				include: ['joi', '@sendgrid/mail', 'cookie', 'debug', 'axios', '@prisma/client']
			}
		}
	}
};

export default config;
