import getRequestJson from '$lib/getRequestJson';
import type { ConfigurableClientMiddleware } from '../types';

const withNoClientUser: ConfigurableClientMiddleware<{ redirect?: string }, {}> =
	(config) => (cb) => async (event) => {
		if (event.session.user) {
			return {
				status: 302,
				redirect: config.redirect || '/'
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
