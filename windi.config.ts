import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'sans-serif']
			}
		}
	}
});
