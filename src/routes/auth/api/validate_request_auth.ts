import validateRequestAuth from '$lib/validateRequestAuth';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ request }: { request: Request }) {

	const { value, error } = await validateRequestAuth(request);

	if (error) {
		return {
			status: 400,
			body: {
				message: error
			}
		};
	}

	return {
		status: 200,
		body: {
			message: 'Authenticated'
		}
	};
}
