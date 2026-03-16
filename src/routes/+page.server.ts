import { fail } from '@sveltejs/kit';
import { getComments, addComment } from '$lib/db.server';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		comments: getComments()
	};
};

export const actions: Actions = {
	addComment: async ({ request, locals }) => {
		// Enforce login for commenting
		if (!locals.user) {
			return fail(401, { error: 'You must be logged in to comment' });
		}

		const data = await request.formData();
		const text = data.get('text');

		if (!text || typeof text !== 'string') {
			return fail(400, { error: 'Comment text is required' });
		}

		addComment(locals.user.username, text);

		return { success: true };
	}
};
