import { browser } from '$app/env';
import { session } from '$app/stores';
import getAuthUser from '$lib/getAuthUser';
import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function getSession(event: RequestEvent): Promise<App.Session> {
	const { value, error } = await getAuthUser(event.request);

	// purposely ignoring error here
	return {
		user: value,
		// TODO: consider making flash persist in db
		flash: []
	};
}
