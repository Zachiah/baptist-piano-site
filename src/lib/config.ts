import loadEnvOrExit from "./loadEnvOrExit";

export const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
export const EMAIL_TOKEN_LENGTH = 8;
export const CLIENT_RECAPTCHA_SITE_KEY = loadEnvOrExit(import.meta.env, 'VITE_CLIENT_RECAPTCHA_SITE_KEY')
