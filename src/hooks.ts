import getAuthUser from '$lib/getAuthUser';
import type { User } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit/types/private';

export async function getSession(event: RequestEvent): Promise<App.Session> {
	const { value, error } = await getAuthUser(event.request);

    // purposely ignoring error here
	return {
		user: {
            id: value.id,
            email: value.email,
            firstName: value.firstName,
            lastName: value.lastName
        }
	};
}