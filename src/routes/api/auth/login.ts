import generateEmailToken from '$lib/generateEmailToken';
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
import { loginSchema } from '$lib/schemas/User';

export const post = composeApiMiddleware(
	withNoApiUser,
	withApiSchema({ schema: loginSchema })
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

	const { email, username } = event.middleware.schemaValue;
	const emailToken = generateEmailToken();
	const tokenExpiration = dayjs().add(EMAIL_TOKEN_EXPIRATION_MINUTES, 'minute');

	const theEmailUser = await prismaInstance.user.findUnique({
		where: {
			email
		}
	});

	const theUsernameUser = await prismaInstance.user.findUnique({
		where: {
			username
		}
	});

	if (theEmailUser?.id !== theUsernameUser?.id) {
		return {
			status: 400,
			body: {
				error: 'Email and username are not associated with the same user'
			}
		};
	}

	const createdToken = await prismaInstance.token.create({
		data: {
			emailToken,
			type: TokenType.EMAIL,
			expiration: tokenExpiration.toDate(),
			user: {
				connectOrCreate: {
					create: {
						email,
						username
					},
					where: {
						email: email
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
