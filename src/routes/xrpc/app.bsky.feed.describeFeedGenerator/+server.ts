import { json } from '@sveltejs/kit';
import { getAtfieldViews } from '$lib/server/atfield.server';
import { resolveConfiguredIdentity } from '$lib/server/core.server';
import { ERROR_CODE, jsonError } from '$server/errors';

export async function GET() {
	try {
		const identity = await resolveConfiguredIdentity();
		const views = getAtfieldViews().views;
		const payload = {
			did: identity.did,
			feeds: views.map((view) => ({
				uri: `at://${identity.did}/app.bsky.feed.generator/${view.id}`,
				displayName: view.title
			}))
		};

		return json(payload);
	} catch (error) {
		return jsonError(
			502,
			ERROR_CODE.UPSTREAM_ERROR,
			'Failed to describe feed generator',
			getMessage(error)
		);
	}
}

function getMessage(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}
