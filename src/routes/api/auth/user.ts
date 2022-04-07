import withApiUser from '$lib/middleware/api/withApiUser';

export const get = withApiUser(async (event) => {
	return {
		status: 200,
		body: {
			user: event.middleware.user
		}
	}
})