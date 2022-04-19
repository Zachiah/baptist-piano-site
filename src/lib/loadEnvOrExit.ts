const loadEnvOrExit = (env: Record<string, string | boolean>, key: string): string | boolean => {
	const value = env[key];
	if (value === null || value === undefined) {
		console.error(`Missing ${key} in .env file`);
		if (typeof process !== 'undefined' && process.exit) {
			process.exit(1);
		}
		throw new Error(`Missing ${key} in .env file`);
	}
	return value;
};

export default loadEnvOrExit;
