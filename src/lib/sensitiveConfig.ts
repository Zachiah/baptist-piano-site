import 'dotenv/config';

export const JWT_SECRET = process.env.JWT_SECRET || 'SUPER_SECRET_JWT_SECRET';
export const JWT_ALGORITHM = 'HS256';
export const AUTHENTICATION_TOKEN_EXPIRATION_HOURS = 12;
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
export const NOREPLY_EMAIL = process.env.NOREPLY_EMAIL;
export const SERVER_RECAPTCHA_API_KEY = process.env.SERVER_RECAPTCHA_API_KEY;
