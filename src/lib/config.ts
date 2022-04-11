import loadEnvOrExit from "./loadEnvOrExit";

export const EMAIL_TOKEN_EXPIRATION_MINUTES = 10;
export const EMAIL_TOKEN_LENGTH = 8;
export const CLIENT_RECAPTCHA_SITE_KEY = loadEnvOrExit(import.meta.env, 'VITE_CLIENT_RECAPTCHA_SITE_KEY')
export const MAX_UPLOAD_SIZE = /* 4 MB */ 4 * 1024 * 1024;
export const MAX_UPLOAD_SIZE_HUMAN_NAME = "4 MB"