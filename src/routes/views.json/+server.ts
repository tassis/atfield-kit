import { json } from '@sveltejs/kit';
import { getAtfieldViews } from '$lib/server/atfield.server';
import { ERROR_CODE, jsonError } from '$server/errors';

export function GET() {
	try {
		const payload = getAtfieldViews();
		return json(payload);
	} catch (error) {
		return jsonError(500, ERROR_CODE.CONFIG_ERROR, 'Failed to load views', getMessage(error));
	}
}

function getMessage(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}
