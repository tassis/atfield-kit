import { json, text, type RequestHandler } from '@sveltejs/kit';
import { getAtfieldPost } from '$lib/server/atfield.server';
import { ERROR_CODE, jsonError } from '$server/errors';

export const GET: RequestHandler = async ({ params, url }) => {
	try {
		if (!params.post) {
			return jsonError(400, ERROR_CODE.INVALID_POST, 'Post identifier is required');
		}

		const payload = await getAtfieldPost(params.post);

		if (!payload) {
			return jsonError(404, ERROR_CODE.POST_NOT_FOUND, `No post found for rkey '${params.post}'`);
		}

		if (url.searchParams.get('type') === 'text') {
			return text(payload.renderedMarkdown ?? payload.textContent ?? '');
		}

		return json({ post: payload });
	} catch (error) {
		return jsonError(502, ERROR_CODE.UPSTREAM_ERROR, 'Failed to fetch post', getMessage(error));
	}
};

function getMessage(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}
