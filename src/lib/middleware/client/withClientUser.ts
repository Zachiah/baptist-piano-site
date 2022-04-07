import getRequestJson from '$lib/getRequestJson';
import type { User } from '@prisma/client';
import type { ClientMiddleware, ConfigurableClientMiddleware } from '../types';

const withClientUser: ConfigurableClientMiddleware<{ required: boolean }, { user?: User }> =
	(config) => (cb) => async (event) => {
		const response = await event.fetch('/api/auth/user');

		const { value: jsonValue, error: jsonError } = await getRequestJson(response);

		if (jsonError) {
			if (config.required) {
				return {
					status: 302,
					redirect: '/auth/login'
				};
			}
			return cb(event);
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
			if (config.required) {
				return {
					status: 302,
					redirect: '/auth/login'
				};
			}
			return cb(event);
		}
	};

export default withClientUser;
