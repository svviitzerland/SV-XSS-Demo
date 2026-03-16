import { getUserByUsername } from '$lib/db.server';
import { verifyJwt } from '$lib/jwt.server';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (session) {
		const decoded = verifyJwt(session);
		if (decoded && decoded.username) {
			const user = getUserByUsername(decoded.username);
			if (user) {
				event.locals.user = {
					username: user.username,
					name: user.name
				};
			}
		}
	}

	return resolve(event);
};
