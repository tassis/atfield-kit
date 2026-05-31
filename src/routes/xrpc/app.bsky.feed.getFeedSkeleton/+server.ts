import { json } from '@sveltejs/kit';
import { getAtfieldView } from '$lib/server/atfield.server';
import { resolveConfiguredIdentity } from '$lib/server/core.server';
import { ERROR_CODE, jsonError } from '$server/errors';

export async function GET({ url }: { url: URL }) {
	try {
		const identity = await resolveConfiguredIdentity();
		const feed = url.searchParams.get('feed');
		const viewId = parseFeedInput(feed, identity.did);
		const view = viewId ? await getAtfieldView(viewId) : null;
		const payload = view
			? {
					feed: view.items
						.filter((item) => typeof item.bskyPostUri === 'string')
						.map((item) => ({
							post: item.bskyPostUri
						}))
				}
			: null;

		if (!payload) {
			return jsonError(404, ERROR_CODE.VIEW_NOT_FOUND, 'No matching feed view was found');
		}

		return json(payload);
	} catch (error) {
		return jsonError(
			502,
			ERROR_CODE.UPSTREAM_ERROR,
			'Failed to resolve feed skeleton',
			getMessage(error)
		);
	}
}

function getMessage(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}

function parseFeedInput(feed: string | null, expectedDid: string) {
	if (!feed) {
		return null;
	}

	if (!feed.startsWith('at://')) {
		return feed;
	}

	const match = /^at:\/\/([^/]+)\/app\.bsky\.feed\.generator\/([^/]+)$/.exec(feed);

	if (!match) {
		return null;
	}

	const [, did, viewId] = match;

	if (did !== expectedDid) {
		return null;
	}

	return viewId;
}
