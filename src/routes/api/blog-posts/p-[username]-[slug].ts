import prismaInstance from '$lib/prismaInstance';

export const get = async (event) => {
	event.params.slug;

	const post = await prismaInstance.blogPost.findUnique({
		where: {
			slug: event.params.slug
		},
	});

    const user = await prismaInstance.user.findUnique({
        where: {
            username: event.params.username
        }
    });

    console.log(post)

	if (!post || user?.id !== post.authorId) {
		return {
			status: 404,
			body: {
				error: 'Post not found'
			}
		};
	}

	return {
		status: 200,
		body: {
			blogPost: post
		}
	};
};
