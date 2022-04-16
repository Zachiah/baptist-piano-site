import withApiUser from '$lib/middleware/api/withApiUser';
import prismaInstance from '$lib/prismaInstance';

export const get = async (event) => {
	const blogPosts = await prismaInstance.blogPost.findMany({
		where: {
			published: true
		},
		include: {
			author: true
		}
	});

	return {
		status: 200,
		body: { blogPosts }
	};
};
