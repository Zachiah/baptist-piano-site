import { composeApiMiddleware } from '$lib/middleware/utils';
import prismaInstance from '$lib/prismaInstance';

export const get = composeApiMiddleware()(async (event) => {
	const author = await prismaInstance.user.findUnique({
		where: {
			username: event.params.username
		}
	});


	if (!author) {
		return {
			status: 404,
			body: {
				error: 'User not found'
			}
		};
	}

	const blogPosts = await prismaInstance.blogPost.findMany({
		where: {
			authorId: author.id
		}
	});

	return {
		statusCode: 200,
		body: { blogPosts, author }
	};
});

