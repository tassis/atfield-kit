import { json } from '@sveltejs/kit';
import { getAtfieldProfile } from '$lib/server/atfield.server';
import { ERROR_CODE, jsonError } from '$server/errors';

export async function GET() {
	try {
		const payload = await getAtfieldProfile();
		return json({ profile: payload });
	} catch (error) {
		return jsonError(502, ERROR_CODE.UPSTREAM_ERROR, 'Failed to fetch profile', getMessage(error));
	}
}

function getMessage(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}
