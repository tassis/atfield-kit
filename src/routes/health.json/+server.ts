import { json } from '@sveltejs/kit';
import { getConfig } from '$lib/server/config.server';
import { ERROR_CODE, jsonError } from '$server/errors';

export function GET() {
	try {
		const config = getConfig();

		return json({
			ok: true,
			service: 'ATField',
			version: 'v0',
			identity: {
				handle: config.identity.handle,
				did: config.identity.did
			}
		});
	} catch (error) {
		return jsonError(
			500,
			ERROR_CODE.CONFIG_ERROR,
			'Failed to load ATField config',
			getMessage(error)
		);
	}
}

function getMessage(error: unknown) {
	return error instanceof Error ? error.message : 'Unknown error';
}
