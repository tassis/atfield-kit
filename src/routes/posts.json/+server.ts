import { json } from '@sveltejs/kit';
import { getAtfieldPosts } from '$lib/server/atfield.server';
import { ERROR_CODE, jsonError } from '$server/errors';

export async function GET() {
	try {
		const payload = await getAtfieldPosts();
		return json(payload);
	} catch (error) {
		return jsonError(502, ERROR_CODE.UPSTREAM_ERROR, 'Failed to fetch posts', getMessage(error));
	}
}

function getMessage(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}
