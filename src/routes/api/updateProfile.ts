import withApiSchema from '$lib/middleware/api/withApiSchema';
import withApiUser from '$lib/middleware/api/withApiUser';
import { composeApiMiddleware } from '$lib/middleware/utils';
import prismaInstance from '$lib/prismaInstance';
import { Gender } from '@prisma/client';
import Joi from 'joi';

const schema = Joi.object({
	firstName: Joi.string().optional().allow(''),
	lastName: Joi.string().optional().allow(''),
	gender: Joi.string().only().allow('male', 'female').optional(),
	biography: Joi.any().optional(),
	age: Joi.number().integer().min(1).max(150)
});

export const post = composeApiMiddleware(
	withApiSchema({ schema }),
	withApiUser
)(async (event) => {
	await prismaInstance.user.update({
		where: {
			id: event.middleware.user.id
		},
		data: {
			firstName: event.middleware.schemaValue.firstName,
			lastName: event.middleware.schemaValue.lastName,
			gender:
				event.middleware.schemaValue.gender === 'male'
					? Gender.MALE
					: event.middleware.schemaValue.gender === 'female'
					? Gender.FEMALE
					: undefined,
			biography: event.middleware.schemaValue.biography,
			age: event.middleware.schemaValue.age
		}
	});

	const user = await prismaInstance.user.findUnique({
		where: { id: event.middleware.user.id }
	});

	return {
		status: 200,
		body: {
			user
		}
	};
});
