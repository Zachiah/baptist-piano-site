import withApiSchema from '$lib/middleware/api/withApiSchema';
import withApiUser from '$lib/middleware/api/withApiUser';
import { composeApiMiddleware } from '$lib/middleware/utils';
import prismaInstance from '$lib/prismaInstance';
import Joi from 'joi';

export const post = composeApiMiddleware(
	withApiUser,
	withApiSchema({
		schema: Joi.object({
			title: Joi.string().required(),
			content: Joi.object().required(),
			coverImageUrl: Joi.string().uri().optional().allow(''),
			published: Joi.boolean().required(),
			slug: Joi.string().required()
		})
	})
)(async (event) => {
	if (event.middleware.user.username !== event.params.username) {
		return {
			statusCode: 403,
			body: {
				message: 'You are not authorized to create a blog post for this user.'
			}
		};
	}

	const theUser = await prismaInstance.user.findUnique({
		where: {
			username: event.params.username
		}
	});

	if (!theUser) {
		return {
			statusCode: 404,
			body: {
				message: 'User not found.'
			}
		};
	}

	await prismaInstance.blogPost.create({
		data: {
			author: {
				connect: {
					id: theUser.id
				}
			},
			title: event.middleware.schemaValue.title,
			content: event.middleware.schemaValue.content,
			coverImageUrl: event.middleware.schemaValue.coverImageUrl,
			published: event.middleware.schemaValue.published,
			slug: event.middleware.schemaValue.slug
		}
	});

	return {
		status: 200
	};
});
