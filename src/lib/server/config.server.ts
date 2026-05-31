import rawConfig from '#atfield-config';
import {
	DEFAULT_APPVIEW_URL,
	DEFAULT_HANDLE_RESOLVER_URL,
	DEFAULT_POST_LIMIT,
	MAX_POST_LIMIT,
	type AtfieldConfig,
	type AtfieldViewConfig
} from '$lib/atfield';

function requireString(value: unknown, path: string) {
	if (typeof value !== 'string' || value.trim().length === 0) {
		throw new Error(`Invalid ATField config: ${path} must be a non-empty string`);
	}

	return value.trim();
}

export function getConfig(): AtfieldConfig {
	const config = rawConfig as AtfieldConfig;

	const siteName = requireString(config.site?.name, 'site.name');
	const handle =
		typeof config.identity?.handle === 'string' ? config.identity.handle.trim() : undefined;
	const did = typeof config.identity?.did === 'string' ? config.identity.did.trim() : undefined;

	if (!handle && !did) {
		throw new Error('Invalid ATField config: identity.handle or identity.did is required');
	}

	return {
		site: {
			name: siteName,
			description:
				typeof config.site?.description === 'string' ? config.site.description.trim() : undefined,
			publicUrl:
				typeof config.site?.publicUrl === 'string' ? config.site.publicUrl.trim() : undefined
		},
		services: {
			handleResolverUrl:
				typeof config.services?.handleResolverUrl === 'string'
					? config.services.handleResolverUrl.trim()
					: DEFAULT_HANDLE_RESOLVER_URL,
			appViewUrl:
				typeof config.services?.appViewUrl === 'string'
					? config.services.appViewUrl.trim()
					: DEFAULT_APPVIEW_URL
		},
		identity: {
			handle,
			did
		},
		posts: {
			limit: normalizeLimit(config.posts?.limit)
		},
		views: normalizeViews(config.views)
	};
}

function normalizeLimit(limit: number | undefined) {
	if (typeof limit !== 'number' || !Number.isFinite(limit)) {
		return DEFAULT_POST_LIMIT;
	}

	return Math.max(1, Math.min(Math.trunc(limit), MAX_POST_LIMIT));
}

function normalizeViews(views: AtfieldConfig['views']): AtfieldViewConfig[] {
	if (!Array.isArray(views)) {
		return [];
	}

	return views.map((view, index) => ({
		id: requireString(view?.id, `views[${index}].id`),
		title: requireString(view?.title, `views[${index}].title`),
		source: normalizeViewSource(view?.source, index),
		limit: normalizeLimit(view?.limit)
	}));
}

function normalizeViewSource(source: unknown, index: number): AtfieldViewConfig['source'] {
	if (source === 'posts') {
		return source;
	}

	throw new Error(`Invalid ATField config: views[${index}].source must be 'posts'`);
}
