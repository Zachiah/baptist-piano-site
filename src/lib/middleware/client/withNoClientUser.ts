import getRequestJson from '$lib/getRequestJson';
import type { ConfigurableClientMiddleware } from '../types';

const withNoClientUser: ConfigurableClientMiddleware<{ redirect?: string }, {}> =
	(config) => (cb) => async (event) => {
		const response = await event.fetch('/api/auth/user');

		const { value: jsonValue, error: jsonError } = await getRequestJson(response);

		const user = jsonValue?.user;

		if (user) {
			return {
				status: 302,
				redirect: config.redirect || '/dashboard',
				session: {
					...event.session,
					user: {
						id: user.id,
						email: user.email,
						firstName: user.firstName,
						lastName: user.lastName
					}
				}
			};
		}

		return cb({
			...event,
			session: {
				...event.session,
				user: null
			}
		});
	};

export default withNoClientUser;
