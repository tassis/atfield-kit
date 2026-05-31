import { createCore } from 'atfield-core';
import { getConfig } from '$lib/server/config.server';

export function getCore() {
	const config = getConfig();

	return createCore({
		fetch,
		services: config.services
	});
}

export async function resolveConfiguredIdentity() {
	const config = getConfig();
	return getCore().identity.resolve(
		config.identity.did
			? {
					did: config.identity.did,
					...(config.identity.handle ? { handle: config.identity.handle } : {})
				}
			: {
					handle: config.identity.handle!
				}
	);
}
