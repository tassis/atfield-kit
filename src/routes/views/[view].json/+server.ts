import { json, type RequestHandler } from '@sveltejs/kit';
import { getAtfieldView } from '$lib/server/atfield.server';
import { ERROR_CODE, jsonError } from '$server/errors';

export const GET: RequestHandler = async ({ params }) => {
	try {
		if (!params.view) {
			return jsonError(400, ERROR_CODE.INVALID_VIEW, 'View identifier is required');
		}

		const payload = await getAtfieldView(params.view);

		if (!payload) {
			return jsonError(404, ERROR_CODE.VIEW_NOT_FOUND, `No view found for id '${params.view}'`);
		}

		return json(payload);
	} catch (error) {
		return jsonError(502, ERROR_CODE.UPSTREAM_ERROR, 'Failed to fetch view', getMessage(error));
	}
};

function getMessage(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}
