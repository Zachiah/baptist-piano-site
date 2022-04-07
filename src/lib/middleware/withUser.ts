import getAuthUser from '$lib/getAuthUser';
import type { User } from '@prisma/client';
import type { Middleware } from './Middleware';

const withUser: Middleware<{ user: User }> = (cb) => async (event) => {
	const { value: user, error: userError } = await getAuthUser(event.request);

	if (userError) {
		return {
			status: 400,
			body: {
				message: userError
			}
		};
	}

	return cb({
		...event,
		middleware: {
			...event.middleware,
			user
		}
	});
};

export default withUser;
