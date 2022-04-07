import withApiUser from '$lib/middleware/api/withApiUser';

export const post = withApiUser(async (event) => {
	return {
		status: 200,
		headers: {
			'set-cookie': ['jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly']
		}
	};
});
