const config = {
	webServer: {
		command: 'npm run build && npm run preview -- --port=1234',
		port: 1234
	},
	testDir: './tests/e2e'
};

export default config;
