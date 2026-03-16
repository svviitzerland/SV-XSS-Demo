import { getUserByUsername } from '$lib/db.server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (session) {
		const user = getUserByUsername(session);
		if (user) {
			event.locals.user = {
				username: user.username,
				name: user.name
			};
		}
	}

	return resolve(event);
};
