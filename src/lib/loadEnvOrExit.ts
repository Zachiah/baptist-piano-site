const loadEnvOrExit = (env: Record<string,string|boolean>,key: string): string => {
	const value = process.env[key];
	if (!value) {
		console.error(`Missing ${key} in .env file`);
		process.exit(1);
	}
	return value;
};

export default loadEnvOrExit;
