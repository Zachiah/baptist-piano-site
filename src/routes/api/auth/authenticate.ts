import generateAuthToken from '$lib/generateAuthToken';
import getRequestJson from '$lib/getRequestJson';
import withSchema from '$lib/middleware/api/withApiSchema';
import withNoApiUser from '$lib/middleware/api/withNoApiUser';
import { composeApiMiddleware } from '$lib/middleware/utils';
import prismaInstance from '$lib/prismaInstance';
import { AUTHENTICATION_TOKEN_EXPIRATION_HOURS } from '$lib/sensitiveConfig';
import { prisma, TokenType } from '@prisma/client';
import dayjs from 'dayjs';
import Joi from 'joi';

const schema = Joi.object({
	email: Joi.string().email().required(),
	emailToken: Joi.string().required()
});

export const post = composeApiMiddleware(
	withSchema({ schema }),
	withNoApiUser
)(async (event) => {
	const { email, emailToken } = event.middleware.schemaValue;

	const fetchedEmailToken = await prismaInstance.token.findUnique({
		where: {
			emailToken: emailToken
		},
		include: {
			user: true
		}
	});

	if (!fetchedEmailToken?.valid) {
		return {
			status: 400,
			body: {
				message: 'Unauthenticated'
			}
		};
	}

	if (fetchedEmailToken.expiration < new Date()) {
		return {
			status: 400,
			body: {
				message: 'Token expired'
			}
		};
	}

	if (fetchedEmailToken.user.email !== email) {
		return {
			status: 400,
			body: {
				message: 'Unauthenticated'
			}
		};
	}

	const tokenExpiration = dayjs().add(AUTHENTICATION_TOKEN_EXPIRATION_HOURS, 'hour').toDate();

	const createdToken = await prismaInstance.token.create({
		data: {
			type: TokenType.API,
			expiration: tokenExpiration,
			user: {
				connect: {
					email
				}
			}
		}
	});

	await prismaInstance.token.update({
		where: {
			id: fetchedEmailToken.id
		},
		data: {
			valid: false
		}
	});

	const authToken = generateAuthToken(createdToken.id);

	return {
		status: 200,
		headers: {
			Authorization: authToken,
			'set-cookie': [
				`jwt=${authToken}; HttpOnly; Path=/; Max-Age=${
					AUTHENTICATION_TOKEN_EXPIRATION_HOURS * 60 * 60
				}`
			]
		}
	};
});
