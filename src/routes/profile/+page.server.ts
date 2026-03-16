import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Require login for the profile page
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	// layout server load exposes the user object, so we don't strictly need to return it here,
	// but returning it explicitly is also fine.
	return {
		user: locals.user
	};
};
