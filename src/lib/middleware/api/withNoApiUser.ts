import getAuthUser from '$lib/getAuthUser';
import type { ApiMiddleware } from '../types';

const withNoApiUser: ApiMiddleware<{}> = (cb) => async (event) => {
	const { value: user, error: userError } = await getAuthUser(event.request);

	if (user) {
		return {
			status: 400,
			body: {
				message: 'Already authenticated'
			}
		};
	}

	return cb(event);
};

export default withNoApiUser;
