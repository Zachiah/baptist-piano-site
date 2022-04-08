import generateEmailToken from '$lib/generateEmailToken';
import getRequestJson from '$lib/getRequestJson';
import prismaInstance from '$lib/prismaInstance';
import Joi from 'joi';
import dayjs from 'dayjs';
import { EMAIL_TOKEN_EXPIRATION_MINUTES } from '$lib/config';
import { TokenType } from '@prisma/client';
import sendEmailToken from '$lib/sendEmailToken';
import { composeApiMiddleware } from '$lib/middleware/utils';
import withNoApiUser from '$lib/middleware/api/withNoApiUser';
import withApiSchema from '$lib/middleware/api/withApiSchema';
import isRecaptchaKeyValid from '$lib/isRecaptchaKeyValid';

const schema = Joi.object({
	email: Joi.string().email().required(),
	recaptchaKey: Joi.string().required()
});

export const post = composeApiMiddleware(
	withNoApiUser,
	withApiSchema({ schema })
)(async (event) => {
	const recaptchaKey = event.middleware.schemaValue.recaptchaKey;

	const success = isRecaptchaKeyValid(recaptchaKey);

	if (!success) {
		return {
			status: 400,
			body: {
				error: 'Invalid recaptcha key'
			}
		};
	}

	const email = event.middleware.schemaValue.email;
	const emailToken = generateEmailToken();
	const tokenExpiration = dayjs().add(EMAIL_TOKEN_EXPIRATION_MINUTES, 'minute');

	const createdToken = await prismaInstance.token.create({
		data: {
			emailToken,
			type: TokenType.EMAIL,
			expiration: tokenExpiration.toDate(),
			user: {
				connectOrCreate: {
					create: {
						email
					},
					where: {
						email
					}
				}
			}
		}
	});

	await sendEmailToken(email, emailToken);

	return {
		status: 200,
		message: 'Check your email for a login token.'
	};
});
