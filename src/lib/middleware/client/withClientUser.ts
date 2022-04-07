import type { User } from '@prisma/client';
import type { ClientMiddleware } from '../types';

const withClientUser: ClientMiddleware<{ user: User }> = (cb) => async (event) => {
	const response = await event.fetch('/api/auth/user');

	const { value: jsonValue, error: jsonError } = await response.json();

	if (jsonError) {
		return {
			status: 302,
			redirect: '/auth/login'
		};
	}

	const user = jsonValue.user;

	if (response.status === 200) {
		return cb({
			...event,
			middleware: {
				...event.middleware,
				user
			}
		});
	} else {
		// TODO: ADD FUNCTIONALLITY THAT WILL MOVE USER TO THE PAGE THEY WERE PREVIOUSLY ON AFTER LOGIN
		return {
			status: 302,
			redirect: '/auth/login'
		};
	}
};

export default withClientUser;
