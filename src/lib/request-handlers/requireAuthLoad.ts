import validateRequestAuth from '$lib/validateRequestAuth';
import type { RequestHandlerOutput, ResponseBody } from '@sveltejs/kit';
import type { LoadInput, LoadOutput } from '@sveltejs/kit/types/private';

const requireAuthLoad = async function (cb: (req: LoadInput) => LoadOutput): LoadOutput {
	const { value, error } = await validateRequestAuth(request);

	if (error) {
		return {
			status: 400,
		};
	}

	return {
		status: 200,
		body: {
			message: 'Authenticated'
		}
	};
};

export default requireAuthLoad;
