import { EMAIL_TOKEN_LENGTH } from '$lib/config';
import Joi from 'joi';

export const email = Joi.string()
	.email({ tlds: { allow: false } })
	.required();
export const username = Joi.string()
	.required()
	.regex(/^[a-zA-Z0-9_-]{3,20}$/);

export const loginSchema = Joi.object({
	email,
	username,
	recaptchaKey: Joi.string().required()
});

export const authenticateSchema = Joi.object({
	username,
	email,
	emailToken: Joi.string()
		.length(EMAIL_TOKEN_LENGTH)
		.required()
		.regex(/^[0-9]+$/)
});
