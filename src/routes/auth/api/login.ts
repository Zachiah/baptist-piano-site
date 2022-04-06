import generateEmailToken from '$lib/generateEmailToken';
import getRequestJson from '$lib/getRequestJson';
import prismaInstance from '$lib/prismaInstance';
import Joi from 'joi';
import dayjs from 'dayjs';
import { EMAIL_TOKEN_EXPIRATION_MINUTES } from '$lib/config';
import { TokenType } from '@prisma/client';
import sendEmailToken from '$lib/sendEmailToken';

const schema = Joi.object({
	email: Joi.string().email().required()
});

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {


	const { error: jsonError, value: jsonValue } = await getRequestJson(request);

	if (jsonError) {
		return {
			status: 400,
			body: {
				error: jsonError
			}
		};
	}

	const { value, error } = schema.validate(jsonValue);

	if (error) {
		return {
			status: 400,
			body: {
				message: error.message
			}
		};
	}

	const email = value.email;
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
}
