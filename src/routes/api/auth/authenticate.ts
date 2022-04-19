import generateAuthToken from '$lib/generateAuthToken';
import getRequestJson from '$lib/getRequestJson';
import withSchema from '$lib/middleware/api/withApiSchema';
import withNoApiUser from '$lib/middleware/api/withNoApiUser';
import { composeApiMiddleware } from '$lib/middleware/utils';
import prismaInstance from '$lib/prismaInstance';
import { authenticateSchema } from '$lib/schemas/User';
import { AUTHENTICATION_TOKEN_EXPIRATION_HOURS } from '$lib/sensitiveConfig';
import p from '@prisma/client';
import dayjs from 'dayjs';

export const post = composeApiMiddleware(
	withSchema({ schema: authenticateSchema }),
	withNoApiUser
)(async (event) => {
	const { email, emailToken, username } = event.middleware.schemaValue;

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

	if (fetchedEmailToken.user.email !== email || fetchedEmailToken.user.username !== username) {
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
			type: p.TokenType.API,
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

	await prismaInstance.user.update({
		where: {
			email
		},
		data: {
			numberOfLogins: { increment: 1 }
		}
	});

	const user = await prismaInstance.user.findUnique({
		where: {
			email
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
		},
		body: {
			user: user
		}
	};
});
