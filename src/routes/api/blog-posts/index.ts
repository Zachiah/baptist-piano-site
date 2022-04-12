import withApiUser from '$lib/middleware/api/withApiUser';
import prismaInstance from '$lib/prismaInstance';

export const get = withApiUser(async (event) => {
	const blogPosts = await prismaInstance.blogPost.findMany({
		where: {
			authorId: event.middleware.user.id
		}
	});

	return {
		statusCode: 200,
		body: { blogPosts }
	};
});
