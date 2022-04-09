import 'dotenv/config';
import loadEnvOrExit from './loadEnvOrExit';

export const JWT_SECRET = loadEnvOrExit(process.env, 'JWT_SECRET') as string;
export const JWT_ALGORITHM = 'HS256';
export const AUTHENTICATION_TOKEN_EXPIRATION_HOURS = 12;
export const SENDGRID_API_KEY = loadEnvOrExit(process.env, 'SENDGRID_API_KEY') as string;
export const NOREPLY_EMAIL = loadEnvOrExit(process.env, 'NOREPLY_EMAIL') as string;
export const SERVER_RECAPTCHA_API_KEY = loadEnvOrExit(
	process.env,
	'SERVER_RECAPTCHA_API_KEY'
) as string;
export const AZURE_STORAGE_CONNECTION_STRING = loadEnvOrExit(
	process.env,
	'AZURE_STORAGE_CONNECTION_STRING'
) as string;
export const CONTAINER_NAME = loadEnvOrExit(process.env, 'CONTAINER_NAME') as string;