import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	// Grab the raw search parameter to reflect it back.
	// We read it server-side to guarantee it reaches the client exactly as requested
	// without any client-side JavaScript encoding interference before rendering.
	const query = url.searchParams.get('q') || '';

	return {
		query
	};
};
