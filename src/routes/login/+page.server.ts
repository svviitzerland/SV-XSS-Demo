import { fail, redirect } from '@sveltejs/kit';
import { getUser } from '$lib/db.server';
import { signJwt } from '$lib/jwt.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// If already logged in, redirect to home
	if (locals.user) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
			return fail(400, { error: 'Missing username or password' });
		}

		const user = getUser(username, password);

		if (!user) {
			return fail(400, { error: 'Invalid username or password' });
		}

		// Set the session cookie using a JWT for enhanced security (and to demonstrate decoding stolen JWTs)
		const token = signJwt({
			username: user.username,
			role: user.username === 'admin' ? 'admin' : 'user'
		});

		cookies.set('session', token, {
			path: '/',
			httpOnly: false, // Intentional: allowing JS to read the cookie for XSS demo purposes
			sameSite: 'lax',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/');
	}
};
